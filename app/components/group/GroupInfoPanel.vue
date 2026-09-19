<template>
  <AppModal :model-value="modelValue" title="Group details" size="md" @update:model-value="$emit('update:modelValue', $event)">
    <div class="group-info" v-if="chat">
      
      <!-- Centered Hero Profile -->
      <div class="group-hero">
        <AppAvatar :src="chat.photoURL" :name="chat.name" size="2xl" class="hero-avatar" />
        <h3 class="group-hero-name">{{ chat.name }}</h3>
        <span class="group-hero-count">{{ chat.participants?.length || 0 }} members</span>
        
        <!-- Action Row -->
        <div v-if="isAdmin" class="group-actions-row">
          <button class="action-btn" :class="{ active: showEditName }" @click="showEditName = !showEditName; showAddMember = false">
            <div class="action-icon"><Icon name="lucide:pencil" size="18" /></div>
            <span>Edit</span>
          </button>
          <button class="action-btn" :class="{ active: showAddMember }" @click="showAddMember = !showAddMember; showEditName = false">
            <div class="action-icon"><Icon name="lucide:user-plus" size="18" /></div>
            <span>Add</span>
          </button>
        </div>
      </div>

      <div class="group-sections">
        <!-- Edit Name Section -->
        <Transition name="slide-down">
          <div v-if="showEditName" class="section-card">
            <div class="edit-name-row">
              <input v-model="newGroupName" type="text" class="form-input" placeholder="New group name" @keyup.enter="saveName" />
              <button class="btn btn-primary" @click="saveName" :disabled="saving">
                <Icon v-if="saving" name="lucide:loader-2" class="spinner" size="16" />
                Save
              </button>
            </div>
          </div>
        </Transition>

        <!-- Add Member Section -->
        <Transition name="slide-down">
          <div v-if="showAddMember" class="section-card">
            <div class="add-search-wrap">
              <Icon name="lucide:search" size="16" class="search-icon" />
              <input v-model="addSearch" type="search" class="form-input search-input" placeholder="Type a name..." @input="searchAdd" />
            </div>
            <div v-if="addResults.length" class="add-results mt-2">
              <button v-for="u in addResults" :key="u.uid" class="add-result-btn" @click="doAddMember(u)">
                <AppAvatar :src="u.photoURL" :name="u.displayName" size="sm" />
                <span class="user-name">{{ u.displayName }}</span>
                <Icon name="lucide:plus" size="16" class="add-icon" />
              </button>
            </div>
          </div>
        </Transition>

        <!-- Member list -->
        <div class="section-card members-card">
          <h4 class="section-title">Members</h4>
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
    </div>

    <template #footer>
      <div class="footer-actions">
        <button class="btn btn-ghost text-danger w-full justify-center" @click="doLeave">
          <Icon name="lucide:log-out" size="16" /> Leave group
        </button>
      </div>
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
  if (!newGroupName.value.trim() || newGroupName.value.trim() === props.chat.name) {
    showEditName.value = false
    return
  }
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
    if (!addSearch.value.trim()) {
      addResults.value = []
      return
    }
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
</script>

<style scoped>
.group-info { 
  display: flex; 
  flex-direction: column; 
  gap: 1.5rem; 
}

.group-hero {
  display: flex; 
  flex-direction: column;
  align-items: center; 
  text-align: center;
  padding: 2rem 1rem 1.5rem;
  background: var(--color-surface-2);
  border-radius: var(--radius-lg);
  position: relative;
  overflow: hidden;
  border: 1px solid var(--color-border);
}

.hero-avatar {
  width: 88px; height: 88px; font-size: 2.25rem;
  margin-bottom: 0.75rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border: 4px solid var(--color-surface-2);
  z-index: 1;
}

.group-hero-name, .group-hero-count, .group-actions-row {
  position: relative;
  z-index: 1;
}

.group-hero-name { 
  font-size: var(--font-size-xl); 
  font-weight: 700; 
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.group-hero-count { 
  font-size: var(--font-size-sm); 
  color: var(--color-text-muted); 
}

.group-actions-row { 
  display: flex; 
  gap: 2rem; 
  margin-top: 1.25rem; 
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
  font-weight: 500;
  transition: all var(--transition-fast);
}

.action-btn:hover, .action-btn.active {
  color: var(--color-primary);
}

.action-icon {
  width: 40px; height: 40px;
  border-radius: var(--radius-full);
  background: var(--color-surface-3);
  display: flex; align-items: center; justify-content: center;
  transition: all var(--transition-fast);
}

.action-btn:hover .action-icon {
  background: var(--color-primary-light);
  transform: translateY(-2px);
}
.action-btn.active .action-icon {
  background: var(--color-primary);
  color: white;
}

.group-sections {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.section-card {
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1rem;
}

.members-card {
  padding: 0.5rem 1rem;
}

.section-title { 
  font-size: var(--font-size-sm); 
  font-weight: 600; 
  color: var(--color-text-muted); 
  padding: 0.5rem 0 0.75rem;
  border-bottom: 1px solid var(--color-border-light);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.edit-name-row { 
  display: flex; 
  gap: 0.75rem; 
}
.edit-name-row .form-input { flex: 1; }

.add-search-wrap {
  position: relative;
}
.search-icon {
  position: absolute;
  left: 12px; top: 50%; transform: translateY(-50%);
  color: var(--color-text-muted);
}
.search-input {
  padding-left: 2.5rem;
}

.add-results { display: flex; flex-direction: column; gap: 0.25rem; }
.add-result-btn {
  display: flex; align-items: center; gap: 0.75rem;
  padding: 0.625rem; border-radius: var(--radius-md);
  background: transparent; border: none; cursor: pointer;
  transition: background var(--transition-fast);
}
.add-result-btn:hover { background: var(--color-surface-3); }
.user-name { flex: 1; text-align: left; font-size: var(--font-size-sm); font-weight: 500; color: var(--color-text); }
.add-icon { color: var(--color-primary); opacity: 0; transition: opacity var(--transition-fast); }
.add-result-btn:hover .add-icon { opacity: 1; }

.members-list { display: flex; flex-direction: column; }
.member-row { border-bottom: 1px solid var(--color-border-light); padding: 0.25rem 0; }
.member-row:last-child { border-bottom: none; padding-bottom: 0; }
.member-row:first-child { padding-top: 0; }

.footer-actions {
  width: 100%;
}
.text-danger { color: var(--color-error); }
.text-danger:hover { background: rgba(239, 68, 68, 0.1); }

.mt-2 { margin-top: 0.5rem; }
</style>
