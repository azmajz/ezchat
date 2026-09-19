<template>
  <div class="nav-rail">
    <!-- Top actions -->
    <div class="nav-rail-top">
      <div class="dropdown-container">
        <button class="nav-rail-profile" @click="showProfileMenu = !showProfileMenu" aria-label="Profile options">
          <AppAvatar :src="currentUser?.photoURL" :name="currentUser?.displayName || 'Me'" size="sm" :online="true" />
        </button>
        
        <div v-if="showProfileMenu" class="dropdown-overlay" @click="showProfileMenu = false"></div>
        <div v-if="showProfileMenu" class="dropdown-menu">
          <div class="dropdown-header">
            <span class="profile-name truncate">{{ currentUser?.displayName || 'My Profile' }}</span>
            <span class="profile-email truncate">{{ currentUser?.email }}</span>
          </div>
          <div class="dropdown-divider"></div>
          <NuxtLink to="/settings" class="dropdown-item" @click="showProfileMenu = false">
            <Icon name="lucide:settings" size="16" /> Settings
          </NuxtLink>
          <NuxtLink to="/settings" class="dropdown-item" @click="showProfileMenu = false">
            <Icon name="lucide:user" size="16" /> My Account
          </NuxtLink>
          <button class="dropdown-item" @click="() => { toggleTheme(); showProfileMenu = false; }">
            <Icon :name="theme === 'dark' ? 'lucide:sun' : 'lucide:moon'" size="16" />
            {{ theme === 'dark' ? 'Light Mode' : 'Dark Mode' }}
          </button>
          <div class="dropdown-divider"></div>
          <button class="dropdown-item text-danger" @click="handleLogout">
            <Icon name="lucide:log-out" size="16" /> Logout
          </button>
        </div>
      </div>
      
      <!-- Primary Nav Tabs -->
      <button class="nav-rail-item" :class="{ active: activeTab === 'chat' }" @click="setTab('chat')" title="Chat">
        <Icon name="lucide:message-square" size="24" />
        <span>Chat</span>
      </button>
      <button class="nav-rail-item" :class="{ active: activeTab === 'groups' }" @click="setTab('groups')" title="Groups">
        <Icon name="lucide:users" size="24" />
        <span>Groups</span>
      </button>
    </div>

    <!-- Bottom actions -->
    <div class="nav-rail-bottom">
      <button class="nav-rail-item" @click="toggleTheme" :title="theme === 'dark' ? 'Light Mode' : 'Dark Mode'">
        <Icon :name="theme === 'dark' ? 'lucide:sun' : 'lucide:moon'" size="24" />
        <span>Theme</span>
      </button>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const { currentUser, logout } = useAuth()
const { theme, toggleTheme } = useTheme()

const showProfileMenu = ref(false)
const activeTab = computed(() => route.query.filter === 'groups' ? 'groups' : 'chat')

function setTab(tab) {
  const query = { ...route.query }
  if (tab === 'groups') query.filter = 'groups'
  else delete query.filter
  router.push({ query })
}

async function handleLogout() {
  showProfileMenu.value = false
  await logout()
  router.push('/login')
}
</script>

<style scoped>
.nav-rail {
  width: var(--nav-rail-width);
  height: 100%;
  background: var(--color-surface-2); /* slightly different from sidebar to distinguish */
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0;
  z-index: 10;
}

.nav-rail-top, .nav-rail-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.nav-rail-profile {
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  border-radius: var(--radius-full);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  margin-bottom: 1rem;
}
.nav-rail-profile:hover {
  transform: scale(1.05);
}

.nav-rail-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  width: 100%;
  padding: 0.5rem 0;
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: color var(--transition-fast);
  position: relative;
}

.nav-rail-item span {
  font-size: 10px;
  font-weight: 500;
}

.nav-rail-item:hover {
  color: var(--color-primary);
}

.nav-rail-item.active {
  color: var(--color-primary);
}

.nav-rail-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10%;
  bottom: 10%;
  width: 3px;
  background: var(--color-primary);
  border-radius: 0 4px 4px 0;
}

/* Dropdown */
.dropdown-container {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
}
.dropdown-overlay {
  position: fixed;
  inset: 0;
  z-index: 40;
}
.dropdown-menu {
  position: absolute;
  top: 0;
  left: calc(100% + 0.5rem);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  min-width: 220px;
  z-index: 50;
  display: flex;
  flex-direction: column;
}
.dropdown-header {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.profile-name {
  font-weight: 600;
  color: var(--color-text);
  font-size: var(--font-size-sm);
}
.profile-email {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}
.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: left;
  background: none;
  border: none;
  font-size: var(--font-size-sm);
  color: var(--color-text);
  cursor: pointer;
  text-decoration: none;
  transition: background var(--transition-fast);
}
.dropdown-item:hover {
  background: var(--color-surface-3);
}
.dropdown-divider {
  height: 1px;
  background: var(--color-border);
  margin: 0.25rem 0;
}
.text-danger {
  color: var(--color-danger, #ef4444);
}
</style>
