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
          <AppLogo size="54" />
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
  filter: blur(120px);
  opacity: 0.15;
}

html.dark .auth-blob {
  filter: blur(160px);
  opacity: 0.12;
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
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 3rem 2.5rem;
  width: 100%;
  max-width: 440px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02), 0 10px 30px rgba(60, 60, 120, 0.08), 0 0 0 1px var(--color-border);
  position: relative;
  z-index: 1;
}

html.dark .auth-container {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2), 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 0 1px var(--color-border);
}

.auth-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.auth-brand-name {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.02em;
}
</style>
