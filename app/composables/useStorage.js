const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dpz0gr14a/auto/upload'
const UPLOAD_PRESET = 'ezchat'

const uploadProgress = ref(0)
const isUploading = ref(false)

export function useStorage() {

  function uploadFile(file, folderPath = '') {
    return new Promise((resolve, reject) => {
      isUploading.value = true
      uploadProgress.value = 0

      const xhr = new XMLHttpRequest()
      
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          uploadProgress.value = Math.round((e.loaded / e.total) * 100)
        }
      })

      xhr.addEventListener('load', () => {
        isUploading.value = false
        uploadProgress.value = 0
        
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText)
            resolve({
              url: response.secure_url,
              publicId: response.public_id,
              resourceType: response.resource_type
            })
          } catch (err) {
            reject(new Error('Invalid response from Cloudinary'))
          }
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}`))
        }
      })

      xhr.addEventListener('error', () => {
        isUploading.value = false
        uploadProgress.value = 0
        reject(new Error('Network error during upload'))
      })

      xhr.open('POST', CLOUDINARY_URL, true)

      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', UPLOAD_PRESET)
      
      if (folderPath) {
        formData.append('folder', folderPath)
      }

      xhr.send(formData)
    })
  }

  async function uploadChatFile(chatId, file) {
    const { url, publicId, resourceType } = await uploadFile(file, `ezchat/chats/${chatId}`)
    return { url, publicId, resourceType, fileName: file.name, fileSize: file.size, mimeType: file.type }
  }

  async function uploadAvatar(uid, file) {
    const { url } = await uploadFile(file, `ezchat/avatars/${uid}`)
    return url
  }

  async function uploadGroupImage(groupId, file) {
    const { url } = await uploadFile(file, `ezchat/groups/${groupId}`)
    return url
  }

  async function deleteFileFromCloudinary(publicId, resourceType = 'image') {
    const config = useRuntimeConfig()
    const apiKey = config.public.cloudinaryApiKey
    const apiSecret = config.public.cloudinaryApiSecret
    
    if (!apiKey || !apiSecret) {
      console.warn('Missing Cloudinary API Key or Secret. File not deleted from Cloudinary.')
      return
    }

    const timestamp = Math.round(new Date().getTime() / 1000).toString()
    const str = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`
    
    const buffer = new TextEncoder().encode(str)
    const hashBuffer = await crypto.subtle.digest('SHA-1', buffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

    const formData = new FormData()
    formData.append('public_id', publicId)
    formData.append('api_key', apiKey)
    formData.append('timestamp', timestamp)
    formData.append('signature', signature)

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/dpz0gr14a/${resourceType}/destroy`, {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
      console.log('Cloudinary delete result:', data)
    } catch (e) {
      console.error('Failed to delete from Cloudinary', e)
    }
  }

  return {
    uploadProgress: readonly(uploadProgress),
    isUploading: readonly(isUploading),
    uploadFile,
    uploadChatFile,
    uploadAvatar,
    uploadGroupImage,
    deleteFileFromCloudinary,
  }
}
