import {
  getFirestore,
  collection,
  doc,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  limit,
  getDoc,
  increment,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

let _db = null
function getDb() {
  if (!_db) _db = getFirestore()
  return _db
}

const messages = ref([])
const messagesLoading = ref(true)
let unsubMessages = null
let currentChatId = ref(null)

export function useMessages() {
  const auth = getAuth()

  function subscribeMessages(chatId) {
    if (unsubMessages && currentChatId.value === chatId) return
    if (unsubMessages) { unsubMessages(); unsubMessages = null }
    const db = getDb()
    currentChatId.value = chatId
    messages.value = []
    messagesLoading.value = true

    const uid = auth.currentUser?.uid
    if (uid) {
      const dbRef = doc(db, 'chats', chatId)
      updateDoc(dbRef, { [`unreadCount.${uid}`]: 0 }).catch(() => {})
    }

    const { notify } = useNotifications()
    const q = query(
      collection(db, 'chats', chatId, 'messages'),
      orderBy('createdAt', 'asc'),
      limit(200)
    )

    let isInitialLoad = true

    unsubMessages = onSnapshot(q, async (snap) => {
      messages.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }))

      if (!isInitialLoad) {
        snap.docChanges().forEach(change => {
          if (change.type === 'added') {
            const m = change.doc.data()
            if (m.senderId !== uid && !m.isDeleted) {
              const senderName = m.senderId === 'bot_echo' ? 'Echo Bot' : 'Someone'
              const text = m.type === 'text' ? m.text : 'Sent an attachment'
              notify(`New message from ${senderName}`, { body: text })
            }
          }
        })
      }
      isInitialLoad = false

      messagesLoading.value = false
    }, (err) => {
      console.error('subscribeMessages error:', err)
      messagesLoading.value = false
    })
  }

  function unsubscribeMessages(chatIdToUnsub) {
    if (chatIdToUnsub && currentChatId.value !== chatIdToUnsub) {
      // Prevent race condition: if the active chat has already changed, don't kill it!
      return
    }
    if (unsubMessages) { unsubMessages(); unsubMessages = null }
    messages.value = []
    messagesLoading.value = true
    currentChatId.value = null
  }

  async function sendMessage(chatId, payload) {
    const db = getDb()
    const uid = auth.currentUser?.uid
    if (!uid) return

    const messageData = {
      senderId: uid,
      type: payload.type || 'text',
      text: payload.text || null,
      fileUrl: payload.fileUrl || null,
      fileName: payload.fileName || null,
      fileSize: payload.fileSize || null,
      mimeType: payload.mimeType || null,
      createdAt: serverTimestamp(),
    }

    await addDoc(collection(db, 'chats', chatId, 'messages'), messageData)

    // Fetch chat to update unread counts
    const chatSnap = await getDoc(doc(db, 'chats', chatId))
    const chatData = chatSnap.data() || {}
    const participants = chatData.participants || []
    
    const unreadUpdates = {}
    participants.forEach(p => {
      if (p !== uid) {
        unreadUpdates[`unreadCount.${p}`] = increment(1)
      }
    })

    // Update chat's last message and unread counts
    await updateDoc(doc(db, 'chats', chatId), {
      lastMessage: payload.type === 'text' ? payload.text : `📎 ${payload.fileName || 'File'}`,
      lastMessageAt: serverTimestamp(),
      lastMessageSenderId: uid,
      ...unreadUpdates
    })

    // --- Echo Bot Interceptor ---
    // If this is a direct chat with the bot, simulate a reply.
    if (participants.includes('bot_echo') && uid !== 'bot_echo') {
      setTimeout(async () => {
        const replyText = payload.type === 'text' 
          ? `You said: "${payload.text}"` 
          : `You sent a file: ${payload.fileName}`
          
        await addDoc(collection(db, 'chats', chatId, 'messages'), {
          senderId: 'bot_echo',
          type: 'text',
          text: replyText,
          createdAt: serverTimestamp(),
        })

        await updateDoc(doc(db, 'chats', chatId), {
          lastMessage: replyText,
          lastMessageAt: serverTimestamp(),
          lastMessageSenderId: 'bot_echo',
          [`unreadCount.${uid}`]: increment(1)
        })
      }, 1000)
    }
  }

  async function deleteMessage(chatId, messageId) {
    const db = getDb()
    await updateDoc(doc(db, 'chats', chatId, 'messages', messageId), {
      isDeleted: true,
      text: null,
      fileUrl: null,
      fileName: null
    })
  }

  async function editMessage(chatId, messageId, newText) {
    const db = getDb()
    await updateDoc(doc(db, 'chats', chatId, 'messages', messageId), {
      text: newText,
      isEdited: true,
    })
  }

  async function clearChat(chatId) {
    const db = getDb()
    const uid = auth.currentUser?.uid
    if (!uid) return
    await updateDoc(doc(db, 'chats', chatId), {
      [`clearedAt.${uid}`]: serverTimestamp()
    })
  }

  async function toggleReaction(chatId, messageId, emoji) {
    const db = getDb()
    const uid = auth.currentUser?.uid
    if (!uid) return
    
    const msgRef = doc(db, 'chats', chatId, 'messages', messageId)
    const msgSnap = await getDoc(msgRef)
    if (!msgSnap.exists()) return

    const data = msgSnap.data()
    const currentReactions = data.reactions?.[emoji] || []
    
    if (currentReactions.includes(uid)) {
      await updateDoc(msgRef, {
        [`reactions.${emoji}`]: arrayRemove(uid)
      })
    } else {
      await updateDoc(msgRef, {
        [`reactions.${emoji}`]: arrayUnion(uid)
      })
    }
  }

  return {
    messages: readonly(messages),
    messagesLoading: readonly(messagesLoading),
    currentChatId: readonly(currentChatId),
    subscribeMessages,
    unsubscribeMessages,
    sendMessage,
    deleteMessage,
    editMessage,
    clearChat,
    toggleReaction,
  }
}
