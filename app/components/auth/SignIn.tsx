'use client'

import { useState } from 'react'
import { authService } from '@/lib/auth/authService'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      await authService.signIn(email, password)
    } catch (error) {
      setError('Failed to sign in')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-md w-full p-6 bg-blue-950/20 backdrop-blur-sm rounded-xl">
        <h2 className="text-2xl font-bold mb-6">Sign In</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 text-red-200 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded bg-black/50"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-black/50"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 rounded-full
                     hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
} 