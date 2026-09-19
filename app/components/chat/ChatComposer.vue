<template>
  <div class="composer">
    <!-- Upload progress bar -->
    <Transition name="slide-down">
      <div v-if="isUploading" class="upload-progress-bar">
        <div class="upload-progress-fill" :style="{ width: uploadProgress + '%' }"></div>
        <span class="upload-progress-text">Uploading… {{ uploadProgress }}%</span>
      </div>
    </Transition>

    <!-- File preview -->
    <div v-if="pendingFile" class="file-preview">
      <img v-if="isImage" :src="filePreviewUrl" class="file-preview-img" alt="preview" />
      <div v-else class="file-preview-info">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        <span>{{ pendingFile.name }}</span>
      </div>
      <button class="btn-icon file-preview-remove" @click="clearFile">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>

    <!-- Edit bar -->
    <div v-if="messageToEdit" class="edit-bar">
      <div class="edit-bar-info">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
        <span>Editing message</span>
      </div>
      <button class="btn-icon" @click="emit('cancel-edit')">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>

    <!-- Main composer row -->
    <div class="composer-row">
      <!-- Attach button -->
      <label class="btn-icon attach-btn" title="Attach file">
        <input
          ref="fileInput"
          type="file"
          accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,.zip,.rar"
          class="sr-only"
          @change="onFileSelect"
        />
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
      </label>

      <!-- Textarea -->
      <textarea
        ref="textareaRef"
        v-model="text"
        class="composer-input"
        placeholder="Type a message…"
        rows="1"
        @keydown.enter.exact.prevent="send"
        @keydown.shift.enter="() => {}"
        @input="onTyping"
        id="chat-composer-input"
      ></textarea>

      <!-- Send button -->
      <button
        class="send-btn"
        :class="{ active: canSend }"
        @click="send"
        :disabled="!canSend || isUploading"
        title="Send (Enter)"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  chatId: { type: String, required: true },
  messageToEdit: { type: Object, default: null }
})
const emit = defineEmits(['cancel-edit'])

const { sendMessage, editMessage } = useMessages()
const { setTypingState } = useChats()
const { uploadChatFile, uploadProgress, isUploading } = useStorage()
const { showToast } = useUI()

const text = ref('')
const textareaRef = ref(null)

watch(() => props.messageToEdit, (msg) => {
  if (msg && msg.type === 'text') {
    text.value = msg.text || ''
    nextTick(() => {
      autoResize()
      textareaRef.value?.focus()
    })
  } else if (!msg) {
    text.value = ''
    nextTick(() => autoResize())
  }
})

const fileInput = ref(null)
const pendingFile = ref(null)
const filePreviewUrl = ref(null)
let typingTimeout = null

const isImage = computed(() => pendingFile.value?.type?.startsWith('image/'))
const canSend = computed(() => text.value.trim() || pendingFile.value)

function onFileSelect(e) {
  const file = e.target.files?.[0]
  if (!file) return
  pendingFile.value = file
  if (file.type.startsWith('image/')) {
    filePreviewUrl.value = URL.createObjectURL(file)
  }
  if (fileInput.value) fileInput.value.value = ''
}

function clearFile() {
  pendingFile.value = null
  filePreviewUrl.value = null
}

function autoResize() {
  const el = textareaRef.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 120) + 'px'
}

function onTyping() {
  autoResize()
  if (text.value.trim()) {
    setTypingState(props.chatId, true)
    clearTimeout(typingTimeout)
    typingTimeout = setTimeout(() => {
      setTypingState(props.chatId, false)
    }, 2000)
  } else {
    setTypingState(props.chatId, false)
    clearTimeout(typingTimeout)
  }
}

async function send() {
  if (!canSend.value || isUploading.value) return
  
  setTypingState(props.chatId, false)
  clearTimeout(typingTimeout)

  try {
    if (props.messageToEdit) {
      if (text.value.trim()) {
        await editMessage(props.chatId, props.messageToEdit.id, text.value.trim())
      }
      emit('cancel-edit')
      return
    }

    if (pendingFile.value) {
      const file = pendingFile.value
      const type = file.type.startsWith('image/') ? 'image' : 'file'
      const { url, fileName, fileSize, mimeType } = await uploadChatFile(props.chatId, file)
      await sendMessage(props.chatId, { type, fileUrl: url, fileName, fileSize, mimeType })
      clearFile()
    }

    if (text.value.trim()) {
      await sendMessage(props.chatId, { type: 'text', text: text.value.trim() })
      text.value = ''
      nextTick(() => autoResize())
    }
  } catch (err) {
    showToast('Failed to send message', 'error')
  }
}
</script>

<style scoped>
.composer {
  border-top: 1px solid var(--color-border);
  background: var(--color-surface);
  flex-shrink: 0;
}

.edit-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background: var(--color-surface-2);
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}
.edit-bar-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.upload-progress-bar {
  position: relative;
  height: 3px;
  background: var(--color-border);
  overflow: hidden;
}

.upload-progress-fill {
  height: 100%;
  background: var(--color-primary);
  transition: width 150ms ease;
}

.upload-progress-text {
  position: absolute;
  top: 4px;
  left: 50%;
  transform: translateX(-50%);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  white-space: nowrap;
}

.file-preview {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem 0;
}

.file-preview-img {
  height: 60px;
  width: 60px;
  object-fit: cover;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
}

.file-preview-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-surface-3);
  padding: 0.375rem 0.75rem;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  max-width: 200px;
}

.file-preview-info span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-preview-remove {
  width: 24px; height: 24px;
  color: var(--color-error);
  flex-shrink: 0;
}

.composer-row {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  padding: 0.75rem;
}

.attach-btn {
  color: var(--color-text-muted);
  cursor: pointer;
  flex-shrink: 0;
  width: 40px; height: 40px;
}

.attach-btn:hover { color: var(--color-primary); background: var(--color-primary-light); }

.composer-input {
  flex: 1;
  resize: none;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 0.625rem 1rem;
  background: var(--color-surface-2);
  color: var(--color-text);
  font-size: var(--font-size-base);
  line-height: 1.5;
  max-height: 120px;
  overflow-y: auto;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.composer-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-light);
}

.composer-input::placeholder { color: var(--color-text-muted); }

.send-btn {
  width: 40px; height: 40px;
  border-radius: 50%;
  border: none;
  background: var(--color-border);
  color: var(--color-text-muted);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  transition: all var(--transition-base);
}

.send-btn.active {
  background: var(--color-primary);
  color: white;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(99,102,241,0.4);
}

.send-btn.active:hover {
  background: var(--color-primary-hover);
}

.send-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

.slide-down-enter-active, .slide-down-leave-active { transition: all 200ms ease; }
.slide-down-enter-from, .slide-down-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
