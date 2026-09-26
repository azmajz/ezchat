import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth'
import {
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore'
import { auth, db } from '~/plugins/firebase.client'

function getFirebaseAuth() {
  return auth
}

function getFirebaseDb() {
  return db
}

// Shared reactive state (module-level singletons)
const currentUser = shallowRef(null)
const currentUserDoc = ref(null)
const authLoading = ref(true)

let unsubscribeAuth = null
let unsubscribeDoc = null

async function upsertUserDoc(user) {
  const db = getFirebaseDb()
  const userRef = doc(db, 'users', user.uid)
  await setDoc(
    userRef,
    {
      uid: user.uid,
      displayName: user.displayName || user.email.split('@')[0],
      email: user.email,
      photoURL: user.photoURL || null,
      isOnline: true,
      status: 'online', // Default status
      bio: '',
      createdAt: user.metadata?.creationTime || new Date().toISOString(),
      provider: user.providerData?.[0]?.providerId || 'password',
      lastSeen: serverTimestamp(),
    },
    { merge: true }
  )
}

export function useAuth() {
  const auth = getFirebaseAuth()
  const db = getFirebaseDb()

  // Initialize listener once
  if (unsubscribeAuth === null) {
    unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        currentUser.value = user
        
        // Listen to the user's Firestore document for custom fields like status and bio
        if (unsubscribeDoc) unsubscribeDoc()
        unsubscribeDoc = onSnapshot(doc(db, 'users', user.uid), (snap) => {
          if (snap.exists()) {
            currentUserDoc.value = snap.data()
          }
        })
        
        // Only write Firestore doc once email is verified (or for OAuth users who are always verified)
        if (user.emailVerified || user.providerData?.[0]?.providerId !== 'password') {
          await upsertUserDoc(user)
        }
      } else {
        currentUser.value = null
        currentUserDoc.value = null
        if (unsubscribeDoc) {
          unsubscribeDoc()
          unsubscribeDoc = null
        }
      }
      authLoading.value = false
    })
  }

  async function registerWithEmail(email, password, displayName) {
    const auth = getFirebaseAuth()
    const credential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(credential.user, { displayName })
    // Send verification email before anything else
    await sendEmailVerification(credential.user)
    // Don't upsert Firestore doc yet — wait until email is verified
    currentUser.value = auth.currentUser
    return credential.user
  }

  async function sendVerificationEmail() {
    const auth = getFirebaseAuth()
    const user = auth.currentUser
    if (user && !user.emailVerified) {
      await sendEmailVerification(user)
    }
  }

  async function signInWithEmail(email, password) {
    const auth = getFirebaseAuth()
    const credential = await signInWithEmailAndPassword(auth, email, password)
    currentUser.value = credential.user
    return credential.user
  }

  async function signInWithGoogle() {
    const auth = getFirebaseAuth()
    const provider = new GoogleAuthProvider()
    const credential = await signInWithPopup(auth, provider)
    await upsertUserDoc(credential.user)
    currentUser.value = credential.user
    return credential.user
  }

  async function logout() {
    const auth = getFirebaseAuth()
    const db = getFirebaseDb()
    if (currentUser.value) {
      const userRef = doc(db, 'users', currentUser.value.uid)
      await updateDoc(userRef, {
        isOnline: false,
        status: 'offline',
        lastSeen: serverTimestamp(),
      }).catch(() => {})
    }
    await signOut(auth)
    currentUser.value = null
  }

  async function updateUserProfile(data) {
    const auth = getFirebaseAuth()
    const db = getFirebaseDb()
    const user = auth.currentUser
    if (!user) return
    if (data.displayName || data.photoURL) {
      await updateProfile(user, {
        displayName: data.displayName || user.displayName,
        photoURL: data.photoURL || user.photoURL,
      })
    }
    const userRef = doc(db, 'users', user.uid)
    await updateDoc(userRef, {
      ...data,
      lastSeen: serverTimestamp(),
    })
    
    // Force reactivity update since the user object mutated in-place
    triggerRef(currentUser)
  }

  async function updateStatus(status) {
    const auth = getFirebaseAuth()
    const db = getFirebaseDb()
    const user = auth.currentUser
    if (!user) return
    const userRef = doc(db, 'users', user.uid)
    await updateDoc(userRef, {
      status,
      isOnline: status !== 'offline',
      lastSeen: serverTimestamp(),
    })
  }

  return {
    currentUser: readonly(currentUser),
    currentUserDoc: readonly(currentUserDoc),
    authLoading: readonly(authLoading),
    registerWithEmail,
    signInWithEmail,
    signInWithGoogle,
    sendVerificationEmail,
    logout,
    updateUserProfile,
    updateStatus,
  }
}
