import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth'
import { auth } from '../firebase/config'

class AuthService {
  private static instance: AuthService
  private currentUser: User | null = null

  private constructor() {
    onAuthStateChanged(auth, (user) => {
      this.currentUser = user
    })
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  public async signIn(email: string, password: string): Promise<User> {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      return result.user
    } catch (error) {
      console.error('Sign in failed:', error)
      throw error
    }
  }

  public async signUp(email: string, password: string): Promise<User> {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      return result.user
    } catch (error) {
      console.error('Sign up failed:', error)
      throw error
    }
  }

  public async signOut(): Promise<void> {
    try {
      await firebaseSignOut(auth)
    } catch (error) {
      console.error('Sign out failed:', error)
      throw error
    }
  }

  public getCurrentUser(): User | null {
    return this.currentUser
  }

  public isAuthenticated(): boolean {
    return !!this.currentUser
  }
}

export const authService = AuthService.getInstance() 