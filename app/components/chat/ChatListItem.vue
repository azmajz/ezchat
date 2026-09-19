<template>
  <button
    class="chat-list-item"
    :class="{ active }"
    @click="$emit('click')"
  >
    <div class="item-avatar">
      <AppAvatar
        :src="chat.photoURL || otherUserPhoto"
        :name="displayName"
        :online="chat.type === 'direct' ? otherUserOnline : undefined"
        size="md"
      />
    </div>

    <div class="item-body">
      <div class="item-row-top">
        <span class="item-name">{{ displayName }}</span>
        <span class="item-time">{{ lastMessageTime }}</span>
      </div>
      <div class="item-row-bottom">
        <span class="item-preview">{{ chat.lastMessage || 'No messages yet' }}</span>
        <span v-if="unreadCount > 0" class="badge">{{ unreadCount > 99 ? '99+' : unreadCount }}</span>
      </div>
    </div>
  </button>
</template>

<script setup>
import { getFirestore, doc, onSnapshot } from 'firebase/firestore'

const props = defineProps({
  chat: { type: Object, required: true },
  active: { type: Boolean, default: false },
})
defineEmits(['click'])

const { currentUser } = useAuth()

const otherUserData = ref(null)
let unsubUser = null

const displayName = computed(() => {
  if (props.chat.type === 'group') return props.chat.name
  return otherUserData.value?.displayName || 'Loading...'
})

const otherUserPhoto = computed(() => otherUserData.value?.photoURL || null)
const otherUserOnline = computed(() => otherUserData.value?.isOnline || false)

const lastMessageTime = computed(() => {
  const ts = props.chat.lastMessageAt
  if (!ts) return ''
  const date = ts.toDate ? ts.toDate() : new Date(ts)
  const now = new Date()
  const diff = now - date
  if (diff < 60000) return 'now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m`
  if (diff < 86400000) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  if (diff < 604800000) return date.toLocaleDateString([], { weekday: 'short' })
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
})

const unreadCount = ref(0) // Simplified — full implementation needs per-user read tracking

function loadOtherUser() {
  if (props.chat.type !== 'direct') return
  const otherUid = props.chat.participants?.find((p) => p !== currentUser.value?.uid)
  if (!otherUid) return
  const db = getFirestore()
  unsubUser = onSnapshot(doc(db, 'users', otherUid), (snap) => {
    if (snap.exists()) otherUserData.value = snap.data()
  })
}

onMounted(() => loadOtherUser())
onUnmounted(() => { if (unsubUser) unsubUser() })
</script>

<style scoped>
.chat-list-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.625rem 0.75rem;
  border-radius: var(--radius-lg);
  border: none;
  background: none;
  cursor: pointer;
  transition: background var(--transition-fast);
  text-align: left;
  color: var(--color-text);
  margin-bottom: 2px;
}

.chat-list-item:hover { background: var(--color-sidebar-hover); }
.chat-list-item.active { background: var(--color-sidebar-active); }

.item-avatar { flex-shrink: 0; }

.item-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.item-row-top, .item-row-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.item-name {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.item-time {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.item-preview {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}
</style>
