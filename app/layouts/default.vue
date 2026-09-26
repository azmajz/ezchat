<template>
  <div class="chat-layout">
    <aside class="chat-nav-rail" :class="{ 'sidebar-hidden': isMobile && mainPanelVisible }">
      <NavRail />
    </aside>
    <aside class="chat-sidebar-panel" :class="{ 'sidebar-hidden': isMobile && mainPanelVisible }">
      <ChatSidebar />
    </aside>
    <main class="chat-main-panel" :class="{ 'panel-hidden': isMobile && !mainPanelVisible }">
      <slot />
    </main>
    <MobileBottomNav v-if="isMobile && !hasChatId" />
    <AppToast />
    
    <SettingsModal v-model="showSettingsModal" @openProfile="openProfile" />
    <ProfileModal v-model="showProfileModal" />
  </div>
</template>

<script setup>
const route = useRoute()

const hasChatId = computed(() => !!route.params.chatId)
const mainPanelVisible = computed(() => hasChatId.value)

const { showSettingsModal, showProfileModal } = useUI()

function openProfile() {
  showSettingsModal.value = false
  showProfileModal.value = true
}

const isMobile = ref(false)

function checkMobile() {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

// Subscribe to chats when layout mounts
const { currentUser } = useAuth()
const { subscribeChats, unsubscribeChats, ensureEchoBot } = useChats()

watch(currentUser, async (user) => {
  if (user) {
    try {
      await ensureEchoBot()
    } catch (err) {
      console.error('Failed to ensure echo bot:', err)
    }
    subscribeChats(user.uid)
  } else {
    unsubscribeChats()
  }
}, { immediate: true })

onUnmounted(() => unsubscribeChats())
</script>

<style scoped>
.chat-layout {
  display: flex;
  height: 100dvh;
  overflow: hidden;
  background: var(--color-surface);
}

.chat-nav-rail {
  width: var(--nav-rail-width);
  flex-shrink: 0;
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  background: var(--color-navrail);
  z-index: 10;
}

.chat-sidebar-panel {
  width: var(--sidebar-width);
  flex-shrink: 0;
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  background: var(--color-sidebar);
  transition: transform var(--transition-panel);
  overflow: hidden;
}

.chat-main-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  background: var(--color-surface);
}

/* Mobile layout — full screen panels, one at a time */
@media (max-width: 767px) {
  .chat-nav-rail {
    display: none;
  }

  .chat-sidebar-panel {
    width: 100%;
    border-right: none;
  }

  .chat-main-panel {
    position: fixed;
    inset: 0;
    background: var(--color-surface);
    z-index: 20;
  }

  .sidebar-hidden {
    display: none;
  }

  .panel-hidden {
    display: none !important;
  }
}
</style>
