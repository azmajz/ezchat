<template>
  <AppModal :model-value="modelValue" title="Create Group" @update:model-value="$emit('update:modelValue', $event)">
    <div class="group-create">
      <!-- Group image -->
      <div class="group-img-wrap">
        <label class="group-img-label" for="group-img-input">
          <div class="group-img-preview">
            <img v-if="groupImagePreview" :src="groupImagePreview" alt="Group image" class="group-img" />
            <div v-else class="group-img-placeholder">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.4"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div class="group-img-overlay">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            </div>
          </div>
        </label>
        <input id="group-img-input" type="file" accept="image/*" class="sr-only" @change="onGroupImageSelect" />
      </div>

      <!-- Group name -->
      <div class="form-group">
        <label class="form-label" for="group-name">Group Name *</label>
        <input id="group-name" v-model="groupName" type="text" class="form-input" placeholder="e.g. Team Rocket" required />
      </div>

      <!-- Group description -->
      <div class="form-group">
        <label class="form-label" for="group-description">Description</label>
        <textarea id="group-description" v-model="groupDescription" class="form-input" rows="2" placeholder="What is this group about?"></textarea>
      </div>

      <!-- Add members -->
      <div class="form-group">
        <label class="form-label" for="group-member-search">Add Members</label>
        <div class="search-wrap">
          <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input id="group-member-search" v-model="memberSearch" type="search" class="form-input" style="padding-left: 2rem;" placeholder="Search users…" @input="searchForMembers" />
        </div>
      </div>

      <!-- Search results -->
      <div v-if="searchResults.length" class="member-results">
        <button v-for="user in searchResults" :key="user.uid" class="member-result" @click="addMember(user)">
          <AppAvatar :src="user.photoURL" :name="user.displayName" size="xs" fallbackIcon="lucide:user" />
          <span>{{ user.displayName }}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </div>

      <!-- Selected members -->
      <div v-if="selectedMembers.length" class="selected-members">
        <div v-for="user in selectedMembers" :key="user.uid" class="selected-chip">
          <AppAvatar :src="user.photoURL" :name="user.displayName" size="xs" fallbackIcon="lucide:user" />
          <span>{{ user.displayName }}</span>
          <button class="chip-remove" @click="removeMember(user.uid)">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>

      <div v-if="error" class="form-error">{{ error }}</div>
    </div>

    <template #footer>
      <button class="btn btn-secondary" @click="$emit('update:modelValue', false)">Cancel</button>
      <button class="btn btn-primary" @click="createGroup" :disabled="creating || !groupName.trim()">
        <AppLoader v-if="creating" size="sm" color="white" />
        <span v-else>Create group</span>
      </button>
    </template>
  </AppModal>
</template>

<script setup>
const props = defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue'])

const router = useRouter()
const { searchUsers, createGroupChat } = useChats()
const { uploadGroupImage } = useStorage()
const { showToast } = useUI()

const groupName = ref('')
const groupDescription = ref('')
const groupImage = ref(null)
const groupImagePreview = ref(null)
const memberSearch = ref('')
const searchResults = ref([])
const selectedMembers = ref([])
const creating = ref(false)
const error = ref('')

let debounce = null

function onGroupImageSelect(e) {
  const file = e.target.files?.[0]
  if (!file) return
  groupImage.value = file
  groupImagePreview.value = URL.createObjectURL(file)
}

async function searchForMembers() {
  clearTimeout(debounce)
  if (!memberSearch.value.trim()) { searchResults.value = []; return }
  debounce = setTimeout(async () => {
    const all = await searchUsers(memberSearch.value)
    searchResults.value = all.filter(u => !selectedMembers.value.find(m => m.uid === u.uid))
  }, 300)
}

function addMember(user) {
  if (!selectedMembers.value.find((m) => m.uid === user.uid)) {
    selectedMembers.value.push(user)
  }
  searchResults.value = searchResults.value.filter((u) => u.uid !== user.uid)
  memberSearch.value = ''
}

function removeMember(uid) {
  selectedMembers.value = selectedMembers.value.filter((m) => m.uid !== uid)
}

async function createGroup() {
  if (!groupName.value.trim()) { error.value = 'Group name is required.'; return }
  error.value = ''
  creating.value = true
  try {
    let photoURL = null
    const chatId = await createGroupChat(groupName.value.trim(), groupDescription.value.trim(), null, selectedMembers.value.map((m) => m.uid))
    if (groupImage.value && chatId) {
      photoURL = await uploadGroupImage(chatId, groupImage.value)
      const { updateGroupChat } = useChats()
      await updateGroupChat(chatId, { photoURL })
    }
    showToast('Group created!', 'success')
    emit('update:modelValue', false)
    groupName.value = ''
    groupDescription.value = ''
    selectedMembers.value = []
    groupImage.value = null
    groupImagePreview.value = null
    router.push(`/chat/${chatId}`)
  } catch {
    error.value = 'Failed to create group. Try again.'
  } finally {
    creating.value = false
  }
}
</script>

<style scoped>
.group-create { display: flex; flex-direction: column; gap: 1.25rem; }

.group-img-wrap { display: flex; justify-content: center; }
.group-img-label { cursor: pointer; }
.group-img-preview {
  width: 80px; height: 80px; border-radius: 50%;
  background: var(--color-surface-3);
  border: 2px dashed var(--color-border);
  display: flex; align-items: center; justify-content: center;
  overflow: hidden; position: relative;
  transition: border-color var(--transition-fast);
}
.group-img-preview:hover { border-color: var(--color-primary); }
.group-img { width: 100%; height: 100%; object-fit: cover; }
.group-img-overlay {
  position: absolute; inset: 0; background: rgba(0,0,0,0);
  display: flex; align-items: center; justify-content: center;
  transition: background var(--transition-base);
  border-radius: 50%;
}
.group-img-label:hover .group-img-overlay { background: rgba(0,0,0,0.4); }

.search-wrap { position: relative; }
.search-icon { position: absolute; left: 0.625rem; top: 50%; transform: translateY(-50%); color: var(--color-text-muted); pointer-events: none; }

.member-results, .selected-members {
  display: flex; flex-direction: column; gap: 0.25rem;
}

.member-result {
  display: flex; align-items: center; gap: 0.625rem;
  padding: 0.5rem 0.625rem; border-radius: var(--radius-md);
  background: none; border: none; cursor: pointer; color: var(--color-text);
  font-size: var(--font-size-sm); text-align: left; width: 100%;
  transition: background var(--transition-fast);
}
.member-result:hover { background: var(--color-surface-3); }
.member-result span { flex: 1; }

.selected-members { flex-direction: row; flex-wrap: wrap; gap: 0.5rem; }
.selected-chip {
  display: inline-flex; align-items: center; gap: 0.375rem;
  background: var(--color-primary-light); color: var(--color-primary);
  padding: 0.3rem 0.625rem; border-radius: var(--radius-full);
  font-size: var(--font-size-xs); font-weight: 500;
}
.chip-remove {
  display: flex; align-items: center; justify-content: center;
  background: none; border: none; cursor: pointer; color: var(--color-primary);
  padding: 0; opacity: 0.7;
}
.chip-remove:hover { opacity: 1; }
</style>
