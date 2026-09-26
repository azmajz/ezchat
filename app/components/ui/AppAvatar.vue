<template>
  <div class="avatar" :class="[`avatar-${size}`]">
    <img v-if="effectiveSrc" :src="effectiveSrc" :alt="name" class="avatar-img" @error="imgError = true" />
    <span v-else class="avatar-initials" :style="avatarStyle">
      <Icon v-if="fallbackIcon" :name="fallbackIcon" class="fallback-icon" />
      <template v-else>{{ initials }}</template>
    </span>
    <span v-if="online !== undefined" class="avatar-status" :class="online ? 'online' : 'offline'"></span>
  </div>
</template>

<script setup>
const props = defineProps({
  src: { type: String, default: null },
  name: { type: String, default: '' },
  id: { type: String, default: '' },
  size: { type: String, default: 'md' }, // xs, sm, md, lg, xl
  online: { type: Boolean, default: undefined },
  fallbackIcon: { type: String, default: null },
})

const imgError = ref(false)
const effectiveSrc = computed(() => (imgError.value ? null : props.src))

const initials = computed(() => {
  const words = props.name?.trim().split(/\s+/) || []
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return words[0]?.[0]?.toUpperCase() || '?'
})

const avatarColors = [
  '#d32f2f', '#c2185b', '#7b1fa2', '#512da8', '#303f9f',
  '#1976d2', '#0288d1', '#0097a7', '#00796b', '#388e3c',
  '#689f38', '#f57c00', '#e64a19', '#5d4037', '#455a64'
]

const avatarStyle = computed(() => {
  const hashStr = props.id || props.name || '?'
  let hash = 0
  for (let i = 0; i < hashStr.length; i++) {
    hash = hashStr.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % avatarColors.length
  return {
    backgroundColor: avatarColors[index],
    color: '#ffffff'
  }
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
.avatar-2xl { width: 112px; height: 112px; font-size: 36px; }

.avatar-img {
  width: 100%; height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--color-surface-3);
}
.avatar-initials {
  width: 100%; height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}
.fallback-icon {
  width: 50%;
  height: 50%;
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
