<template>
  <div class="conversation-page">
    <template v-if="chatLoading">
      <div class="conv-center">
        <AppLoader size="md" />
      </div>
    </template>

    <template v-else-if="chatData">
      <ChatHeader :chat="chatData" @clear-chat="handleClearChat" />
      <ChatMessages
        :messages="messages"
        :messages-loading="messagesLoading"
        :participants="chatData.participants || []"
        :is-group="chatData.type === 'group'"
        :chat="chatData"
        @delete-message="handleDelete"
        @edit-message="handleEditMessage"
        @react-message="handleReact"
      />
      <ChatComposer
        :chat-id="chatId"
        :message-to-edit="messageToEdit"
        @cancel-edit="messageToEdit = null"
      />
    </template>

    <div v-else class="conv-center">
      <p style="color: var(--color-text-muted); margin-bottom: 1rem;">Conversation not found.</p>
      <NuxtLink to="/chat" class="btn btn-primary">← Go back</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { getFirestore, doc, onSnapshot, updateDoc } from 'firebase/firestore'

definePageMeta({ middleware: 'auth', layout: 'default' })

const route = useRoute()
const chatId = computed(() => route.params.chatId)

const { messages, messagesLoading, subscribeMessages, unsubscribeMessages, deleteMessage, clearChat, toggleReaction } = useMessages()
const { showToast } = useUI()
const { currentUser } = useAuth()

const chatData = ref(null)
const messageToEdit = ref(null)
const chatLoading = ref(true)
let unsubChat = null

function loadChat(id) {
  chatLoading.value = true
  if (unsubChat) { unsubChat(); unsubChat = null }
  const db = getFirestore()
  unsubChat = onSnapshot(doc(db, 'chats', id), (snap) => {
    if (snap.exists()) {
      const data = snap.data()
      chatData.value = { id: snap.id, ...data }

      // If we are actively viewing this chat and unread count is > 0, reset it
      const uid = currentUser.value?.uid
      if (uid && data.unreadCount?.[uid] > 0) {
        updateDoc(doc(db, 'chats', id), { [`unreadCount.${uid}`]: 0 }).catch(() => {})
      }
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

function handleEditMessage(message) {
  messageToEdit.value = message
}

async function handleReact(messageId, emoji) {
  try {
    await toggleReaction(chatId.value, messageId, emoji)
  } catch (err) {
    showToast('Could not add reaction', 'error')
  }
}

async function handleClearChat() {
  if (confirm('Are you sure you want to clear this chat? This will only clear it for you.')) {
    try {
      await clearChat(chatId.value)
      showToast('Chat cleared', 'success')
    } catch {
      showToast('Could not clear chat', 'error')
    }
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
