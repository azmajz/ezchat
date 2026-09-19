<template>
  <div class="conversation-page">
    <template v-if="chatLoading">
      <div class="conv-center">
        <AppLoader size="md" />
      </div>
    </template>

    <template v-else-if="chatData">
      <ChatHeader :chat="chatData" />
      <ChatMessages
        :messages="messages"
        :messages-loading="messagesLoading"
        :participants="chatData.participants || []"
        :is-group="chatData.type === 'group'"
        :chat="chatData"
        @delete-message="handleDelete"
      />
      <ChatComposer :chat-id="chatId" />
    </template>

    <div v-else class="conv-center">
      <p style="color: var(--color-text-muted); margin-bottom: 1rem;">Conversation not found.</p>
      <NuxtLink to="/chat" class="btn btn-primary">← Go back</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { getFirestore, doc, onSnapshot } from 'firebase/firestore'

definePageMeta({ middleware: 'auth', layout: 'default' })

const route = useRoute()
const chatId = computed(() => route.params.chatId)

const { messages, messagesLoading, subscribeMessages, unsubscribeMessages, deleteMessage } = useMessages()
const { showToast } = useUI()

const chatData = ref(null)
const chatLoading = ref(true)
let unsubChat = null

function loadChat(id) {
  chatLoading.value = true
  if (unsubChat) { unsubChat(); unsubChat = null }
  const db = getFirestore()
  unsubChat = onSnapshot(doc(db, 'chats', id), (snap) => {
    if (snap.exists()) {
      chatData.value = { id: snap.id, ...snap.data() }
    } else {
      chatData.value = null
    }
    chatLoading.value = false
  }, (err) => {
    console.error('loadChat error:', err)
    chatLoading.value = false
  })
}

watch(chatId, (id) => {
  if (!id) return
  loadChat(id)
  subscribeMessages(id)
}, { immediate: true })

async function handleDelete(messageId) {
  try {
    await deleteMessage(chatId.value, messageId)
    showToast('Message deleted', 'success')
  } catch {
    showToast('Could not delete message', 'error')
  }
}

onUnmounted(() => {
  unsubscribeMessages(chatId.value)
  if (unsubChat) unsubChat()
})
</script>

<style scoped>
.conversation-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background: var(--color-surface);
}

.conv-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: var(--color-text-muted);
}
</style>
