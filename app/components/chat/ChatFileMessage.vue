<template>
  <div class="file-message" :class="isOwn ? 'file-own' : 'file-other'" @click="handleDownload">
    <div class="file-icon">
      <component :is="fileIcon" />
    </div>
    <div class="file-info">
      <span class="file-name">{{ message.fileName || 'File' }}</span>
      <span class="file-size">{{ formattedSize }}</span>
    </div>
    <div class="file-download" v-if="!isDownloading">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
    </div>
    <div class="file-download" v-else>
      <svg class="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  message: { type: Object, required: true },
  isOwn: { type: Boolean, default: false },
})

const isDownloading = ref(false)

async function handleDownload() {
  if (isDownloading.value) return
  isDownloading.value = true
  
  try {
    let url = props.message.fileUrl
    // If it's a Cloudinary URL, we can force attachment disposition
    if (url.includes('res.cloudinary.com')) {
      url = url.replace('/upload/', '/upload/fl_attachment/')
    }
    
    const response = await fetch(url)
    if (!response.ok) throw new Error('Network error')
    
    const blob = await response.blob()
    const blobUrl = URL.createObjectURL(blob)
    
    const a = document.createElement('a')
    a.href = blobUrl
    a.download = props.message.fileName || 'download'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(blobUrl)
  } catch (err) {
    // Fallback if fetch fails (e.g. CORS from older firebase files)
    window.open(props.message.fileUrl, '_blank')
  } finally {
    isDownloading.value = false
  }
}

const formattedSize = computed(() => {
  const bytes = props.message.fileSize || 0
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1048576).toFixed(1)} MB`
})

const fileIcon = computed(() => {
  const mime = props.message.mimeType || ''
  const name = props.message.fileName || ''
  if (mime.startsWith('image/')) return IconImage
  if (mime === 'application/pdf' || name.endsWith('.pdf')) return IconPdf
  if (name.match(/\.(doc|docx)$/i)) return IconDoc
  if (name.match(/\.(xls|xlsx)$/i)) return IconSheet
  if (name.endsWith('.zip') || name.endsWith('.rar')) return IconZip
  return IconFile
})

// Inline icon components
const IconFile = { template: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>` }
const IconPdf = { template: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M8 12h2a2 2 0 0 0 0-4H8v6m8-6h-2v6m-1-3h2" stroke-linecap="round"/></svg>` }
const IconDoc = { template: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>` }
const IconSheet = { template: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/><line x1="12" y1="9" x2="12" y2="21"/></svg>` }
const IconZip = { template: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><line x1="12" y1="11" x2="12" y2="17"/><polyline points="9 11 12 8 15 11"/></svg>` }
const IconImage = { template: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>` }
</script>

<style scoped>
.file-message {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.875rem;
  border-radius: var(--radius-md);
  min-width: 200px;
  max-width: 280px;
  text-decoration: none;
  transition: background var(--transition-fast);
}
.file-own { color: rgba(255,255,255,0.9); }
.file-own:hover { background: rgba(255,255,255,0.1); }
.file-other { color: var(--color-text); }
.file-other:hover { background: rgba(0,0,0,0.05); }

.file-icon { flex-shrink: 0; opacity: 0.85; }
.file-info {
  flex: 1; min-width: 0;
  display: flex; flex-direction: column; gap: 0.125rem;
}
.file-name {
  font-size: var(--font-size-sm); font-weight: 500;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.file-size { font-size: var(--font-size-xs); opacity: 0.65; }
.file-download { flex-shrink: 0; opacity: 0.6; }
</style>
