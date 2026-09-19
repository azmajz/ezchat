import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBE85D5GKG20xytpbycebOsGhs04u0tVc0',
  authDomain: 'ezchat-71505.firebaseapp.com',
  projectId: 'ezchat-71505',
  storageBucket: 'ezchat-71505.appspot.com',
  messagingSenderId: '1011686389857',
  appId: '1:1011686389857:web:b545b7fbdf7fe2dde39220',
  measurementId: 'G-3EHX09LKLL',
}

// Avoid re-initializing on hot reload
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default defineNuxtPlugin(() => {
  return {
    provide: {
      firebase: { auth, db, storage },
    },
  }
})
