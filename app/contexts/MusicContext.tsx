'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface MusicContextType {
  isPlaying: boolean
  toggleMusic: () => void
  volume: number
  setVolume: (volume: number) => void
}

const MusicContext = createContext<MusicContextType | undefined>(undefined)

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)

  useEffect(() => {
    const audioElement = new Audio('/audio/background-music.mp3')
    audioElement.loop = true
    audioElement.volume = volume
    setAudio(audioElement)

    return () => {
      audioElement.pause()
      audioElement.src = ''
    }
  }, [])

  useEffect(() => {
    if (audio) {
      audio.volume = volume
    }
  }, [volume, audio])

  const toggleMusic = () => {
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <MusicContext.Provider value={{ isPlaying, toggleMusic, volume, setVolume }}>
      {children}
    </MusicContext.Provider>
  )
}

export const useMusic = () => {
  const context = useContext(MusicContext)
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider')
  }
  return context
} 