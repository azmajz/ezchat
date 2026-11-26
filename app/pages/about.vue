<template>
  <div class="about-page">

    <!-- ── Hero ── -->
    <section class="about-hero container">
      <div class="about-hero-inner animate-slide-up">
        <div class="section-badge">About</div>
        <h1 class="about-title">Built with love,<br><span class="gradient-text">shipped with speed.</span></h1>
        <p class="about-subtitle">
          EzChat is a passion project — a modern real-time messaging app designed to prove that great software doesn't have to be complicated.
        </p>
      </div>
    </section>

    <!-- ── App Story ── -->
    <section class="story-section container">
      <div class="story-grid">
        <div class="story-text animate-slide-up">
          <h2 class="story-title">What is EzChat?</h2>
          <p>
            EzChat is a full-featured real-time chat application built with <strong>Nuxt 4</strong> and <strong>Firebase</strong>. It supports one-on-one chats, group conversations, media sharing, and presence indicators — all wrapped in a sleek, responsive design that works beautifully on every device.
          </p>
          <p>
            The goal was simple: build a messaging app that is both a joy to use and a showcase of modern web technologies. No bloat. No unnecessary complexity. Just fast, beautiful chat.
          </p>
          <p>
            From the carefully crafted dark mode to the real-time typing indicators, every pixel was considered. EzChat is an evolving project, with new features added regularly.
          </p>
        </div>

        <div class="story-cards animate-fade-in" style="animation-delay: 150ms;">
          <div class="story-card">
            <div class="story-card-icon purple">
              <Icon name="lucide:layers" size="22" />
            </div>
            <div>
              <div class="story-card-title">Tech Stack</div>
              <div class="story-card-desc">Nuxt 4 · Vue 3 · Firebase · PWA</div>
            </div>
          </div>
          <div class="story-card">
            <div class="story-card-icon blue">
              <Icon name="lucide:message-square" size="22" />
            </div>
            <div>
              <div class="story-card-title">Features</div>
              <div class="story-card-desc">Real-time · Groups · Media · Dark mode</div>
            </div>
          </div>
          <div class="story-card">
            <div class="story-card-icon green">
              <Icon name="lucide:globe" size="22" />
            </div>
            <div>
              <div class="story-card-title">Deployment</div>
              <div class="story-card-desc">Firebase Hosting · PWA installable</div>
            </div>
          </div>
          <div class="story-card">
            <div class="story-card-icon pink">
              <Icon name="lucide:heart" size="22" />
            </div>
            <div>
              <div class="story-card-title">Philosophy</div>
              <div class="story-card-desc">Simple, fast, and beautiful</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Features highlight ── -->
    <section class="features-highlight container">
      <div class="section-badge">What's inside</div>
      <h2 class="section-title" style="margin-bottom: 2.5rem;">Everything you'd expect,<br>and nothing you wouldn't.</h2>

      <div class="features-list">
        <div v-for="feat in features" :key="feat.label" class="feat-row">
          <div class="feat-icon" :class="feat.color">
            <Icon :name="feat.icon" size="18" />
          </div>
          <div>
            <div class="feat-label">{{ feat.label }}</div>
            <div class="feat-detail">{{ feat.detail }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Developer Card ── -->
    <section class="dev-section container">
      <div class="dev-card animate-scale-in">
        <div class="dev-card-bg" />

        <div class="dev-avatar-wrap">
          <div class="dev-avatar">
            <span class="dev-initials">AA</span>
          </div>
          <div class="dev-status-dot" />
        </div>

        <div class="dev-info">
          <div class="dev-role-badge">
            <Icon name="lucide:code-2" size="12" />
            Developer & Designer
          </div>
          <h2 class="dev-name">Azeem Aijaz</h2>
          <p class="dev-bio">
            Full-stack developer with a passion for building clean, performant web applications. I designed and built EzChat from scratch — from the Firebase schema to the last animation easing. I believe great UI is not just about how it looks, but how it <em>feels</em> to use.
          </p>

          <div class="dev-tags">
            <span class="dev-tag" v-for="tag in devTags" :key="tag">{{ tag }}</span>
          </div>

          <div class="dev-links">
            <a href="https://github.com" target="_blank" rel="noopener" class="dev-link">
              <Icon name="lucide:github" size="16" />
              GitHub
            </a>
            <NuxtLink to="/home" class="dev-link primary">
              <Icon name="lucide:message-circle" size="16" />
              Try EzChat
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CTA ── -->
    <section class="about-cta container">
      <p class="about-cta-text">Want to chat the easy way?</p>
      <NuxtLink to="/register" class="btn btn-primary btn-cta-sm">
        <Icon name="lucide:rocket" size="16" />
        Get started for free
      </NuxtLink>
    </section>

  </div>
</template>

<script setup>
definePageMeta({
  layout: 'landing'
})

const features = [
  { icon: 'lucide:zap', label: 'Real-time messaging', detail: 'Powered by Firebase Firestore — messages arrive instantly, no polling.', color: 'purple' },
  { icon: 'lucide:users', label: 'Group conversations', detail: 'Create groups, add or remove members, and chat together.', color: 'blue' },
  { icon: 'lucide:image', label: 'Image & file sharing', detail: 'Send photos and files directly in the chat with inline previews.', color: 'pink' },
  { icon: 'lucide:moon', label: 'Dark mode', detail: 'A premium dark theme that is easy on the eyes and built into the design system.', color: 'teal' },
  { icon: 'lucide:shield-check', label: 'Secure authentication', detail: 'Email & password sign-up with email verification. Your data stays yours.', color: 'green' },
  { icon: 'lucide:smartphone', label: 'PWA — install anywhere', detail: 'Works on iOS, Android, and desktop as a native-feeling app.', color: 'orange' },
  { icon: 'lucide:activity', label: 'Presence & typing indicators', detail: 'See when contacts are online and when they\'re typing in real time.', color: 'purple' },
  { icon: 'lucide:search', label: 'User search', detail: 'Find anyone on EzChat by name or email and start chatting immediately.', color: 'blue' },
]

const devTags = ['Nuxt / Vue', 'Firebase', 'TypeScript', 'UI/UX Design', 'PWA', 'Real-time apps']
</script>

<style scoped>
/* ── Shared ── */
.container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.about-page {
  padding-bottom: 5rem;
}

.section-badge {
  display: inline-block;
  padding: 0.3rem 0.9rem;
  border-radius: 999px;
  background: var(--color-primary-subtle);
  border: 1px solid var(--color-primary-light);
  color: var(--color-primary);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.section-title {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 800;
  color: var(--color-text);
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.gradient-text {
  background: linear-gradient(135deg, var(--color-primary) 0%, #a855f7 50%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Hero ── */
.about-hero {
  padding: 5rem 1.5rem 3rem;
  text-align: center;
}

.about-hero-inner {
  max-width: 700px;
  margin: 0 auto;
}

.about-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900;
  color: var(--color-text);
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 1.25rem;
}

.about-subtitle {
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: var(--color-text-secondary);
  line-height: 1.65;
  max-width: 580px;
  margin: 0 auto;
}

/* ── Story ── */
.story-section {
  padding: 3rem 1.5rem 4rem;
}

.story-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.story-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.story-text p {
  color: var(--color-text-secondary);
  line-height: 1.75;
  margin-bottom: 1.1rem;
  font-size: 0.9375rem;
}
.story-text p strong {
  color: var(--color-text);
  font-weight: 600;
}
.story-text p:last-child {
  margin-bottom: 0;
}

.story-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.story-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.story-card:hover {
  transform: translateX(4px);
  box-shadow: var(--shadow-sm);
}

.story-card-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.story-card-icon.purple { background: rgba(129, 140, 248, 0.15); color: #818cf8; }
.story-card-icon.blue   { background: rgba(96, 165, 250, 0.12);  color: #60a5fa; }
.story-card-icon.green  { background: rgba(52, 211, 153, 0.12);  color: #34d399; }
.story-card-icon.pink   { background: rgba(244, 114, 182, 0.12); color: #f472b6; }

.story-card-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.15rem;
}
.story-card-desc {
  font-size: 0.775rem;
  color: var(--color-text-muted);
}

/* ── Features highlight ── */
.features-highlight {
  padding: 4rem 1.5rem;
  text-align: center;
}

.features-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  text-align: left;
  max-width: 820px;
  margin: 0 auto;
}

.feat-row {
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
  padding: 1rem 1.25rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  transition: transform 0.2s, border-color 0.2s;
}
.feat-row:hover {
  transform: translateY(-2px);
  border-color: var(--color-primary-light);
}

.feat-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 0.1rem;
}
.feat-icon.purple { background: rgba(129, 140, 248, 0.15); color: #818cf8; }
.feat-icon.blue   { background: rgba(96, 165, 250, 0.12);  color: #60a5fa; }
.feat-icon.pink   { background: rgba(244, 114, 182, 0.12); color: #f472b6; }
.feat-icon.teal   { background: rgba(45, 212, 191, 0.12);  color: #2dd4bf; }
.feat-icon.green  { background: rgba(52, 211, 153, 0.12);  color: #34d399; }
.feat-icon.orange { background: rgba(251, 146, 60, 0.12);  color: #fb923c; }

.feat-label {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.2rem;
}
.feat-detail {
  font-size: 0.775rem;
  color: var(--color-text-muted);
  line-height: 1.5;
}

/* ── Dev Card ── */
.dev-section {
  padding: 4rem 1.5rem;
}

.dev-card {
  position: relative;
  display: flex;
  gap: 3rem;
  align-items: flex-start;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 24px;
  padding: 3rem;
  overflow: hidden;
  max-width: 860px;
  margin: 0 auto;
}

.dev-card-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.03) 50%, transparent 100%);
  pointer-events: none;
}

.dev-avatar-wrap {
  position: relative;
  flex-shrink: 0;
}

.dev-avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary) 0%, #a855f7 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.35);
}

.dev-initials {
  font-size: 2rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.04em;
}

.dev-status-dot {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--color-online);
  border: 3px solid var(--color-surface);
}

.dev-info {
  flex: 1;
  position: relative;
  z-index: 1;
}

.dev-role-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.8rem;
  background: var(--color-primary-subtle);
  border: 1px solid var(--color-primary-light);
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: 0.03em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.dev-name {
  font-size: 2rem;
  font-weight: 900;
  color: var(--color-text);
  letter-spacing: -0.03em;
  margin-bottom: 1rem;
  line-height: 1.1;
}

.dev-bio {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  line-height: 1.75;
  margin-bottom: 1.5rem;
  max-width: 540px;
}
.dev-bio em {
  color: var(--color-primary);
  font-style: normal;
  font-weight: 600;
}

.dev-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.dev-tag {
  display: inline-block;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: var(--color-surface-3);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
}

.dev-links {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.dev-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1.25rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
  background: var(--color-surface-3);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  text-decoration: none;
  transition: all 0.2s;
}
.dev-link:hover {
  background: var(--color-surface-4);
  border-color: var(--color-border-strong);
}

.dev-link.primary {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}
.dev-link.primary:hover {
  background: var(--color-primary-hover);
  border-color: var(--color-primary-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
}

/* ── About CTA ── */
.about-cta {
  text-align: center;
  padding: 0 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.about-cta-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
}

.btn-cta-sm {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 2rem;
  font-size: 0.9375rem;
  font-weight: 700;
  border-radius: 999px;
  background: var(--color-primary);
  color: #fff;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn-cta-sm:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .story-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .dev-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2rem 1.5rem;
    gap: 1.5rem;
  }
  .dev-bio {
    max-width: 100%;
  }
  .dev-tags, .dev-links {
    justify-content: center;
  }
  .features-list {
    grid-template-columns: 1fr;
  }
  .about-hero {
    padding: 3.5rem 1rem 2rem;
  }
}
</style>
