'use client'

import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/web'
import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation()
  const [isLoaded, setIsLoaded] = useState(false)

  const fadeIn = useSpring({
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
  })

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="min-h-screen relative">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          {t('hero.title')}
        </h1>
        <p className="mt-4 text-xl">
          {t('hero.subtitle')}
        </p>
        <button className="mt-8 px-8 py-4 bg-blue-600 rounded-full">
          {t('hero.cta')}
        </button>
      </div>
      {/* 3D Canvas Background */}
      <Canvas className="absolute inset-0">
      </Canvas>
    </section>
  )
} 