'use client'

import { useState, useEffect } from 'react'
import { realtimeService } from '@/lib/realtime/realtimeService'
import { pushService } from '@/lib/notifications/pushService'

export default function CollaborationPanel() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [participants, setParticipants] = useState<string[]>([])

  useEffect(() => {
    if (sessionId) {
      const unsubscribe = realtimeService.subscribeToSession(
        sessionId,
        (session) => {
          setParticipants(session.participants)
        }
      )

      pushService.subscribeToTopic(`session_${sessionId}`)

      return () => {
        unsubscribe()
        realtimeService.unsubscribeFromSession(sessionId)
      }
    }
  }, [sessionId])

  const createNewSession = async () => {
    const id = await realtimeService.createSession()
    setSessionId(id)
  }

  const joinExistingSession = async (id: string) => {
    await realtimeService.joinSession(id)
    setSessionId(id)
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-blue-950/20 backdrop-blur-sm rounded-xl p-4">
        {!sessionId ? (
          <div className="space-y-4">
            <button
              onClick={createNewSession}
              className="w-full px-4 py-2 bg-blue-600 rounded-full
                       hover:bg-blue-700 transition-colors"
            >
              Create Session
            </button>
            
            <div>
              <input
                type="text"
                placeholder="Session ID"
                className="w-full px-4 py-2 rounded bg-black/50 mb-2"
              />
              <button
                onClick={() => {/* Handle join */}}
                className="w-full px-4 py-2 bg-green-600 rounded-full
                         hover:bg-green-700 transition-colors"
              >
                Join Session
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-sm font-semibold mb-2">
              Active Session: {sessionId}
            </h3>
            <div className="text-sm text-blue-200">
              {participants.length} participant(s) online
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 