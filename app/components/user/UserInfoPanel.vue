<template>
  <AppModal :model-value="modelValue" title="User details" size="sm" @update:model-value="$emit('update:modelValue', $event)">
    <div class="user-info" v-if="user">
      <div class="user-hero">
        <AppAvatar :src="user.photoURL" :name="user.displayName" size="2xl" class="hero-avatar" :online="user.isOnline" />
        <h3 class="user-hero-name">{{ user.displayName }}</h3>
        <span class="user-hero-email" v-if="user.email">{{ user.email }}</span>
        
        <div class="user-status-pill" :class="{ online: user.isOnline }">
          <span class="status-dot"></span>
          {{ user.isOnline ? 'Online' : 'Offline' }}
        </div>
      </div>
    </div>
  </AppModal>
</template>

<script setup>
defineProps({
  modelValue: Boolean,
  user: { type: Object, default: null }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.user-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.user-hero {
  display: flex; 
  flex-direction: column;
  align-items: center; 
  text-align: center;
  padding: 2rem 1rem 1.5rem;
  background: var(--color-surface-2);
  border-radius: var(--radius-lg);
  position: relative;
  overflow: hidden;
  border: 1px solid var(--color-border);
}

.hero-avatar {
  width: 88px; height: 88px; font-size: 2.25rem;
  margin-bottom: 0.75rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border: 4px solid var(--color-surface-2);
  z-index: 1;
}

.user-hero-name, .user-hero-email, .user-status-pill {
  position: relative;
  z-index: 1;
}

.user-hero-name {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.user-hero-email {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  margin-bottom: 1rem;
}

.user-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.75rem;
  background: var(--color-surface-3);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--color-text-muted);
}

.user-status-pill.online {
  color: var(--color-online);
  background: rgba(74, 222, 128, 0.1);
}

.status-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--color-offline);
}

.user-status-pill.online .status-dot {
  background: var(--color-online);
}
</style>
