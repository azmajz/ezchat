<template>
  <div class="member-row-inner">
    <AppAvatar :src="userData?.photoURL" :name="userData?.displayName || '...'" size="sm" :online="userData?.isOnline" />
    <div class="member-info">
      <div class="member-name">{{ userData?.displayName || '...' }}</div>
      <div v-if="isAdmin" class="member-role">Admin</div>
    </div>
    <button v-if="canRemove" @click="$emit('remove')" class="btn-icon remove-btn" title="Remove member">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  </div>
</template>

<script setup>
import { getFirestore, doc, getDoc } from 'firebase/firestore'

const props = defineProps({
  uid: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  canRemove: { type: Boolean, default: false },
})
defineEmits(['remove'])

const userData = ref(null)

onMounted(async () => {
  const db = getFirestore()
  const snap = await getDoc(doc(db, 'users', props.uid))
  if (snap.exists()) userData.value = snap.data()
})
</script>

<style scoped>
.member-row-inner {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
}
.member-info {
  flex: 1;
  min-width: 0;
}
.member-name {
  font-size: 0.8125rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.member-role {
  font-size: 0.7rem;
  color: var(--color-primary);
  font-weight: 500;
}
.remove-btn {
  color: var(--color-error);
  width: 28px;
  height: 28px;
}
</style>
