// Toast system — self-contained, globally accessible
const toasts = ref([])
const showSearchModal = ref(false)
const showGroupCreateModal = ref(false)

export function useUI() {
  function showToast(message, type = 'info', duration = 3000) {
    const id = Date.now() + Math.random()
    toasts.value.push({ id, message, type })
    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id)
    }, duration)
  }

  return {
    toasts,
    showToast,
    showSearchModal,
    showGroupCreateModal
  }
}
