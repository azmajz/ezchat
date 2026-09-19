<template>
  <div class="message-wrap">
    <div class="message-avatar">
      <AppAvatar :src="senderData?.photoURL" :name="senderData?.displayName || '...'" size="sm" />
    </div>
    <div class="message-content">
      <span v-if="isGroup" class="sender-name">{{ senderData?.displayName || 'Unknown' }}</span>
      <div class="bubble-row">
        <div class="bubble bubble-received">
          <div class="typing-indicator">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  senderData: { type: Object, default: null },
  isGroup: { type: Boolean, default: false },
})
</script>

<style scoped>
.message-wrap {
  display: flex;
  gap: 0.5rem;
  max-width: 85%;
  animation: messagePop 180ms ease forwards;
  margin-top: 0.75rem;
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

.bubble {
  padding: 0.625rem 0.875rem;
  border-radius: var(--radius-lg);
  max-width: 100%;
}

.bubble-received {
  background: var(--color-received-bg);
  color: var(--color-received-text);
  border-bottom-left-radius: var(--radius-sm);
  border-top-left-radius: var(--radius-lg);
}

.typing-indicator {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  height: 20px;
  padding: 0 0.125rem;
}

.typing-indicator span {
  display: block;
  width: 6px;
  height: 6px;
  background-color: currentColor;
  border-radius: 50%;
  opacity: 0.6;
  animation: typing 1.4s infinite ease-in-out both;
}

.typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
.typing-indicator span:nth-child(2) { animation-delay: -0.16s; }

@keyframes typing {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
  40% { transform: scale(1); opacity: 1; }
}

@keyframes messagePop {
  from { opacity: 0; transform: translateY(10px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
</style>
