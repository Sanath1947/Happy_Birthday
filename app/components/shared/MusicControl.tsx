'use client'

import { motion } from 'framer-motion'
import { useMusic } from '@/contexts/MusicContext'

export default function MusicControl() {
  const { isPlaying, toggleMusic, volume, setVolume } = useMusic()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 z-50 flex items-center gap-4"
    >
      <div className="bg-black/80 backdrop-blur-sm rounded-full p-2">
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-20 h-1 accent-blue-500"
        />
      </div>
      
      <button
        onClick={toggleMusic}
        className="p-3 rounded-full bg-black/80 backdrop-blur-sm hover:bg-black/60
                 transition-all duration-300 transform hover:scale-105"
      >
        {isPlaying ? (
          <PauseIcon className="w-6 h-6" />
        ) : (
          <PlayIcon className="w-6 h-6" />
        )}
      </button>
    </motion.div>
  )
}

const PlayIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 