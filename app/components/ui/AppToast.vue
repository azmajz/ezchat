<template>
  <Teleport to="body">
    <div class="toast-container">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="toast"
          :class="`toast-${toast.type}`"
        >
          <span class="toast-icon">
            <svg v-if="toast.type === 'success'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            <svg v-else-if="toast.type === 'error'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </span>
          {{ toast.message }}
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
const { toasts } = useUI()
</script>

<style scoped>
.toast-container {
  position: fixed; bottom: 1.5rem; left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex; flex-direction: column; gap: 0.5rem;
  pointer-events: none;
}
.toast {
  display: flex; align-items: center; gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm); font-weight: 500;
  box-shadow: var(--shadow-md);
  white-space: nowrap;
  pointer-events: auto;
}
.toast-success { background: var(--color-success); color: white; }
.toast-error { background: var(--color-error); color: white; }
.toast-info { background: var(--color-text); color: var(--color-surface); }

.toast-enter-active, .toast-leave-active { transition: all 250ms ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(10px); }
</style>
