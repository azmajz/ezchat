<template>
  <div class="landing-layout">
    <!-- Background Blobs from Auth for consistent premium feel -->
    <div class="landing-bg">
      <div class="auth-blob auth-blob-1"></div>
      <div class="auth-blob auth-blob-2"></div>
      <div class="auth-blob auth-blob-3"></div>
    </div>

    <!-- Header Navbar -->
    <header class="landing-header">
      <div class="container header-container">
        <NuxtLink to="/home" class="brand">
          <AppLogo size="40" />
          <span class="brand-name">EzChat</span>
        </NuxtLink>
        <nav class="header-nav">
          <NuxtLink to="/login" class="btn btn-ghost">Login</NuxtLink>
          <NuxtLink to="/register" class="btn btn-primary">Get Started</NuxtLink>
          <button class="btn btn-secondary theme-btn" @click="toggleTheme" :title="theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'">
            <Icon :name="theme === 'dark' ? 'lucide:sun' : 'lucide:moon'" size="16" />
            {{ theme === 'dark' ? 'Light' : 'Dark' }}
          </button>
        </nav>
      </div>
    </header>

    <!-- Page Content -->
    <main class="landing-main">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="landing-footer">
      <div class="container footer-container">
        <div class="footer-left">
          <AppLogo size="24" />
          <span class="footer-brand">EzChat &copy; {{ new Date().getFullYear() }}</span>
        </div>
        <div class="footer-links">
          <NuxtLink to="/privacy-policy" class="footer-link">Privacy Policy</NuxtLink>
          <a href="#" class="footer-link">Terms of Service</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const { theme, toggleTheme } = useTheme()
</script>

<style scoped>
.landing-layout {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: var(--color-surface-2);
  position: relative;
  overflow-x: hidden;
}

/* Reusing auth blobs from auth.vue */
.landing-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
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
html.dark .auth-blob-1 {
  width: 600px; height: 600px;
  background: linear-gradient(135deg, var(--color-primary) 0%, #a855f7 100%);
  opacity: 0.18;
}
.auth-blob-2 {
  width: 400px; height: 400px;
  background: #8b5cf6;
  bottom: 20%; right: -100px;
}
.auth-blob-3 {
  width: 300px; height: 300px;
  background: #06b6d4;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.landing-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--color-surface-2);
  border-bottom: 1px solid var(--color-border);
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
}
.brand-name {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-text);
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.theme-btn {
  margin-right: 0.5rem;
}

.landing-main {
  flex: 1;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
}

.landing-footer {
  border-top: 1px solid var(--color-border);
  padding: 2rem 0;
  position: relative;
  z-index: 1;
  background: var(--color-surface);
}

.footer-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-text-muted);
}
.footer-brand {
  font-weight: 500;
  font-size: var(--font-size-sm);
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}
.footer-link {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color var(--transition-fast);
}
.footer-link:hover {
  color: var(--color-primary);
}
</style>
