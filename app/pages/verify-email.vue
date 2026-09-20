<template>
  <div class="verify-layout">
    <!-- Ambient background blobs -->
    <div class="verify-bg">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
    </div>

    <div class="verify-card animate-scale-in">
      <!-- Brand -->
      <div class="verify-brand">
        <AppLogo size="48" />
        <span class="brand-name">EzChat</span>
      </div>

      <!-- Floating mail icon -->
      <div class="verify-icon-wrap">
        <div class="verify-icon-ring">
          <svg class="verify-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="14" fill="url(#iconGrad)"/>
            <path d="M10 16a2 2 0 0 1 2-2h24a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V16z" stroke="white" stroke-width="2" fill="none"/>
            <path d="M10 16l14 10 14-10" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <defs>
              <linearGradient id="iconGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                <stop stop-color="#6366f1"/>
                <stop offset="1" stop-color="#4338ca"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <!-- Heading -->
      <div class="verify-text">
        <h1 class="verify-title">Check your inbox</h1>
        <p class="verify-subtitle">We sent a verification link to</p>
        <span class="verify-email">{{ userEmail }}</span>
        <p class="verify-hint">
          Click the link in the email to activate your account.
          Once verified, you'll be redirected automatically.
        </p>
      </div>

      <!-- Live status indicator -->
      <div class="verify-status" :class="statusClass">
        <div class="status-dot" :class="statusDotClass"></div>
        <span>{{ statusText }}</span>
      </div>

      <!-- Error -->
      <div v-if="error" class="verify-error">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        {{ error }}
      </div>

      <!-- Resend button -->
      <button
        class="btn-resend"
        :disabled="resendCooldown > 0 || resending"
        @click="handleResend"
      >
        <AppLoader v-if="resending" size="sm" color="primary" />
        <template v-else>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
          </svg>
          {{ resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend verification email' }}
        </template>
      </button>

      <div class="verify-divider"></div>

      <!-- Footer -->
      <div class="verify-footer">
        <p class="verify-footer-text">Wrong email address?</p>
        <button class="btn-link" @click="handleLogout">Sign out &amp; start over</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getAuth } from 'firebase/auth'

definePageMeta({ layout:false })

const { currentUser, sendVerificationEmail, logout } = useAuth()
const router = useRouter()

const userEmail = computed(() => currentUser.value?.email ?? '')
const resendCooldown = ref(0)
const resending = ref(false)
const error = ref('')
const verified = ref(false)

const statusText = computed(() =>
  verified.value ? 'Email verified! Redirecting…' : 'Waiting for you to click the link…'
)
const statusClass = computed(() => verified.value ? 'status-verified' : 'status-waiting')
const statusDotClass = computed(() => verified.value ? 'dot-success' : 'dot-pulse')

let pollInterval = null

onMounted(() => {
  if (!currentUser.value) {
    router.push('/login')
    return
  }
  if (currentUser.value.emailVerified) {
    verified.value = true
    router.push('/chat')
    return
  }

  // Poll Firebase every 3 seconds for fresh emailVerified status
  pollInterval = setInterval(async () => {
    try {
      const freshUser = getAuth().currentUser
      if (freshUser) {
        await freshUser.reload()
        if (getAuth().currentUser?.emailVerified) {
          clearInterval(pollInterval)
          verified.value = true
          setTimeout(() => router.push('/chat'), 1200)
        }
      }
    } catch (_) {}
  }, 3000)
})

onUnmounted(() => {
  if (pollInterval) clearInterval(pollInterval)
})

function startCooldown(seconds = 60) {
  resendCooldown.value = seconds
  const t = setInterval(() => {
    resendCooldown.value--
    if (resendCooldown.value <= 0) clearInterval(t)
  }, 1000)
}

async function handleResend() {
  error.value = ''
  resending.value = true
  try {
    await sendVerificationEmail()
    startCooldown(60)
  } catch (e) {
    if (e.code === 'auth/too-many-requests') {
      error.value = 'Too many requests. Please wait before trying again.'
    } else {
      error.value = 'Failed to resend. Please try again.'
    }
  } finally {
    resending.value = false
  }
}

async function handleLogout() {
  await logout()
  router.push('/login')
}
</script>

<style scoped>
.verify-layout {
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface-2);
  position: relative;
  overflow: hidden;
  padding: 1.5rem;
}

.verify-bg { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(130px);
  opacity: 0.13;
}
html.dark .blob { opacity: 0.1; filter: blur(170px); }
.blob-1 { width: 500px; height: 500px; background: var(--color-primary); top: -220px; left: -160px; }
.blob-2 { width: 380px; height: 380px; background: #8b5cf6; bottom: -140px; right: -100px; }
.blob-3 { width: 280px; height: 280px; background: #06b6d4; top: 50%; left: 50%; transform: translate(-50%, -50%); }

.verify-card {
  background: var(--color-surface-2);
  border-radius: var(--radius-xl);
  padding: 2.5rem;
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  box-shadow:
    0 4px 6px rgba(0,0,0,0.01),
    0 10px 30px rgba(60,60,120,0.05),
    0 0 0 1px var(--color-border);
  position: relative;
  z-index: 1;
}
html.dark .verify-card {
  box-shadow:
    0 4px 6px rgba(0,0,0,0.2),
    0 10px 30px rgba(0,0,0,0.4),
    0 0 0 1px var(--color-border);
}

.verify-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: -0.25rem;
}
.brand-name {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.verify-icon-wrap { margin: 0.25rem 0; }
.verify-icon-ring {
  width: 80px;
  height: 80px;
  border-radius: 24px;
  background: var(--color-primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float 3s ease-in-out infinite;
}
.verify-icon { width: 48px; height: 48px; }
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

.verify-text {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
}
.verify-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
}
.verify-subtitle {
  color: var(--color-text-muted);
  font-size: 0.875rem;
  margin: 0;
}
.verify-email {
  font-weight: 600;
  color: var(--color-primary);
  font-size: 0.9rem;
  background: var(--color-primary-light);
  padding: 0.2rem 0.75rem;
  border-radius: 999px;
  display: inline-block;
}
.verify-hint {
  color: var(--color-text-muted);
  font-size: 0.8rem;
  max-width: 320px;
  line-height: 1.55;
  margin: 0.25rem 0 0;
}

.verify-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.45rem 1rem;
  border-radius: 999px;
  transition: all 0.4s;
}
.status-waiting {
  background: var(--color-surface-3);
  color: var(--color-text-secondary);
}
.status-verified {
  background: rgba(16, 185, 129, 0.12);
  color: #059669;
}
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.dot-pulse {
  background: var(--color-primary);
  animation: pulse-dot 1.5s ease-in-out infinite;
}
.dot-success { background: #10b981; }
@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.75); }
}

.verify-error {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: var(--color-error);
  background: rgba(239, 68, 68, 0.08);
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  width: 100%;
}

.btn-resend {
  width: 100%;
  padding: 0.7rem 1.25rem;
  border-radius: 10px;
  border: 1.5px solid var(--color-border);
  background: var(--color-surface-2);
  color: var(--color-primary);
  font-size: 0.875rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background 0.2s, border-color 0.2s;
}
.btn-resend:hover:not(:disabled) {
  background: var(--color-primary-light);
  border-color: var(--color-primary);
}
.btn-resend:disabled { opacity: 0.55; cursor: not-allowed; }

.verify-divider {
  width: 100%;
  height: 1px;
  background: var(--color-border);
}

.verify-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}
.verify-footer-text {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  margin: 0;
}
.btn-link {
  background: none;
  border: none;
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-primary);
  cursor: pointer;
  padding: 0;
}
.btn-link:hover { text-decoration: underline; }
</style>
