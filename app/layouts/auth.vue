<template>
  <div class="auth-layout">
    <div class="auth-bg">
      <div class="auth-blob auth-blob-1"></div>
      <div class="auth-blob auth-blob-2"></div>
      <div class="auth-blob auth-blob-3"></div>
    </div>

    <div class="auth-container animate-scale-in">
      <div class="auth-brand">
        <div class="auth-logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="10" fill="var(--color-primary)"/>
            <path d="M8 10h16M8 16h10M8 22h13" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="25" cy="22" r="4" fill="white"/>
          </svg>
        </div>
        <span class="auth-brand-name">EzChat</span>
      </div>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.auth-layout {
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface-2);
  position: relative;
  overflow: hidden;
  padding: 1rem;
}

.auth-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.auth-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
}

.auth-blob-1 {
  width: 500px; height: 500px;
  background: var(--color-primary);
  top: -200px; left: -150px;
}
.auth-blob-2 {
  width: 400px; height: 400px;
  background: #8b5cf6;
  bottom: -150px; right: -100px;
}
.auth-blob-3 {
  width: 300px; height: 300px;
  background: #06b6d4;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
}

.auth-container {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 2.5rem;
  width: 100%;
  max-width: 420px;
  box-shadow: var(--shadow-modal);
  position: relative;
  z-index: 1;
}

.auth-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.auth-brand-name {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-text);
}
</style>
