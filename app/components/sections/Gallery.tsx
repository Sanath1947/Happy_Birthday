'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface MemoryCard {
  id: number
  reason: string
  date: string
  image: string
}

// Sample data structure for the 52 memories
const memories: MemoryCard[] = Array.from({ length: 52 }, (_, i) => ({
  id: i + 1,
  reason: `Reason ${i + 1}: Memory text will go here`,
  date: `2024`,
  image: `/images/memories/memory-${i + 1}.jpg`
}))

export default function Gallery() {
  const [selectedMemory, setSelectedMemory] = useState<MemoryCard | null>(null)

  return (
    <section className="py-20 px-4 md:px-8 bg-black/90">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-playfair text-center mb-16">
          52 Reasons Why I Love You
        </h2>
        
        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative break-inside-avoid mb-4"
            >
              <div 
                className="relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer
                         transform transition-all duration-300 hover:scale-105"
                onClick={() => setSelectedMemory(memory)}
              >
                {/* Placeholder for actual images */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                <div className="w-full h-full bg-blue-900/30 hover:bg-blue-900/40 transition-colors">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-sm opacity-75">Week {memory.id}</p>
                    <p className="font-medium truncate">{memory.reason}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Memory Modal */}
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative max-w-2xl w-full bg-blue-950/80 rounded-xl p-6 backdrop-blur-lg"
              onClick={e => e.stopPropagation()}
            >
              <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-blue-900/30" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                {selectedMemory.reason}
              </h3>
              <p className="text-blue-200">{selectedMemory.date}</p>
              <button
                className="absolute top-4 right-4 text-white/80 hover:text-white"
                onClick={() => setSelectedMemory(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
} 