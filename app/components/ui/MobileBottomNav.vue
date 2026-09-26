<template>
  <div class="sidebar-mobile-bar">
    <button class="mobile-bar-btn" :class="{ active: activeTab === 'chat' && !showSettingsModal }" @click="setTab('chat')">
      <Icon name="lucide:message-square" size="20" />
      <span>Chats</span>
    </button>
    <button class="mobile-bar-btn" :class="{ active: activeTab === 'groups' && !showSettingsModal }" @click="setTab('groups')">
      <Icon name="lucide:users" size="20" />
      <span>Groups</span>
    </button>
    <button class="mobile-bar-btn" :class="{ active: showSettingsModal }" @click="showSettingsModal = true">
      <Icon name="lucide:settings" size="20" />
      <span>Settings</span>
    </button>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const { showSettingsModal } = useUI()

const activeTab = computed(() => route.query.filter === 'groups' ? 'groups' : 'chat')

function setTab(tab) {
  const query = { ...route.query }
  if (tab === 'groups') query.filter = 'groups'
  else delete query.filter
  
  router.push({ query })
}
</script>

<style scoped>
.sidebar-mobile-bar {
  display: flex;
  align-items: stretch;
  border-top: 1px solid var(--color-border);
  background: var(--color-surface);
  padding-bottom: env(safe-area-inset-bottom);
  flex-shrink: 0;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 50; /* Make sure it stays on top of everything including settings page */
}

@media (min-width: 768px) {
  .sidebar-mobile-bar {
    display: none;
  }
}

.mobile-bar-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  background: none;
  border: none;
  color: var(--color-text-muted);
  font-family: inherit;
  font-size: 10px;
  font-weight: 500;
  cursor: pointer;
  padding: 0.6rem 0.5rem;
  text-decoration: none;
  transition: color 0.15s;
  position: relative;
}

.mobile-bar-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 20%;
  right: 20%;
  height: 2px;
  border-radius: 0 0 2px 2px;
  background: var(--color-primary);
  opacity: 0;
  transition: opacity 0.15s;
}

.mobile-bar-btn.active {
  color: var(--color-primary);
  font-weight: 600;
}

.mobile-bar-btn.active::before {
  opacity: 1;
}

.mobile-bar-btn:hover {
  color: var(--color-primary);
}
</style>
