<template>
  <div 
    class="status-indicator" 
    :class="[`status-${status}`, `size-${size}`]"
    :title="status"
  ></div>
</template>

<script setup>
defineProps({
  status: {
    type: String,
    default: 'online', // 'online', 'away', 'busy', 'offline'
  },
  size: {
    type: String,
    default: 'md', // 'sm', 'md', 'lg'
  }
})
</script>

<style scoped>
.status-indicator {
  display: inline-block;
  border-radius: 50%;
  border: 2px solid var(--color-surface);
  flex-shrink: 0;
  box-sizing: border-box;
}

/* Sizes */
.size-sm {
  width: 12px;
  height: 12px;
  border-width: 1.5px;
}
.size-md {
  width: 16px;
  height: 16px;
  border-width: 2px;
}
.size-lg {
  width: 24px;
  height: 24px;
  border-width: 3px;
}

/* Colors */
.status-online {
  background-color: #22c55e; /* green-500 */
}
.status-away {
  background-color: #eab308; /* yellow-500 */
}
.status-busy {
  background-color: #ef4444; /* red-500 */
}
.status-offline {
  background-color: #9ca3af; /* gray-400 */
}
</style>
