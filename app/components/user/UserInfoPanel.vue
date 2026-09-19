<template>
  <AppModal :model-value="modelValue" :title="'User Info'" size="sm" @update:model-value="$emit('update:modelValue', $event)">
    <div class="user-info" v-if="user">
      <div class="user-hero">
        <AppAvatar :src="user.photoURL" :name="user.displayName" size="xl" />
        <div class="user-hero-meta">
          <h3 class="user-hero-name">{{ user.displayName }}</h3>
          <span class="user-hero-email" v-if="user.email">{{ user.email }}</span>
          <span class="user-status" :class="{ online: user.isOnline }">
            {{ user.isOnline ? 'Online' : 'Offline' }}
          </span>
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
  gap: 1.25rem;
  align-items: center;
  text-align: center;
  padding: 1rem 0 2rem;
}

.user-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.user-hero-meta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.user-hero-name {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-text);
}

.user-hero-email {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.user-status {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-muted);
  margin-top: 0.5rem;
}

.user-status.online {
  color: var(--color-online);
}
</style>
