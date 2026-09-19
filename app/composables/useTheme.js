const theme = ref('light')

export function useTheme() {
  function applyTheme(value) {
    document.documentElement.classList.toggle('dark', value === 'dark')
  }

  function initTheme() {
    const saved = localStorage.getItem('ezchat-theme')
    const preferred = saved || 'light'
    theme.value = preferred
    applyTheme(preferred)
  }

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('ezchat-theme', theme.value)
    applyTheme(theme.value)
  }

  function setTheme(value) {
    theme.value = value
    localStorage.setItem('ezchat-theme', value)
    applyTheme(value)
  }

  return {
    theme: readonly(theme),
    initTheme,
    toggleTheme,
    setTheme,
  }
}
