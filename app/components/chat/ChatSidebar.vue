<template>
  <div class="sidebar">
    <!-- Header -->
    <div class="sidebar-header">
      <h2 class="sidebar-title">Chat</h2>
      
      <div class="sidebar-actions">
        <button class="btn-icon" @click="showGroupCreateModal = true" title="New group" id="btn-new-group">
          <Icon name="lucide:users" size="18" />
        </button>
        <button class="btn-icon" @click="showSearchModal = true" title="New chat" id="btn-new-chat">
          <Icon name="lucide:message-square-plus" size="18" />
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

const searchQuery = ref('')
const activeChat = computed(() => route.params.chatId)

const filteredChats = computed(() => {
  if (!searchQuery.value.trim()) return chats.value
  const q = searchQuery.value.toLowerCase()
  return chats.value.filter((c) => {
    const name = c.type === 'group' ? c.name : ''
    return (
      name.toLowerCase().includes(q) ||
      c.lastMessage?.toLowerCase().includes(q)
    )
  })
})

function openChat(chatId) {
  router.push(`/chat/${chatId}`)
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
  padding: 1rem 1rem 0.75rem;
  flex-shrink: 0;
}

.sidebar-title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-text);
}

.sidebar-actions {
  display: flex;
  align-items: center;
  gap: 0.125rem;
}

.sidebar-search {
  padding: 0 0.75rem 0.75rem;
  flex-shrink: 0;
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
  padding: 0 0.5rem;
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
