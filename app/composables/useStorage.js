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
            resolve(response.secure_url)
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
    const url = await uploadFile(file, `ezchat/chats/${chatId}`)
    return { url, fileName: file.name, fileSize: file.size, mimeType: file.type }
  }

  async function uploadAvatar(uid, file) {
    return await uploadFile(file, `ezchat/avatars/${uid}`)
  }

  async function uploadGroupImage(groupId, file) {
    return await uploadFile(file, `ezchat/groups/${groupId}`)
  }

  return {
    uploadProgress: readonly(uploadProgress),
    isUploading: readonly(isUploading),
    uploadFile,
    uploadChatFile,
    uploadAvatar,
    uploadGroupImage,
  }
}
