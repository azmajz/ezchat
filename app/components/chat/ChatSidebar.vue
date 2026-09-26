<template>
  <div class="sidebar">
    <!-- Header -->
    <div class="sidebar-header">
      <!-- Desktop: title -->
      <h2 class="sidebar-title">{{ sidebarTitle }}</h2>

      <!-- Mobile: current user profile -->
      <button class="sidebar-me" @click="showSettingsModal = true" title="My profile">
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
      </button>

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
        <button v-if="searchQuery" class="search-clear-btn" @click="searchQuery = ''" aria-label="Clear search">
          <Icon name="lucide:x" size="14" />
        </button>
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
        <div v-if="searchQuery" class="sidebar-empty">
          <Icon name="lucide:search-x" size="40" style="opacity: 0.25; stroke-width: 1.5;" />
          <p class="search-empty-text">No results found for "<strong>{{ searchQuery }}</strong>"</p>
          <button class="btn btn-secondary btn-sm" @click="searchQuery = ''">Clear search</button>
        </div>
        <div v-else-if="activeTab === 'groups'" class="sidebar-empty">
          <Icon name="lucide:users" size="40" style="opacity: 0.25; stroke-width: 1.5;" />
          <p>No groups yet</p>
          <button class="btn btn-primary btn-sm" @click="showGroupCreateModal = true">Create a group</button>
        </div>
        <div v-else class="sidebar-empty">
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
          @contextmenu.prevent="openContextMenu($event, chat)"
        />
      </template>
    </div>

  </div>

  <!-- Context Menu Overlay -->
  <div v-if="contextMenu.show" class="context-menu-overlay" @click="closeContextMenu" @contextmenu.prevent="closeContextMenu">
    <div class="context-menu" :style="{ top: contextMenu.y + 'px', left: contextMenu.x + 'px' }" @click.stop>
      <button class="context-menu-item" @click="handleContextClear">
        <Icon name="lucide:eraser" size="16" />
        <span>Clear Chat</span>
      </button>
      <button class="context-menu-item danger" @click="handleContextDelete">
        <Icon name="lucide:trash-2" size="16" />
        <span>Delete Chat</span>
      </button>
      <button v-if="contextMenu.chat?.type === 'group'" class="context-menu-item danger" @click="handleContextLeave">
        <Icon name="lucide:log-out" size="16" />
        <span>Leave Group</span>
      </button>
    </div>
  </div>

  <!-- Modals live here — Teleported to body, always above everything -->
  <UserSearchModal v-model="showSearchModal" />
  <GroupCreateModal v-model="showGroupCreateModal" />
</template>

<script setup>
const route = useRoute()
const router = useRouter()

const { chats, chatsLoading, leaveGroup, deleteChat } = useChats()
const { clearChat } = useMessages()
const { currentUser } = useAuth()
const { showSearchModal, showGroupCreateModal, showSettingsModal, showToast } = useUI()

const activeTab = computed(() => route.query.filter === 'groups' ? 'groups' : 'chat')
const activeChat = computed(() => route.params.chatId)
const sidebarTitle = computed(() => route.query.filter === 'groups' ? 'Groups' : 'Chat')

const searchQuery = ref('')
const contextMenu = ref({ show: false, x: 0, y: 0, chat: null })

function openContextMenu(e, chat) {
  // Adjust position to stay within screen bounds
  let x = e.clientX
  let y = e.clientY
  
  if (x > window.innerWidth - 180) x = window.innerWidth - 180
  if (y > window.innerHeight - 120) y = window.innerHeight - 120

  contextMenu.value = { show: true, x, y, chat }
}

function closeContextMenu() {
  contextMenu.value.show = false
}

async function handleContextClear() {
  const chat = contextMenu.value.chat
  closeContextMenu()
  if (!chat) return
  if (confirm('Are you sure you want to clear this chat?')) {
    try {
      await clearChat(chat.id)
      showToast('Chat cleared', 'success')
    } catch {
      showToast('Could not clear chat', 'error')
    }
  }
}

async function handleContextDelete() {
  const chat = contextMenu.value.chat
  closeContextMenu()
  if (!chat) return
  if (confirm('Are you sure you want to PERMANENTLY delete this chat and ALL its messages? This action cannot be undone.')) {
    try {
      await deleteChat(chat.id)
      if (activeChat.value === chat.id) router.push('/chat')
      showToast('Chat deleted completely', 'success')
    } catch {
      showToast('Could not delete chat', 'error')
    }
  }
}

async function handleContextLeave() {
  const chat = contextMenu.value.chat
  closeContextMenu()
  if (!chat) return
  if (confirm('Are you sure you want to leave this group?')) {
    try {
      await leaveGroup(chat.id)
      if (activeChat.value === chat.id) router.push('/chat')
      showToast('Left group', 'success')
    } catch {
      showToast('Could not leave group', 'error')
    }
  }
}

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
  justify-content: flex-start;
  text-align: left;
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
  padding: 0.6rem 2.25rem; /* padding for both icons */
  border-radius: var(--radius-full);
  border: 1.5px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  font-size: var(--font-size-sm);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

/* Hide native search clear button */
.search-input::-webkit-search-decoration,
.search-input::-webkit-search-cancel-button,
.search-input::-webkit-search-results-button,
.search-input::-webkit-search-results-decoration {
  display: none;
}

.search-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-light);
  outline: none;
}

.search-input::placeholder { color: var(--color-text-muted); }

.search-clear-btn {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 50%;
  transition: background var(--transition-fast), color var(--transition-fast);
}
.search-clear-btn:hover {
  background: var(--color-surface-3, rgba(0,0,0,0.05));
  color: var(--color-text);
}

.sidebar-list {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem 0.5rem;
}
@media (max-width: 767px) {
  .sidebar-list {
    padding-bottom: calc(4.5rem + env(safe-area-inset-bottom));
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

.search-empty-text {
  word-break: break-word;
  max-width: 100%;
}

.btn-secondary {
  background: var(--color-surface-2);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}
.btn-secondary:hover {
  background: var(--color-surface-3);
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

/* Context Menu */
.context-menu-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 1000;
}

.context-menu {
  position: absolute;
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-xl);
  padding: 0.25rem;
  min-width: 160px;
  display: flex;
  flex-direction: column;
  animation: scaleIn 150ms ease forwards;
  transform-origin: top left;
}

@keyframes scaleIn {
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
}

.context-menu-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: none;
  background: none;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  color: var(--color-text);
  font-weight: 500;
  cursor: pointer;
  text-align: left;
  transition: background var(--transition-fast);
}

.context-menu-item:hover {
  background: var(--color-surface-3);
}

.context-menu-item.danger {
  color: var(--color-error);
}

.context-menu-item.danger:hover {
  background: rgba(239, 68, 68, 0.08);
}
</style>
