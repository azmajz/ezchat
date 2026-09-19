export default defineNuxtRouteMiddleware(async (to) => {
  const { currentUser, authLoading } = useAuth()

  // Wait for auth to resolve
  if (authLoading.value) {
    await new Promise((resolve) => {
      const stop = watch(authLoading, (loading) => {
        if (!loading) { stop(); resolve() }
      })
    })
  }

  if (!currentUser.value) {
    return navigateTo('/login')
  }
})
