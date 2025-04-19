'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoveNote {
  id: number
  quote: string
  context: string
}

const loveNotes: LoveNote[] = [
  {
    id: 1,
    quote: "From friendship to forever, our love story wrote itself",
    context: "The beginning of our journey"
  },
  {
    id: 2,
    quote: "The distance between UK and India couldn't separate our hearts",
    context: "During our long-distance phase"
  },
  {
    id: 3,
    quote: "Your beauty isn't just what I see, but the strength and kindness you show every day",
    context: "Appreciating your character"
  },
  {
    id: 4,
    quote: "When you called me 'missing from your life,' I knew we were meant to be",
    context: "The moment of realization"
  },
  {
    id: 5,
    quote: "Like Lord Shiva's devotion to Parvati, my love for you is eternal",
    context: "Our spiritual connection"
  },
  {
    id: 6,
    quote: "Your smile outshines every destination we'll ever visit",
    context: "The beauty of your happiness"
  }
]

export default function LoveNotes() {
  const [currentNote, setCurrentNote] = useState(0)
  const [flipping, setFlipping] = useState(false)

  const flipToNext = () => {
    if (flipping) return
    setFlipping(true)
    setTimeout(() => {
      setCurrentNote((prev) => (prev + 1) % loveNotes.length)
      setFlipping(false)
    }, 500)
  }

  return (
    <section className="min-h-screen py-20 px-4 md:px-8 bg-black/90">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-playfair text-center mb-16">
          Love Notes
        </h2>

        <div className="relative aspect-[3/2] cursor-pointer" onClick={flipToNext}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentNote}
              initial={{ rotateY: -90 }}
              animate={{ rotateY: 0 }}
              exit={{ rotateY: 90 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-gradient-to-br from-blue-950 to-black 
                       rounded-xl p-8 md:p-12 flex flex-col justify-center items-center
                       text-center"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl md:text-3xl font-playfair mb-6 leading-relaxed"
              >
                "{loveNotes[currentNote].quote}"
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.5 }}
                className="text-sm md:text-base text-blue-200"
              >
                {loveNotes[currentNote].context}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Page flip indicator */}
          <div className="absolute bottom-4 right-4 text-sm text-blue-200">
            {currentNote + 1} / {loveNotes.length}
          </div>
        </div>

        <p className="text-center mt-8 text-blue-200">
          Click the card to reveal the next note
        </p>
      </div>
    </section>
  )
} 