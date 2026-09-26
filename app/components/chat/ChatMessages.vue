<template>
  <div class="messages-container" ref="containerRef">
    <div v-if="messagesLoading" class="messages-loading">
      <AppLoader size="md" />
    </div>

    <div v-else-if="groupedMessages.length === 0" class="messages-empty">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      <p>No messages yet</p>
      <button class="hello-btn" @click="$emit('quick-reply', 'Hello! 👋')">Say - Hello! 👋</button>
    </div>

    <div v-else class="messages-list">
      <template v-for="(item, index) in groupedMessages" :key="item.id || item.date">
        <ChatDateSeparator v-if="item.isDate" :date="item.date" :same-day="item.isSameDay" />
        <ChatMessageBubble
          v-else
          :message="item"
          :is-own="item.senderId === currentUser?.uid"
          :sender-data="getSenderData(item.senderId)"
          :get-participant="getSenderData"
          :is-group="isGroup"
          :is-first-from-sender="item.isFirstFromSender"
          @delete="$emit('delete-message', item.id)"
          @edit="$emit('edit-message', item)"
          @react="(emoji) => $emit('react-message', item.id, emoji)"
          @quick-reply="(reply) => $emit('quick-reply', reply)"
          @image-loaded="scrollToBottom(true)"
          :disable-reactions="isBotChat"
        />
      </template>

      <!-- Typing Indicators -->
      <template v-if="activeTypers.length > 0">
        <ChatTypingBubble
          v-for="uid in activeTypers"
          :key="'typing-' + uid"
          :sender-data="getSenderData(uid)"
          :is-group="isGroup"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { getFirestore, doc, onSnapshot } from 'firebase/firestore'

const props = defineProps({
  messages: { type: Array, default: () => [] },
  messagesLoading: { type: Boolean, default: false },
  participants: { type: Array, default: () => [] },
  isGroup: { type: Boolean, default: false },
  chat: { type: Object, default: null },
})
defineEmits(['delete-message', 'edit-message', 'react-message', 'quick-reply'])

const { currentUser } = useAuth()
const containerRef = ref(null)
const participantMap = ref({})
const unsubs = {}

const isBotChat = computed(() => props.participants?.includes('bot_echo'))

const activeTypers = computed(() => {
  if (!props.chat?.typing) return []
  const now = Date.now()
  const typers = []
  for (const [uid, timestamp] of Object.entries(props.chat.typing)) {
    if (uid === currentUser.value?.uid) continue
    const ts = timestamp?.toDate ? timestamp.toDate().getTime() : Date.now()
    if (now - ts < 15000) {
      typers.push(uid)
    }
  }
  return typers
})

watch(() => props.participants, (newParticipants) => {
  if (!newParticipants?.length) return
  const db = getFirestore()
  
  newParticipants.forEach(uid => {
    if (!unsubs[uid]) {
      unsubs[uid] = onSnapshot(doc(db, 'users', uid), (snap) => {
        if (snap.exists()) participantMap.value[uid] = snap.data()
      })
    }
  })

  Object.keys(unsubs).forEach(uid => {
    if (!newParticipants.includes(uid)) {
      unsubs[uid]()
      delete unsubs[uid]
      delete participantMap.value[uid]
    }
  })
}, { immediate: true })

onUnmounted(() => {
  Object.values(unsubs).forEach(unsub => unsub())
})

const groupedMessages = computed(() => {
  const items = []
  let lastDate = null
  let lastSender = null

  const clearedAt = props.chat?.clearedAt?.[currentUser.value?.uid]
  const clearTime = clearedAt ? (clearedAt.toDate ? clearedAt.toDate().getTime() : new Date(clearedAt).getTime()) : 0

  for (const msg of props.messages) {
    const ts = msg.createdAt
    const msgTime = ts?.toDate ? ts.toDate().getTime() : (ts ? new Date(ts).getTime() : Date.now())
    if (clearTime && msgTime <= clearTime) continue

    const date = new Date(msgTime)
    const dateStr = date.toDateString()

    // Only insert a separator when the calendar day changes
    if (dateStr !== lastDate) {
      items.push({ isDate: true, date: date.toISOString(), id: `date-${msg.id || msgTime}` })
      lastDate = dateStr
      lastSender = null
    }

    const isFirstFromSender = msg.senderId !== lastSender
    lastSender = msg.senderId
    items.push({ ...msg, isDate: false, isFirstFromSender })
  }
  return items
})

function getSenderData(senderId) {
  return participantMap.value[senderId] || null
}

// Auto-scroll on new messages
function scrollToBottom(smooth = false) {
  const el = containerRef.value
  if (!el) return
  if (smooth) {
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  } else {
    el.scrollTop = el.scrollHeight
  }
}

watch(() => props.messages.length, (newLen, oldLen) => {
  nextTick(() => {
    // If oldLen is 0, it's an initial load, so snap instantly. Otherwise, smooth scroll.
    const smooth = oldLen > 0
    setTimeout(() => scrollToBottom(smooth), 200)
  })
})

watch(() => activeTypers.value.length, (newLen, oldLen) => {
  if (newLen > oldLen) {
    nextTick(() => setTimeout(() => scrollToBottom(true), 100))
  }
})

onMounted(() => {
  nextTick(() => setTimeout(() => scrollToBottom(false), 50))
})
</script>

<style scoped>
.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 0.75rem 1.25rem 0 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  /* Subtle dotted grid pattern for a premium chat feel */
  background-image: radial-gradient(circle, var(--color-border-light) 1px, transparent 1px);
  background-size: 24px 24px;
  background-color: var(--color-surface);
}

@media (max-width: 768px) {
  .messages-container {
    padding: 0.75rem 0.5rem 0 0.5rem;
  }
}

.messages-loading, .messages-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.messages-empty p {
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--color-text-secondary);
}

.hello-btn {
  background: var(--color-surface);
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  border-radius: var(--radius-full);
  padding: 0.4rem 0.8rem;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);
  margin-top: 0.5rem;
}

.hello-btn:hover {
  background: var(--color-primary);
  color: #fff;
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.hello-btn:active {
  transform: translateY(0);
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  min-height: 100%;
}

.messages-list::before {
  content: '';
  flex: 1;
}

.messages-list::after {
  content: '';
  display: block;
  min-height: 1.25rem;
  flex-shrink: 0;
}
</style>
