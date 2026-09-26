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
      <button class="profile-card" @click="$emit('openProfile')">
        <AppAvatar :src="currentUser?.photoURL" :name="currentUser?.displayName" size="lg" />
        <div class="profile-info">
          <h3>{{ currentUser?.displayName || 'User' }}</h3>
          <p>{{ currentUser?.email }}</p>
        </div>
        <div class="profile-action">
          <Icon name="lucide:chevron-right" size="20" />
        </div>
      </button>

      <div class="settings-group">
        <h3 class="group-title">Preferences</h3>
        <div class="settings-list">
          
          <div class="list-item">
            <div class="item-icon-wrap theme-icon">
              <Icon name="lucide:palette" size="18" />
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
      </div>

      <div class="settings-group">
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
              <Icon name="lucide:chevron-right" size="18" class="text-muted" />
            </div>
          </NuxtLink>
        </div>
      </div>

      <div class="settings-group">
        <div class="settings-list">
          <button class="list-item clickable text-danger w-full" @click="confirmLogout">
            <div class="item-icon-wrap logout-icon">
              <Icon name="lucide:log-out" size="18" />
            </div>
            <div class="item-content">
              <span class="item-title text-danger">Sign Out</span>
            </div>
          </button>
        </div>
      </div>

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

const { currentUser, logout } = useAuth()
const router = useRouter()
const { theme, toggleTheme } = useTheme()
const { enabled: notificationsEnabled, permission, toggleNotifications } = useNotifications()

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
}

/* Profile Card */
.profile-card {
  display: flex;
  align-items: center;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl, 1rem);
  padding: 1.25rem;
  gap: 1rem;
  box-shadow: var(--shadow-sm);
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  width: 100%;
  cursor: pointer;
  text-align: left;
}
.profile-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  background: var(--color-surface-hover, var(--color-surface));
}

.profile-info {
  flex: 1;
  min-width: 0;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.profile-action {
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
}

/* Settings Groups */
.settings-group {
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
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl, 1rem);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.list-item {
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
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

.item-icon-wrap {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md, 0.5rem);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}
.theme-icon { background: #8b5cf6; }
.notif-icon { background: #ef4444; }
.privacy-icon { background: #3b82f6; }
.logout-icon { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

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

.item-action {
  display: flex;
  align-items: center;
}
.text-muted {
  color: var(--color-text-muted);
}

.w-full {
  width: 100%;
}

.app-version {
  text-align: center;
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin-top: 0.5rem;
}

/* Toggle Switch Styles */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 46px;
  height: 26px;
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
  border-radius: 26px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
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
.ml-2 { margin-left: 0.5rem; }
</style>
