'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence>
        {isLoading && !error && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-blue-900/20"
          ></motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 