import { exec } from 'child_process'
import { storage } from '../app/lib/firebase/config'

async function recoverData(backupTimestamp: string) {
  // Recover Firestore
  exec(`firebase firestore:import backup/firestore_${backupTimestamp}`)
  
  // Recover Storage
  const bucket = storage.bucket()
  await bucket.download(`backup/storage_${backupTimestamp}`)
  
  console.log('Recovery completed successfully')
}

// Usage: npm run recover -- "2024-01-01T00:00:00.000Z"
const timestamp = process.argv[2]
recover 