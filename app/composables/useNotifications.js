const isSupported = ref(false)
const permission = ref('default')
const enabled = ref(false)
let initialized = false

export function useNotifications() {
  if (!initialized && typeof window !== 'undefined' && 'Notification' in window) {
    isSupported.value = true
    permission.value = Notification.permission
    enabled.value = localStorage.getItem('ezchat_notifications_enabled') === 'true'
    initialized = true
  }

  async function requestPermission() {
    if (!isSupported.value) return false
    
    try {
      const result = await Notification.requestPermission()
      permission.value = result
      if (result === 'granted') {
        enabled.value = true
        localStorage.setItem('ezchat_notifications_enabled', 'true')
        return true
      } else {
        enabled.value = false
        localStorage.setItem('ezchat_notifications_enabled', 'false')
        return false
      }
    } catch (err) {
      console.error('Failed to request notification permission:', err)
      return false
    }
  }

  function toggleNotifications(val) {
    if (val && permission.value !== 'granted') {
      requestPermission()
    } else {
      enabled.value = !!val
      localStorage.setItem('ezchat_notifications_enabled', val ? 'true' : 'false')
    }
  }

  function notify(title, options = {}) {
    if (!isSupported.value || permission.value !== 'granted' || !enabled.value) return
    
    // Don't notify if the document is focused
    if (document.hasFocus()) return

    try {
      const notification = new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...options
      })

      notification.onclick = function() {
        window.focus()
        notification.close()
      }
    } catch (err) {
      console.error('Notification failed:', err)
    }
  }

  return {
    isSupported,
    permission,
    enabled,
    requestPermission,
    toggleNotifications,
    notify
  }
}
