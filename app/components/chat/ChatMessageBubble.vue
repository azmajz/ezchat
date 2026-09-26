<template>
  <div class="message-wrap" :class="[isOwn ? 'own' : 'other', isFirstFromSender ? 'first-in-group' : '', hasReactions ? 'has-reactions' : '']" @mouseenter="hovered = true" @mouseleave="handleMouseLeave">
    
    <!-- Avatar (only for received messages) -->
    <div v-if="!isOwn" class="message-avatar">
      <AppAvatar v-if="isFirstFromSender" :src="senderData?.photoURL" :name="senderData?.displayName || '...'" size="sm" />
    </div>

    <div class="message-content">
      <!-- Sender name (group chats, first message only) -->
      <span v-if="isGroup && !isOwn && isFirstFromSender" class="sender-name">{{ senderData?.displayName || 'Unknown' }}</span>

      <div class="bubble-row">
        <div v-if="message.isDeleted" class="bubble bubble-deleted" :class="[isOwn ? 'bubble-sent' : 'bubble-received', !isFirstFromSender ? 'bubble-chained' : '']">
          <p class="bubble-text" style="opacity: 0.7; font-style: italic;">
            🚫 This message was deleted
          </p>
          <span class="bubble-time">{{ formattedTime }}</span>
        </div>
        <div v-else class="bubble" :class="[isOwn ? 'bubble-sent' : 'bubble-received', `bubble-${message.type}`, !isFirstFromSender ? 'bubble-chained' : '']">
          <template v-if="message.type === 'text'">
            <p class="bubble-text"><span v-html="formattedText"></span> <span v-if="message.isEdited" style="font-size: 0.75em; opacity: 0.7;">(edited)</span></p>
          </template>

          <!-- Image message -->
          <ChatImageMessage v-else-if="message.type === 'image'" :message="message" @image-loaded="$emit('image-loaded')" />

          <!-- File message -->
          <ChatFileMessage v-else-if="message.type === 'file'" :message="message" :is-own="isOwn" />

          <span class="bubble-time">{{ formattedTime }}</span>

        </div>

        <!-- Hover Actions -->
        <Transition name="fade-quick">
          <div v-if="(hovered || showMenu) && !message.isDeleted" class="bubble-actions-container" :class="{ 'other-actions': !isOwn }">
            
            <!-- Quick Emoji Reactions -->
            <div class="quick-reactions" v-if="!disableReactions">
              <button class="react-icon-btn" @click.stop="onReact('👍')" title="Thumbs up">👍</button>
              <button class="react-icon-btn" @click.stop="onReact('❤️')" title="Heart">❤️</button>
              <button class="react-icon-btn" @click.stop="onReact('😂')" title="Laugh">😂</button>
              <button class="react-icon-btn" @click.stop="onReact('😮')" title="Surprised">😮</button>
              <button class="react-icon-btn" @click.stop="onReact('😢')" title="Sad">😢</button>
            </div>

            <!-- More Options (Only for own messages right now) -->
            <div class="more-options-wrap" v-if="isOwn">
              <div class="actions-divider"></div>
              <button class="more-btn btn-icon" @click.stop="showMenu = !showMenu" title="More options">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
              </button>
              
              <Transition name="fade-quick">
                <div v-if="showMenu" class="action-dropdown">
                  <button
                    v-if="message.type === 'text'"
                    class="dropdown-item"
                    @click.stop="onEdit"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
                    <span>Edit</span>
                  </button>
                  <button
                    class="dropdown-item danger"
                    @click.stop="onDelete"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                    <span>Delete</span>
                  </button>
                </div>
              </Transition>
            </div>
          </div>
        </Transition>
      </div>
      
      <!-- Quick Replies (for bot messages) -->
      <div v-if="message.quickReplies && message.quickReplies.length" class="quick-replies">
        <button 
          v-for="reply in message.quickReplies" 
          :key="reply"
          class="quick-reply-btn"
          @click="$emit('quick-reply', reply)"
        >
          {{ reply }}
        </button>
      </div>
      
      <!-- Display Reactions -->
      <div v-if="hasReactions" class="reactions-display">
        <template v-for="(uids, emoji) in message.reactions" :key="emoji">
          <button
            v-if="uids.length > 0"
            class="reaction-badge"
            :class="{ active: uids.includes(currentUser?.uid) }"
            @click.stop="onReact(emoji)"
            :title="getReactorsText(uids)"
          >
            <span class="reaction-emoji">{{ emoji }}</span>
            <span class="reaction-count">{{ uids.length }}</span>
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  message: { type: Object, required: true },
  isOwn: { type: Boolean, default: false },
  senderData: { type: Object, default: null },
  isGroup: { type: Boolean, default: false },
  isFirstFromSender: { type: Boolean, default: true },
  getParticipant: { type: Function, default: null },
  disableReactions: { type: Boolean, default: false }
})
const emit = defineEmits(['delete', 'edit', 'react', 'image-loaded', 'quick-reply'])

const { currentUser } = useAuth()

const hovered = ref(false)
const showMenu = ref(false)

function handleMouseLeave() {
  hovered.value = false
  showMenu.value = false
}

function onReact(emoji) {
  emit('react', emoji)
}

function onEdit() {
  showMenu.value = false
  emit('edit')
}

function onDelete() {
  showMenu.value = false
  emit('delete')
}

const hasReactions = computed(() => {
  const r = props.message.reactions
  if (!r) return false
  return Object.values(r).some(uids => uids.length > 0)
})

function getReactorsText(uids) {
  if (!uids || !uids.length) return ''
  const names = uids.map(uid => {
    if (uid === currentUser.value?.uid) return 'You'
    if (props.getParticipant) {
      const p = props.getParticipant(uid)
      if (p && p.displayName) return p.displayName
    }
    return 'Someone'
  })
  return names.join(', ')
}

const formattedTime = computed(() => {
  const ts = props.message.createdAt
  if (!ts) return ''
  const date = ts.toDate ? ts.toDate() : new Date(ts)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
})

const formattedText = computed(() => {
  if (!props.message.text) return ''
  let text = props.message.text
  
  // Escape HTML to prevent XSS
  text = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  // Bold: **text** or *text*
  text = text.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>')
  text = text.replace(/\*([^\*]+)\*/g, '<strong>$1</strong>')

  // Underline: __text__
  text = text.replace(/__([^_]+)__/g, '<u>$1</u>')

  // Italic: _text_
  text = text.replace(/_([^_]+)_/g, '<em>$1</em>')

  // Strikethrough: ~text~
  text = text.replace(/~([^~]+)~/g, '<del>$1</del>')

  // Code: `text`
  text = text.replace(/`([^`]+)`/g, '<code style="background: rgba(128,128,128,0.2); padding: 0.1em 0.3em; border-radius: 4px; font-size: 0.9em;">$1</code>')

  // Newlines to <br>
  text = text.replace(/\n/g, '<br>')

  return text
})
</script>

<style scoped>
.message-wrap {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  max-width: 82%;
  animation: messagePop 180ms ease forwards;
}

.message-wrap.first-in-group {
  margin-top: 0.875rem;
}

.message-wrap.own {
  align-self: flex-end;
}

.message-wrap.other {
  align-self: flex-start;
  align-items: flex-start;
}

.message-avatar {
  width: 34px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
}

.message-content {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.message-wrap.own .message-content {
  align-items: flex-end;
}

.message-wrap.other .message-content {
  align-items: flex-start;
}

@media (max-width: 768px) {
  .message-wrap {
    gap: 0.35rem;
  }
  .message-avatar {
    width: 26px;
  }
  .message-avatar :deep(.avatar) {
    width: 26px;
    height: 26px;
    font-size: 11px;
  }
}

.sender-name {
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 0.25rem;
  padding-left: 0.75rem;
  letter-spacing: 0.01em;
}

.bubble-row {
  display: flex;
  align-items: flex-end;
  gap: 0.375rem;
  position: relative;
}

.message-wrap.own .bubble-row { flex-direction: row-reverse; }

.bubble {
  padding: 0.5625rem 0.875rem;
  border-radius: var(--radius-lg);
  max-width: 100%;
  position: relative;
}

/* Sent bubble — rich indigo gradient */
.bubble-sent {
  background: var(--color-sent-bg);
  color: var(--color-sent-text);
  border-bottom-right-radius: var(--radius-sm);
  border-top-right-radius: var(--radius-sm);
  box-shadow: 0 2px 8px rgba(79, 70, 229, 0.25);
}

/* Received bubble — clean white card with subtle depth */
.bubble-received {
  background: var(--color-received-bg);
  color: var(--color-received-text);
  border-bottom-left-radius: var(--radius-sm);
  border-top-left-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-xs);
}

/* WhatsApp-style points for the first message in a group */
.message-wrap.other.first-in-group .bubble-received {
  border-top-left-radius: 0;
}

.message-wrap.own.first-in-group .bubble-sent {
  border-top-right-radius: 0;
}

.bubble-image, .bubble-file {
  padding: 0.375rem;
  overflow: hidden;
}

.bubble-text {
  font-size: var(--font-size-sm);
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
  margin-bottom: 0.2rem;
}

.bubble-time {
  display: block;
  font-size: 10px;
  opacity: 0.6;
  text-align: right;
  margin-top: 0.15rem;
  letter-spacing: 0.01em;
}

.bubble-sent .bubble-time { color: rgba(255,255,255,0.8); opacity: 1; }
.bubble-received .bubble-time { color: var(--color-text-muted); }

/* Hover Action Bar */
.bubble-actions-container {
  position: absolute;
  top: -40px;
  right: 0;
  display: flex;
  align-items: center;
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  padding: 0.15rem;
  z-index: 10;
}

.bubble-actions-container.other-actions {
  right: auto;
  left: 0;
}

.quick-reactions {
  display: flex;
  gap: 0.1rem;
  padding: 0 0.2rem;
}

.react-icon-btn {
  width: 28px;
  height: 28px;
  border-radius: 5px;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 150ms ease, background 150ms ease;
}

.react-icon-btn:hover {
  background: var(--color-surface-3);
  transform: scale(1.2);
}

.more-options-wrap {
  display: flex;
  align-items: center;
  position: relative;
}

.actions-divider {
  width: 1px;
  height: 16px;
  background: var(--color-border);
  margin: 0 0.2rem;
}

.more-btn {
  width: 28px; height: 28px;
  flex-shrink: 0;
  border-radius: 5px;
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
}

.more-btn:hover { background: var(--color-surface-3); color: var(--color-text); }

.action-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  padding: 0.25rem;
  display: flex;
  flex-direction: column;
  min-width: 148px;
  z-index: 20;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: none;
  background: none;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  color: var(--color-text);
  cursor: pointer;
  text-align: left;
  transition: background var(--transition-fast);
}

.dropdown-item:hover { background: var(--color-surface-3); }

.dropdown-item.danger { color: var(--color-error); }
.dropdown-item.danger:hover { background: rgba(239, 68, 68, 0.07); }

/* Reactions Display */
.reactions-display {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-top: -6px;
  z-index: 5;
  position: relative;
  max-width: 90%;
}

.message-wrap.own .reactions-display {
  margin-right: 10px;
  justify-content: flex-end;
}

.message-wrap.other .reactions-display {
  padding-bottom: 3px;
  margin-left: 10px;
  justify-content: flex-start;
}

.reaction-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 0.175rem 0.45rem;
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
  color: var(--color-text-secondary);
  box-shadow: var(--shadow-xs);
  cursor: pointer;
  transition: transform 150ms ease, background 150ms ease, border-color 150ms ease, box-shadow 150ms ease;
  user-select: none;
  animation: reactionPop 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  transform-origin: center bottom;
}

@keyframes reactionPop {
  0% { transform: scale(0.5); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

.reaction-emoji {
  font-size: 13px;
  display: inline-block;
}

.reaction-badge.active .reaction-emoji {
  animation: emojiWiggle 0.4s ease-in-out;
}

@keyframes emojiWiggle {
  0% { transform: rotate(0deg) scale(1); }
  25% { transform: rotate(-15deg) scale(1.2); }
  50% { transform: rotate(15deg) scale(1.2); }
  75% { transform: rotate(-10deg) scale(1.1); }
  100% { transform: rotate(0deg) scale(1); }
}

.reaction-count {
  padding-right: 0.1rem;
}

.reaction-badge:hover {
  transform: scale(1.08);
  background: var(--color-surface-3);
  box-shadow: var(--shadow-sm);
}

/* Quick Replies */
.quick-replies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding-left: 0.5rem;
  z-index: 5;
}

.quick-reply-btn {
  background: var(--color-surface);
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  border-radius: var(--radius-full);
  padding: 0.4rem 0.8rem;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);
}

.quick-reply-btn:hover {
  background: var(--color-primary);
  color: #fff;
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.quick-reply-btn:active {
  transform: translateY(0);
}

.reaction-badge.active {
  background: var(--color-sidebar-active);
  border-color: var(--color-primary);
  color: var(--color-primary);
  box-shadow: 0 0 0 1px var(--color-primary-light);
}

.fade-quick-enter-active, .fade-quick-leave-active { transition: opacity 100ms; }
.fade-quick-enter-from, .fade-quick-leave-to { opacity: 0; }

@media (max-width: 767px) {
  .message-wrap { max-width: 92%; }
}
</style>
