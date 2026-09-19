<template>
  <div class="file-message" :class="isOwn ? 'file-own' : 'file-other'" @click="handleDownload">
    <div class="file-icon">
      <Icon :name="fileIcon" size="24" />
    </div>
    <div class="file-info">
      <span class="file-name">{{ message.fileName || 'File' }}</span>
      <span class="file-size">{{ formattedSize }}</span>
    </div>
    <div class="file-download" v-if="!isDownloading">
      <Icon name="lucide:download" size="16" />
    </div>
    <div class="file-download" v-else>
      <Icon name="lucide:loader-2" class="spinner" size="16" />
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
  if (mime.startsWith('image/')) return 'lucide:image'
  if (mime === 'application/pdf' || name.endsWith('.pdf')) return 'lucide:file-text'
  if (name.match(/\.(doc|docx)$/i)) return 'lucide:file-text'
  if (name.match(/\.(xls|xlsx)$/i)) return 'lucide:file-spreadsheet'
  if (name.endsWith('.zip') || name.endsWith('.rar')) return 'lucide:archive'
  return 'lucide:file'
})
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
