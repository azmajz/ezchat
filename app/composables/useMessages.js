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

    const q = query(
      collection(db, 'chats', chatId, 'messages'),
      orderBy('createdAt', 'asc'),
      limit(200)
    )
    unsubMessages = onSnapshot(q, (snap) => {
      messages.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
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

    // Update chat's last message
    await updateDoc(doc(db, 'chats', chatId), {
      lastMessage: payload.type === 'text' ? payload.text : `📎 ${payload.fileName || 'File'}`,
      lastMessageAt: serverTimestamp(),
    })

    // --- Echo Bot Interceptor ---
    // If this is a direct chat with the bot, simulate a reply.
    const chatSnap = await getDoc(doc(db, 'chats', chatId))
    const participants = chatSnap.data()?.participants || []
    
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
        })
      }, 1000)
    }
  }

  async function deleteMessage(chatId, messageId) {
    const db = getDb()
    await deleteDoc(doc(db, 'chats', chatId, 'messages', messageId))
  }

  return {
    messages: readonly(messages),
    messagesLoading: readonly(messagesLoading),
    currentChatId: readonly(currentChatId),
    subscribeMessages,
    unsubscribeMessages,
    sendMessage,
    deleteMessage,
  }
}
