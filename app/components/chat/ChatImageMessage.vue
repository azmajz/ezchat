<template>
  <div class="img-message">
    <img
      :src="message.fileUrl"
      :alt="message.fileName || 'Image'"
      class="img-preview"
      @click="lightboxOpen = true"
      @load="$emit('image-loaded')"
      loading="lazy"
    />
    <div class="img-overlay" @click="lightboxOpen = true">
      <Icon name="lucide:zoom-in" size="20" style="color: white;" />
    </div>
  </div>

  <!-- Lightbox -->
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="lightboxOpen" class="lightbox" @click.self="lightboxOpen = false">
        <button class="lightbox-close btn-icon" @click="lightboxOpen = false">
          <Icon name="lucide:x" size="22" />
        </button>
        <img :src="message.fileUrl" :alt="message.fileName" class="lightbox-img" />
        <button class="lightbox-download btn btn-secondary" @click="handleDownload" :disabled="isDownloading">
          <Icon v-if="!isDownloading" name="lucide:download" size="16" />
          <Icon v-else name="lucide:loader-2" class="spinner" size="16" />
          {{ isDownloading ? 'Downloading...' : 'Download' }}
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({ message: { type: Object, required: true } })
defineEmits(['image-loaded'])
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
