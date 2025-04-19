import { messaging } from '../firebase/config'
import { getToken, onMessage } from 'firebase/messaging'

class PushNotificationService {
  private static instance: PushNotificationService
  private token: string | null = null

  private constructor()
} 