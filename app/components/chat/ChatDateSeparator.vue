<template>
  <div class="date-separator">
    <span class="date-label">{{ formattedDate }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  date: { type: String, required: true },
})

const formattedDate = computed(() => {
  const d = new Date(props.date)
  const now = new Date()

  // Strip time for clean day comparisons
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfMsg   = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  const diffDays = Math.round((startOfToday - startOfMsg) / 86400000)

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'

  // Current week (Mon–Sun within last 7 days) → weekday name
  if (diffDays < 7) {
    return d.toLocaleDateString([], { weekday: 'long' }) // e.g. "Monday"
  }

  // Older → "20 Sep 2025"
  return d.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' })
})
</script>

<style scoped>
.date-separator {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.125rem 0 0.625rem;
}
.date-label {
  font-size: 10.5px;
  font-weight: 600;
  color: var(--color-text-muted);
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  padding: 0.275rem 0.875rem;
  border-radius: var(--radius-full);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  box-shadow: var(--shadow-xs);
}
</style>
