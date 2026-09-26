import {
  getFirestore,
  collection,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  serverTimestamp,
  getDoc,
  getDocs,
  arrayUnion,
  arrayRemove,
  Timestamp,
  setDoc,
  deleteField,
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

let _db = null
function getDb() {
  if (!_db) _db = getFirestore()
  return _db
}

const chats = ref([])
const chatsLoading = ref(true)
let unsubChats = null

export function useChats() {
  const auth = getAuth()

  function subscribeChats(uid) {
    if (unsubChats) return
    const db = getDb()
    const q = query(
      collection(db, 'chats'),
      where('participants', 'array-contains', uid),
      orderBy('lastMessageAt', 'desc')
    )
    unsubChats = onSnapshot(q, (snap) => {
      chats.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      chatsLoading.value = false
    }, (err) => {
      console.error('subscribeChats error:', err)
      chatsLoading.value = false
    })
  }

  function unsubscribeChats() {
    if (unsubChats) { unsubChats(); unsubChats = null }
    chats.value = []
    chatsLoading.value = true
  }

  async function createDirectChat(otherUserId) {
    const db = getDb()
    const uid = auth.currentUser?.uid
    if (!uid) return null

    // Check if chat already exists
    const q = query(
      collection(db, 'chats'),
      where('type', '==', 'direct'),
      where('participants', 'array-contains', uid)
    )
    const snap = await getDocs(q)
    const existing = snap.docs.find((d) =>
      d.data().participants.includes(otherUserId)
    )
    if (existing) return existing.id

    // Get other user data
    const otherUserSnap = await getDoc(doc(db, 'users', otherUserId))
    const otherUser = otherUserSnap.data()

    const ref = await addDoc(collection(db, 'chats'), {
      type: 'direct',
      participants: [uid, otherUserId],
      createdBy: uid,
      createdAt: serverTimestamp(),
      lastMessage: null,
      lastMessageAt: Timestamp.now(),
      name: null,
      photoURL: null,
    })
    return ref.id
  }

  async function createGroupChat(name, photoURL, memberIds) {
    const db = getDb()
    const uid = auth.currentUser?.uid
    if (!uid) return null

    const allParticipants = [...new Set([uid, ...memberIds])]
    const ref = await addDoc(collection(db, 'chats'), {
      type: 'group',
      name,
      photoURL: photoURL || null,
      participants: allParticipants,
      admins: [uid],
      createdBy: uid,
      createdAt: serverTimestamp(),
      lastMessage: null,
      lastMessageAt: Timestamp.now(),
    })
    return ref.id
  }

  async function updateGroupChat(chatId, data) {
    const db = getDb()
    await updateDoc(doc(db, 'chats', chatId), data)
  }

  async function addMember(chatId, userId) {
    const db = getDb()
    await updateDoc(doc(db, 'chats', chatId), {
      participants: arrayUnion(userId),
    })
  }

  async function removeMember(chatId, userId) {
    const db = getDb()
    await updateDoc(doc(db, 'chats', chatId), {
      participants: arrayRemove(userId),
      admins: arrayRemove(userId),
    })
  }

  async function leaveGroup(chatId) {
    const db = getDb()
    const uid = auth.currentUser?.uid
    if (!uid) return
    await updateDoc(doc(db, 'chats', chatId), {
      participants: arrayRemove(uid),
      admins: arrayRemove(uid),
    })
  }

  async function getChatById(chatId) {
    const db = getDb()
    const snap = await getDoc(doc(db, 'chats', chatId))
    return snap.exists() ? { id: snap.id, ...snap.data() } : null
  }

  async function searchUsers(searchTerm) {
    const db = getDb()
    const uid = auth.currentUser?.uid
    const snap = await getDocs(collection(db, 'users'))
    const term = searchTerm.toLowerCase()
    return snap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .filter(
        (u) =>
          u.uid !== uid &&
          (u.displayName?.toLowerCase().includes(term) ||
            u.email?.toLowerCase().includes(term))
      )
  }



  async function setTypingState(chatId, isTyping) {
    const db = getDb()
    const uid = auth.currentUser?.uid
    if (!uid) return
    await updateDoc(doc(db, 'chats', chatId), {
      [`typing.${uid}`]: isTyping ? serverTimestamp() : deleteField()
    })
  }

  return {
    chats: readonly(chats),
    chatsLoading: readonly(chatsLoading),
    subscribeChats,
    unsubscribeChats,
    createDirectChat,
    createGroupChat,
    updateGroupChat,
    addMember,
    removeMember,
    leaveGroup,
    getChatById,
    searchUsers,
    setTypingState,
  }
}
