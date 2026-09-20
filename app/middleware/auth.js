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

  // Block email/password users who haven't verified their email yet
  const user = currentUser.value
  const isEmailProvider = user.providerData?.[0]?.providerId === 'password'
  if (isEmailProvider && !user.emailVerified && to.path !== '/verify-email') {
    return navigateTo('/verify-email')
  }
})

