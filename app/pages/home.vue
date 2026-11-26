<template>
  <div class="home-page">

    <!-- ══════════════════════════════════════
         HERO — split layout
    ══════════════════════════════════════ -->
    <section class="hero">
      <div class="hero-left">
        <div class="hero-badge reveal-immediate" style="--delay: 0ms">
          <span class="badge-dot" />
          <span>Live now · Real-time messaging</span>
        </div>

        <h1 class="hero-title reveal-immediate" style="--delay: 70ms">
          The chat app<br>
          that gets out of<br>
          <span class="grad">your way.</span>
        </h1>

        <p class="hero-sub reveal-immediate" style="--delay: 140ms">
          Fast, beautiful, and distraction-free messaging. One-on-one or in groups — EzChat just works.
        </p>

        <div class="hero-actions reveal-immediate" style="--delay: 210ms">
          <NuxtLink to="/register" class="btn-cta">
            <Icon name="lucide:message-circle" size="18" />
            Start chatting free
          </NuxtLink>
          <NuxtLink to="/login" class="btn-ghost-cta">
            Sign in
            <Icon name="lucide:arrow-right" size="15" />
          </NuxtLink>
        </div>

        <div class="hero-social-proof reveal-immediate" style="--delay: 280ms">
          <div class="sp-avatars">
            <div class="sp-av" style="background: linear-gradient(135deg,#818cf8,#6366f1)" />
            <div class="sp-av" style="background: linear-gradient(135deg,#34d399,#059669)" />
            <div class="sp-av" style="background: linear-gradient(135deg,#f472b6,#ec4899)" />
            <div class="sp-av" style="background: linear-gradient(135deg,#fb923c,#f59e0b)" />
          </div>
          <span class="sp-text">Free to use · No credit card</span>
        </div>
      </div>

      <!-- ── 3 stacked chat windows ── -->
      <div class="hero-right animate-fade-in" style="animation-delay:200ms">
        <div class="windows-stack">

          <!-- Window 1 — DM chat (front) -->
          <div class="chat-win chat-win-front">
            <div class="win-bar">
              <div class="win-dots"><span class="wd r"/><span class="wd y"/><span class="wd g"/></div>
              <div class="win-title">
                <div class="win-av" style="background:linear-gradient(135deg,#818cf8,#6366f1)">S</div>
                <div>
                  <div class="win-name">Sarah K.</div>
                  <div class="win-status"><span class="online-dot"/>Online</div>
                </div>
              </div>
              <div class="win-actions">
                <div class="win-btn-ic"><Icon name="lucide:phone" size="13"/></div>
                <div class="win-btn-ic"><Icon name="lucide:video" size="13"/></div>
              </div>
            </div>

            <div class="win-body">
              <!-- Date separator -->
              <div class="date-sep"><span>Today</span></div>

              <div class="msg-row received">
                <div class="msg-av" style="background:linear-gradient(135deg,#818cf8,#6366f1)">S</div>
                <div class="msg-col">
                  <div class="bubble recv-bubble">
                    Hey! Did you check out the new EzChat update? 👀
                  </div>
                  <div class="msg-meta">Sarah · 2:38 PM</div>
                </div>
              </div>

              <div class="msg-row sent">
                <div class="msg-col right-col">
                  <div class="bubble sent-bubble">
                    Just did — the UI is 🔥 so clean
                  </div>
                  <div class="msg-meta right-meta">2:39 PM · <Icon name="lucide:check-check" size="11" class="read-tick"/></div>
                </div>
              </div>

              <div class="msg-row received">
                <div class="msg-av" style="background:linear-gradient(135deg,#818cf8,#6366f1)">S</div>
                <div class="msg-col">
                  <div class="bubble recv-bubble">
                    The dark mode is absolutely chef's kiss 🤌
                  </div>
                  <div class="msg-meta">Sarah · 2:40 PM</div>
                </div>
              </div>

              <div class="msg-row sent">
                <div class="msg-col right-col">
                  <div class="bubble sent-bubble">
                    Real-time too — messages pop instantly ⚡
                  </div>
                  <div class="msg-meta right-meta">2:41 PM · <Icon name="lucide:check-check" size="11" class="read-tick"/></div>
                </div>
              </div>

              <div class="msg-row received">
                <div class="msg-av" style="background:linear-gradient(135deg,#818cf8,#6366f1)">S</div>
                <div class="typing-bubble">
                  <span/><span/><span/>
                </div>
              </div>
            </div>

            <!-- Composer -->
            <div class="win-composer">
              <div class="composer-box">
                <Icon name="lucide:paperclip" size="16" class="comp-icon"/>
                <span class="comp-placeholder">Type a message…</span>
                <div class="comp-send"><Icon name="lucide:send" size="14"/></div>
              </div>
            </div>
          </div>

          <!-- Window 2 — Group chat (back-left) -->
          <div class="chat-win chat-win-back-l">
            <div class="win-bar">
              <div class="win-dots"><span class="wd r"/><span class="wd y"/><span class="wd g"/></div>
              <div class="win-title">
                <div class="win-av group-av">
                  <Icon name="lucide:users" size="13"/>
                </div>
                <div>
                  <div class="win-name">Design Team</div>
                  <div class="win-status">4 members</div>
                </div>
              </div>
            </div>
            <div class="win-body compact">
              <div class="date-sep"><span>Yesterday</span></div>
              <div class="msg-row received">
                <div class="msg-av" style="background:linear-gradient(135deg,#34d399,#059669)">A</div>
                <div class="msg-col">
                  <div class="sender-name">Alex</div>
                  <div class="bubble recv-bubble">New mockups are ready 🎨</div>
                </div>
              </div>
              <div class="msg-row received">
                <div class="msg-av" style="background:linear-gradient(135deg,#f472b6,#ec4899)">M</div>
                <div class="msg-col">
                  <div class="sender-name">Maya</div>
                  <div class="bubble recv-bubble">Love the color palette!</div>
                </div>
              </div>
              <div class="msg-row sent">
                <div class="msg-col right-col">
                  <div class="bubble sent-bubble">Shipping it today 🚀</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Window 3 — Another DM (back-right) -->
          <div class="chat-win chat-win-back-r">
            <div class="win-bar">
              <div class="win-dots"><span class="wd r"/><span class="wd y"/><span class="wd g"/></div>
              <div class="win-title">
                <div class="win-av" style="background:linear-gradient(135deg,#fb923c,#f59e0b)">J</div>
                <div>
                  <div class="win-name">James R.</div>
                  <div class="win-status">Last seen 5m ago</div>
                </div>
              </div>
            </div>
            <div class="win-body compact">
              <div class="msg-row sent">
                <div class="msg-col right-col">
                  <div class="bubble sent-bubble">Can you review my PR?</div>
                </div>
              </div>
              <div class="msg-row received">
                <div class="msg-av" style="background:linear-gradient(135deg,#fb923c,#f59e0b)">J</div>
                <div class="msg-col">
                  <div class="bubble recv-bubble">On it! Give me 10 min 👍</div>
                </div>
              </div>
              <div class="msg-row received">
                <div class="msg-av" style="background:linear-gradient(135deg,#fb923c,#f59e0b)">J</div>
                <div class="msg-col">
                  <div class="bubble recv-bubble img-msg">
                    <div class="img-placeholder">
                      <Icon name="lucide:image" size="20"/>
                      <span>screenshot.png</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         LOGOS / TRUST STRIP
    ══════════════════════════════════════ -->
    <div class="trust-strip">
      <span class="trust-label">Powered by</span>
      <div class="trust-items">
        <div class="trust-item"><Icon name="lucide:flame" size="16"/> Firebase</div>
        <div class="trust-sep"/>
        <div class="trust-item"><Icon name="lucide:triangle" size="16"/> Nuxt 4</div>
        <div class="trust-sep"/>
        <div class="trust-item"><Icon name="lucide:zap" size="16"/> Vue 3</div>
        <div class="trust-sep"/>
        <div class="trust-item"><Icon name="lucide:smartphone" size="16"/> PWA</div>
      </div>
    </div>

    <!-- ══════════════════════════════════════
         DEVICE SHOWCASE — desktop + mobile frames
    ══════════════════════════════════════ -->
    <section class="device-showcase container reveal">
      <div class="section-head">
        <div class="sec-badge">Interface</div>
        <h2 class="sec-title">Works everywhere, beautifully.</h2>
        <p class="sec-desc">Every screen is crafted to feel native — whether you're on desktop or mobile.</p>
      </div>

      <!-- Device view tabs with button progress -->
      <div class="dv-tabs">
        <button
          v-for="dv in deviceViews"
          :key="dv.id"
          class="dv-tab"
          :class="{ active: activeDevice === dv.id }"
          @click="selectDevice(dv.id)"
        >
          <span
            v-if="activeDevice === dv.id"
            class="tab-fill"
            :style="{ width: `${deviceProgress}%` }"
          />
          <Icon :name="dv.icon" size="15" class="tab-ic"/>
          <span class="tab-lbl">{{ dv.label }}</span>
        </button>
      </div>

      <div class="device-stage">
        <div class="device-ambient-glow" />
        <Transition name="dv-fade" mode="out-in">

        <!-- ── DESKTOP VIEW ── -->
        <div v-if="activeDevice === 'desktop'" key="desktop" class="dv-panel">
          <!-- Browser chrome frame -->
          <div class="browser-frame">
            <div class="browser-chrome">
              <div class="bc-dots"><span class="wd r"/><span class="wd y"/><span class="wd g"/></div>
              <div class="bc-bar">
                <div class="bc-url">
                  <Icon name="lucide:lock" size="11"/>
                  <span>ezchat.app/chat</span>
                </div>
              </div>
              <div class="bc-actions">
                <div class="bc-btn-ic"><Icon name="lucide:refresh-cw" size="11"/></div>
                <div class="bc-btn-ic"><Icon name="lucide:more-horizontal" size="11"/></div>
              </div>
            </div>

            <!-- App inside browser -->
            <div class="browser-body">
              <!-- Nav rail -->
              <div class="app-navrail">
                <div class="nr-logo">
                  <Icon name="lucide:message-circle" size="18" style="color: var(--color-primary)"/>
                </div>
                <div class="nr-sep"/>
                <div class="nr-item active" title="Chats"><Icon name="lucide:message-square" size="16"/></div>
                <div class="nr-item" title="Users"><Icon name="lucide:users" size="16"/></div>
                <div class="nr-item" title="Settings"><Icon name="lucide:settings" size="16"/></div>
                <div class="nr-spacer"/>
                <div class="nr-item" title="Profile">
                  <div class="nr-av" style="background:linear-gradient(135deg,#818cf8,#6366f1)">Y</div>
                </div>
              </div>

              <!-- Sidebar -->
              <div class="app-sidebar">
                <div class="as-header">
                  <span class="as-title">Messages</span>
                  <div class="as-btn"><Icon name="lucide:edit" size="13"/></div>
                </div>
                <div class="as-search">
                  <Icon name="lucide:search" size="12" class="as-si"/>
                  <span class="as-sp">Search…</span>
                </div>
                <div class="as-list">
                  <div class="as-item as-active">
                    <div class="as-av" style="background:linear-gradient(135deg,#818cf8,#6366f1)">S</div>
                    <div class="as-info">
                      <div class="as-top"><span class="as-name">Sarah K.</span><span class="as-t">2m</span></div>
                      <div class="as-preview">The dark mode is 🤌</div>
                    </div>
                    <div class="as-badge">3</div>
                  </div>
                  <div class="as-item">
                    <div class="as-av g-av"><Icon name="lucide:users" size="10"/></div>
                    <div class="as-info">
                      <div class="as-top"><span class="as-name">🚀 Product Team</span><span class="as-t">15m</span></div>
                      <div class="as-preview">James: sprint_board.pdf</div>
                    </div>
                    <div class="as-badge">1</div>
                  </div>
                  <div class="as-item">
                    <div class="as-av" style="background:linear-gradient(135deg,#fb923c,#f59e0b)">J</div>
                    <div class="as-info">
                      <div class="as-top"><span class="as-name">James R.</span><span class="as-t">1h</span></div>
                      <div class="as-preview">On it! Give me 10 min 👍</div>
                    </div>
                  </div>
                  <div class="as-item">
                    <div class="as-av" style="background:linear-gradient(135deg,#34d399,#059669)">A</div>
                    <div class="as-info">
                      <div class="as-top"><span class="as-name">Alex M.</span><span class="as-t">3h</span></div>
                      <div class="as-preview">New mockups ready 🎨</div>
                    </div>
                  </div>
                  <div class="as-item">
                    <div class="as-av" style="background:linear-gradient(135deg,#f472b6,#ec4899)">M</div>
                    <div class="as-info">
                      <div class="as-top"><span class="as-name">Maya D.</span><span class="as-t">Yesterday</span></div>
                      <div class="as-preview">Love the color palette!</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Chat area -->
              <div class="app-chat">
                <!-- Chat header -->
                <div class="ac-header">
                  <div class="ac-av" style="background:linear-gradient(135deg,#818cf8,#6366f1)">S</div>
                  <div class="ac-info">
                    <div class="ac-name">Sarah K.</div>
                    <div class="ac-status"><span class="online-dot"/>Online now</div>
                  </div>
                  <div class="ac-actions">
                    <div class="ac-btn"><Icon name="lucide:phone" size="13"/></div>
                    <div class="ac-btn"><Icon name="lucide:video" size="13"/></div>
                    <div class="ac-btn"><Icon name="lucide:info" size="13"/></div>
                  </div>
                </div>

                <!-- Messages -->
                <div class="ac-msgs">
                  <div class="date-sep"><span>Today</span></div>

                  <div class="msg-row received">
                    <div class="msg-av" style="background:linear-gradient(135deg,#818cf8,#6366f1)">S</div>
                    <div class="msg-col">
                      <div class="bubble recv-bubble">Morning! Ready to review designs? ☀️</div>
                      <div class="msg-meta">9:02 AM</div>
                    </div>
                  </div>

                  <div class="msg-row sent">
                    <div class="msg-col right-col">
                      <div class="bubble sent-bubble">Yep, sharing my screen in a sec 👍</div>
                      <div class="msg-meta right-meta">9:03 AM · <Icon name="lucide:check-check" size="10" class="read-tick"/></div>
                    </div>
                  </div>

                  <div class="msg-row received">
                    <div class="msg-av" style="background:linear-gradient(135deg,#818cf8,#6366f1)">S</div>
                    <div class="msg-col">
                      <div class="bubble recv-bubble">
                        <div class="img-attach">
                          <div class="img-block"><Icon name="lucide:image" size="16"/></div>
                          <div class="img-info">
                            <div class="img-name">designs_v3.png</div>
                            <div class="img-size">2.4 MB · Image</div>
                          </div>
                        </div>
                      </div>
                      <div class="msg-meta">9:04 AM</div>
                    </div>
                  </div>

                  <div class="msg-row sent">
                    <div class="msg-col right-col">
                      <div class="bubble sent-bubble">Love the new palette 🎨 Much cleaner!</div>
                      <div class="msg-meta right-meta">9:05 AM · <Icon name="lucide:check-check" size="10" class="read-tick"/></div>
                    </div>
                  </div>

                  <div class="msg-row received">
                    <div class="msg-av" style="background:linear-gradient(135deg,#818cf8,#6366f1)">S</div>
                    <div class="typing-bubble"><span/><span/><span/></div>
                  </div>
                </div>

                <!-- Composer -->
                <div class="ac-composer">
                  <div class="acc-attach"><Icon name="lucide:paperclip" size="13"/></div>
                  <div class="acc-emoji"><Icon name="lucide:smile" size="13"/></div>
                  <div class="acc-input"><span>Type a message…</span></div>
                  <div class="acc-send"><Icon name="lucide:send" size="12"/></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Desktop stand -->
          <div class="monitor-stand">
            <div class="monitor-neck"/>
            <div class="monitor-base"/>
          </div>

          <!-- Caption -->
          <p class="dv-caption"><Icon name="lucide:monitor" size="14"/> Full desktop experience with nav rail, sidebar & chat</p>
        </div>

        <!-- ── MOBILE VIEW ── -->
        <div v-else key="mobile" class="dv-panel dv-mobile-panel">
          <div class="phone-wrap">
            <!-- Phone frame -->
            <div class="phone-frame">
              <!-- Notch / status bar -->
              <div class="phone-top-bar">
                <span class="pst-time">9:41</span>
                <div class="pst-notch"/>
                <div class="pst-icons">
                  <Icon name="lucide:signal" size="11"/>
                  <Icon name="lucide:wifi" size="11"/>
                  <Icon name="lucide:battery" size="11"/>
                </div>
              </div>

              <!-- Screen content -->
              <div class="phone-screen">
                <!-- Mobile chat view — full screen chat -->
                <div class="mob-header">
                  <div class="mob-back"><Icon name="lucide:arrow-left" size="16"/></div>
                  <div class="mob-av" style="background:linear-gradient(135deg,#818cf8,#6366f1)">S</div>
                  <div class="mob-title-info">
                    <div class="mob-name">Sarah K.</div>
                    <div class="mob-status"><span class="online-dot"/>Online</div>
                  </div>
                  <div class="mob-actions">
                    <div class="mob-btn"><Icon name="lucide:phone" size="14"/></div>
                    <div class="mob-btn"><Icon name="lucide:more-vertical" size="14"/></div>
                  </div>
                </div>

                <div class="mob-msgs">
                  <div class="date-sep"><span>Today</span></div>

                  <div class="msg-row received">
                    <div class="msg-av sm-av" style="background:linear-gradient(135deg,#818cf8,#6366f1)">S</div>
                    <div class="msg-col">
                      <div class="bubble recv-bubble mob-bubble">Hey! Did you see the update? 👀</div>
                      <div class="msg-meta">2:38 PM</div>
                    </div>
                  </div>

                  <div class="msg-row sent">
                    <div class="msg-col right-col">
                      <div class="bubble sent-bubble mob-bubble">Just did — UI is 🔥 so clean</div>
                      <div class="msg-meta right-meta">2:39 PM · <Icon name="lucide:check-check" size="10" class="read-tick"/></div>
                    </div>
                  </div>

                  <div class="msg-row received">
                    <div class="msg-av sm-av" style="background:linear-gradient(135deg,#818cf8,#6366f1)">S</div>
                    <div class="msg-col">
                      <div class="bubble recv-bubble mob-bubble">Dark mode is chef's kiss 🤌</div>
                      <div class="msg-meta">2:40 PM</div>
                    </div>
                  </div>

                  <div class="msg-row sent">
                    <div class="msg-col right-col">
                      <div class="bubble sent-bubble mob-bubble">Messages pop instantly ⚡</div>
                      <div class="msg-meta right-meta">2:41 PM · <Icon name="lucide:check-check" size="10" class="read-tick"/></div>
                    </div>
                  </div>

                  <div class="msg-row received">
                    <div class="msg-av sm-av" style="background:linear-gradient(135deg,#818cf8,#6366f1)">S</div>
                    <div class="typing-bubble sm-typing"><span/><span/><span/></div>
                  </div>
                </div>

                <!-- Mobile composer -->
                <div class="mob-composer">
                  <div class="mob-input"><span>Message…</span></div>
                  <div class="mob-emoji"><Icon name="lucide:smile" size="14"/></div>
                  <div class="mob-send"><Icon name="lucide:send" size="13"/></div>
                </div>

                <!-- Mobile bottom nav -->
                <div class="mob-bottom-nav">
                  <div class="mbn-item"><Icon name="lucide:message-square" size="16"/><span>Chats</span></div>
                  <div class="mbn-item mbn-active"><Icon name="lucide:message-circle" size="16"/><span>Chat</span></div>
                  <div class="mbn-item"><Icon name="lucide:users" size="16"/><span>People</span></div>
                  <div class="mbn-item"><Icon name="lucide:settings" size="16"/><span>Settings</span></div>
                </div>
              </div>

              <!-- Home indicator -->
              <div class="phone-home-bar"><div class="phi"/></div>
            </div>

            <!-- Second phone showing chat list -->
            <div class="phone-frame phone-back">
              <div class="phone-top-bar">
                <span class="pst-time">9:41</span>
                <div class="pst-notch"/>
                <div class="pst-icons">
                  <Icon name="lucide:signal" size="11"/>
                  <Icon name="lucide:wifi" size="11"/>
                  <Icon name="lucide:battery" size="11"/>
                </div>
              </div>
              <div class="phone-screen">
                <div class="mob-list-header">
                  <span class="mlh-title">Messages</span>
                  <div class="mob-btn"><Icon name="lucide:edit" size="14"/></div>
                </div>
                <div class="mob-search">
                  <Icon name="lucide:search" size="12"/>
                  <span>Search</span>
                </div>
                <div class="mob-chat-list">
                  <div class="mcl-item mcl-active">
                    <div class="mcl-av" style="background:linear-gradient(135deg,#818cf8,#6366f1)">S</div>
                    <div class="mcl-info">
                      <div class="mcl-top"><span class="mcl-name">Sarah K.</span><span class="mcl-t">2m</span></div>
                      <div class="mcl-preview">The dark mode is 🤌</div>
                    </div>
                    <div class="mcl-badge">3</div>
                  </div>
                  <div class="mcl-item">
                    <div class="mcl-av g-av"><Icon name="lucide:users" size="12"/></div>
                    <div class="mcl-info">
                      <div class="mcl-top"><span class="mcl-name">🚀 Product</span><span class="mcl-t">15m</span></div>
                      <div class="mcl-preview">James: sprint_board.pdf</div>
                    </div>
                    <div class="mcl-badge">1</div>
                  </div>
                  <div class="mcl-item">
                    <div class="mcl-av" style="background:linear-gradient(135deg,#fb923c,#f59e0b)">J</div>
                    <div class="mcl-info">
                      <div class="mcl-top"><span class="mcl-name">James R.</span><span class="mcl-t">1h</span></div>
                      <div class="mcl-preview">On it! Give me 10 min 👍</div>
                    </div>
                  </div>
                  <div class="mcl-item">
                    <div class="mcl-av" style="background:linear-gradient(135deg,#34d399,#059669)">A</div>
                    <div class="mcl-info">
                      <div class="mcl-top"><span class="mcl-name">Alex M.</span><span class="mcl-t">3h</span></div>
                      <div class="mcl-preview">New mockups ready 🎨</div>
                    </div>
                  </div>
                </div>
                <div class="mob-bottom-nav">
                  <div class="mbn-item mbn-active"><Icon name="lucide:message-square" size="16"/><span>Chats</span></div>
                  <div class="mbn-item"><Icon name="lucide:users" size="16"/><span>People</span></div>
                  <div class="mbn-item"><Icon name="lucide:settings" size="16"/><span>Settings</span></div>
                </div>
              </div>
              <div class="phone-home-bar"><div class="phi"/></div>
            </div>
          </div>

          <p class="dv-caption"><Icon name="lucide:smartphone" size="14"/> Mobile PWA — installable, offline-ready, full-screen</p>
        </div>
      </Transition>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         FEATURE BENTO
    ══════════════════════════════════════ -->
    <section class="bento-section container reveal">
      <div class="section-head">
        <div class="sec-badge">Features</div>
        <h2 class="sec-title">Built different.</h2>
        <p class="sec-desc">Every detail is considered. Speed, style, and simplicity — all in one.</p>
      </div>

      <div class="bento">

        <!-- Card 1 — Large, real-time -->
        <div class="bento-card b-realtime">
          <div class="b-icon purple"><Icon name="lucide:zap" size="22"/></div>
          <h3>Real-time, Always</h3>
          <p>Firebase Firestore keeps every message in sync across all devices the moment you send. No polling, no delays.</p>
          <div class="latency-demo">
            <div class="ld-row">
              <span class="ld-label">Message sent</span>
              <div class="ld-bar"><div class="ld-fill" style="width:98%"/></div>
              <span class="ld-ms">&lt;80ms</span>
            </div>
            <div class="ld-row">
              <span class="ld-label">Delivered</span>
              <div class="ld-bar"><div class="ld-fill" style="width:95%"/></div>
              <span class="ld-ms">&lt;120ms</span>
            </div>
            <div class="ld-row">
              <span class="ld-label">Read receipt</span>
              <div class="ld-bar"><div class="ld-fill" style="width:90%"/></div>
              <span class="ld-ms">&lt;200ms</span>
            </div>
          </div>
        </div>

        <!-- Card 2 — Groups -->
        <div class="bento-card b-groups">
          <div class="b-icon green"><Icon name="lucide:users" size="22"/></div>
          <h3>Group Chats</h3>
          <p>Create rooms, name them, add or remove members — full group management built in.</p>
          <div class="group-preview">
            <div class="gp-member" v-for="m in groupMembers" :key="m.name">
              <div class="gp-av" :style="{background: m.color}">{{ m.init }}</div>
              <span>{{ m.name }}</span>
              <div class="gp-online" v-if="m.online"/>
            </div>
          </div>
        </div>

        <!-- Card 3 — Themes -->
        <div class="bento-card b-theme">
          <div class="b-icon pink"><Icon name="lucide:moon" size="22"/></div>
          <h3>Dark & Light</h3>
          <p>Premium themes that adapt to your environment — not an afterthought.</p>
          <div class="theme-toggle-demo">
            <div class="td-light">
              <div class="td-bubble">Hello! 👋</div>
              <div class="td-bubble sent">Hey! 😊</div>
            </div>
            <div class="td-dark">
              <div class="td-bubble dark">Hello! 👋</div>
              <div class="td-bubble sent dark">Hey! 😊</div>
            </div>
          </div>
        </div>

        <!-- Card 4 — Media -->
        <div class="bento-card b-media">
          <div class="b-icon orange"><Icon name="lucide:image" size="22"/></div>
          <h3>Media & Files</h3>
          <p>Send images, files, and attachments. Inline previews — no extra clicks.</p>
          <div class="media-row">
            <div class="med-thumb purple-bg"><Icon name="lucide:image" size="18"/></div>
            <div class="med-thumb blue-bg"><Icon name="lucide:file-text" size="18"/></div>
            <div class="med-thumb green-bg"><Icon name="lucide:video" size="18"/></div>
            <div class="med-more">+12</div>
          </div>
        </div>

        <!-- Card 5 — Security -->
        <div class="bento-card b-secure">
          <div class="b-icon blue"><Icon name="lucide:shield-check" size="22"/></div>
          <h3>Secure Auth</h3>
          <p>Email & password with verification. Firebase security rules protect every read and write.</p>
          <div class="secure-badges">
            <span class="sb"><Icon name="lucide:lock" size="11"/> Encrypted</span>
            <span class="sb"><Icon name="lucide:mail-check" size="11"/> Verified</span>
            <span class="sb"><Icon name="lucide:shield" size="11"/> Protected</span>
          </div>
        </div>

        <!-- Card 6 — PWA -->
        <div class="bento-card b-pwa">
          <div class="b-icon teal"><Icon name="lucide:smartphone" size="22"/></div>
          <h3>PWA — Install Anywhere</h3>
          <p>Works as a native app on iOS, Android, and desktop. Offline support included.</p>
          <div class="pwa-row">
            <div class="pwa-ic"><Icon name="lucide:monitor" size="20"/><span>Desktop</span></div>
            <div class="pwa-ic"><Icon name="lucide:tablet" size="20"/><span>Tablet</span></div>
            <div class="pwa-ic"><Icon name="lucide:smartphone" size="20"/><span>Mobile</span></div>
          </div>
        </div>

      </div>
    </section>

    <!-- ══════════════════════════════════════
         FULL CHAT SHOWCASE — Side by side detail
    ══════════════════════════════════════ -->
    <section class="showcase-section container reveal">
      <div class="section-head">
        <div class="sec-badge">Features Tour</div>
        <h2 class="sec-title">See it in action.</h2>
        <p class="sec-desc">Every screen is polished. Watch how conversations flow across every mode.</p>
      </div>

      <div class="showcase-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="stab"
          :class="{ active: activeTab === tab.id }"
          @click="selectTab(tab.id)"
        >
          <span
            v-if="activeTab === tab.id"
            class="tab-fill"
            :style="{ width: `${showcaseProgress}%` }"
          />
          <Icon :name="tab.icon" size="15" class="tab-ic"/>
          <span class="tab-lbl">{{ tab.label }}</span>
        </button>
      </div>

      <!-- Panel: Direct Message -->
      <Transition name="panel-fade" mode="out-in">
        <div v-if="activeTab === 'dm'" key="dm" class="showcase-panel">
          <div class="panel-desc">
            <h3>One-on-one chats</h3>
            <p>Clean, distraction-free conversations with presence indicators, read receipts, and typing signals. Everything you need, nothing you don't.</p>
            <ul class="panel-features">
              <li><Icon name="lucide:check" size="14"/> Live typing indicator</li>
              <li><Icon name="lucide:check" size="14"/> Online / offline presence</li>
              <li><Icon name="lucide:check" size="14"/> Message read receipts</li>
              <li><Icon name="lucide:check" size="14"/> Image & file sharing</li>
            </ul>
          </div>
          <div class="panel-ui">
            <div class="full-chat-window">
              <!-- Header -->
              <div class="fcw-header">
                <div class="fcw-av" style="background:linear-gradient(135deg,#818cf8,#6366f1)">S</div>
                <div>
                  <div class="fcw-name">Sarah K.</div>
                  <div class="fcw-status"><span class="online-dot"/>Online now</div>
                </div>
                <div class="fcw-hactions">
                  <div class="fch-btn"><Icon name="lucide:phone" size="15"/></div>
                  <div class="fch-btn"><Icon name="lucide:video" size="15"/></div>
                  <div class="fch-btn"><Icon name="lucide:info" size="15"/></div>
                </div>
              </div>
              <!-- Messages -->
              <div class="fcw-msgs">
                <div class="date-sep"><span>Today</span></div>
                <div class="msg-row received">
                  <div class="msg-av" style="background:linear-gradient(135deg,#818cf8,#6366f1)">S</div>
                  <div class="msg-col">
                    <div class="bubble recv-bubble">Morning! Ready to review designs? ☀️</div>
                    <div class="msg-meta">9:02 AM</div>
                  </div>
                </div>
                <div class="msg-row sent">
                  <div class="msg-col right-col">
                    <div class="bubble sent-bubble">Yep, sharing my screen in a sec</div>
                    <div class="msg-meta right-meta">9:03 AM · <Icon name="lucide:check-check" size="11" class="read-tick"/></div>
                  </div>
                </div>
                <div class="msg-row received">
                  <div class="msg-av" style="background:linear-gradient(135deg,#818cf8,#6366f1)">S</div>
                  <div class="msg-col">
                    <div class="bubble recv-bubble">
                      <div class="img-attach">
                        <div class="img-block"><Icon name="lucide:image" size="22"/></div>
                        <div class="img-info">
                          <div class="img-name">designs_v3.png</div>
                          <div class="img-size">2.4 MB · Image</div>
                        </div>
                      </div>
                    </div>
                    <div class="msg-meta">9:04 AM</div>
                  </div>
                </div>
                <div class="msg-row sent">
                  <div class="msg-col right-col">
                    <div class="bubble sent-bubble">Love the new palette 🎨 Much cleaner</div>
                    <div class="msg-meta right-meta">9:05 AM · <Icon name="lucide:check-check" size="11" class="read-tick"/></div>
                  </div>
                </div>
                <div class="msg-row received">
                  <div class="msg-av" style="background:linear-gradient(135deg,#818cf8,#6366f1)">S</div>
                  <div class="typing-bubble">
                    <span/><span/><span/>
                  </div>
                </div>
              </div>
              <!-- Composer -->
              <div class="fcw-composer">
                <div class="fcc-attach"><Icon name="lucide:paperclip" size="16"/></div>
                <div class="fcc-emoji"><Icon name="lucide:smile" size="16"/></div>
                <div class="fcc-input"><span>Type a message…</span></div>
                <div class="fcc-send"><Icon name="lucide:send" size="15"/></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Panel: Group Chat -->
        <div v-else-if="activeTab === 'group'" key="group" class="showcase-panel">
          <div class="panel-desc">
            <h3>Group conversations</h3>
            <p>Create teams, name them, manage members. Everyone sees who's talking and what's shared — all in real time.</p>
            <ul class="panel-features">
              <li><Icon name="lucide:check" size="14"/> Create & name groups</li>
              <li><Icon name="lucide:check" size="14"/> Add / remove members</li>
              <li><Icon name="lucide:check" size="14"/> Sender names on each message</li>
              <li><Icon name="lucide:check" size="14"/> Group info & management panel</li>
            </ul>
          </div>
          <div class="panel-ui">
            <div class="full-chat-window">
              <div class="fcw-header">
                <div class="fcw-av group-av"><Icon name="lucide:users" size="16"/></div>
                <div>
                  <div class="fcw-name">🚀 Product Team</div>
                  <div class="fcw-status">5 members · 3 online</div>
                </div>
                <div class="fcw-hactions">
                  <div class="fch-btn"><Icon name="lucide:user-plus" size="15"/></div>
                  <div class="fch-btn"><Icon name="lucide:info" size="15"/></div>
                </div>
              </div>
              <div class="fcw-msgs">
                <div class="date-sep"><span>Monday</span></div>
                <div class="msg-row received">
                  <div class="msg-av" style="background:linear-gradient(135deg,#34d399,#059669)">A</div>
                  <div class="msg-col">
                    <div class="sender-name">Alex</div>
                    <div class="bubble recv-bubble">Sprint planning in 10 min everyone!</div>
                    <div class="msg-meta">10:50 AM</div>
                  </div>
                </div>
                <div class="msg-row received">
                  <div class="msg-av" style="background:linear-gradient(135deg,#f472b6,#ec4899)">M</div>
                  <div class="msg-col">
                    <div class="sender-name">Maya</div>
                    <div class="bubble recv-bubble">On my way 👋</div>
                    <div class="msg-meta">10:51 AM</div>
                  </div>
                </div>
                <div class="msg-row received">
                  <div class="msg-av" style="background:linear-gradient(135deg,#fb923c,#f59e0b)">J</div>
                  <div class="msg-col">
                    <div class="sender-name">James</div>
                    <div class="bubble recv-bubble">
                      <div class="img-attach">
                        <div class="img-block"><Icon name="lucide:file-text" size="20"/></div>
                        <div class="img-info">
                          <div class="img-name">sprint_board.pdf</div>
                          <div class="img-size">560 KB · PDF</div>
                        </div>
                      </div>
                    </div>
                    <div class="msg-meta">10:52 AM</div>
                  </div>
                </div>
                <div class="msg-row sent">
                  <div class="msg-col right-col">
                    <div class="bubble sent-bubble">Thanks James! Already reviewing 👀</div>
                    <div class="msg-meta right-meta">10:52 AM · <Icon name="lucide:check-check" size="11" class="read-tick"/></div>
                  </div>
                </div>
                <div class="msg-row received">
                  <div class="msg-av" style="background:linear-gradient(135deg,#34d399,#059669)">A</div>
                  <div class="typing-bubble">
                    <span/><span/><span/>
                  </div>
                </div>
              </div>
              <div class="fcw-composer">
                <div class="fcc-attach"><Icon name="lucide:paperclip" size="16"/></div>
                <div class="fcc-emoji"><Icon name="lucide:smile" size="16"/></div>
                <div class="fcc-input"><span>Message Product Team…</span></div>
                <div class="fcc-send"><Icon name="lucide:send" size="15"/></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Panel: Sidebar / Chat List -->
        <div v-else-if="activeTab === 'sidebar'" key="sidebar" class="showcase-panel">
          <div class="panel-desc">
            <h3>Your conversation hub</h3>
            <p>All your chats, groups, and contacts in a clean sidebar. Search anyone, see unread counts, and jump right in.</p>
            <ul class="panel-features">
              <li><Icon name="lucide:check" size="14"/> Instant user search</li>
              <li><Icon name="lucide:check" size="14"/> Unread message badges</li>
              <li><Icon name="lucide:check" size="14"/> Last message preview</li>
              <li><Icon name="lucide:check" size="14"/> Group & DM in one list</li>
            </ul>
          </div>
          <div class="panel-ui">
            <div class="full-chat-window sidebar-only">
              <!-- Search -->
              <div class="sidebar-search">
                <Icon name="lucide:search" size="15" class="ss-icon"/>
                <span class="ss-placeholder">Search conversations…</span>
              </div>
              <!-- List -->
              <div class="sidebar-list">
                <div class="sl-item active">
                  <div class="sl-av" style="background:linear-gradient(135deg,#818cf8,#6366f1)">S</div>
                  <div class="sl-info">
                    <div class="sl-top"><span class="sl-name">Sarah K.</span><span class="sl-time">2m</span></div>
                    <div class="sl-preview">The dark mode is chef's kiss 🤌</div>
                  </div>
                  <div class="sl-badge">3</div>
                </div>
                <div class="sl-item">
                  <div class="sl-av group-sl-av"><Icon name="lucide:users" size="13"/></div>
                  <div class="sl-info">
                    <div class="sl-top"><span class="sl-name">🚀 Product Team</span><span class="sl-time">15m</span></div>
                    <div class="sl-preview">James: sprint_board.pdf shared</div>
                  </div>
                  <div class="sl-badge">1</div>
                </div>
                <div class="sl-item">
                  <div class="sl-av" style="background:linear-gradient(135deg,#fb923c,#f59e0b)">J</div>
                  <div class="sl-info">
                    <div class="sl-top"><span class="sl-name">James R.</span><span class="sl-time">1h</span></div>
                    <div class="sl-preview">On it! Give me 10 min 👍</div>
                  </div>
                </div>
                <div class="sl-item">
                  <div class="sl-av" style="background:linear-gradient(135deg,#34d399,#059669)">A</div>
                  <div class="sl-info">
                    <div class="sl-top"><span class="sl-name">Alex M.</span><span class="sl-time">3h</span></div>
                    <div class="sl-preview">New mockups are ready 🎨</div>
                  </div>
                </div>
                <div class="sl-item">
                  <div class="sl-av" style="background:linear-gradient(135deg,#f472b6,#ec4899)">M</div>
                  <div class="sl-info">
                    <div class="sl-top"><span class="sl-name">Maya D.</span><span class="sl-time">Yesterday</span></div>
                    <div class="sl-preview">Love the color palette!</div>
                  </div>
                </div>
                <div class="sl-item">
                  <div class="sl-av group-sl-av"><Icon name="lucide:users" size="13"/></div>
                  <div class="sl-info">
                    <div class="sl-top"><span class="sl-name">Design Team</span><span class="sl-time">Yesterday</span></div>
                    <div class="sl-preview">You: Shipping it today 🚀</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </section>

    <!-- ══════════════════════════════════════
         CTA
    ══════════════════════════════════════ -->
    <section class="cta-section container reveal">
      <div class="cta-inner">
        <div class="cta-gfx">
          <div class="cta-bubble b1">Hey! 👋</div>
          <div class="cta-bubble b2">Ready to chat? ✨</div>
          <div class="cta-bubble b3">Just clicked Join 🚀</div>
        </div>
        <div class="cta-text-side">
          <h2 class="cta-title">Ready to try<br>EzChat yourself?</h2>
          <p class="cta-desc">Fast, real-time messaging built with Nuxt &amp; Firebase. Create an account and explore.</p>
          <NuxtLink to="/register" class="btn-cta">
            <Icon name="lucide:message-circle" size="17"/>
            Get started — it's free
          </NuxtLink>
          <p class="cta-note">Already have an account? <NuxtLink to="/login">Sign in →</NuxtLink></p>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
definePageMeta({
  layout: 'landing',
  middleware: 'guest'
})

const SHOWCASE_INTERVAL = 4500
const DEVICE_INTERVAL = 5500

const activeTab = ref('dm')
const showcaseProgress = ref(0)

const tabs = [
  { id: 'dm',      label: 'Direct Messages', icon: 'lucide:message-circle' },
  { id: 'group',   label: 'Group Chats',     icon: 'lucide:users' },
  { id: 'sidebar', label: 'Chat List',        icon: 'lucide:layout-list' },
]

const groupMembers = [
  { init: 'S', name: 'Sarah', color: 'linear-gradient(135deg,#818cf8,#6366f1)', online: true },
  { init: 'A', name: 'Alex',  color: 'linear-gradient(135deg,#34d399,#059669)', online: true },
  { init: 'M', name: 'Maya',  color: 'linear-gradient(135deg,#f472b6,#ec4899)', online: false },
  { init: 'J', name: 'James', color: 'linear-gradient(135deg,#fb923c,#f59e0b)', online: true },
]

const activeDevice = ref('desktop')
const deviceProgress = ref(0)

const deviceViews = [
  { id: 'desktop', label: 'Desktop',  icon: 'lucide:monitor' },
  { id: 'mobile',  label: 'Mobile',   icon: 'lucide:smartphone' },
]

let showcaseElapsed = 0
let deviceElapsed = 0
let tickTimer = null
let observer = null

function selectTab(id) {
  activeTab.value = id
  showcaseElapsed = 0
  showcaseProgress.value = 0
}

function selectDevice(id) {
  activeDevice.value = id
  deviceElapsed = 0
  deviceProgress.value = 0
}

onMounted(() => {
  const TICK = 50
  tickTimer = setInterval(() => {
    showcaseElapsed += TICK
    if (showcaseElapsed >= SHOWCASE_INTERVAL) {
      showcaseElapsed = 0
      showcaseProgress.value = 0
      const idx = tabs.findIndex(t => t.id === activeTab.value)
      activeTab.value = tabs[(idx + 1) % tabs.length].id
    } else {
      showcaseProgress.value = Math.min(100, (showcaseElapsed / SHOWCASE_INTERVAL) * 100)
    }

    deviceElapsed += TICK
    if (deviceElapsed >= DEVICE_INTERVAL) {
      deviceElapsed = 0
      deviceProgress.value = 0
      const idx = deviceViews.findIndex(d => d.id === activeDevice.value)
      activeDevice.value = deviceViews[(idx + 1) % deviceViews.length].id
    } else {
      deviceProgress.value = Math.min(100, (deviceElapsed / DEVICE_INTERVAL) * 100)
    }
  }, TICK)

  // Scroll-reveal observer
  const revealEls = document.querySelectorAll('.reveal')
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer?.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    revealEls.forEach(el => observer.observe(el))
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'))
  }
})

onUnmounted(() => {
  if (tickTimer) clearInterval(tickTimer)
  if (observer) observer.disconnect()
})
</script>

<style scoped>
/* ═══════════════════════════════════════
   BASE
═══════════════════════════════════════ */
.home-page {
  overflow-x: hidden;
  padding-bottom: 0;
}

.container {
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* ═══════════════════════════════════════
   HERO
═══════════════════════════════════════ */
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  min-height: 82vh;
  padding: 3.5rem 1.5rem 2.5rem;
  gap: 1.75rem;
  position: relative;
}

/* subtle grid bg */
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--color-border-light) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-border-light) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.4;
  pointer-events: none;
  mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 100%);
}

.hero-left {
  position: relative;
  z-index: 2;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1rem;
  border-radius: 999px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  margin-bottom: 1.75rem;
  letter-spacing: 0.01em;
}

.badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #34d399;
  box-shadow: 0 0 0 2px rgba(52,211,153,0.3);
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 0 2px rgba(52,211,153,0.3); }
  50%       { box-shadow: 0 0 0 5px rgba(52,211,153,0); }
}

.hero-title {
  font-size: clamp(2.8rem, 4.5vw, 4.5rem);
  font-weight: 900;
  line-height: 1.08;
  letter-spacing: -0.035em;
  color: var(--color-text);
  margin-bottom: 1.5rem;
}

.grad {
  background: linear-gradient(135deg, var(--color-primary) 0%, #a855f7 45%, #06b6d4 80%, var(--color-primary) 100%);
  background-size: 220% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 6s ease infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50%      { background-position: 100% 50%; }
}

.reveal-immediate {
  opacity: 0;
  transform: translateY(16px);
  animation: revealUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: var(--delay, 0ms);
}

@keyframes revealUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-sub {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
  max-width: 440px;
  margin-bottom: 2.25rem;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.btn-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.75rem;
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: 999px;
  background: var(--color-primary);
  color: #fff;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  border: none;
  cursor: pointer;
  white-space: nowrap;
}
.btn-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(99,102,241,0.45);
}

.btn-ghost-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.85rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 999px;
  background: transparent;
  color: var(--color-text);
  text-decoration: none;
  border: 1.5px solid var(--color-border);
  transition: all 0.2s;
}
.btn-ghost-cta:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.hero-social-proof {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.sp-avatars {
  display: flex;
}

.sp-av {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid var(--color-surface-2);
  margin-left: -6px;
}
.sp-av:first-child { margin-left: 0; }

.sp-text {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  font-weight: 500;
}

/* ── Windows Stack ── */
.hero-right {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.windows-stack {
  position: relative;
  width: 100%;
  max-width: 520px;
  height: 420px;
}

/* Back windows */
.chat-win-back-l,
.chat-win-back-r {
  position: absolute;
  width: 340px;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  background: var(--color-surface-2);
  box-shadow: var(--shadow-md);
  pointer-events: none;
}

.chat-win-back-l {
  top: 30px;
  left: -20px;
  transform: rotate(-4deg) scale(0.9);
  opacity: 0.78;
  z-index: 1;
  animation: floatBackL 7s ease-in-out infinite;
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s;
}

.chat-win-back-r {
  top: 20px;
  right: -30px;
  transform: rotate(4deg) scale(0.88);
  opacity: 0.7;
  z-index: 0;
  animation: floatBackR 8s ease-in-out infinite;
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s;
}

.windows-stack:hover .chat-win-back-l {
  opacity: 0.92;
}
.windows-stack:hover .chat-win-back-r {
  opacity: 0.88;
}

/* Front window */
.chat-win-front {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  width: 360px;
  z-index: 10;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  background: var(--color-surface-2);
  box-shadow: 0 24px 60px rgba(0,0,0,0.18), 0 8px 20px rgba(0,0,0,0.1);
  animation: floatFront 6s ease-in-out infinite;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
}
.chat-win-front:hover {
  animation-play-state: paused;
  transform: translateX(-50%) translateY(-8px) scale(1.015);
  box-shadow: 0 32px 80px rgba(0,0,0,0.24), 0 12px 28px rgba(99,102,241,0.16);
}

.chat-win-front .msg-row {
  opacity: 0;
  animation: msgPopIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.chat-win-front .msg-row:nth-child(2) { animation-delay: 0.35s; }
.chat-win-front .msg-row:nth-child(3) { animation-delay: 0.65s; }
.chat-win-front .msg-row:nth-child(4) { animation-delay: 0.95s; }
.chat-win-front .msg-row:nth-child(5) { animation-delay: 1.25s; }
.chat-win-front .msg-row:nth-child(6) { animation-delay: 1.55s; }

@keyframes floatFront {
  0%, 100% { transform: translateX(-50%) translateY(0px); }
  50%      { transform: translateX(-50%) translateY(-7px); }
}
@keyframes floatBackL {
  0%, 100% { transform: rotate(-4deg) scale(0.9) translateY(0px); }
  50%      { transform: rotate(-5deg) scale(0.9) translateY(-6px); }
}
@keyframes floatBackR {
  0%, 100% { transform: rotate(4deg) scale(0.88) translateY(0px); }
  50%      { transform: rotate(5deg) scale(0.88) translateY(6px); }
}
@keyframes msgPopIn {
  from { opacity: 0; transform: translateY(10px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* shared win styles */
.chat-win {
  display: flex;
  flex-direction: column;
}

.win-bar {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.65rem 0.875rem;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}

.win-dots { display: flex; gap: 5px; }
.wd {
  width: 10px; height: 10px;
  border-radius: 50%;
}
.wd.r { background: #ff5f57; }
.wd.y { background: #febc2e; }
.wd.g { background: #28c840; }

.win-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  min-width: 0;
}

.win-av {
  width: 28px; height: 28px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.7rem; font-weight: 800; color: #fff;
  flex-shrink: 0;
}

.group-av {
  background: linear-gradient(135deg, var(--color-primary), #a855f7);
  color: #fff;
}

.win-name {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.2;
}

.win-status {
  font-size: 0.65rem;
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.online-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #34d399;
  flex-shrink: 0;
  display: inline-block;
}

.win-actions {
  display: flex;
  gap: 0.3rem;
}

.win-btn-ic {
  width: 24px; height: 24px;
  border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  color: var(--color-text-muted);
  background: var(--color-surface-3);
}

/* ── Chat body ── */
.win-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 0.875rem;
  background: var(--color-surface-2);
  overflow: hidden;
}

.win-body.compact {
  gap: 0.5rem;
  padding: 0.75rem;
}

/* ── Composer ── */
.win-composer {
  padding: 0.5rem 0.75rem;
  border-top: 1px solid var(--color-border);
  background: var(--color-surface);
}

.composer-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-surface-3);
  border-radius: 999px;
  padding: 0.4rem 0.5rem 0.4rem 0.75rem;
}

.comp-icon { color: var(--color-text-muted); flex-shrink: 0; }
.comp-placeholder { flex: 1; font-size: 0.72rem; color: var(--color-text-muted); }
.comp-send {
  width: 26px; height: 26px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

/* ── Messages shared ── */
.date-sep {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.25rem 0;
}
.date-sep::before, .date-sep::after {
  content: ''; flex: 1; height: 1px; background: var(--color-border);
}
.date-sep span {
  font-size: 0.65rem;
  color: var(--color-text-muted);
  font-weight: 600;
  letter-spacing: 0.03em;
  white-space: nowrap;
}

.msg-row {
  display: flex;
  align-items: flex-end;
  gap: 0.4rem;
}
.msg-row.sent { justify-content: flex-end; }

.msg-av {
  width: 24px; height: 24px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.65rem; font-weight: 800; color: #fff;
  flex-shrink: 0;
}

.msg-col {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.right-col { align-items: flex-end; }

.sender-name {
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--color-text-muted);
  padding-left: 0.25rem;
}

.bubble {
  padding: 0.45rem 0.75rem;
  border-radius: 14px;
  font-size: 0.775rem;
  line-height: 1.4;
  max-width: 220px;
}

.recv-bubble {
  background: var(--color-surface-3);
  color: var(--color-text);
  border-bottom-left-radius: 4px;
}

.sent-bubble {
  background: var(--color-primary);
  color: #fff;
  border-bottom-right-radius: 4px;
}

.msg-meta {
  font-size: 0.6rem;
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 0 0.25rem;
}
.right-meta { justify-content: flex-end; }

.read-tick { color: #34d399; }

/* typing */
.typing-bubble {
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 0.5rem 0.65rem;
  background: var(--color-surface-3);
  border-radius: 14px;
  border-bottom-left-radius: 4px;
}
.typing-bubble span {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--color-text-muted);
  animation: tb 1.3s infinite;
}
.typing-bubble span:nth-child(2) { animation-delay: 0.18s; }
.typing-bubble span:nth-child(3) { animation-delay: 0.36s; }
@keyframes tb {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
  30% { transform: translateY(-4px); opacity: 1; }
}

/* image attachment */
.img-attach {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.img-block {
  width: 36px; height: 36px;
  border-radius: 8px;
  background: var(--color-primary-light);
  color: var(--color-primary);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.img-info { display: flex; flex-direction: column; gap: 2px; }
.img-name { font-size: 0.72rem; font-weight: 600; color: var(--color-text); }
.img-size { font-size: 0.63rem; color: var(--color-text-muted); }

/* ═══════════════════════════════════════
   TRUST STRIP
═══════════════════════════════════════ */
.trust-strip {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 1.25rem 2rem;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface);
  flex-wrap: wrap;
}

.trust-label {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.trust-items {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.trust-sep {
  width: 1px;
  height: 16px;
  background: var(--color-border);
}

/* ═══════════════════════════════════════
   BENTO GRID
═══════════════════════════════════════ */
.bento-section {
  padding: 5.5rem 1.5rem;
}

.section-head {
  text-align: center;
  margin-bottom: 3.5rem;
}

.sec-badge {
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
  margin-bottom: 0.9rem;
}

.sec-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  color: var(--color-text);
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 0.75rem;
}

.sec-desc {
  font-size: 1.05rem;
  color: var(--color-text-secondary);
  max-width: 480px;
  margin: 0 auto;
  line-height: 1.6;
}

.bento {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 1.25rem;
}

.bento-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 1.75rem;
  transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
  position: relative;
  overflow: hidden;
}

.bento-card::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s;
  background: radial-gradient(ellipse at top left, var(--color-primary-subtle) 0%, transparent 65%);
  pointer-events: none;
  border-radius: 20px;
}

.bento-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary-light);
}
.bento-card:hover::after { opacity: 1; }

.bento-card h3 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.5rem;
}
.bento-card p {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.b-realtime { grid-column: span 2; }

.b-icon {
  width: 48px; height: 48px;
  border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 1.25rem;
  position: relative; z-index: 1;
}
.b-icon.purple { background: rgba(129,140,248,.15); color: #818cf8; }
.b-icon.green  { background: rgba(52,211,153,.12);  color: #34d399; }
.b-icon.pink   { background: rgba(244,114,182,.12); color: #f472b6; }
.b-icon.orange { background: rgba(251,146,60,.12);  color: #fb923c; }
.b-icon.blue   { background: rgba(96,165,250,.12);  color: #60a5fa; }
.b-icon.teal   { background: rgba(45,212,191,.12);  color: #2dd4bf; }

/* Latency bars */
.latency-demo {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  position: relative; z-index: 1;
}
.ld-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.ld-label {
  font-size: 0.72rem;
  color: var(--color-text-muted);
  width: 90px;
  flex-shrink: 0;
  font-weight: 500;
}
.ld-bar {
  flex: 1;
  height: 5px;
  background: var(--color-border);
  border-radius: 999px;
  overflow: hidden;
}
.ld-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), #a855f7);
  border-radius: 999px;
  transform-origin: left center;
  transform: scaleX(0);
}
.bento-section.is-visible .ld-fill {
  animation: fillLdScale 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.25s forwards;
}
@keyframes fillLdScale {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
.ld-ms {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--color-primary);
  width: 60px;
  text-align: right;
  flex-shrink: 0;
}

/* Group member list */
.group-preview {
  margin-top: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  position: relative; z-index: 1;
}
.gp-member {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.775rem;
  color: var(--color-text);
  font-weight: 500;
}
.gp-av {
  width: 24px; height: 24px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.65rem; font-weight: 800; color: #fff;
  flex-shrink: 0;
}
.gp-online {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #34d399;
  margin-left: auto;
}

/* Theme demo */
.theme-toggle-demo {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.25rem;
  position: relative; z-index: 1;
}
.td-light, .td-dark {
  flex: 1;
  border-radius: 10px;
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.td-light { background: #f8f8fc; border: 1px solid #dddde8; }
.td-dark  { background: #17171f; border: 1px solid #2a2a3a; }

.td-bubble {
  padding: 0.35rem 0.6rem;
  border-radius: 10px;
  font-size: 0.7rem;
  background: #fff;
  color: #1a1a2e;
  border: 1px solid #dddde8;
  align-self: flex-start;
}
.td-bubble.dark {
  background: #22222e;
  color: #f0f0ff;
  border-color: #2a2a3a;
}
.td-bubble.sent {
  background: #4f46e5;
  color: #fff;
  border-color: #4f46e5;
  align-self: flex-end;
}
.td-bubble.sent.dark {
  background: #818cf8;
}

/* Media thumbnails */
.media-row {
  display: flex;
  gap: 0.6rem;
  margin-top: 1.25rem;
  align-items: center;
  position: relative; z-index: 1;
}
.med-thumb {
  width: 44px; height: 44px;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
}
.purple-bg { background: rgba(129,140,248,.18); color: #818cf8; }
.blue-bg   { background: rgba(96,165,250,.15);  color: #60a5fa; }
.green-bg  { background: rgba(52,211,153,.15);  color: #34d399; }
.med-more {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-text-muted);
  margin-left: 0.25rem;
}

/* Secure badges */
.secure-badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 1.25rem;
  position: relative; z-index: 1;
}
.sb {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  background: rgba(96,165,250,.1);
  color: #60a5fa;
  border: 1px solid rgba(96,165,250,.2);
}

/* PWA icons */
.pwa-row {
  display: flex;
  gap: 1rem;
  margin-top: 1.25rem;
  position: relative; z-index: 1;
}
.pwa-ic {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  color: var(--color-text-secondary);
}
.pwa-ic span {
  font-size: 0.65rem;
  font-weight: 600;
}

/* ═══════════════════════════════════════
   SHOWCASE SECTION
═══════════════════════════════════════ */
.showcase-section {
  padding: 5rem 1.5rem;
}

.showcase-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.stab {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.3rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1.5px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.stab:hover {
  border-color: var(--color-primary-light);
  color: var(--color-primary);
  transform: translateY(-1px);
}
.stab.active {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
  box-shadow: 0 6px 18px rgba(99,102,241,0.32);
}

.tab-fill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.34));
  border-right: 2px solid rgba(255, 255, 255, 0.55);
  transition: width 70ms linear;
  pointer-events: none;
  z-index: 0;
}
.tab-ic, .tab-lbl {
  position: relative;
  z-index: 1;
}

/* Staggered animations inside the active showcase panel */
.fcw-msgs .msg-row {
  opacity: 0;
  animation: msgPopIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.fcw-msgs .msg-row:nth-child(2) { animation-delay: 0.08s; }
.fcw-msgs .msg-row:nth-child(3) { animation-delay: 0.2s; }
.fcw-msgs .msg-row:nth-child(4) { animation-delay: 0.32s; }
.fcw-msgs .msg-row:nth-child(5) { animation-delay: 0.44s; }
.fcw-msgs .msg-row:nth-child(6) { animation-delay: 0.56s; }

.sidebar-list .sl-item {
  opacity: 0;
  animation: listSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.sidebar-list .sl-item:nth-child(1) { animation-delay: 0.05s; }
.sidebar-list .sl-item:nth-child(2) { animation-delay: 0.11s; }
.sidebar-list .sl-item:nth-child(3) { animation-delay: 0.17s; }
.sidebar-list .sl-item:nth-child(4) { animation-delay: 0.23s; }
.sidebar-list .sl-item:nth-child(5) { animation-delay: 0.29s; }
.sidebar-list .sl-item:nth-child(6) { animation-delay: 0.35s; }

@keyframes listSlideIn {
  from { opacity: 0; transform: translateX(-10px); }
  to   { opacity: 1; transform: translateX(0); }
}

.showcase-panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 24px;
  padding: 2.5rem;
  min-height: 420px;
}

.panel-desc h3 {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.025em;
  margin-bottom: 0.9rem;
}
.panel-desc p {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
  margin-bottom: 1.5rem;
}

.panel-features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.panel-features li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--color-text);
  font-weight: 500;
}
.panel-features li svg { color: #34d399; }

/* Full chat window (showcase) */
.panel-ui {
  display: flex;
  justify-content: center;
}

.full-chat-window {
  width: 100%;
  max-width: 400px;
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
}

.full-chat-window.sidebar-only {
  max-width: 320px;
}

/* Full chat header */
.fcw-header {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.875rem 1rem;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}
.fcw-av {
  width: 36px; height: 36px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.8rem; font-weight: 800; color: #fff;
  flex-shrink: 0;
}
.fcw-av.group-av {
  background: linear-gradient(135deg, var(--color-primary), #a855f7);
}
.fcw-name {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.2;
}
.fcw-status {
  font-size: 0.72rem;
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  gap: 0.3rem;
}
.fcw-hactions {
  display: flex;
  gap: 0.4rem;
  margin-left: auto;
}
.fch-btn {
  width: 30px; height: 30px;
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  color: var(--color-text-muted);
  background: var(--color-surface-3);
  transition: background 0.15s;
  cursor: pointer;
}
.fch-btn:hover { background: var(--color-surface-4); color: var(--color-text); }

/* Full messages area */
.fcw-msgs {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  padding: 1rem;
  background: var(--color-surface-2);
  min-height: 260px;
  overflow: hidden;
}

/* Full composer */
.fcw-composer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  flex-shrink: 0;
}

.fcc-attach, .fcc-emoji {
  width: 32px; height: 32px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: background 0.15s;
  flex-shrink: 0;
}
.fcc-attach:hover, .fcc-emoji:hover { background: var(--color-surface-3); }

.fcc-input {
  flex: 1;
  background: var(--color-surface-3);
  border-radius: 999px;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.fcc-send {
  width: 34px; height: 34px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 0.15s;
}
.fcc-send:hover { transform: scale(1.1); }

/* Sidebar-only panel */
.sidebar-search {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}
.ss-icon { color: var(--color-text-muted); }
.ss-placeholder {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.sidebar-list {
  display: flex;
  flex-direction: column;
}

.sl-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--color-border-light);
  cursor: pointer;
  transition: background 0.15s;
  position: relative;
}
.sl-item:hover { background: var(--color-surface-3); }
.sl-item.active { background: var(--color-primary-subtle); }
.sl-item:last-child { border-bottom: none; }

.sl-av {
  width: 36px; height: 36px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.8rem; font-weight: 800; color: #fff;
  flex-shrink: 0;
}

.group-sl-av {
  background: linear-gradient(135deg, var(--color-primary), #a855f7);
}

.sl-info { flex: 1; min-width: 0; }
.sl-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.2rem;
}
.sl-name {
  font-size: 0.825rem;
  font-weight: 700;
  color: var(--color-text);
}
.sl-time {
  font-size: 0.65rem;
  color: var(--color-text-muted);
}
.sl-preview {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
}

.sl-badge {
  min-width: 18px; height: 18px;
  border-radius: 999px;
  background: var(--color-primary);
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  padding: 0 5px;
}

/* Panel transition */
.panel-fade-enter-active, .panel-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.panel-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.panel-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* ═══════════════════════════════════════
   CTA
═══════════════════════════════════════ */
.cta-section {
  padding: 5rem 1.5rem 7rem;
}

.cta-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 28px;
  padding: 3.5rem;
  position: relative;
  overflow: hidden;
}

.cta-inner::before {
  content: '';
  position: absolute;
  top: -60px; left: -60px;
  width: 300px; height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(99,102,241,.12) 0%, transparent 70%);
  pointer-events: none;
}

.cta-gfx {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem;
}

.cta-bubble {
  display: inline-block;
  padding: 0.65rem 1rem;
  border-radius: 18px;
  font-size: 0.9rem;
  font-weight: 600;
  max-width: 220px;
  animation: ctaBob 3s ease-in-out infinite;
}

.b1 {
  background: var(--color-surface-3);
  color: var(--color-text);
  border-bottom-left-radius: 4px;
  align-self: flex-start;
  animation-delay: 0s;
}
.b2 {
  background: var(--color-primary);
  color: #fff;
  border-bottom-right-radius: 4px;
  align-self: flex-end;
  animation-delay: 0.5s;
}
.b3 {
  background: var(--color-surface-3);
  color: var(--color-text);
  border-bottom-left-radius: 4px;
  align-self: flex-start;
  animation-delay: 1s;
}

@keyframes ctaBob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

.cta-text-side { position: relative; z-index: 1; }

.cta-title {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 900;
  color: var(--color-text);
  line-height: 1.1;
  letter-spacing: -0.025em;
  margin-bottom: 0.9rem;
}

.cta-desc {
  font-size: 0.95rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1.75rem;
}

.cta-note {
  margin-top: 1rem;
  font-size: 0.82rem;
  color: var(--color-text-muted);
}
.cta-note a {
  color: var(--color-primary);
  font-weight: 600;
  text-decoration: none;
}
.cta-note a:hover { text-decoration: underline; }

/* ═══════════════════════════════════════
   SCROLL REVEAL ANIMATIONS
═══════════════════════════════════════ */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.bento-section .bento-card {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
  transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s, border-color 0.25s;
}
.bento-section.is-visible .bento-card {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.bento-section.is-visible .bento-card:nth-child(1) { transition-delay: 0.05s; }
.bento-section.is-visible .bento-card:nth-child(2) { transition-delay: 0.12s; }
.bento-section.is-visible .bento-card:nth-child(3) { transition-delay: 0.19s; }
.bento-section.is-visible .bento-card:nth-child(4) { transition-delay: 0.26s; }
.bento-section.is-visible .bento-card:nth-child(5) { transition-delay: 0.33s; }
.bento-section.is-visible .bento-card:nth-child(6) { transition-delay: 0.40s; }
.bento-section.is-visible .bento-card:hover {
  transition-delay: 0s;
  transform: translateY(-4px);
}

/* ═══════════════════════════════════════
   DEVICE SHOWCASE
═══════════════════════════════════════ */
.device-showcase {
  padding: 5.5rem 1.5rem 4rem;
}

.device-stage {
  position: relative;
}

.device-ambient-glow {
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  width: min(760px, 90%);
  height: 360px;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(99, 102, 241, 0.16) 0%, rgba(168, 85, 247, 0.08) 45%, transparent 72%);
  filter: blur(36px);
  pointer-events: none;
  z-index: 0;
  animation: glowPulse 6s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.75; transform: translate(-50%, -50%) scale(1); }
  50%      { opacity: 1;    transform: translate(-50%, -50%) scale(1.06); }
}

.dv-tabs {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.dv-tab {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.5rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
  border: 1.5px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.dv-tab:hover {
  border-color: var(--color-primary-light);
  color: var(--color-primary);
  transform: translateY(-1px);
}
.dv-tab.active {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
  box-shadow: 0 6px 18px rgba(99,102,241,0.35);
}

.dv-panel {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

/* Device fade transition */
.dv-fade-enter-active, .dv-fade-leave-active {
  transition: opacity 0.32s cubic-bezier(0.16, 1, 0.3, 1), transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
}
.dv-fade-enter-from {
  opacity: 0;
  transform: translateY(14px) scale(0.98);
}
.dv-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}

.dv-caption {
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: var(--color-text-muted);
  font-weight: 500;
}

/* ── Browser Frame ── */
.browser-frame {
  width: 100%;
  max-width: 1000px;
  background: var(--color-surface-2);
  border: 1.5px solid var(--color-border);
  border-radius: 14px;
  overflow: hidden;
  box-shadow:
    0 40px 100px rgba(0,0,0,0.2),
    0 12px 30px rgba(0,0,0,0.12),
    0 0 0 1px rgba(255,255,255,0.05);
  transform: perspective(1800px) rotateX(2deg);
  transition: transform 0.4s ease;
}
.browser-frame:hover {
  transform: perspective(1800px) rotateX(0deg);
}

.browser-chrome {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 1rem;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

.bc-dots { display: flex; gap: 5px; }
.bc-bar {
  flex: 1;
  display: flex;
  justify-content: center;
}
.bc-url {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--color-surface-3);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 0.3rem 0.9rem;
  font-size: 0.72rem;
  color: var(--color-text-muted);
  font-weight: 500;
  min-width: 200px;
  justify-content: center;
}
.bc-actions { display: flex; gap: 0.3rem; }
.bc-btn-ic {
  width: 22px; height: 22px;
  border-radius: 5px;
  display: flex; align-items: center; justify-content: center;
  color: var(--color-text-muted);
  cursor: pointer;
}
.bc-btn-ic:hover { background: var(--color-surface-3); }

/* App shell inside browser */
.browser-body {
  display: flex;
  height: 480px;
}

/* Nav rail */
.app-navrail {
  width: 56px;
  flex-shrink: 0;
  background: var(--color-surface);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem 0;
  gap: 0.25rem;
}
.nr-logo {
  margin-bottom: 0.5rem;
}
.nr-sep {
  width: 32px;
  height: 1px;
  background: var(--color-border);
  margin: 0.25rem 0;
}
.nr-item {
  width: 36px; height: 36px;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.nr-item:hover { background: var(--color-surface-3); color: var(--color-text); }
.nr-item.active {
  background: var(--color-primary-subtle);
  color: var(--color-primary);
}
.nr-spacer { flex: 1; }
.nr-av {
  width: 28px; height: 28px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.65rem; font-weight: 800; color: #fff;
}

/* Sidebar panel inside app */
.app-sidebar {
  width: 220px;
  flex-shrink: 0;
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
}
.as-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0.875rem 0.5rem;
}
.as-title {
  font-size: 0.875rem;
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.01em;
}
.as-btn {
  width: 26px; height: 26px;
  border-radius: 7px;
  display: flex; align-items: center; justify-content: center;
  color: var(--color-text-muted);
  cursor: pointer;
}
.as-btn:hover { background: var(--color-surface-3); }

.as-search {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin: 0 0.75rem 0.5rem;
  background: var(--color-surface-3);
  border-radius: 8px;
  padding: 0.4rem 0.6rem;
}
.as-si { color: var(--color-text-muted); }
.as-sp { font-size: 0.72rem; color: var(--color-text-muted); }

.as-list { flex: 1; overflow: hidden; }

.as-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  transition: background 0.12s;
  border-radius: 8px;
  margin: 0 0.25rem 0.1rem;
  position: relative;
}
.as-item:hover { background: var(--color-surface-3); }
.as-active { background: var(--color-primary-subtle) !important; }

.as-av {
  width: 32px; height: 32px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.72rem; font-weight: 800; color: #fff;
  flex-shrink: 0;
}

.g-av {
  background: linear-gradient(135deg, var(--color-primary), #a855f7);
  color: #fff;
}

.as-info { flex: 1; min-width: 0; }
.as-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1px;
}
.as-name {
  font-size: 0.775rem;
  font-weight: 700;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 110px;
}
.as-t {
  font-size: 0.6rem;
  color: var(--color-text-muted);
  flex-shrink: 0;
}
.as-preview {
  font-size: 0.7rem;
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 130px;
}
.as-badge {
  min-width: 16px; height: 16px;
  border-radius: 999px;
  background: var(--color-primary);
  color: #fff;
  font-size: 0.6rem;
  font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  padding: 0 4px;
  flex-shrink: 0;
}

/* Chat area inside app */
.app-chat {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--color-surface-2);
  min-width: 0;
}

.ac-header {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.75rem 1rem;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}
.ac-av {
  width: 32px; height: 32px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.72rem; font-weight: 800; color: #fff;
  flex-shrink: 0;
}
.ac-info { flex: 1; }
.ac-name {
  font-size: 0.825rem;
  font-weight: 700;
  color: var(--color-text);
}
.ac-status {
  font-size: 0.675rem;
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.ac-actions { display: flex; gap: 0.35rem; }
.ac-btn {
  width: 28px; height: 28px;
  border-radius: 7px;
  display: flex; align-items: center; justify-content: center;
  color: var(--color-text-muted);
  background: var(--color-surface-3);
  cursor: pointer;
  transition: background 0.12s;
}
.ac-btn:hover { background: var(--color-surface-4); color: var(--color-text); }

.ac-msgs {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1rem;
  overflow: hidden;
}

.ac-composer {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.65rem 0.875rem;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  flex-shrink: 0;
}
.acc-attach, .acc-emoji {
  width: 28px; height: 28px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: var(--color-text-muted);
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.12s;
}
.acc-attach:hover, .acc-emoji:hover { background: var(--color-surface-3); }
.acc-input {
  flex: 1;
  background: var(--color-surface-3);
  border-radius: 999px;
  padding: 0.4rem 0.875rem;
  font-size: 0.75rem;
  color: var(--color-text-muted);
}
.acc-send {
  width: 30px; height: 30px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
}

/* Monitor stand */
.monitor-stand {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.monitor-neck {
  width: 60px;
  height: 28px;
  background: var(--color-border);
  clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
}
.monitor-base {
  width: 160px;
  height: 10px;
  background: var(--color-border);
  border-radius: 999px;
}

/* ── Phone Frame ── */
.dv-mobile-panel {
  gap: 1rem;
}

.phone-wrap {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 2.75rem;
}

.phone-frame {
  width: 284px;
  background: var(--color-surface-2);
  border: 2px solid var(--color-border-strong);
  border-radius: 38px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow:
    0 40px 80px rgba(0,0,0,0.22),
    0 10px 24px rgba(0,0,0,0.12),
    inset 0 0 0 2px rgba(255,255,255,0.08);
  position: relative;
  transition: transform 0.3s ease;
}
.phone-frame:hover { transform: translateY(-8px); }

.phone-back {
  transform: scale(0.9) translateY(20px);
  opacity: 0.75;
  z-index: 0;
}
.phone-back:hover { transform: scale(0.9) translateY(14px); }
.phone-frame:not(.phone-back) { z-index: 1; }

.phone-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1.1rem 0.3rem;
  background: var(--color-surface);
  flex-shrink: 0;
}
.pst-time {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--color-text);
}
.pst-notch {
  width: 60px; height: 14px;
  background: var(--color-surface);
  border-radius: 999px;
  border: 2px solid var(--color-border);
}
.pst-icons {
  display: flex;
  align-items: center;
  gap: 3px;
  color: var(--color-text);
}

.phone-screen {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--color-surface-2);
  overflow: hidden;
}

/* Mobile chat header */
.mob-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.6rem;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}
.mob-back {
  color: var(--color-primary);
  display: flex; align-items: center;
  flex-shrink: 0;
}
.mob-av {
  width: 28px; height: 28px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.65rem; font-weight: 800; color: #fff;
  flex-shrink: 0;
}
.mob-title-info { flex: 1; min-width: 0; }
.mob-name {
  font-size: 0.775rem;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.2;
}
.mob-status {
  font-size: 0.6rem;
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  gap: 0.2rem;
}
.mob-actions { display: flex; gap: 0.2rem; }
.mob-btn {
  width: 26px; height: 26px;
  border-radius: 7px;
  display: flex; align-items: center; justify-content: center;
  color: var(--color-text-muted);
  cursor: pointer;
}

/* Mobile messages */
.mob-msgs {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  padding: 0.75rem;
  min-height: 295px;
  overflow: hidden;
}

.sm-av {
  width: 22px !important;
  height: 22px !important;
  font-size: 0.58rem !important;
}

.mob-bubble {
  font-size: 0.75rem !important;
  padding: 0.45rem 0.75rem !important;
  max-width: 210px !important;
}

.sm-typing {
  padding: 0.5rem 0.6rem !important;
}
.sm-typing span {
  width: 5px !important;
  height: 5px !important;
}

/* Mobile composer */
.mob-composer {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.5rem;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  flex-shrink: 0;
}
.mob-input {
  flex: 1;
  background: var(--color-surface-3);
  border-radius: 999px;
  padding: 0.35rem 0.65rem;
  font-size: 0.7rem;
  color: var(--color-text-muted);
}
.mob-emoji {
  width: 24px; height: 24px;
  display: flex; align-items: center; justify-content: center;
  color: var(--color-text-muted);
  flex-shrink: 0;
}
.mob-send {
  width: 28px; height: 28px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

/* Mobile bottom nav */
.mob-bottom-nav {
  display: flex;
  border-top: 1px solid var(--color-border);
  background: var(--color-surface);
  flex-shrink: 0;
}
.mbn-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 0.4rem 0;
  color: var(--color-text-muted);
  font-size: 0.55rem;
  font-weight: 600;
  cursor: pointer;
}
.mbn-active {
  color: var(--color-primary);
}

/* Phone home bar */
.phone-home-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem 0 0.5rem;
  background: var(--color-surface);
  flex-shrink: 0;
}
.phi {
  width: 60px;
  height: 4px;
  border-radius: 999px;
  background: var(--color-border-strong);
}

/* Mobile chat list screen */
.mob-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 0.75rem 0.3rem;
  background: var(--color-surface);
}
.mlh-title {
  font-size: 0.875rem;
  font-weight: 800;
  color: var(--color-text);
}
.mob-search {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin: 0.25rem 0.5rem 0.3rem;
  background: var(--color-surface-3);
  border-radius: 8px;
  padding: 0.3rem 0.6rem;
  font-size: 0.7rem;
  color: var(--color-text-muted);
}
.mob-chat-list { flex: 1; overflow: hidden; }

.mcl-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.6rem;
  border-bottom: 1px solid var(--color-border-light);
  cursor: pointer;
  transition: background 0.12s;
}
.mcl-item:last-child { border-bottom: none; }
.mcl-item:hover { background: var(--color-surface-3); }
.mcl-active { background: var(--color-primary-subtle); }

.mcl-av {
  width: 32px; height: 32px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.7rem; font-weight: 800; color: #fff;
  flex-shrink: 0;
}
.mcl-info { flex: 1; min-width: 0; }
.mcl-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mcl-name {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--color-text);
}
.mcl-t {
  font-size: 0.58rem;
  color: var(--color-text-muted);
}
.mcl-preview {
  font-size: 0.68rem;
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 175px;
}
.mcl-badge {
  min-width: 16px; height: 16px;
  border-radius: 999px;
  background: var(--color-primary);
  color: #fff;
  font-size: 0.58rem;
  font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  padding: 0 4px;
  flex-shrink: 0;
}

/* Staggered messages inside Desktop & Mobile device previews */
.ac-msgs .msg-row,
.mob-msgs .msg-row {
  opacity: 0;
  animation: msgPopIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.ac-msgs .msg-row:nth-child(2), .mob-msgs .msg-row:nth-child(2) { animation-delay: 0.1s; }
.ac-msgs .msg-row:nth-child(3), .mob-msgs .msg-row:nth-child(3) { animation-delay: 0.22s; }
.ac-msgs .msg-row:nth-child(4), .mob-msgs .msg-row:nth-child(4) { animation-delay: 0.34s; }
.ac-msgs .msg-row:nth-child(5), .mob-msgs .msg-row:nth-child(5) { animation-delay: 0.46s; }
.ac-msgs .msg-row:nth-child(6), .mob-msgs .msg-row:nth-child(6) { animation-delay: 0.58s; }

/* ═══════════════════════════════════════
   RESPONSIVE
═══════════════════════════════════════ */
@media (max-width: 1024px) {
  .hero {
    grid-template-columns: 1fr;
    padding: 3rem 5% 2rem;
    gap: 2rem;
    min-height: auto;
    text-align: center;
  }
  .hero-left { align-items: center; display: flex; flex-direction: column; }
  .hero-sub { margin-left: auto; margin-right: auto; }
  .hero-right { justify-content: center; }
  .windows-stack {
    max-width: 400px;
    height: 360px;
  }
  .chat-win-front { width: 300px; }
  .chat-win-back-l, .chat-win-back-r { width: 260px; }

  .bento {
    grid-template-columns: repeat(2, 1fr);
  }
  .b-realtime { grid-column: span 2; }

  .showcase-panel {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .panel-ui { justify-content: center; }

  .cta-inner {
    grid-template-columns: 1fr;
    padding: 2.5rem 2rem;
  }
  .cta-gfx { align-self: center; }
}

@media (max-width: 768px) {
  .app-sidebar {
    width: 180px;
  }
  .browser-body {
    height: 400px;
  }
}

@media (max-width: 640px) {
  .hero {
    padding: 3rem 1.25rem 1.5rem;
  }
  .hero-title { font-size: clamp(2.2rem, 8vw, 3rem); }
  .windows-stack { height: 320px; max-width: 320px; }
  .chat-win-front { width: 280px; }
  .chat-win-back-l { display: none; }
  .chat-win-back-r { display: none; }

  .bento { grid-template-columns: 1fr; }
  .b-realtime { grid-column: span 1; }

  .showcase-panel {
    padding: 1.5rem;
  }

  .hero-actions { flex-direction: column; align-items: stretch; width: 100%; max-width: 300px; }
  .btn-cta, .btn-ghost-cta { text-align: center; justify-content: center; }

  .cta-inner { border-radius: 20px; padding: 2rem 1.25rem; }

  /* device showcase mobile overrides */
  .browser-frame { transform: none !important; }
  .app-sidebar { display: none; }
  .browser-body { height: 380px; }
  .phone-back { display: none; }
  .phone-wrap { gap: 0; }
  .phone-frame { width: min(310px, calc(100vw - 2.5rem)); }
}

@media (prefers-reduced-motion: reduce) {
  .reveal,
  .reveal-immediate,
  .bento-section .bento-card,
  .chat-win-front .msg-row,
  .fcw-msgs .msg-row,
  .sidebar-list .sl-item,
  .ac-msgs .msg-row,
  .mob-msgs .msg-row {
    opacity: 1 !important;
    transform: none !important;
    animation: none !important;
    transition: none !important;
  }
  .grad,
  .badge-dot,
  .chat-win-front,
  .chat-win-back-l,
  .chat-win-back-r,
  .device-ambient-glow,
  .cta-bubble {
    animation: none !important;
  }
}
</style>
