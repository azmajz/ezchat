<template>
  <div class="sidebar">
    <!-- Header -->
    <div class="sidebar-header">
      <!-- Desktop: title -->
      <h2 class="sidebar-title">{{ sidebarTitle }}</h2>

      <!-- Mobile: current user profile -->
      <NuxtLink to="/settings" class="sidebar-me" title="My profile">
        <AppAvatar
          :src="currentUser?.photoURL"
          :name="currentUser?.displayName || 'Me'"
          size="md"
          :online="true"
        />
        <div class="sidebar-me-info">
          <span class="sidebar-me-name">{{ currentUser?.displayName || 'Me' }}</span>
          <span class="sidebar-me-status">Online</span>
        </div>
      </NuxtLink>

      <div class="sidebar-actions">
        <button class="btn-icon" @click="showGroupCreateModal = true" title="New group" id="btn-new-group">
          <Icon name="lucide:user-plus" size="18" />
        </button>
        <button class="btn-icon" @click="showSearchModal = true" title="Find people" id="btn-new-chat">
          <Icon name="lucide:user-search" size="18" />
        </button>
      </div>
    </div>

    <!-- Search -->
    <div class="sidebar-search">
      <div class="search-wrap">
        <Icon name="lucide:search" class="search-icon" size="16" />
        <input
          v-model="searchQuery"
          type="search"
          class="search-input"
          placeholder="Search conversations…"
          id="sidebar-search"
        />
      </div>
    </div>

    <!-- Chat List -->
    <div class="sidebar-list">
      <template v-if="chatsLoading">
        <div v-for="i in 5" :key="i" class="skeleton-item">
          <div class="skeleton skeleton-avatar"></div>
          <div class="skeleton-lines">
            <div class="skeleton skeleton-line-1"></div>
            <div class="skeleton skeleton-line-2"></div>
          </div>
        </div>
      </template>

      <template v-else-if="filteredChats.length === 0">
        <div class="sidebar-empty">
          <Icon name="lucide:message-square" size="40" style="opacity: 0.25; stroke-width: 1.5;" />
          <p>No conversations yet</p>
          <button class="btn btn-primary btn-sm" @click="showSearchModal = true">Start a chat</button>
        </div>
      </template>

      <template v-else>
        <ChatListItem
          v-for="chat in filteredChats"
          :key="chat.id"
          :chat="chat"
          :active="activeChat === chat.id"
          @click="openChat(chat.id)"
        />
      </template>
    </div>

    <!-- Mobile-only bottom bar -->
    <div class="sidebar-mobile-bar">
      <button class="mobile-bar-btn" :class="{ active: activeTab === 'chat' }" @click="setTab('chat')">
        <Icon name="lucide:message-square" size="20" />
        <span>Chats</span>
      </button>
      <button class="mobile-bar-btn" :class="{ active: activeTab === 'groups' }" @click="setTab('groups')">
        <Icon name="lucide:users" size="20" />
        <span>Groups</span>
      </button>
      <NuxtLink to="/settings" class="mobile-bar-btn">
        <Icon name="lucide:settings" size="20" />
        <span>Settings</span>
      </NuxtLink>
    </div>
  </div>

  <!-- Modals live here — Teleported to body, always above everything -->
  <UserSearchModal v-model="showSearchModal" />
  <GroupCreateModal v-model="showGroupCreateModal" />
</template>

<script setup>
const route = useRoute()
const router = useRouter()

const { chats, chatsLoading } = useChats()
const { currentUser } = useAuth()
const { showSearchModal, showGroupCreateModal } = useUI()

const activeTab = computed(() => route.query.filter === 'groups' ? 'groups' : 'chat')
const activeChat = computed(() => route.params.chatId)
const sidebarTitle = computed(() => route.query.filter === 'groups' ? 'Groups' : 'Chat')

const searchQuery = ref('')

const filteredChats = computed(() => {
  let list = chats.value
  
  if (route.query.filter === 'groups') {
    list = list.filter(c => c.type === 'group')
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter((c) => {
      const name = c.type === 'group' ? c.name : ''
      return (
        name.toLowerCase().includes(q) ||
        c.lastMessage?.toLowerCase().includes(q)
      )
    })
  }
  
  return list
})


function openChat(chatId) {
  router.push(`/chat/${chatId}`)
}

function setTab(tab) {
  const query = { ...route.query }
  if (tab === 'groups') query.filter = 'groups'
  else delete query.filter
  router.push({ query })
}
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background: var(--color-sidebar);
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.125rem 1rem 0.75rem;
  flex-shrink: 0;
  gap: 0.5rem;
}
@media (max-width: 767px) {
  .sidebar-header {
    padding: 1rem 1rem 0.75rem;
  }
}

/* Desktop title — hidden on mobile */
.sidebar-title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-text);
  flex: 1;
  min-width: 0;
}
@media (max-width: 767px) {
  .sidebar-title { display: none; }
}

/* Skype-style current user — mobile only */
.sidebar-me {
  display: none;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  border-radius: var(--radius-md);
  padding: 0.3rem 0.5rem;
  margin: -0.3rem -0.5rem;
  flex: 1;
  min-width: 0;
  transition: background var(--transition-fast);
}
@media (max-width: 767px) {
  .sidebar-me { display: flex; }
}
.sidebar-me:hover {
  background: var(--color-surface-3);
}
.sidebar-me-info {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
}
.sidebar-me-name {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
}
.sidebar-me-status {
  font-size: 11px;
  font-weight: 500;
  color: var(--color-online);
  line-height: 1;
}

/* Hide on mobile — bottom tab bar handles this */
.btn-desktop-only {
  display: inline-flex;
}
@media (max-width: 767px) {
  .btn-desktop-only { display: none; }
}

.sidebar-actions {
  display: flex;
  align-items: center;
  gap: 0.125rem;
  flex-shrink: 0;
}

.sidebar-search {
  padding: 0.25rem 0.75rem 0.75rem;
  flex-shrink: 0;
}
@media (max-width: 767px) {
  .sidebar-search {
    padding: 0.5rem 0.875rem 0.875rem;
  }
}

.search-wrap { position: relative; }

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.6rem 0.75rem 0.6rem 2.25rem;
  border-radius: var(--radius-full);
  border: 1.5px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  font-size: var(--font-size-sm);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.search-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-light);
  outline: none;
}

.search-input::placeholder { color: var(--color-text-muted); }

.sidebar-list {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem 0.5rem;
}

/* ── Mobile bottom bar ── */
.sidebar-mobile-bar {
  display: none;
}
@media (max-width: 767px) {
  .sidebar-mobile-bar {
    display: flex;
    align-items: stretch;
    border-top: 1px solid var(--color-border);
    background: var(--color-sidebar);
    padding-bottom: env(safe-area-inset-bottom);
    flex-shrink: 0;
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
}

.sidebar-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 3rem 1rem;
  text-align: center;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.btn-sm { padding: 0.4rem 1rem; font-size: var(--font-size-xs); }

.skeleton-item {
  display: flex; align-items: center; gap: 0.75rem;
  padding: 0.75rem 0.5rem;
}
.skeleton-avatar { width: 44px; height: 44px; border-radius: 50%; flex-shrink: 0; }
.skeleton-lines { flex: 1; display: flex; flex-direction: column; gap: 0.5rem; }
.skeleton-line-1 { height: 13px; width: 55%; border-radius: 6px; }
.skeleton-line-2 { height: 11px; width: 80%; border-radius: 6px; }




</style>
