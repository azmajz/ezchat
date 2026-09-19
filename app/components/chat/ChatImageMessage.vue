<template>
  <div class="img-message">
    <img
      :src="message.fileUrl"
      :alt="message.fileName || 'Image'"
      class="img-preview"
      @click="lightboxOpen = true"
      loading="lazy"
    />
    <div class="img-overlay" @click="lightboxOpen = true">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
    </div>
  </div>

  <!-- Lightbox -->
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="lightboxOpen" class="lightbox" @click.self="lightboxOpen = false">
        <button class="lightbox-close btn-icon" @click="lightboxOpen = false">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <img :src="message.fileUrl" :alt="message.fileName" class="lightbox-img" />
        <button class="lightbox-download btn btn-secondary" @click="handleDownload" :disabled="isDownloading">
          <svg v-if="!isDownloading" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          <svg v-else class="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          {{ isDownloading ? 'Downloading...' : 'Download' }}
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({ message: { type: Object, required: true } })
const lightboxOpen = ref(false)
const isDownloading = ref(false)

async function handleDownload() {
  if (isDownloading.value) return
  isDownloading.value = true
  
  try {
    let url = props.message.fileUrl
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
    window.open(props.message.fileUrl, '_blank')
  } finally {
    isDownloading.value = false
  }
}
</script>

<style scoped>
.img-message {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  max-width: 280px;
}
.img-preview {
  width: 100%;
  max-height: 260px;
  object-fit: cover;
  display: block;
  border-radius: var(--radius-md);
  transition: transform var(--transition-base);
}
.img-overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,0);
  display: flex; align-items: center; justify-content: center;
  transition: background var(--transition-fast);
  border-radius: var(--radius-md);
  opacity: 0;
}
.img-message:hover .img-overlay { opacity: 1; background: rgba(0,0,0,0.35); }
.img-message:hover .img-preview { transform: scale(1.02); }

.lightbox {
  position: fixed; inset: 0; z-index: 2000;
  background: rgba(0,0,0,0.92);
  display: flex; align-items: center; justify-content: center;
  flex-direction: column; gap: 1rem; padding: 2rem;
}
.lightbox-close {
  position: absolute; top: 1rem; right: 1rem;
  color: white; background: rgba(255,255,255,0.1);
  width: 44px; height: 44px;
}
.lightbox-close:hover { background: rgba(255,255,255,0.2); }
.lightbox-img {
  max-width: 90vw; max-height: 80vh;
  object-fit: contain; border-radius: var(--radius-md);
}
.lightbox-download { background: rgba(255,255,255,0.15); color: white; }
.lightbox-download:hover { background: rgba(255,255,255,0.25); }
</style>
