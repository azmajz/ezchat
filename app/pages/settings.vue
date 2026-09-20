<template>
  <div class="settings-page">
    <header class="settings-header">
      <!-- Mobile: back arrow -->
      <NuxtLink to="/chat" class="btn-icon back-btn" aria-label="Back to chat list">
        <Icon name="lucide:arrow-left" size="20" />
      </NuxtLink>
      <h2>Settings</h2>
      <!-- Desktop: close button -->
      <NuxtLink to="/chat" class="btn-icon close-btn" aria-label="Close settings">
        <Icon name="lucide:x" size="20" />
      </NuxtLink>
    </header>

    <div class="settings-content">
      <!-- Profile Section -->
      <section class="settings-section">
        <h3>Profile</h3>
        <div class="settings-card">
          <div class="profile-row">
            <div class="avatar-upload-wrap">
              <label class="avatar-upload-label" for="settings-avatar-input" title="Change photo">
                <AppAvatar :src="previewUrl || currentUser?.photoURL" :name="currentUser?.displayName" size="xl" />
                <div class="avatar-upload-overlay">
                  <Icon name="lucide:camera" size="24" color="white" />
                </div>
                <input id="settings-avatar-input" type="file" accept="image/*" class="sr-only" @change="onAvatarSelect" />
              </label>
            </div>
            
            <div class="profile-fields">
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
                <label class="form-label">Email Address</label>
                <input :value="currentUser?.email" type="email" class="form-input" disabled />
              </div>
            </div>
          </div>
          
          <div v-if="error" class="form-error">
            <Icon name="lucide:alert-circle" size="16" /> {{ error }}
          </div>
          
          <div class="settings-actions">
            <button class="btn btn-primary" @click="saveProfile" :disabled="saving">
              <AppLoader v-if="saving" size="sm" color="white" />
              <span v-else>Save Changes</span>
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
              <Icon :name="theme === 'dark' ? 'lucide:sun' : 'lucide:moon'" size="16" style="margin-right:0.5rem" />
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
              <span class="setting-title">Notifications</span>
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
        <div class="settings-card danger-zone">
          <div class="setting-item">
            <div class="setting-info">
              <span class="setting-title text-danger">Sign Out</span>
              <span class="setting-desc">Log out of your EzChat account on this device.</span>
            </div>
            <button class="btn btn-danger-outline" @click="confirmLogout">Log out</button>
          </div>
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
  min-height: 0;
  overflow-y: auto;
  background: var(--color-surface-2);
}

@media (max-width: 767px) {
  .settings-page {
    height: 100dvh;
  }
}

.settings-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 1rem;
  height: var(--header-height);
  background: var(--color-surface-2);
  border-bottom: 1px solid var(--color-border);
  box-shadow: 0 1px 0 var(--color-border), 0 2px 8px rgba(60, 60, 120, 0.04);
  position: sticky;
  top: 0;
  z-index: 10;
  flex-shrink: 0;
}

.settings-header h2 {
  font-size: var(--font-size-base);
  font-weight: 700;
  margin: 0;
  color: var(--color-text);
  flex: 1;
}

/* Mobile: show back arrow, hide close button */
.back-btn {
  display: none;
  color: var(--color-text-secondary);
}
.close-btn {
  display: inline-flex;
  color: var(--color-text-secondary);
  margin-left: auto;
}

@media (max-width: 767px) {
  .back-btn { display: inline-flex; }
  .close-btn { display: none; }
}

.settings-content {
  padding: 2rem 1.5rem 4rem;
  max-width: 680px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.settings-section h3 {
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  margin-bottom: 0.75rem;
  font-weight: 600;
  padding-left: 0.5rem;
}

.settings-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-shadow: var(--shadow-sm);
}

.profile-row {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}
@media (max-width: 600px) {
  .profile-row { flex-direction: column; align-items: center; gap: 1.5rem; }
  .profile-fields { width: 100%; }
}

.profile-fields {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.avatar-upload-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
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

.avatar-upload-label:hover .avatar-upload-overlay { background: rgba(0,0,0,0.5); }

.settings-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border-light);
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
  font-weight: 600;
  font-size: var(--font-size-base);
  color: var(--color-text);
}

.setting-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.danger-zone {
  border-color: rgba(239, 68, 68, 0.3);
}

.text-danger {
  color: var(--color-error);
}

.btn-danger-outline {
  background: transparent;
  border: 1px solid var(--color-error);
  color: var(--color-error);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-danger-outline:hover {
  background: var(--color-error);
  color: white;
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
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

input:checked + .slider {
  background-color: var(--color-primary);
}

input:checked + .slider:before {
  transform: translateX(20px);
}

.mt-2 { margin-top: 0.5rem; }
</style>
