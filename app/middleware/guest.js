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
    const user = currentUser.value
    const isEmailProvider = user.providerData?.[0]?.providerId === 'password'
    // Unverified email users should land on verify-email, not chat
    if (isEmailProvider && !user.emailVerified) {
      return navigateTo('/verify-email')
    }
    return navigateTo('/chat')
  }
})

