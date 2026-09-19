<template>
  <div class="legal-page">
    <header class="legal-header">
      <NuxtLink to="/" class="btn-icon back-btn" aria-label="Go back">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
      </NuxtLink>
      <div class="legal-brand">
        <AppLogo size="24" />
        <span class="legal-brand-name">EzChat</span>
      </div>
    </header>

    <main class="legal-content">
      <h1>Privacy Policy</h1>
      <p class="last-updated">Last updated: {{ new Date().toLocaleDateString() }}</p>

      <section class="legal-section">
        <h2>1. Information We Collect</h2>
        <p>At EzChat, we take your privacy seriously. We only collect the information necessary to provide you with a fast, reliable, and secure messaging experience. This includes:</p>
        <ul>
          <li><strong>Account Information:</strong> When you register, we collect your display name, email address, and profile picture.</li>
          <li><strong>Messages & Content:</strong> We temporarily process and store the messages, images, and files you send to deliver them to your recipients.</li>
          <li><strong>Usage Data:</strong> We collect anonymous, aggregated data on how the app is used to help us improve performance and squash bugs.</li>
        </ul>
      </section>

      <section class="legal-section">
        <h2>2. How We Use Your Information</h2>
        <p>Your information is used strictly to operate the EzChat service. Specifically, we use it to:</p>
        <ul>
          <li>Authenticate your account and keep it secure.</li>
          <li>Deliver your messages in real-time.</li>
          <li>Provide customer support when you reach out to us.</li>
          <li>Prevent spam, abuse, and malicious activity.</li>
        </ul>
      </section>

      <section class="legal-section">
        <h2>3. Data Security & Storage</h2>
        <p>We use industry-standard encryption to protect your data in transit and at rest. Your data is stored on secure cloud infrastructure, and we do not sell or share your personal information with third parties for marketing purposes.</p>
      </section>

      <section class="legal-section">
        <h2>4. Your Rights</h2>
        <p>You have the right to access, update, or delete your personal information at any time. You can do this directly from the Settings page within the app. If you wish to completely delete your account and all associated data, you may contact our support team.</p>
      </section>

      <section class="legal-section">
        <h2>5. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time as our app evolves. We will notify you of any significant changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>
      </section>

      <div class="legal-footer">
        <p>If you have any questions about this Privacy Policy, please contact us at support@ezchat.example.com.</p>
      </div>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false, // Use a standalone layout
  auth: false,   // Accessible without logging in
})
</script>

<style scoped>
.legal-page {
  height: 100dvh;
  overflow-y: auto;
  background: var(--color-surface);
  color: var(--color-text);
  display: flex;
  flex-direction: column;
}

.legal-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: rgba(var(--color-surface-rgb), 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.legal-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
}

.legal-brand-name {
  font-weight: 700;
  font-size: var(--font-size-md);
  color: var(--color-text);
}

.legal-content {
  flex: 1;
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
  padding: 3rem 1.5rem 5rem;
}

.legal-content h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--color-text);
  letter-spacing: -0.02em;
}

.last-updated {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  margin-bottom: 3rem;
}

.legal-section {
  margin-bottom: 2.5rem;
}

.legal-section h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--color-text);
}

.legal-section p {
  color: var(--color-text-muted);
  line-height: 1.7;
  margin-bottom: 1rem;
}

.legal-section ul {
  list-style: none;
  padding-left: 0;
  margin-bottom: 1rem;
}

.legal-section li {
  color: var(--color-text-muted);
  line-height: 1.7;
  margin-bottom: 0.75rem;
  padding-left: 1.5rem;
  position: relative;
}

.legal-section li::before {
  content: "•";
  color: var(--color-primary);
  position: absolute;
  left: 0.25rem;
  font-size: 1.2rem;
  line-height: 1.7;
}

.legal-section li strong {
  color: var(--color-text);
  font-weight: 600;
}

.legal-footer {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  text-align: center;
}

@media (max-width: 640px) {
  .legal-content {
    padding: 2rem 1rem 4rem;
  }
  
  .legal-content h1 {
    font-size: 2rem;
  }
}
</style>
