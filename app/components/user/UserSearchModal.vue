<template>
  <AppModal :model-value="modelValue" title="Find People" @update:model-value="$emit('update:modelValue', $event)">
    <div class="search-modal">
      <div class="search-wrap">
        <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input
          v-model="query"
          type="search"
          class="form-input search-input"
          placeholder="Search by name or email…"
          autofocus
          id="user-search-input"
          @input="onSearch"
        />
      </div>

      <div class="search-results">
        <div v-if="loading" class="search-state">
          <AppLoader size="sm" />
        </div>
        <div v-else-if="query && results.length === 0" class="search-state">
          <p>No users found for "{{ query }}"</p>
        </div>
        <div v-else-if="!query" class="search-state">
          <p>Type to search for people</p>
        </div>
        <button
          v-for="user in results"
          :key="user.uid"
          class="user-result"
          @click="startChat(user)"
          :disabled="startingChat"
        >
          <AppAvatar :src="user.photoURL" :name="user.displayName" size="sm" :online="user.isOnline" fallbackIcon="lucide:user" />
          <div class="user-result-info">
            <span class="user-result-name">{{ user.displayName }}</span>
            <span class="user-result-email">{{ user.email }}</span>
          </div>
          <AppLoader v-if="startingChat === user.uid" size="sm" />
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>
  </AppModal>
</template>

<script setup>
const props = defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue'])

const router = useRouter()
const { searchUsers, createDirectChat } = useChats()

const query = ref('')
const results = ref([])
const loading = ref(false)
const startingChat = ref(null)

let debounceTimer = null

async function onSearch() {
  clearTimeout(debounceTimer)
  if (!query.value.trim()) { results.value = []; return }
  loading.value = true
  debounceTimer = setTimeout(async () => {
    results.value = await searchUsers(query.value)
    loading.value = false
  }, 350)
}

async function startChat(user) {
  startingChat.value = user.uid
  try {
    const chatId = await createDirectChat(user.uid)
    emit('update:modelValue', false)
    query.value = ''
    results.value = []
    await router.push(`/chat/${chatId}`)
  } finally {
    startingChat.value = null
  }
}
</script>

<style scoped>
.search-modal { display: flex; flex-direction: column; gap: 1rem; }
.search-wrap { position: relative; }
.search-icon { position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: var(--color-text-muted); }
.search-input { padding-left: 2.25rem !important; }

.search-results {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-height: 120px;
  max-height: 360px;
  overflow-y: auto;
}

.search-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.user-result {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  border-radius: var(--radius-md);
  border: none;
  background: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  color: var(--color-text);
  transition: background var(--transition-fast);
}

.user-result:hover:not(:disabled) { background: var(--color-surface-3); }
.user-result:disabled { opacity: 0.6; }

.user-result-info {
  flex: 1; min-width: 0;
  display: flex; flex-direction: column;
}

.user-result-name { font-size: var(--font-size-sm); font-weight: 600; }
.user-result-email { font-size: var(--font-size-xs); color: var(--color-text-muted); }
</style>
