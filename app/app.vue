<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const { initTheme } = useTheme()
const { currentUser } = useAuth()
const { startPresence, stopPresence } = usePresence()

onMounted(() => {
  initTheme()
  
  // Disable right-click in the overall app
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault()
  })
})

// Start presence when user is authenticated, stop when they log out
watch(
  currentUser,
  (user, prevUser) => {
    if (user) {
      startPresence()
    } else if (prevUser) {
      // prevUser existed means this is a logout — stopPresence already sets isOnline: false
      stopPresence()
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  stopPresence()
})
</script>

<style>
html, body, #__nuxt {
  height: 100dvh;
  overflow: hidden;
}
</style>
