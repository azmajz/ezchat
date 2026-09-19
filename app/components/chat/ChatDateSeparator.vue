<template>
  <div class="date-separator">
    <span class="date-label">{{ formattedDate }}</span>
  </div>
</template>

<script setup>
const props = defineProps({ 
  date: { type: String, required: true },
  sameDay: { type: Boolean, default: false }
})

const formattedDate = computed(() => {
  const d = new Date(props.date)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  
  const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  if (props.sameDay) return timeStr

  if (d.toDateString() === today.toDateString()) return `Today ${timeStr}`
  if (d.toDateString() === yesterday.toDateString()) return `Yesterday ${timeStr}`
  return d.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }) + `, ${timeStr}`
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
  letter-spacing: 0.02em;
  text-transform: uppercase;
  box-shadow: var(--shadow-xs);
}
</style>
