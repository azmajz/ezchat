<template>
  <div class="auth-form">
    <div class="auth-form-header">
      <h1 class="auth-title">Create account</h1>
      <p class="auth-subtitle">Join EzChat — it's free</p>
    </div>

    <form @submit.prevent="handleRegister" class="auth-fields">
      <div class="form-group">
        <label class="form-label" for="reg-name">Display Name</label>
        <input
          id="reg-name"
          v-model="displayName"
          type="text"
          class="form-input"
          placeholder="Your name"
          autocomplete="name"
          required
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="reg-email">Email</label>
        <input
          id="reg-email"
          v-model="email"
          type="email"
          class="form-input"
          placeholder="you@example.com"
          autocomplete="email"
          required
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="reg-password">Password</label>
        <div class="input-password-wrap">
          <input
            id="reg-password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            class="form-input"
            placeholder="At least 6 characters"
            autocomplete="new-password"
            minlength="6"
            required
          />
          <button type="button" class="btn-icon password-toggle" @click="showPassword = !showPassword">
            <svg v-if="!showPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
          </button>
        </div>
      </div>

      <div v-if="error" class="form-error">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        {{ error }}
      </div>

      <button type="submit" class="btn btn-primary w-full" :disabled="emailLoading || googleLoading">
        <AppLoader v-if="emailLoading" size="sm" color="white" />
        <span v-else>Create account</span>
      </button>
    </form>

    <div class="divider">or</div>

    <button class="btn btn-google w-full" @click="handleGoogle" :disabled="emailLoading || googleLoading">
      <AppLoader v-if="googleLoading" size="sm" style="margin-right: 8px; color: var(--color-text-muted)" />
      <svg v-else width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
      Sign up with Google
    </button>

    <p class="auth-switch">
      Already have an account?
      <NuxtLink to="/login" class="auth-link">Sign in</NuxtLink>
    </p>
  </div>
</template>

<script setup>
const { registerWithEmail, signInWithGoogle } = useAuth()
const router = useRouter()

const displayName = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const emailLoading = ref(false)
const googleLoading = ref(false)
const error = ref('')

async function handleRegister() {
  error.value = ''
  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters.'
    return
  }
  emailLoading.value = true
  try {
    await registerWithEmail(email.value, password.value, displayName.value)
    await router.push('/verify-email')
  } catch (e) {
    error.value = getFriendlyError(e.code)
    emailLoading.value = false
  }
}

async function handleGoogle() {
  error.value = ''
  googleLoading.value = true
  try {
    await signInWithGoogle()
    await router.push('/chat')
  } catch (e) {
    if (e.code !== 'auth/popup-closed-by-user') {
      error.value = getFriendlyError(e.code)
    }
    googleLoading.value = false
  }
}

function getFriendlyError(code) {
  const map = {
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/invalid-email': 'Invalid email address.',
    'auth/weak-password': 'Password must be at least 6 characters.',
  }
  return map[code] || 'Something went wrong. Please try again.'
}
</script>

<style scoped>
.auth-form { display: flex; flex-direction: column; gap: 1.25rem; }
.auth-form-header { text-align: center; margin-bottom: 0.25rem; }
.auth-title { font-size: var(--font-size-2xl); font-weight: 700; color: var(--color-text); }
.auth-subtitle { color: var(--color-text-muted); font-size: var(--font-size-sm); margin-top: 0.25rem; }
.auth-fields { display: flex; flex-direction: column; gap: 1rem; }
.auth-switch { text-align: center; font-size: var(--font-size-sm); color: var(--color-text-muted); }
.auth-link { color: var(--color-primary); font-weight: 500; }
.auth-link:hover { text-decoration: underline; }
.input-password-wrap { position: relative; }
.input-password-wrap .form-input { padding-right: 3rem; }
.password-toggle {
  position: absolute; right: 0.75rem; top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
}
</style>
