<template>
  <AppModal :model-value="modelValue" title="User details" size="md" mobileFullscreen @update:model-value="$emit('update:modelValue', $event)">
    <div class="user-info" v-if="user">
      
      <!-- Profile Header -->
      <div class="user-hero-header">
        <div class="user-avatar-wrap">
          <AppAvatar :src="user.photoURL" :name="user.displayName" size="2xl" class="hero-avatar" fallbackIcon="lucide:user" />
          <div class="hero-status-indicator">
            <AppStatusIndicator :status="user.status || (user.isOnline ? 'online' : 'offline')" size="md" />
          </div>
        </div>
        <div class="user-hero-text">
          <h2 class="user-name">{{ user.displayName }}</h2>
          <p class="user-status-label">{{ capitalize(user.status || (user.isOnline ? 'online' : 'offline')) }}</p>
        </div>
      </div>

      <div class="section-divider"></div>

      <!-- Contact Details -->
      <div class="contact-section">
        <h3 class="section-title">Contact Information</h3>
        <div class="info-list">
          <!-- Email -->
          <div class="info-item">
            <Icon name="lucide:mail" size="20" class="info-icon text-primary" />
            <div class="info-content">
              <span class="info-label">Email</span>
              <span class="info-value" :class="{ 'text-muted': !user.email }">{{ user.email || 'N/A' }}</span>
            </div>
          </div>
          <!-- Account Type -->
          <div class="info-item">
            <Icon :name="user.provider === 'google.com' ? 'lucide:chrome' : (user.provider ? 'lucide:at-sign' : 'lucide:user')" size="20" class="info-icon text-primary" />
            <div class="info-content">
              <span class="info-label">Account Type</span>
              <span class="info-value capitalize" :class="{ 'text-muted': !user.provider }">{{ user.provider ? (user.provider === 'google.com' ? 'Google Account' : 'Email Account') : 'N/A' }}</span>
            </div>
          </div>
          <!-- Member since -->
          <div class="info-item">
            <Icon name="lucide:calendar" size="20" class="info-icon text-primary" />
            <div class="info-content">
              <span class="info-label">Member since</span>
              <span class="info-value" :class="{ 'text-muted': !user.createdAt }">{{ formatMemberSince(user.createdAt) || 'N/A' }}</span>
            </div>
          </div>
          <!-- Bio -->
          <div class="info-item" v-if="user.bio">
            <Icon name="lucide:align-left" size="20" class="info-icon text-primary" />
            <div class="info-content">
              <span class="info-label">Bio</span>
              <span class="info-value">{{ user.bio }}</span>
            </div>
          </div>
          <!-- Link -->
          <div class="info-item" v-if="user.link">
            <Icon name="lucide:link" size="20" class="info-icon text-primary" />
            <div class="info-content">
              <span class="info-label">Website / Link</span>
              <a :href="user.link" target="_blank" rel="noopener noreferrer" class="info-value link-text">{{ user.link }}</a>
            </div>
          </div>
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

function capitalize(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function formatMemberSince(dateString) {
  if (!dateString) return ''
  const d = dateString.toDate ? dateString.toDate() : new Date(dateString)
  if (isNaN(d)) return ''
  return d.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
}
</script>

<style scoped>
.user-info {
  display: flex;
  flex-direction: column;
}

.user-hero-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.user-avatar-wrap {
  position: relative;
  margin-bottom: 1rem;
}

.hero-avatar {
  border: 4px solid var(--color-surface);
  box-shadow: var(--shadow-sm);
  background: var(--color-surface);
}

.hero-status-indicator {
  position: absolute;
  bottom: 0.25rem;
  right: 0.25rem;
  border: 3px solid var(--color-surface);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface);
}

.user-hero-text {
  text-align: center;
}

.user-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 0.25rem 0;
}

.user-status-label {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin: 0;
}

.section-divider {
  height: 1px;
  background: var(--color-border);
  margin: 1.5rem 0;
}

.contact-section {
  display: flex;
  flex-direction: column;
}

.pb-0 {
  padding-bottom: 0;
}

.section-title {
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  margin-top: 0;
  margin-bottom: 1rem;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--color-navrail);
  border-radius: var(--radius-lg);
}

.info-icon {
  flex-shrink: 0;
}

.info-content {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.info-label {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-bottom: 0.125rem;
}

.info-value {
  font-size: 0.875rem;
  color: var(--color-text);
  line-height: 1.4;
  word-break: break-word;
}

.link-text {
  color: var(--color-primary);
  text-decoration: none;
}
.link-text:hover {
  text-decoration: underline;
}

.link-text {
  color: var(--color-primary);
  text-decoration: none;
}
.link-text:hover {
  text-decoration: underline;
}

.text-muted {
  color: var(--color-text-muted);
}

.capitalize {
  text-transform: capitalize;
}
</style>
