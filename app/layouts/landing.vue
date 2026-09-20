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

        <!-- Desktop Nav -->
        <nav class="header-nav desktop-nav">
          <NuxtLink to="/login" class="btn btn-ghost">Login</NuxtLink>
          <NuxtLink to="/register" class="btn btn-primary">Get Started</NuxtLink>
          <button
            class="theme-toggle"
            @click="toggleTheme"
            :title="theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
            :aria-label="theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          >
            <Icon :name="theme === 'dark' ? 'lucide:sun' : 'lucide:moon'" size="18" class="theme-icon" />
          </button>
        </nav>

        <!-- Mobile Right Controls -->
        <div class="mobile-controls">
          <button
            class="theme-toggle"
            @click="toggleTheme"
            :title="theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
            :aria-label="theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          >
            <Icon :name="theme === 'dark' ? 'lucide:sun' : 'lucide:moon'" size="18" class="theme-icon" />
          </button>
          <button
            class="hamburger"
            @click="mobileOpen = !mobileOpen"
            :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
            :class="{ open: mobileOpen }"
          >
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Drawer Overlay -->
    <Transition name="fade">
      <div v-if="mobileOpen" class="mobile-overlay" @click="mobileOpen = false" />
    </Transition>

    <!-- Mobile Drawer -->
    <Transition name="slide-down">
      <nav v-if="mobileOpen" class="mobile-drawer">
        <NuxtLink to="/login" class="mobile-nav-link" @click="mobileOpen = false">
          <Icon name="lucide:log-in" size="18" />
          Login
        </NuxtLink>
        <NuxtLink to="/register" class="mobile-nav-link mobile-nav-cta" @click="mobileOpen = false">
          <Icon name="lucide:rocket" size="18" />
          Get Started
        </NuxtLink>
      </nav>
    </Transition>

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
const mobileOpen = ref(false)
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

/* ── Header ── */
.landing-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-surface-2);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(12px);
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

/* ── Desktop Nav ── */
.header-nav {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* ── Theme Toggle ── */
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s;
  flex-shrink: 0;
}
.theme-toggle:hover {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
  transform: rotate(20deg) scale(1.1);
}
.theme-icon {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.theme-toggle:active .theme-icon {
  transform: rotate(180deg);
}

/* ── Mobile controls (hidden on desktop) ── */
.mobile-controls {
  display: none;
  align-items: center;
  gap: 0.5rem;
}

/* ── Hamburger ── */
.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  cursor: pointer;
  padding: 0;
  transition: background 0.2s, border-color 0.2s;
}
.hamburger:hover {
  background: var(--color-surface-2);
}
.bar {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--color-text);
  border-radius: 2px;
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform-origin: center;
}
.hamburger.open .bar:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.hamburger.open .bar:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}
.hamburger.open .bar:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* ── Mobile Overlay ── */
.mobile-overlay {
  position: fixed;
  inset: 0;
  z-index: 90;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(4px);
}

/* ── Mobile Drawer ── */
.mobile-drawer {
  position: fixed;
  top: 73px;
  left: 0;
  right: 0;
  z-index: 95;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 1rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border-radius: 12px;
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--color-text);
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}
.mobile-nav-link:hover {
  background: var(--color-surface-2);
  color: var(--color-primary);
}
.mobile-nav-cta {
  background: var(--color-primary);
  color: #fff !important;
  justify-content: center;
  margin-top: 0.25rem;
}
.mobile-nav-cta:hover {
  background: var(--color-primary-dark, var(--color-primary));
  opacity: 0.9;
  color: #fff !important;
}

/* ── Transitions ── */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: opacity 0.25s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .desktop-nav {
    display: none;
  }
  .mobile-controls {
    display: flex;
  }
  .header-container {
    height: 64px;
  }
}

/* ── Main / Footer ── */
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
