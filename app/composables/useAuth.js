import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore'

let _auth = null
let _db = null

function getFirebaseAuth() {
  if (!_auth) _auth = getAuth()
  return _auth
}

function getFirebaseDb() {
  if (!_db) _db = getFirestore()
  return _db
}

// Shared reactive state (module-level singletons)
const currentUser = ref(null)
const authLoading = ref(true)

let unsubscribeAuth = null

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
      lastSeen: serverTimestamp(),
    },
    { merge: true }
  )
}

export function useAuth() {
  const auth = getFirebaseAuth()

  // Initialize listener once
  if (unsubscribeAuth === null) {
    unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        currentUser.value = user
        await upsertUserDoc(user)
      } else {
        currentUser.value = null
      }
      authLoading.value = false
    })
  }

  async function registerWithEmail(email, password, displayName) {
    const auth = getFirebaseAuth()
    const credential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(credential.user, { displayName })
    await upsertUserDoc({ ...credential.user, displayName })
    currentUser.value = auth.currentUser
    return credential.user
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
    currentUser.value = auth.currentUser
  }

  return {
    currentUser: readonly(currentUser),
    authLoading: readonly(authLoading),
    registerWithEmail,
    signInWithEmail,
    signInWithGoogle,
    logout,
    updateUserProfile,
  }
}
