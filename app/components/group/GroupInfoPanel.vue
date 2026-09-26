<template>
  <AppModal :model-value="modelValue" title="Group details" size="md" mobileFullscreen @update:model-value="$emit('update:modelValue', $event)">
    <div class="group-info" v-if="chat" ref="scrollTarget">
      
      <!-- Group Avatar & Name -->
      <div class="group-hero-header">
        <div class="group-avatar-wrap">
          <AppAvatar :src="chat.photoURL" :name="chat.name" :id="chat.id" size="2xl" class="hero-avatar" fallbackIcon="lucide:users" />
        </div>
        
        <div class="group-name-wrap">
          <h2 class="group-name">{{ chat.name }}</h2>
        </div>

        <p class="group-status-label">
          Group · {{ chat.participants?.length || 0 }} {{ chat.participants?.length === 1 ? 'member' : 'members' }}
        </p>
      </div>

      <div class="section-divider"></div>

      <!-- Group Information (Only in main view) -->
      <template v-if="currentView === 'main'">
        <div class="contact-section">
          <h3 class="section-title">Group Information</h3>
          <div class="info-list">
            <div class="info-item" v-if="chat.description">
              <Icon name="lucide:info" size="20" class="info-icon text-primary" />
              <div class="info-content">
                <span class="info-label">Description</span>
                <span class="info-value">{{ chat.description }}</span>
              </div>
            </div>
            <div class="info-item">
              <Icon name="lucide:calendar" size="20" class="info-icon text-primary" />
              <div class="info-content">
                <span class="info-label">Created</span>
                <span class="info-value">{{ formatDate(chat.createdAt) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="section-divider"></div>
      </template>

      <!-- DYNAMIC SECTION: Switches between Main, Add, Edit -->
      <div class="dynamic-section">
        
        <!-- MAIN VIEW (Members & Actions) -->
        <template v-if="currentView === 'main'">
          <div key="view-main">
            <div class="contact-section pb-0">
              <h3 class="section-title">{{ chat.participants?.length || 0 }} {{ chat.participants?.length === 1 ? 'Member' : 'Members' }}</h3>
              
              <div class="members-list-box">
                <div class="existing-members">
                  <GroupMemberRow
                    v-for="uid in chat.participants" 
                    :key="uid"
                    :uid="uid"
                    :is-admin="chat.admins?.includes(uid)"
                    :can-remove="isAdmin && uid !== currentUser?.uid"
                    @remove="doRemoveMember(uid)"
                  />
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="group-actions-col mt-4">
              <button v-if="isAdmin" class="group-btn-outline" @click="openAddMember">
                <Icon name="lucide:user-plus" size="16" class="mr-2" /> Add Members
              </button>
              <button v-if="isAdmin" class="group-btn-outline" @click="openEditName">
                <Icon name="lucide:pencil" size="16" class="mr-2" /> Edit Group Name
              </button>
              <button class="group-btn-outline text-destructive" @click="doLeave">
                <Icon name="lucide:log-out" size="16" class="mr-2" /> Exit Group
              </button>
            </div>
          </div>
        </template>

        <!-- ADD MEMBERS VIEW -->
        <template v-else-if="currentView === 'add'">
          <div key="view-add" class="contact-section pb-0">
            <h3 class="section-title">Add MEMBERS</h3>
            
            <div class="section-card">
              <div class="add-search-wrap">
                <Icon name="lucide:search" size="16" class="search-icon" />
                <input v-model="addSearch" type="search" class="form-input search-input" placeholder="Type a name to add..." @input="searchAdd" autoFocus />
              </div>
              
              <div class="add-results-box mt-3">
                <div v-if="addResults.length" class="add-results">
                  <button v-for="u in addResults" :key="u.uid" class="add-result-btn" @click="doAddMember(u)">
                    <AppAvatar :src="u.photoURL" :name="u.displayName" size="sm" fallbackIcon="lucide:user" />
                    <span class="user-name">{{ u.displayName }}</span>
                    <Icon name="lucide:plus" size="16" class="add-icon" />
                  </button>
                </div>
                <div v-else-if="addSearch.length > 0" class="empty-add-state">
                  <div class="empty-add-icon">
                    <Icon name="lucide:search-x" size="24" />
                  </div>
                  <p class="empty-add-text">No users found</p>
                  <p class="empty-add-subtext">No one matches "{{ addSearch }}"</p>
                </div>
              </div>
              
              <div class="edit-name-actions mt-4">
                <button class="btn group-btn-outline" @click="currentView = 'main'">Cancel</button>
                <button class="btn btn-primary" @click="currentView = 'main'">Done</button>
              </div>
            </div>
          </div>
        </template>

        <!-- EDIT GROUP NAME VIEW -->
        <template v-else-if="currentView === 'edit'">
          <div key="view-edit" class="contact-section pb-0">
            <h3 class="section-title">Edit Group Name</h3>
            
            <div class="section-card">
              <div class="edit-name-row">
                <input v-model="newGroupName" type="text" class="form-input" placeholder="New group name" @keyup.enter="saveName" autoFocus />
              </div>
              <div class="edit-name-actions mt-4">
                <button class="btn group-btn-outline" @click="currentView = 'main'" :disabled="saving">Cancel</button>
                <button class="btn btn-primary" @click="saveName" :disabled="saving">
                  <Icon v-if="saving" name="lucide:loader-2" class="spinner mr-2" size="16" />
                  Save Name
                </button>
              </div>
            </div>
          </div>
        </template>

      </div>

    </div>
  </AppModal>
</template>

<script setup>
import { getFirestore, doc, getDoc } from 'firebase/firestore'

const props = defineProps({
  modelValue: Boolean,
  chat: { type: Object, default: null },
})
const emit = defineEmits(['update:modelValue'])

watch(() => props.modelValue, (val) => {
  if (val) {
    currentView.value = 'main'
  }
})

const { currentUser } = useAuth()
const { updateGroupChat, addMember, removeMember, leaveGroup, searchUsers } = useChats()
const router = useRouter()
const { showToast } = useUI()

const isAdmin = computed(() => props.chat?.admins?.includes(currentUser.value?.uid))
const currentView = ref('main')
const newGroupName = ref(props.chat?.name || '')
const saving = ref(false)
const addSearch = ref('')
const addResults = ref([])

watch(currentView, (val) => {
  if (val === 'add') {
    addSearch.value = ''
    addResults.value = []
  }
})

function openAddMember() {
  currentView.value = 'add'
}

function openEditName() {
  currentView.value = 'edit'
  newGroupName.value = props.chat.name
}

function formatDate(dateVal) {
  if (!dateVal) return 'Recently'
  const d = dateVal.toDate ? dateVal.toDate() : new Date(dateVal)
  if (isNaN(d)) return 'Recently'
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
}

async function saveName() {
  if (!newGroupName.value.trim() || newGroupName.value.trim() === props.chat.name) {
    currentView.value = 'main'
    return
  }
  saving.value = true
  await updateGroupChat(props.chat.id, { name: newGroupName.value.trim() })
  saving.value = false
  currentView.value = 'main'
  showToast('Group name updated', 'success')
}

let debounce = null
onUnmounted(() => clearTimeout(debounce))

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
}

.group-hero-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.group-avatar-wrap {
  margin-bottom: 1rem;
}

.hero-avatar {
  border: 4px solid var(--color-surface);
  box-shadow: var(--shadow-sm);
  background: var(--color-surface);
}

.group-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 0.25rem 0;
}

.group-status-label {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin: 0;
}

.section-divider {
  height: 1px;
  background: var(--color-border);
  margin: 1.5rem 0;
}

.contact-section {
  display: flex;
  flex-direction: column;
}

.pb-0 {
  padding-bottom: 0;
}

.section-title {
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  margin-top: 0;
  margin-bottom: 1rem;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--color-navrail);
  border-radius: var(--radius-lg);
}

.info-icon {
  flex-shrink: 0;
}

.info-content {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.info-label {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-bottom: 0.125rem;
}

.info-value {
  font-size: 0.875rem;
  color: var(--color-text);
  line-height: 1.4;
  word-break: break-word;
}

.members-list-box {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.group-actions-col {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 1.5rem;
}

.group-btn-outline {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 0.625rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--color-text);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.group-btn-outline:hover, .group-btn-outline.active {
  background: var(--color-surface-hover, var(--color-surface-3));
}
.group-btn-outline.active {
  border-color: var(--color-primary);
}

.mr-2 {
  margin-right: 0.5rem;
}

.text-destructive {
  color: var(--color-error);
  border-color: rgba(239, 68, 68, 0.2);
}

.text-destructive:hover {
  background: rgba(239, 68, 68, 0.1);
  color: var(--color-error);
  border-color: rgba(239, 68, 68, 0.3);
}

/* Edit / Add Section styling */
.group-name-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 0.25rem;
}
.group-name-wrap .group-name {
  margin: 0;
}
.text-success { color: var(--color-primary); }

.edit-name-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}
.edit-name-actions .btn {
  flex: 1;
  justify-content: center;
}

.empty-add-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem 1rem;
  text-align: center;
}
.empty-add-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--color-surface-hover, var(--color-surface-3));
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
}
.empty-add-text {
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 0.25rem 0;
}
.empty-add-subtext {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
  margin: 0;
}

.add-search-wrap {
  position: relative;
  margin-bottom: 1.5rem;
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
</style>
