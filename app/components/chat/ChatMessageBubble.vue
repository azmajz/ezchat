<template>
  <div class="message-wrap" :class="[isOwn ? 'own' : 'other', isFirstFromSender ? 'first-in-group' : '']" @mouseenter="hovered = true" @mouseleave="hovered = false">
    
    <!-- Avatar (only for received messages) -->
    <div v-if="!isOwn" class="message-avatar">
      <AppAvatar v-if="isFirstFromSender" :src="senderData?.photoURL" :name="senderData?.displayName || '...'" size="sm" />
    </div>

    <div class="message-content">
      <!-- Sender name (group chats, first message only) -->
      <span v-if="isGroup && !isOwn && isFirstFromSender" class="sender-name">{{ senderData?.displayName || 'Unknown' }}</span>

      <div class="bubble-row">
        <div class="bubble" :class="[isOwn ? 'bubble-sent' : 'bubble-received', `bubble-${message.type}`, !isFirstFromSender ? 'bubble-chained' : '']">
          <!-- Text message -->
          <template v-if="message.type === 'text'">
            <p class="bubble-text">{{ message.text }}</p>
          </template>

          <!-- Image message -->
          <ChatImageMessage v-else-if="message.type === 'image'" :message="message" />

          <!-- File message -->
          <ChatFileMessage v-else-if="message.type === 'file'" :message="message" :is-own="isOwn" />

          <span class="bubble-time">{{ formattedTime }}</span>
        </div>

        <!-- Delete button (own messages) -->
        <Transition name="fade-quick">
          <button
            v-if="isOwn && hovered"
            class="delete-btn btn-icon"
            @click="$emit('delete')"
            title="Delete message"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
          </button>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  message: { type: Object, required: true },
  isOwn: { type: Boolean, default: false },
  senderData: { type: Object, default: null },
  isGroup: { type: Boolean, default: false },
  isFirstFromSender: { type: Boolean, default: true },
})
defineEmits(['delete'])

const hovered = ref(false)

const formattedTime = computed(() => {
  const ts = props.message.createdAt
  if (!ts) return ''
  const date = ts.toDate ? ts.toDate() : new Date(ts)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
})
</script>

<style scoped>
.message-wrap {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  max-width: 85%;
  animation: messagePop 180ms ease forwards;
  margin: 0.125rem 0;
}

.message-wrap.first-in-group {
  margin-top: 0.75rem;
}

.message-wrap.own {
  align-self: flex-end;
}

.message-wrap.other {
  align-self: flex-start;
  align-items: flex-start;
}

.message-avatar {
  width: 36px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
}

.message-content {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.message-wrap.own .message-content {
  align-items: flex-end;
}

.message-wrap.other .message-content {
  align-items: flex-start;
}

.sender-name {
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 0.25rem;
  padding-left: 0.25rem;
}

.bubble-row {
  display: flex;
  align-items: flex-end;
  gap: 0.375rem;
}

.message-wrap.own .bubble-row { flex-direction: row-reverse; }

.bubble {
  padding: 0.625rem 0.875rem;
  border-radius: var(--radius-lg);
  max-width: 100%;
  position: relative;
}

.bubble-sent {
  background: var(--color-sent-bg);
  color: var(--color-sent-text);
  border-bottom-right-radius: var(--radius-sm);
}

.bubble-received {
  background: var(--color-received-bg);
  color: var(--color-received-text);
  border-bottom-left-radius: var(--radius-sm);
  border-top-left-radius: var(--radius-sm);
}

.message-wrap.other.first-in-group .bubble-received {
  border-top-left-radius: var(--radius-lg);
}

.bubble-image, .bubble-file {
  padding: 0.375rem;
  overflow: hidden;
}

.bubble-text {
  font-size: var(--font-size-sm);
  line-height: 1.55;
  white-space: pre-wrap;
  word-break: break-word;
  margin-bottom: 0.25rem;
}

.bubble-time {
  display: block;
  font-size: 10px;
  opacity: 0.65;
  text-align: right;
  margin-top: 0.125rem;
}

.bubble-sent .bubble-time { color: rgba(255,255,255,0.75); }

.delete-btn {
  width: 28px; height: 28px;
  color: var(--color-error);
  flex-shrink: 0;
}

.delete-btn:hover { background: rgba(239,68,68,0.1); }

.fade-quick-enter-active, .fade-quick-leave-active { transition: opacity 100ms; }
.fade-quick-enter-from, .fade-quick-leave-to { opacity: 0; }

@media (max-width: 767px) {
  .message-wrap { max-width: 95%; }
}
</style>
