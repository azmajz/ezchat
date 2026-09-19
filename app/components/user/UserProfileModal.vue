<template>
  <AppModal :model-value="modelValue" title="Edit Profile" @update:model-value="$emit('update:modelValue', $event)">
    <div class="profile-modal">
      <!-- Avatar upload -->
      <div class="avatar-upload-wrap">
        <label class="avatar-upload-label" for="profile-avatar-input">
          <AppAvatar :src="previewUrl || currentUser?.photoURL" :name="currentUser?.displayName" size="xl" />
          <div class="avatar-upload-overlay">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
          </div>
          <input id="profile-avatar-input" type="file" accept="image/*" class="sr-only" @change="onAvatarSelect" />
        </label>
        <span class="avatar-hint">Click to change photo</span>
      </div>

      <!-- Name field -->
      <div class="form-group">
        <label class="form-label" for="profile-name">Display Name</label>
        <input
          id="profile-name"
          v-model="displayName"
          type="text"
          class="form-input"
          placeholder="Your name"
        />
      </div>

      <!-- Email (readonly) -->
      <div class="form-group">
        <label class="form-label">Email</label>
        <input :value="currentUser?.email" type="email" class="form-input" disabled />
      </div>

      <div v-if="error" class="form-error">{{ error }}</div>
    </div>

    <template #footer>
      <button class="btn btn-secondary" @click="$emit('update:modelValue', false)">Cancel</button>
      <button class="btn btn-primary" @click="saveProfile" :disabled="saving">
        <AppLoader v-if="saving" size="sm" color="white" />
        <span v-else>Save changes</span>
      </button>
      <button class="btn btn-danger" style="margin-right: auto; order: -1;" @click="confirmLogout">Logout</button>
    </template>
  </AppModal>
</template>

<script setup>
const props = defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue'])

const { currentUser, updateUserProfile, logout } = useAuth()
const { uploadAvatar } = useStorage()
const router = useRouter()
const { showToast } = useUI()

const displayName = ref(currentUser.value?.displayName || '')
const previewUrl = ref(null)
const avatarFile = ref(null)
const saving = ref(false)
const error = ref('')

watch(() => currentUser.value, (u) => {
  if (u) displayName.value = u.displayName || ''
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
    emit('update:modelValue', false)
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
.profile-modal { display: flex; flex-direction: column; gap: 1.25rem; }

.avatar-upload-wrap {
  display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
}

.avatar-upload-label {
  position: relative; cursor: pointer; border-radius: 50%;
  display: block;
}

.avatar-upload-overlay {
  position: absolute; inset: 0; border-radius: 50%;
  background: rgba(0,0,0,0); display: flex;
  align-items: center; justify-content: center;
  transition: background var(--transition-base);
}

.avatar-upload-label:hover .avatar-upload-overlay { background: rgba(0,0,0,0.45); }

.avatar-hint { font-size: var(--font-size-xs); color: var(--color-text-muted); }
</style>
