import { doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '~/plugins/firebase.client'

/**
 * Manages user online/offline presence using browser lifecycle events.
 *
 * - visibilitychange: reliable, covers tab switch / minimize / navigation
 * - beforeunload: best-effort for tab/browser close (async writes may be cut short)
 *
 * Call this once from app.vue after the user is authenticated.
 */
export function usePresence() {
  const { currentUser } = useAuth()

  let cleanupCalled = false

  async function setOnlineStatus(isOnline) {
    const uid = currentUser.value?.uid
    if (!uid) return
    
    // If the user has explicitly set their status to offline, do not automatically mark them as online
    if (isOnline && currentUser.value?.status === 'offline') {
      return
    }

    try {
      const userRef = doc(db, 'users', uid)
      await updateDoc(userRef, {
        isOnline,
        lastSeen: serverTimestamp(),
      })
    } catch {
      // Silently ignore — user doc may not exist yet or user is already offline
    }
  }

  function handleVisibilityChange() {
    if (document.visibilityState === 'hidden') {
      setOnlineStatus(false)
    } else {
      setOnlineStatus(true)
    }
  }

  function handleBeforeUnload() {
    // Best-effort: fire and forget.
    // The Firebase SDK buffers writes locally so this completes in most cases.
    setOnlineStatus(false)
  }

  function startPresence() {
    cleanupCalled = false
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', handleBeforeUnload)
    // Mark online immediately when presence tracking starts
    setOnlineStatus(true)
  }

  function stopPresence() {
    if (cleanupCalled) return
    cleanupCalled = true
    document.removeEventListener('visibilitychange', handleVisibilityChange)
    window.removeEventListener('beforeunload', handleBeforeUnload)
    // Mark offline when we explicitly stop (e.g., on logout)
    setOnlineStatus(false)
  }

  return { startPresence, stopPresence }
}
