import { storage, auth } from './index'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

export function uploadImageToStorage(file, setDownloadURL, setUploading) {
  // Get the file
  const { uid } = auth.currentUser
  const extension = file.type.split('/')[1]

  const storageRef = ref(storage, `images/${uid}/${Date.now()}.${extension}`)

  const metadata = {
    contentType: `image/${extension}`,
  }

  //  start uploading
  const uploadTask = uploadBytesResumable(storageRef, file, metadata)

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log('Upload is ' + progress + '% done')
    },
    (error) => {
      console.log(error)
      setUploading(false)
      setDownloadURL(null)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setDownloadURL(downloadURL)
        setUploading(false)
      })
    }
  )
}
