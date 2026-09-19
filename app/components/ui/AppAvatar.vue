<template>
  <div class="avatar" :class="[`avatar-${size}`]">
    <img v-if="effectiveSrc" :src="effectiveSrc" :alt="name" class="avatar-img" @error="imgError = true" />
    <span v-else class="avatar-initials">{{ initials }}</span>
    <span v-if="online !== undefined" class="avatar-status" :class="online ? 'online' : 'offline'"></span>
  </div>
</template>

<script setup>
const props = defineProps({
  src: { type: String, default: null },
  name: { type: String, default: '' },
  size: { type: String, default: 'md' }, // xs, sm, md, lg, xl
  online: { type: Boolean, default: undefined },
})

const imgError = ref(false)
const effectiveSrc = computed(() => (imgError.value ? null : props.src))

const initials = computed(() => {
  const words = props.name?.trim().split(/\s+/) || []
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return words[0]?.[0]?.toUpperCase() || '?'
})
</script>

<style scoped>
.avatar {
  position: relative;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: visible;
}
.avatar-xs { width: 28px; height: 28px; font-size: 10px; }
.avatar-sm { width: 36px; height: 36px; font-size: 13px; }
.avatar-md { width: 44px; height: 44px; font-size: 16px; }
.avatar-lg { width: 56px; height: 56px; font-size: 20px; }
.avatar-xl { width: 80px; height: 80px; font-size: 28px; }

.avatar-img {
  width: 100%; height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
.avatar-initials {
  width: 100%; height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-primary), #8b5cf6);
  color: white;
  font-weight: 600;
}
.avatar-status {
  position: absolute;
  bottom: 0; right: 0;
  width: 11px; height: 11px;
  border-radius: 50%;
  border: 2px solid var(--color-surface);
}
.avatar-status.online { background: var(--color-online); }
.avatar-status.offline { background: var(--color-offline); }

.avatar-sm .avatar-status { width: 9px; height: 9px; }
.avatar-lg .avatar-status { width: 13px; height: 13px; }
</style>
