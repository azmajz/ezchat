<template>
  <div class="chat-empty">
    <div class="empty-illustration">
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <rect width="120" height="120" rx="30" fill="var(--color-primary-light)"/>
        <rect x="24" y="30" width="72" height="12" rx="6" fill="var(--color-primary)" opacity="0.6"/>
        <rect x="24" y="52" width="52" height="10" rx="5" fill="var(--color-primary)" opacity="0.4"/>
        <rect x="24" y="70" width="60" height="10" rx="5" fill="var(--color-primary)" opacity="0.3"/>
        <circle cx="88" cy="88" r="16" fill="var(--color-primary)"/>
        <path d="M82 88l4 4 8-8" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <h2 class="empty-title">Your conversations</h2>
    <p class="empty-subtitle">Select a chat from the left, or start a new conversation to connect.</p>
    <div class="empty-actions">
      <button class="btn btn-primary" @click="showSearchModal = true">
        <Icon name="lucide:search" size="18" />
        Find People
      </button>
      <button class="btn btn-secondary" @click="showGroupCreateModal = true">
        <Icon name="lucide:users" size="18" />
        Create Group
      </button>
    </div>
  </div>
</template>

<script setup>
const { showSearchModal, showGroupCreateModal } = useUI()
</script>

<style scoped>
.chat-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  text-align: center;
}
.empty-illustration { margin-bottom: 0.5rem; }
.empty-title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-text);
}
.empty-subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  max-width: 280px;
  line-height: 1.7;
}
.empty-subtitle strong {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: var(--color-primary);
  color: white;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 700;
  vertical-align: middle;
}
.empty-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}
</style>
