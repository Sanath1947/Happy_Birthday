import { exec } from 'child_process'
import { storage } from '../app/lib/firebase/config'

async function backupData() {
  const timestamp = new Date().toISOString()
  
  // Backup Firestore
  exec(`firebase firestore:export backup/firestore_${timestamp}`)
  
  // Backup Storage
  const bucket = storage.bucket()
  await bucket.upload(`backup/storage_${timestamp}`)
  
  console.log('Backup completed successfully')
}

backupData().catch(console.error) 