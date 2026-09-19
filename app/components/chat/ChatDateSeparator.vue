<template>
  <div class="date-separator">
    <span class="date-label">{{ formattedDate }}</span>
  </div>
</template>

<script setup>
const props = defineProps({ date: { type: String, required: true } })

const formattedDate = computed(() => {
  const d = new Date(props.date)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (d.toDateString() === today.toDateString()) return 'Today'
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday'
  return d.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })
})
</script>

<style scoped>
.date-separator {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0 0.5rem;
}
.date-label {
  font-size: var(--font-size-xs);
  font-weight: 500;
  color: var(--color-text-muted);
  background: var(--color-surface-3);
  padding: 0.3rem 0.875rem;
  border-radius: var(--radius-full);
}
</style>
