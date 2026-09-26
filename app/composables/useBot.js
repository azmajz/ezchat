import { getFirestore, doc, collection, query, where, getDoc, getDocs, setDoc, addDoc, updateDoc, serverTimestamp, increment, deleteField } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

let _db = null
function getDb() {
  if (!_db) _db = getFirestore()
  return _db
}

export function useBot() {
  const auth = getAuth()
  const BOT_ID = 'bot_echo'

  async function ensureBot() {
    const db = getDb()
    const uid = auth.currentUser?.uid
    if (!uid) return

    // Ensure bot user exists and is up to date
    const botRef = doc(db, 'users', BOT_ID)
    await setDoc(botRef, {
      uid: BOT_ID,
      displayName: 'EzChat Bot',
      email: 'ezchatbot@ezchat.app',
      photoURL: "data:image/svg+xml;charset=utf-8,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='geminiGrad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%234285f4'/%3E%3Cstop offset='50%25' stop-color='%239b72cb'/%3E%3Cstop offset='100%25' stop-color='%23d96570'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='24' height='24' fill='%23ffffff' /%3E%3Cg transform='translate(3.6, 3.6) scale(0.7)'%3E%3Cpath fill='url(%23geminiGrad)' d='M12 0C12 0 12 11.5 0 12C12 12.5 12 24 12 24C12 24 12 12.5 24 12C12 11.5 12 0 12 0Z'/%3E%3C/g%3E%3C/svg%3E",
      isOnline: true,
      lastSeen: serverTimestamp()
    }, { merge: true })

    // Check if chat exists with the bot
    const q = query(
      collection(db, 'chats'),
      where('type', '==', 'direct'),
      where('participants', 'array-contains', uid)
    )
    const snap = await getDocs(q)
    const existing = snap.docs.find((d) => d.data().participants.includes(BOT_ID))
    
    if (!existing) {
      // Create chat with bot
      const chatRef = await addDoc(collection(db, 'chats'), {
        type: 'direct',
        participants: [uid, BOT_ID],
        createdBy: BOT_ID,
        createdAt: serverTimestamp(),
        lastMessage: 'Hi! I am EzChat Bot, your AI assistant.',
        lastMessageAt: serverTimestamp(),
        name: null,
        photoURL: null,
      })

      // Send welcome message
      await sendBotWelcome(chatRef.id, uid)
    }
  }

  async function sendBotWelcome(chatId, targetUid) {
    const db = getDb()
    const fname = auth.currentUser?.displayName?.split(' ')[0] || 'there'
    
    await addDoc(collection(db, 'chats', chatId, 'messages'), {
      text: `Hi ${fname}! 👋 I am EzChat Bot, your AI assistant. Choose an option below to see how I can help!`,
      quickReplies: ['Features', 'How-Tos', 'About EzChat', 'Privacy'],
      senderId: BOT_ID,
      createdAt: serverTimestamp(),
      type: 'text',
    })

    if (targetUid) {
      await updateDoc(doc(db, 'chats', chatId), {
        lastMessage: 'Hi there! 👋 I am EzChat Bot, your AI assistant...',
        lastMessageAt: serverTimestamp(),
        lastMessageSenderId: BOT_ID,
        [`unreadCount.${targetUid}`]: increment(1)
      })
    }
  }

  async function handleBotMessage(chatId, payload) {
    const db = getDb()
    const uid = auth.currentUser?.uid
    if (!uid) return

    // Set bot typing state to simulate thinking
    await updateDoc(doc(db, 'chats', chatId), {
      [`typing.${BOT_ID}`]: serverTimestamp()
    })

    // Wait 1.5 seconds to simulate typing/thinking
    await new Promise(resolve => setTimeout(resolve, 1500))

    let replyText = ''
    let quickReplies = []
    const userText = payload.text?.toLowerCase() || ''

    // --- Intent Dictionary (How-Tos & FAQs) ---
    const intents = [
      {
        keywords: ['dark mode', 'theme', 'color', 'background', 'night', 'light mode'],
        reply: '🌙 **To change the theme:**\nClick your profile picture in the sidebar (or bottom menu on mobile) to open Settings, then click the theme toggle!'
      },
      {
        keywords: ['photo', 'image', 'picture', 'file', 'upload', 'share', 'attachment'],
        reply: '📎 **To share photos and files:**\nJust click the paperclip icon next to the chat input box in any conversation.'
      },
      {
        keywords: ['name', 'profile', 'avatar', 'change', 'update'],
        reply: '👤 **To update your profile:**\nClick your profile picture in the sidebar to open Settings, then click "Edit Profile" to change your name or avatar.'
      },
      {
        keywords: ['group', 'new chat', 'create', 'start'],
        reply: '💬 **To start chatting:**\nClick the "New Chat" or "New Group" icon at the top of the chat list in the sidebar!'
      }
    ]

    if (payload.type !== 'text') {
      replyText = `That's a nice file, but I can only read text right now! Try clicking one of these:`
      quickReplies = ['Features', 'About EzChat', 'Help']
    } else {
      // 1. Check if the user is asking a "How-to" based on our keywords
      const matchedIntent = intents.find(intent => 
        intent.keywords.some(kw => userText.includes(kw))
      )

      if (matchedIntent) {
        replyText = matchedIntent.reply
        quickReplies = ['How-Tos', 'Features', 'Help']
      } 
      // 2. Fallback to basic button matching / general chatter
      else if (userText.includes('how-to') || userText.includes('how to')) {
        replyText = '🛠️ **I can help you with the following! Choose an option:**'
        quickReplies = ['Dark Mode', 'Share Photo', 'Edit Profile', 'New Chat']
      } else if (userText.includes('features')) {
        replyText = '✨ **Here is what you can do in EzChat:**\n\n- Send instant messages to friends\n- Create fun group chats\n- Share your favorite photos and files\n- React to messages with emojis\n- Switch between Light & Dark modes\n- Install it directly to your phone as an app!'
        quickReplies = ['How-Tos', 'About EzChat']
      } else if (userText.includes('about') || userText.includes('what is')) {
        replyText = 'EzChat is a fast, modern messaging app designed to keep you seamlessly connected with your friends and teams. It works beautifully on both your phone and computer!'
        quickReplies = ['Features', 'Privacy']
      } else if (userText.includes('privacy')) {
        replyText = '🔒 **Your Privacy is important:**\n\nYour messages are stored securely, and we never share your personal information. You can read our full Privacy Policy from the Settings menu anytime.'
        quickReplies = ['Features', 'How-Tos']
      } else if (userText.includes('help')) {
        replyText = 'To get started, try searching for people to chat with, or create a brand new group! You can also customize your profile picture and name from the Settings menu.'
        quickReplies = ['How-Tos', 'Features']
      } else if (userText.includes('hello') || userText.includes('hi ') || userText.trim() === 'hi') {
        const fname = auth.currentUser?.displayName?.split(' ')[0] || 'there'
        replyText = `Hello ${fname}! 👋 How can I help you today?`
        quickReplies = ['How-Tos', 'Features']
      } else {
        replyText = `I heard: "${payload.text}".\n\nI am still learning, but here are some things I can do:`
        quickReplies = ['How-Tos', 'Features', 'About EzChat']
      }
    }
      
    // Send bot reply
    await addDoc(collection(db, 'chats', chatId, 'messages'), {
      senderId: BOT_ID,
      type: 'text',
      text: replyText,
      quickReplies,
      createdAt: serverTimestamp(),
    })

    // Update chat last message and clear typing state
    await updateDoc(doc(db, 'chats', chatId), {
      lastMessage: replyText,
      lastMessageAt: serverTimestamp(),
      lastMessageSenderId: BOT_ID,
      [`unreadCount.${uid}`]: increment(1),
      [`typing.${BOT_ID}`]: deleteField()
    })
  }

  return {
    BOT_ID,
    ensureBot,
    sendBotWelcome,
    handleBotMessage
  }
}
