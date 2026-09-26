<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="modal-overlay"
        :class="{ 'overlay-mobile-fs': mobileFullscreen }"
        @click.self="$emit('update:modelValue', false)"
      >
        <div class="modal-box" :class="[`modal-${size}`, { 'modal-mobile-fs': mobileFullscreen }]" role="dialog" :aria-label="title">
          <div v-if="title || $slots.header" class="modal-header">
            <slot name="header">
              <h2 class="modal-title">{{ title }}</h2>
            </slot>
            <button class="btn-icon modal-close" @click="$emit('update:modelValue', false)" aria-label="Close modal">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div class="modal-body">
            <slot />
          </div>
          <div v-if="$slots.footer" class="modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  modelValue: Boolean,
  title: { type: String, default: '' },
  size: { type: String, default: 'md' },
  mobileFullscreen: { type: Boolean, default: false }
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: var(--color-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-box {
  background: var(--color-surface-2);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-modal);
  width: 100%;
  max-height: 90dvh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

@media (max-width: 767px) {
  .overlay-mobile-fs {
    padding: 0;
  }
  .modal-mobile-fs {
    max-height: 100dvh;
    height: 100dvh;
    border-radius: 0;
  }
}

.modal-sm { max-width: 380px; }
.modal-md { max-width: 480px; }
.modal-lg { max-width: 600px; }

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}

.modal-title { font-size: var(--font-size-lg); font-weight: 600; }

.modal-body { padding: 1.5rem; overflow-y: auto; flex: 1; }

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--color-border);
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  flex-shrink: 0;
}

.modal-enter-active { transition: opacity 200ms ease; }
.modal-leave-active { transition: opacity 180ms ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-active .modal-box, .modal-leave-active .modal-box {
  transition: transform 200ms ease, opacity 200ms ease;
}
.modal-enter-from .modal-box, .modal-leave-to .modal-box {
  transform: scale(0.95);
  opacity: 0;
}
</style>
