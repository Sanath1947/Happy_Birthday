import { 
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  serverTimestamp,
  query,
  where
} from 'firebase/firestore'
import { db } from '../firebase/config'
import { authService } from '../auth/authService'

interface CollaborationSession {
  id: string
  participants: string[]
  lastActive: Date
  currentPage: string
}

class RealtimeService {
  private static instance: RealtimeService
  private activeSubscriptions: Map<string, () => void> = new Map()

  private constructor() {}

  public static getInstance(): RealtimeService {
    if (!RealtimeService.instance) {
      RealtimeService.instance = new RealtimeService()
    }
    return RealtimeService.instance
  }

  public async createSession(): Promise<string> {
    const user = authService.getCurrentUser()
    if (!user) throw new Error('User not authenticated')

    const sessionRef = doc(collection(db, 'sessions'))
    await setDoc(sessionRef, {
      participants: [user.uid],
      lastActive: serverTimestamp(),
      currentPage: 'home'
    })

    return sessionRef.id
  }

  public async joinSession(sessionId: string): Promise<void> {
    const user = authService.getCurrentUser()
    if (!user) throw new Error('User not authenticated')

    const sessionRef = doc(db, 'sessions', sessionId)
    await updateDoc(sessionRef, {
      participants: [...(await this.getParticipants(sessionId)), user.uid]
    })
  }

  public async getParticipants(sessionId: string): Promise<string[]> {
    const sessionRef = doc(db, 'sessions', sessionId)
    const snapshot = await sessionRef.get()
    return snapshot.data()?.participants || []
  }

  public subscribeToSession(
    sessionId: string,
    callback: (session: CollaborationSession) => void
  ): () => void {
    const unsubscribe = onSnapshot(
      doc(db, 'sessions', sessionId),
      (snapshot) => {
        callback({
          id: snapshot.id,
          ...snapshot.data()
        } as CollaborationSession)
      }
    )

    this.activeSubscriptions.set(sessionId, unsubscribe)
    return unsubscribe
  }

  public unsubscribeFromSession(sessionId: string): void {
    const unsubscribe = this.activeSubscriptions.get(sessionId)
    if (unsubscribe) {
      unsubscribe()
      this.activeSubscriptions.delete(sessionId)
    }
  }
}

export const realtimeService = RealtimeService.getInstance() 