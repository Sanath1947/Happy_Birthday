import { 
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore'
import { db } from '../firebase/config'
import { authService } from '../auth/authService'

interface Comment {
  id: string
  userId: string
  content: string
  timestamp: Date
  likes: string[]
}

interface Share {
  id: string
  userId: string
  memoryId: string
  timestamp: Date
}

class SocialService {
  private static instance: SocialService

  private constructor() {}

  public static getInstance(): SocialService {
    if (!SocialService.instance) {
      SocialService.instance = new SocialService()
    }
    return SocialService.instance
  }

  public async addComment(memoryId: string, content: string): Promise<Comment> {
    const user = authService.getCurrentUser()
    if (!user) throw new Error('User not authenticated')

    const commentRef = await addDoc(collection(db, 'comments'), {
      userId: user.uid,
      memoryId,
      content,
      timestamp: new Date(),
      likes: []
    })

    return {
      id: commentRef.id,
      userId: user.uid,
      content,
      timestamp: new Date(),
      likes: []
    }
  }

  public subscribeToComments(
    memoryId: string,
    callback: (comments: Comment[]) => void
  ): () => void {
    const q = query(
      collection(db, 'comments'),
      where('memoryId', '==', memoryId),
      orderBy('timestamp', 'desc')
    )

    return onSnapshot(q, (snapshot) => {
      const comments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Comment[]
      callback(comments)
    })
  }

  public async toggleLike(commentId: string): Promise<void> {
    const user = authService.getCurrentUser()
    if (!user) throw new Error('User not authenticated')

    const commentRef = doc(db, 'comments', commentId)
    const comment = await commentRef.get()
    const likes = comment.data()?.likes || []

    if (likes.includes(user.uid)) {
      await updateDoc(commentRef, {
        likes: arrayRemove(user.uid)
      })
    } else {
      await updateDoc(commentRef, {
        likes: arrayUnion(user.uid)
      })
    }
  }

  public async shareMemory(memoryId: string): Promise<Share> {
    const user = authService.getCurrentUser()
    if (!user) throw new Error('User not authenticated')

    const shareRef = await addDoc(collection(db, 'shares'), {
      userId: user.uid,
      memoryId,
      timestamp: new Date()
    })

    return {
      id: shareRef.id,
      userId: user.uid,
      memoryId,
      timestamp: new Date()
    }
  }
}

export const socialService = SocialService.getInstance() 