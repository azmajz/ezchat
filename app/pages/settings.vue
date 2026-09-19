<template>
  <div class="settings-page">
    <header class="settings-header">
      <NuxtLink to="/chat" class="btn-icon back-btn" aria-label="Back to chat list">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
      </NuxtLink>
      <h2>Settings</h2>
    </header>

    <div class="settings-content">
      <!-- Profile Section -->
      <section class="settings-section">
        <h3>Profile</h3>
        <div class="settings-card">
          <div class="avatar-upload-wrap">
            <label class="avatar-upload-label" for="settings-avatar-input">
              <AppAvatar :src="previewUrl || currentUser?.photoURL" :name="currentUser?.displayName" size="xl" />
              <div class="avatar-upload-overlay">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
              </div>
              <input id="settings-avatar-input" type="file" accept="image/*" class="sr-only" @change="onAvatarSelect" />
            </label>
            <span class="avatar-hint">Click to change photo</span>
          </div>

          <div class="form-group">
            <label class="form-label" for="settings-name">Display Name</label>
            <input
              id="settings-name"
              v-model="displayName"
              type="text"
              class="form-input"
              placeholder="Your name"
            />
          </div>

          <div class="form-group">
            <label class="form-label">Email</label>
            <input :value="currentUser?.email" type="email" class="form-input" disabled />
          </div>
          
          <div v-if="error" class="form-error">{{ error }}</div>
          
          <div class="settings-actions">
            <button class="btn btn-primary" @click="saveProfile" :disabled="saving">
              <AppLoader v-if="saving" size="sm" color="white" />
              <span v-else>Save Profile</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Appearance Section -->
      <section class="settings-section">
        <h3>Appearance</h3>
        <div class="settings-card">
          <div class="setting-item">
            <div class="setting-info">
              <span class="setting-title">Theme</span>
              <span class="setting-desc">Switch between light and dark mode</span>
            </div>
            <button class="btn btn-secondary" @click="toggleTheme">
              {{ theme === 'dark' ? 'Light Mode' : 'Dark Mode' }}
            </button>
          </div>
        </div>
      </section>

      <!-- Notifications Section -->
      <section class="settings-section">
        <h3>Notifications</h3>
        <div class="settings-card">
          <div class="setting-item">
            <div class="setting-info">
              <span class="setting-title">Desktop Notifications</span>
              <span class="setting-desc">Get notified when you receive new messages</span>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" :checked="notificationsEnabled" @change="e => toggleNotifications(e.target.checked)">
              <span class="slider"></span>
            </label>
          </div>
          <div v-if="permission === 'denied'" class="form-error mt-2">
            Notification permissions are denied by your browser. Please update your browser settings.
          </div>
        </div>
      </section>

      <!-- Account Section -->
      <section class="settings-section">
        <h3>Account</h3>
        <div class="settings-card">
          <button class="btn btn-danger w-full" @click="confirmLogout">Logout</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ middleware: 'auth', layout: 'default' })

const { currentUser, updateUserProfile, logout } = useAuth()
const { uploadAvatar } = useStorage()
const router = useRouter()
const { showToast } = useUI()
const { theme, toggleTheme } = useTheme()
const { enabled: notificationsEnabled, permission, toggleNotifications } = useNotifications()

const displayName = ref(currentUser.value?.displayName || '')
const previewUrl = ref(null)
const avatarFile = ref(null)
const saving = ref(false)
const error = ref('')

watch(() => currentUser.value, (u) => {
  if (u && !saving.value) displayName.value = u.displayName || ''
}, { immediate: true })

function onAvatarSelect(e) {
  const file = e.target.files?.[0]
  if (!file) return
  avatarFile.value = file
  previewUrl.value = URL.createObjectURL(file)
}

async function saveProfile() {
  if (!displayName.value.trim()) { error.value = 'Name cannot be empty.'; return }
  error.value = ''
  saving.value = true
  try {
    let photoURL = currentUser.value?.photoURL
    if (avatarFile.value) {
      photoURL = await uploadAvatar(currentUser.value.uid, avatarFile.value)
    }
    await updateUserProfile({ displayName: displayName.value.trim(), photoURL })
    showToast('Profile updated!', 'success')
    previewUrl.value = null
    avatarFile.value = null
  } catch {
    error.value = 'Failed to save. Please try again.'
  } finally {
    saving.value = false
  }
}

async function confirmLogout() {
  await logout()
  router.push('/login')
}
</script>

<style scoped>
.settings-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  background: var(--color-surface-2);
}

.settings-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 10;
}

.settings-header h2 {
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin: 0;
}

.back-btn {
  display: none;
  color: var(--color-text-secondary);
}

@media (max-width: 767px) {
  .back-btn { display: inline-flex; }
}

.settings-content {
  padding: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.settings-section h3 {
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.settings-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.avatar-upload-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.avatar-upload-label {
  position: relative; cursor: pointer; border-radius: 50%; display: block;
}

.avatar-upload-overlay {
  position: absolute; inset: 0; border-radius: 50%;
  background: rgba(0,0,0,0); display: flex;
  align-items: center; justify-content: center;
  transition: background var(--transition-base);
}

.avatar-upload-label:hover .avatar-upload-overlay { background: rgba(0,0,0,0.45); }

.avatar-hint { font-size: var(--font-size-xs); color: var(--color-text-muted); }

.settings-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.setting-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.setting-title {
  font-weight: 500;
  font-size: var(--font-size-base);
}

.setting-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

/* Toggle Switch Styles */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  flex-shrink: 0;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: var(--color-border);
  transition: .3s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .3s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--color-primary);
}

input:checked + .slider:before {
  transform: translateX(20px);
}

.mt-2 { margin-top: 0.5rem; }
.w-full { width: 100%; justify-content: center; }
</style>
