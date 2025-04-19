'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface EasterEgg {
  id: string
  trigger: string
  message: string
  discovered: boolean
}

const easterEggs: EasterEgg[] = [
  {
    id: 'first-meeting',
    trigger: 'vinisha',
    message: 'Remember our first meeting? Your smile lit up the room! 💖',
    discovered: false
  },
  {
    id: 'uk-memories',
    trigger: 'london',
    message: 'The distance made our love stronger. Missing those UK days! ✈️',
    discovered: false
  },
  {
    id: 'proposal',
    trigger: 'forever',
    message: 'The moment you said yes, my life became complete! 💍',
    discovered: false
  },
  // Add more easter eggs here
]

export default function EasterEggs() {
  const [discoveredEggs, setDiscoveredEggs] = useState<string[]>([])
  const [currentMessage, setCurrentMessage] = useState<string | null>(null)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const typed = e.key.toLowerCase()
      
      easterEggs.forEach(egg => {
        if (egg.trigger.includes(typed) && !discoveredEggs.includes(egg.id)) {
          setDiscoveredEggs(prev => [...prev, egg.id])
          setCurrentMessage(egg.message)
          setTimeout(() => setCurrentMessage(null), 5000)
        }
      })
    }

    window.addEventListener('keypress', handleKeyPress)
    return () => window.removeEventListener('keypress', handleKeyPress)
  }, [discoveredEggs])

  return (
    <AnimatePresence>
      {currentMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="bg-blue-900/90 backdrop-blur-sm px-6 py-4 rounded-lg
                        shadow-lg text-white text-center">
            {currentMessage}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 