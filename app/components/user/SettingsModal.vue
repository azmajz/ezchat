<template>
  <AppModal
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    title="Settings"
    size="md"
    mobileFullscreen
  >
    <div class="settings-content">
      
      <!-- Profile Card (Link to Profile Modal) -->
      <button class="profile-link-card" @click="$emit('openProfile')">
        <AppAvatar :src="currentUser?.photoURL" :name="currentUser?.displayName" size="lg" class="profile-avatar" fallbackIcon="lucide:user" />
        <div class="profile-info">
          <h3>{{ currentUser?.displayName || 'Your Name' }}</h3>
          <p>{{ currentUser?.email }}</p>
          <span class="edit-text">Edit Profile</span>
        </div>
        <div class="profile-action">
          <Icon name="lucide:chevron-right" size="24" />
        </div>
      </button>

      <!-- Status Section -->
      <section v-if="false" class="settings-section">
        <div class="section-header">
          <h3 class="group-title">Your Status</h3>
        </div>
        <div class="status-grid">
          <button 
            v-for="opt in statusOptions" 
            :key="opt.value"
            class="status-option"
            :class="{ active: currentStatus === opt.value }"
            @click="setStatus(opt.value)"
          >
            <AppStatusIndicator :status="opt.value" size="md" />
            <div class="status-info">
              <span class="status-label">{{ opt.label }}</span>
            </div>
            <div class="status-check" v-if="currentStatus === opt.value">
              <Icon name="lucide:check" size="16" class="text-primary" />
            </div>
          </button>
        </div>
      </section>

      <!-- Preferences Section -->
      <section class="settings-section">
        <h3 class="group-title">Preferences</h3>
        <div class="settings-list">
          
          <div class="list-item">
            <div class="item-icon-wrap theme-icon">
              <Icon :name="theme === 'dark' ? 'lucide:moon' : 'lucide:sun'" size="18" />
            </div>
            <div class="item-content">
              <span class="item-title">Dark Mode</span>
              <span class="item-desc">Toggle application theme</span>
            </div>
            <div class="item-action">
              <label class="toggle-switch">
                <input type="checkbox" :checked="theme === 'dark'" @change="toggleTheme">
                <span class="slider"></span>
              </label>
            </div>
          </div>

          <div class="list-divider"></div>

          <div class="list-item">
            <div class="item-icon-wrap notif-icon">
              <Icon name="lucide:bell" size="18" />
            </div>
            <div class="item-content">
              <span class="item-title">Notifications</span>
              <span class="item-desc">Alerts for new messages</span>
            </div>
            <div class="item-action">
              <label class="toggle-switch">
                <input type="checkbox" :checked="notificationsEnabled" @change="e => toggleNotifications(e.target.checked)">
                <span class="slider"></span>
              </label>
            </div>
          </div>
          
        </div>
        <div v-if="permission === 'denied'" class="form-error mt-2 ml-2">
          Notification permissions are denied by your browser.
        </div>
      </section>

      <!-- More Section -->
      <section class="settings-section">
        <h3 class="group-title">More</h3>
        <div class="settings-list">
          <NuxtLink to="/privacy-policy" class="list-item clickable" @click="$emit('update:modelValue', false)">
            <div class="item-icon-wrap privacy-icon">
              <Icon name="lucide:shield" size="18" />
            </div>
            <div class="item-content">
              <span class="item-title">Privacy Policy</span>
            </div>
            <div class="item-action">
              <Icon name="lucide:chevron-right" size="20" class="text-muted" />
            </div>
          </NuxtLink>
          
          <div class="list-divider"></div>

          <button class="list-item clickable text-danger w-full" @click="confirmLogout">
            <div class="item-icon-wrap logout-icon">
              <Icon name="lucide:log-out" size="18" />
            </div>
            <div class="item-content">
              <span class="item-title text-danger">Sign Out</span>
            </div>
          </button>
        </div>
      </section>

      <div class="app-version">
        EzChat v1.0.0
      </div>

    </div>
  </AppModal>
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean
})
const emit = defineEmits(['update:modelValue', 'openProfile'])

const { currentUser, currentUserDoc, logout, updateStatus } = useAuth()
const router = useRouter()
const { theme, toggleTheme } = useTheme()
const { enabled: notificationsEnabled, permission, toggleNotifications } = useNotifications()
const { showToast } = useUI()

const statusOptions = [
  { value: 'online', label: 'Online' },
  { value: 'away', label: 'Away' },
  { value: 'busy', label: 'Busy' },
  { value: 'offline', label: 'Offline' },
]

const currentStatus = ref('online')

watch(() => currentUserDoc.value, (docData) => {
  if (docData) {
    currentStatus.value = docData.status || 'online'
  }
}, { immediate: true })

async function setStatus(val) {
  try {
    currentStatus.value = val
    await updateStatus(val)
    showToast('Status updated', 'success')
  } catch (err) {
    currentStatus.value = currentUserDoc.value?.status || 'online'
    showToast('Failed to update status', 'error')
  }
}

async function confirmLogout() {
  emit('update:modelValue', false)
  await logout()
  router.push('/login')
}
</script>

<style scoped>
.settings-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-bottom: 1rem;
}

.profile-link-card {
  display: flex;
  align-items: center;
  background: var(--color-navrail);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl, 1rem);
  padding: 1.25rem;
  gap: 1rem;
  box-shadow: var(--shadow-sm);
  text-decoration: none;
  transition: background 0.2s ease;
  width: 100%;
  cursor: pointer;
  text-align: left;
}

.profile-link-card:hover {
  background: var(--color-surface-3, var(--color-border-light));
}

.profile-avatar {
  border: none;
}

.profile-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.profile-info h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.profile-info p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--color-text-muted);
  word-break: break-all;
  white-space: normal;
}

.edit-text {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 0.25rem;
}

.profile-action {
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
}

/* Settings Sections */
.settings-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.group-title {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  font-weight: 600;
  padding-left: 1rem;
  margin: 0;
}

.settings-list {
  background: var(--color-navrail);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl, 1rem);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.list-item {
  display: flex;
  align-items: center;
  padding: 0.85rem 1.25rem;
  gap: 1rem;
  background: transparent;
  border: none;
  text-align: left;
  text-decoration: none;
  color: inherit;
  transition: background 0.2s ease;
}

.list-item.clickable {
  cursor: pointer;
  width: 100%;
}

.list-item.clickable:hover {
  background: var(--color-surface-hover, var(--color-surface-2));
}

.list-divider {
  height: 1px;
  background: var(--color-border);
  margin-left: 3.5rem;
}

/* Colored Icons */
.item-icon-wrap {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md, 0.5rem);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.theme-icon { 
  background: rgba(139, 92, 246, 0.15); 
  color: #8b5cf6; 
}
.notif-icon { 
  background: rgba(239, 68, 68, 0.15); 
  color: #ef4444; 
}
.privacy-icon { 
  background: rgba(59, 130, 246, 0.15); 
  color: #3b82f6; 
}
.logout-icon { 
  background: rgba(239, 68, 68, 0.15); 
  color: #ef4444; 
}

.item-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.item-title {
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text);
}
.item-desc {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  margin-top: 0.125rem;
}

.text-danger {
  color: #ef4444 !important;
}

/* Status Grid */
.status-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.status-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: var(--color-navrail);
  cursor: pointer;
  text-align: left;
  transition: background 0.2s ease;
}

.status-option:hover {
  background: var(--color-surface-3, var(--color-border-light));
}

.status-option.active {
  border-color: var(--color-primary);
  background: rgba(var(--color-primary-rgb), 0.05);
}

.status-info {
  flex: 1;
}

.status-label {
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--color-text);
}

.status-check {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Toggles */
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

.w-full { width: 100%; }
.mt-2 { margin-top: 0.5rem; }
.ml-2 { margin-left: 0.5rem; }
.form-error {
  color: #ef4444;
  font-size: 0.8rem;
}

.app-version {
  text-align: center;
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin-top: 0.5rem;
}
</style>
