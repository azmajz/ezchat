<template>
  <div class="settings-page">
    <header class="settings-header">
      <NuxtLink to="/settings" class="btn-icon back-btn" aria-label="Back to settings">
        <Icon name="lucide:arrow-left" size="20" />
      </NuxtLink>
      <h2>Edit Profile</h2>
      <NuxtLink to="/settings" class="btn-icon close-btn" aria-label="Close profile">
        <Icon name="lucide:x" size="20" />
      </NuxtLink>
    </header>

    <div class="settings-content">
      <div class="profile-edit-container">
        <div class="avatar-section">
          <div class="avatar-upload-wrap">
            <label class="avatar-upload-label" for="profile-avatar-input" title="Change photo">
              <AppAvatar :src="previewUrl || currentUser?.photoURL" :name="currentUser?.displayName" size="xl" class="profile-avatar" />
              <div class="avatar-upload-overlay">
                <Icon name="lucide:camera" size="24" color="white" />
              </div>
              <input id="profile-avatar-input" type="file" accept="image/*" class="sr-only" @change="onAvatarSelect" />
            </label>
          </div>
          <h3 class="profile-name">{{ currentUser?.displayName || 'Your Name' }}</h3>
          <p class="profile-email">{{ currentUser?.email }}</p>
        </div>
        
        <div class="form-card">
          <div class="form-group">
            <label class="form-label" for="profile-name">Display Name</label>
            <div class="input-wrapper">
              <Icon name="lucide:user" size="18" class="input-icon" />
              <input
                id="profile-name"
                v-model="displayName"
                type="text"
                class="form-input with-icon"
                placeholder="Your name"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <div class="input-wrapper disabled-wrapper">
              <Icon name="lucide:mail" size="18" class="input-icon" />
              <input :value="currentUser?.email" type="email" class="form-input with-icon" disabled />
            </div>
            <p class="input-hint">Email address cannot be changed.</p>
          </div>
          
          <div v-if="error" class="form-error">
            <Icon name="lucide:alert-circle" size="16" /> {{ error }}
          </div>
          
          <div class="settings-actions">
            <button class="btn btn-primary btn-block btn-lg" @click="saveProfile" :disabled="saving">
              <AppLoader v-if="saving" size="sm" color="white" />
              <span v-else>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ middleware: 'auth', layout: 'default' })

const { currentUser, updateUserProfile } = useAuth()
const { uploadAvatar } = useStorage()
const { showToast } = useUI()
const router = useRouter()

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
    showToast('Profile updated successfully!', 'success')
    previewUrl.value = null
    avatarFile.value = null
    
    // Redirect back to settings after save
    setTimeout(() => {
      router.push('/settings')
    }, 1000)
  } catch {
    error.value = 'Failed to save. Please try again.'
  } finally {
    saving.value = false
  }
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
  height: var(--header-height, 60px);
  background: var(--color-surface-2);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 10;
  flex-shrink: 0;
}

.settings-header h2 {
  font-size: var(--font-size-base, 1rem);
  font-weight: 700;
  margin: 0;
  color: var(--color-text);
  flex: 1;
  text-align: center;
}

.back-btn {
  display: inline-flex;
  color: var(--color-text-secondary);
  width: 32px;
  justify-content: flex-start;
}

.close-btn {
  display: inline-flex;
  color: var(--color-text-secondary);
  width: 32px;
  justify-content: flex-end;
}

@media (max-width: 767px) {
  .close-btn { display: none; }
  .settings-header h2 { text-align: left; margin-left: 0.5rem; }
}

.settings-content {
  padding: 2rem 1.5rem 5.5rem;
  max-width: 560px;
  margin: 0 auto;
  width: 100%;
}

.profile-edit-container {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.avatar-upload-wrap {
  position: relative;
  margin-bottom: 1rem;
}

.avatar-upload-label {
  position: relative; 
  cursor: pointer; 
  border-radius: 50%; 
  display: block;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  transition: transform 0.2s ease;
}
.avatar-upload-label:hover {
  transform: scale(1.05);
}

.profile-avatar {
  border: 4px solid var(--color-surface);
}

.avatar-upload-overlay {
  position: absolute; inset: 0; border-radius: 50%;
  background: rgba(0,0,0,0.3); display: flex;
  align-items: center; justify-content: center;
  transition: opacity 0.2s ease;
  opacity: 0;
}
.avatar-upload-label:hover .avatar-upload-overlay { opacity: 1; }

.profile-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  color: var(--color-text);
}
.profile-email {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  margin: 0;
}

.form-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl, 1rem);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  margin-left: 0.25rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  color: var(--color-text-muted);
}

.form-input.with-icon {
  padding-left: 2.75rem;
  height: 3rem;
  width: 100%;
  border-radius: var(--radius-lg, 0.5rem);
  background: var(--color-surface-2);
  border: 1px solid transparent;
  transition: all 0.2s ease;
  color: var(--color-text);
}
.form-input.with-icon:focus {
  background: var(--color-surface);
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb, 79, 70, 229), 0.15);
  outline: none;
}

.disabled-wrapper {
  opacity: 0.7;
}

.input-hint {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  margin-left: 0.25rem;
  margin-top: 0.25rem;
}

.settings-actions {
  margin-top: 1rem;
}

.btn-lg {
  height: 3.25rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: var(--radius-lg, 0.5rem);
}

.btn-block {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
