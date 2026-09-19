<template>
  <div class="loader" :class="[`loader-${size}`]">
    <div class="spinner" :style="color ? `--spinner-color: ${color}` : ''"></div>
  </div>
</template>

<script setup>
defineProps({
  size: { type: String, default: 'md' }, // sm, md, lg
  color: { type: String, default: null },
})
</script>

<style scoped>
.loader { display: flex; align-items: center; justify-content: center; }
.loader-sm { width: 16px; height: 16px; }
.loader-md { width: 28px; height: 28px; }
.loader-lg { width: 44px; height: 44px; }

.spinner {
  width: 100%; height: 100%;
  border-radius: 50%;
  border: 2.5px solid transparent;
  border-top-color: var(--spinner-color, var(--color-primary));
  border-right-color: var(--spinner-color, var(--color-primary));
  animation: spin 0.7s linear infinite;
}
</style>
