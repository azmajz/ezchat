<template>
  <AppModal :model-value="modelValue" :title="chat?.name || 'Group Info'" size="md" @update:model-value="$emit('update:modelValue', $event)">
    <div class="group-info" v-if="chat">
      <!-- Group avatar + name -->
      <div class="group-hero">
        <AppAvatar :src="chat.photoURL" :name="chat.name" size="xl" />
        <div class="group-hero-meta">
          <h3 class="group-hero-name">{{ chat.name }}</h3>
          <span class="group-hero-count">{{ chat.participants?.length || 0 }} members</span>
        </div>
      </div>

      <!-- Admin actions -->
      <div v-if="isAdmin" class="group-admin-actions">
        <button class="btn btn-secondary btn-sm" @click="showEditName = true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          Edit name
        </button>
        <button class="btn btn-secondary btn-sm" @click="showAddMember = true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add member
        </button>
      </div>

      <!-- Edit group name inline -->
      <div v-if="showEditName" class="edit-name-row">
        <input v-model="newGroupName" type="text" class="form-input" placeholder="Group name" />
        <button class="btn btn-primary btn-sm" @click="saveName" :disabled="saving">Save</button>
        <button class="btn btn-secondary btn-sm" @click="showEditName = false">Cancel</button>
      </div>

      <!-- Add member inline -->
      <div v-if="showAddMember" class="add-member-section">
        <input v-model="addSearch" type="search" class="form-input" placeholder="Search users…" @input="searchAdd" />
        <div v-if="addResults.length" class="add-results">
          <button v-for="u in addResults" :key="u.uid" class="add-result-btn" @click="doAddMember(u)">
            <AppAvatar :src="u.photoURL" :name="u.displayName" size="xs" />
            <span>{{ u.displayName }}</span>
          </button>
        </div>
      </div>

      <!-- Member list -->
      <div class="members-section">
        <h4 class="members-title">Members</h4>
        <div class="members-list">
          <div v-for="uid in chat.participants" :key="uid" class="member-row">
            <GroupMemberRow
              :uid="uid"
              :is-admin="chat.admins?.includes(uid)"
              :can-remove="isAdmin && uid !== currentUser?.uid"
              @remove="doRemoveMember(uid)"
            />
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <button class="btn btn-danger" @click="doLeave">Leave group</button>
    </template>
  </AppModal>
</template>

<script setup>
import { getFirestore, doc, getDoc } from 'firebase/firestore'

const props = defineProps({
  modelValue: Boolean,
  chat: { type: Object, default: null },
})
const emit = defineEmits(['update:modelValue'])

const { currentUser } = useAuth()
const { updateGroupChat, addMember, removeMember, leaveGroup, searchUsers } = useChats()
const router = useRouter()
const { showToast } = useUI()

const isAdmin = computed(() => props.chat?.admins?.includes(currentUser.value?.uid))
const showEditName = ref(false)
const showAddMember = ref(false)
const newGroupName = ref(props.chat?.name || '')
const saving = ref(false)
const addSearch = ref('')
const addResults = ref([])

async function saveName() {
  if (!newGroupName.value.trim()) return
  saving.value = true
  await updateGroupChat(props.chat.id, { name: newGroupName.value.trim() })
  saving.value = false
  showEditName.value = false
  showToast('Group name updated', 'success')
}

let debounce = null
async function searchAdd() {
  clearTimeout(debounce)
  debounce = setTimeout(async () => {
    const results = await searchUsers(addSearch.value)
    addResults.value = results.filter(u => !props.chat?.participants?.includes(u.uid))
  }, 300)
}

async function doAddMember(user) {
  await addMember(props.chat.id, user.uid)
  addResults.value = addResults.value.filter(u => u.uid !== user.uid)
  addSearch.value = ''
  showToast(`${user.displayName} added`, 'success')
}

async function doRemoveMember(uid) {
  await removeMember(props.chat.id, uid)
  showToast('Member removed', 'success')
}

async function doLeave() {
  await leaveGroup(props.chat.id)
  emit('update:modelValue', false)
  router.push('/chat')
  showToast('Left group', 'info')
}

// Component is auto-imported as GroupMemberRow
</script>

<style scoped>
.group-info { display: flex; flex-direction: column; gap: 1.25rem; }

.group-hero {
  display: flex; align-items: center; gap: 1rem;
  padding: 0.5rem 0;
}
.group-hero-name { font-size: var(--font-size-lg); font-weight: 700; }
.group-hero-count { font-size: var(--font-size-sm); color: var(--color-text-muted); }

.group-admin-actions { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.btn-sm { padding: 0.4rem 0.875rem; font-size: var(--font-size-xs); }

.edit-name-row { display: flex; gap: 0.5rem; align-items: center; }
.edit-name-row .form-input { flex: 1; }

.add-member-section { display: flex; flex-direction: column; gap: 0.5rem; }
.add-results { display: flex; flex-direction: column; gap: 0.25rem; }
.add-result-btn {
  display: flex; align-items: center; gap: 0.625rem;
  padding: 0.5rem; border-radius: var(--radius-md);
  background: none; border: none; cursor: pointer;
  color: var(--color-text); font-size: var(--font-size-sm);
  transition: background var(--transition-fast);
}
.add-result-btn:hover { background: var(--color-surface-3); }
.add-result-btn span { flex: 1; text-align: left; }

.members-title { font-size: var(--font-size-sm); font-weight: 600; color: var(--color-text-muted); margin-bottom: 0.25rem; }
.members-list { display: flex; flex-direction: column; }
.member-row { border-bottom: 1px solid var(--color-border-light); }
.member-row:last-child { border-bottom: none; }
</style>
