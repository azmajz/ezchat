<template>
  <div class="sidebar">
    <!-- Header -->
    <div class="sidebar-header">
      <div class="sidebar-brand">
        <AppLogo size="32" />
        <span class="sidebar-brand-name">EzChat</span>
      </div>
      <div class="sidebar-actions">
        <button class="btn-icon" @click="toggleTheme" :title="theme === 'dark' ? 'Light mode' : 'Dark mode'">
          <svg v-if="theme === 'dark'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>
        <button class="btn-icon" @click="showGroupCreate = true" title="New group" id="btn-new-group">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
        </button>
        <button class="btn-icon" @click="showSearch = true" title="New chat" id="btn-new-chat">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </div>
    </div>

    <!-- Search -->
    <div class="sidebar-search">
      <div class="search-wrap">
        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
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
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.25"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <p>No conversations yet</p>
          <button class="btn btn-primary btn-sm" @click="showSearch = true">Start a chat</button>
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

    <!-- Profile footer -->
    <div class="sidebar-footer">
      <NuxtLink to="/settings" class="profile-btn" id="btn-profile">
        <AppAvatar :src="currentUser?.photoURL" :name="currentUser?.displayName || 'Me'" size="sm" :online="true" />
        <div class="profile-info">
          <span class="profile-name">{{ currentUser?.displayName || 'My Profile' }}</span>
          <span class="profile-status">● Online</span>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>
      </NuxtLink>
    </div>
  </div>

  <!-- Modals live here — Teleported to body, always above everything -->
  <UserSearchModal v-model="showSearch" />
  <GroupCreateModal v-model="showGroupCreate" />
</template>

<script setup>
const route = useRoute()
const router = useRouter()

const { chats, chatsLoading } = useChats()
const { currentUser } = useAuth()
const { theme, toggleTheme } = useTheme()

// LOCAL state — resets every time sidebar mounts (no stale state)
const showSearch = ref(false)
const showGroupCreate = ref(false)

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

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.sidebar-brand-name {
  font-size: var(--font-size-lg);
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

.sidebar-footer {
  border-top: 1px solid var(--color-border);
  padding: 0.75rem;
  flex-shrink: 0;
}

.profile-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.5rem;
  border-radius: var(--radius-lg);
  border: none;
  background: none;
  cursor: pointer;
  transition: background var(--transition-fast);
  text-align: left;
  color: var(--color-text);
}

.profile-btn:hover { background: var(--color-sidebar-hover); }

.profile-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.profile-name {
  font-size: var(--font-size-sm);
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.profile-status {
  font-size: var(--font-size-xs);
  color: var(--color-online);
  font-weight: 500;
}
</style>
