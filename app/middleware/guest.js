export default defineNuxtRouteMiddleware(async () => {
  const { currentUser, authLoading } = useAuth()

  if (authLoading.value) {
    await new Promise((resolve) => {
      const stop = watch(authLoading, (loading) => {
        if (!loading) { stop(); resolve() }
      })
    })
  }

  if (currentUser.value) {
    return navigateTo('/chat')
  }
})
