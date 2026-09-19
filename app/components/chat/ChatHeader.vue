<template>
  <header class="chat-header">
    <!-- Back button (mobile) -->
    <NuxtLink to="/chat" class="btn-icon back-btn" aria-label="Back to chat list">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
    </NuxtLink>

    <!-- Avatar + info -->
    <button class="header-info clickable" @click="openInfo">
      <AppAvatar
        :src="avatarSrc"
        :name="displayName"
        :online="chat?.type === 'direct' ? otherUserOnline : undefined"
        size="sm"
      />
      <div class="header-meta">
        <span class="header-name">{{ displayName }}</span>
        <span class="header-status">
          <template v-if="chat?.type === 'direct'">
            <span v-if="otherUserOnline" class="status-online">Online</span>
            <span v-else class="status-offline">{{ lastSeenText }}</span>
          </template>
          <template v-else>
            {{ participantCount }} members
          </template>
        </span>
      </div>
    </button>

    <!-- Actions -->
    <div class="header-actions">
      <div class="dropdown-container">
        <button class="btn-icon" @click="showMenu = !showMenu" title="More options">
          <Icon name="lucide:more-vertical" size="20" />
        </button>
        <div v-if="showMenu" class="dropdown-overlay" @click="showMenu = false"></div>
        <div v-if="showMenu" class="dropdown-menu">
          <button class="dropdown-item" @click="openInfo(); showMenu = false">
             <Icon name="lucide:info" size="16" /> View Info
          </button>
          <div class="dropdown-divider"></div>
          <button class="dropdown-item text-danger" @click="$emit('clear-chat'); showMenu = false">
             <Icon name="lucide:trash-2" size="16" /> Clear Chat
          </button>
        </div>
      </div>
    </div>

    <GroupInfoPanel v-if="chat?.type === 'group'" v-model="showGroupInfo" :chat="chat" />
    <UserInfoPanel v-if="chat?.type === 'direct'" v-model="showUserInfo" :user="otherUserData" />
  </header>
</template>

<script setup>
import { getFirestore, doc, onSnapshot } from 'firebase/firestore'

const props = defineProps({
  chat: { type: Object, default: null },
})
defineEmits(['clear-chat'])

const { currentUser } = useAuth()
const showGroupInfo = ref(false)
const showUserInfo = ref(false)
const showMenu = ref(false)
const otherUserData = ref(null)
let unsubUser = null

const displayName = computed(() => {
  if (!props.chat) return ''
  if (props.chat.type === 'group') return props.chat.name
  return otherUserData.value?.displayName || '...'
})

const avatarSrc = computed(() => {
  if (!props.chat) return null
  if (props.chat.type === 'group') return props.chat.photoURL
  return otherUserData.value?.photoURL || null
})

const otherUserOnline = computed(() => otherUserData.value?.isOnline || false)

const participantCount = computed(() => props.chat?.participants?.length || 0)

const lastSeenText = computed(() => {
  const ts = otherUserData.value?.lastSeen
  if (!ts) return 'Offline'
  const date = ts.toDate ? ts.toDate() : new Date(ts)
  const diff = Date.now() - date.getTime()
  if (diff < 60000) return 'Just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
})

function loadOtherUser() {
  if (unsubUser) { unsubUser(); unsubUser = null }
  if (!props.chat || props.chat.type !== 'direct') return
  const otherUid = props.chat.participants?.find((p) => p !== currentUser.value?.uid)
  if (!otherUid) return
  const db = getFirestore()
  unsubUser = onSnapshot(doc(db, 'users', otherUid), (snap) => {
    if (snap.exists()) otherUserData.value = snap.data()
  })
}

function openInfo() {
  if (props.chat?.type === 'group') showGroupInfo.value = true
  else if (props.chat?.type === 'direct') showUserInfo.value = true
}

watch(() => props.chat, loadOtherUser, { immediate: true })
onUnmounted(() => { if (unsubUser) unsubUser() })
</script>

<style scoped>
.chat-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1rem;
  height: var(--header-height);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface-2);
  flex-shrink: 0;
  /* Subtle glass-like shadow downward */
  box-shadow: 0 1px 0 var(--color-border), 0 2px 8px rgba(60, 60, 120, 0.04);
}

.back-btn {
  display: none;
  color: var(--color-text-secondary);
  margin-left: -0.25rem;
}

@media (max-width: 767px) {
  .back-btn { display: inline-flex; }
}

.header-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  min-width: 0;
  background: none;
  border: none;
  text-align: left;
  cursor: default;
  padding: 0.375rem 0.5rem;
  border-radius: var(--radius-md);
  transition: background var(--transition-fast);
  color: var(--color-text);
}

.header-info.clickable { cursor: pointer; }
.header-info.clickable:hover { background: var(--color-surface-3); }

.header-meta {
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: 0.15rem;
}

.header-name {
  font-size: var(--font-size-base);
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--color-text);
  letter-spacing: -0.01em;
}

.header-status {
  font-size: var(--font-size-xs);
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.status-online {
  color: var(--color-online);
  font-weight: 500;
}

.status-offline { color: var(--color-text-muted); }

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.125rem;
}

/* Dropdown Menu */
.dropdown-container { position: relative; display: flex; align-items: center; justify-content: center; }
.dropdown-overlay { position: fixed; inset: 0; z-index: 40; cursor: default; }
.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  min-width: 188px;
  z-index: 50;
  display: flex;
  flex-direction: column;
  padding: 0.25rem;
  overflow: hidden;
}
.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  padding: 0.625rem 0.875rem;
  text-align: left;
  background: none;
  border: none;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  font-weight: 450;
  color: var(--color-text);
  cursor: pointer;
  text-decoration: none;
  transition: background var(--transition-fast), color var(--transition-fast);
}
.dropdown-item:hover { background: var(--color-surface-3); }
.dropdown-divider { height: 1px; background: var(--color-border); margin: 0.25rem 0; }
.text-danger { color: var(--color-error); }
.text-danger:hover { background: rgba(239, 68, 68, 0.07) !important; }
</style>
