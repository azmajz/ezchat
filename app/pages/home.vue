<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section container">
      <div class="hero-content">
        <h1 class="hero-title animate-slide-up">
          Chat made <span class="text-primary">easy</span> for modern teams.
        </h1>
        <p class="hero-subtitle animate-slide-up" style="animation-delay: 100ms;">
          Experience lightning-fast messaging, beautiful design, and seamless collaboration. Built for people who value speed and aesthetics.
        </p>
        <div class="hero-actions animate-slide-up" style="animation-delay: 200ms;">
          <NuxtLink to="/register" class="btn btn-primary btn-lg">Start Chatting Now</NuxtLink>
          <NuxtLink to="/login" class="btn btn-secondary btn-lg">Log in</NuxtLink>
        </div>
      </div>
      <div class="hero-visual animate-fade-in" style="animation-delay: 300ms;">
        <div class="mock-ui">
          <div class="mock-header">
            <div class="mock-dots">
              <span></span><span></span><span></span>
            </div>
          </div>
          <div class="mock-body">
            <div class="mock-message received">
              <div class="mock-avatar"></div>
              <div class="mock-bubble">Hey! Have you seen the new EzChat UI?</div>
            </div>
            <div class="mock-message sent">
              <div class="mock-bubble">Yeah, it looks incredible. So smooth! ✨</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section container">
      <div class="feature-card">
        <div class="feature-icon"><Icon name="lucide:zap" size="32" /></div>
        <h3 class="feature-title">Lightning Fast</h3>
        <p class="feature-desc">Real-time messaging powered by Firebase ensures your messages are delivered instantly.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon"><Icon name="lucide:palette" size="32" /></div>
        <h3 class="feature-title">Beautiful Design</h3>
        <p class="feature-desc">A premium, modern interface with a sweeping dark mode that is easy on the eyes.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon"><Icon name="lucide:shield-check" size="32" /></div>
        <h3 class="feature-title">Secure Auth</h3>
        <p class="feature-desc">Robust authentication to keep your conversations private and completely secure.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'landing',
  middleware: 'guest'
})
</script>

<style scoped>
.home-page {
  padding-bottom: 4rem;
}

.hero-section {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 6rem 1.5rem;
  min-height: 70vh;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  line-height: 1.1;
  color: var(--color-text);
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.text-primary {
  color: var(--color-primary);
}

.hero-subtitle {
  font-size: clamp(1.125rem, 2vw, 1.25rem);
  color: var(--color-text-secondary);
  margin-bottom: 2.5rem;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.btn-lg {
  padding: 0.875rem 2rem;
  font-size: var(--font-size-md);
}

/* Mock UI */
.hero-visual {
  margin-top: 4rem;
  width: 100%;
  max-width: 700px;
  perspective: 1000px;
}

.mock-ui {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-modal);
  overflow: hidden;
  transform: rotateX(5deg) translateY(0);
  transition: transform var(--transition-slow);
}
.mock-ui:hover {
  transform: rotateX(0) translateY(-5px);
}

.mock-header {
  height: 48px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface-2);
  display: flex;
  align-items: center;
  padding: 0 1rem;
}

.mock-dots {
  display: flex;
  gap: 6px;
}
.mock-dots span {
  width: 12px; height: 12px;
  border-radius: 50%;
  background: var(--color-border);
}
.mock-dots span:nth-child(1) { background: #ff5f56; }
.mock-dots span:nth-child(2) { background: #ffbd2e; }
.mock-dots span:nth-child(3) { background: #27c93f; }

.mock-body {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: var(--color-surface);
}

.mock-message {
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
}
.mock-message.sent {
  justify-content: flex-end;
}
.mock-avatar {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: var(--color-primary-light);
}
.mock-bubble {
  padding: 0.75rem 1rem;
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  max-width: 80%;
  box-shadow: var(--shadow-sm);
}
.received .mock-bubble {
  background: var(--color-surface-3);
  color: var(--color-text);
  border-bottom-left-radius: 4px;
}
.sent .mock-bubble {
  background: var(--color-primary);
  color: white;
  border-bottom-right-radius: 4px;
}

/* Features */
.features-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 4rem 1.5rem;
  margin-top: 2rem;
}

.feature-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 2rem;
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}
.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary-light);
}

.feature-icon {
  width: 64px; height: 64px;
  border-radius: var(--radius-md);
  background: var(--color-primary-light);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.feature-title {
  font-size: var(--font-size-lg);
  color: var(--color-text);
  margin-bottom: 0.75rem;
}

.feature-desc {
  color: var(--color-text-secondary);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 4rem 1.5rem;
  }
  .hero-actions {
    flex-direction: column;
  }
  .btn-lg {
    width: 100%;
  }
  .mock-body {
    padding: 1rem;
  }
}
</style>
