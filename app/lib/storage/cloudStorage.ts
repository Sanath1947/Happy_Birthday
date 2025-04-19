import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage'
import { storage } from '../firebase/config'
import { authService } from '../auth/authService'

class CloudStorage {
  private static instance: CloudStorage

  private constructor() {}

  public static getInstance(): CloudStorage {
    if (!CloudStorage.instance) {
      CloudStorage.instance = new CloudStorage()
    }
    return CloudStorage.instance
  }

  public async uploadFile(file: File, path: string): Promise<string> {
    const user = authService.getCurrentUser()
    if (!user) throw new Error('User not authenticated')

    const storageRef = ref(storage, `users/${user.uid}/${path}/${file.name}`)
    await uploadBytes(storageRef, file)
    return await getDownloadURL(storageRef)
  }

  public async listFiles(path: string): Promise<string[]> {
    const user = authService.getCurrentUser()
    if (!user) throw new Error('User not authenticated')

    const listRef = ref(storage, `users/${user.uid}/${path}`)
    const result = await listAll(listRef)
    return await Promise.all(result.items.map(item => getDownloadURL(item)))
  }
}

export const cloudStorage = CloudStorage.getInstance() 