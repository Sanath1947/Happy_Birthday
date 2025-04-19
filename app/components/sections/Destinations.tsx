'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'

interface Destination {
  id: number
  name: string
  description: string
  image: string
  facts: string[]
}

const destinations: Destination[] = [
  {
    id: 1,
    name: 'Greece',
    description: 'Where ancient history meets Mediterranean beauty',
    image: '/images/destinations/greece.jpg',
    facts: [
      'Stunning sunsets in Santorini',
      'Ancient ruins and mythology',
      'Crystal clear waters',
      'Delicious Mediterranean cuisine'
    ]
  },
  {
    id: 2,
    name: 'Maldives',
    description: 'Paradise on Earth with overwater bungalows',
    image: '/images/destinations/maldives.jpg',
    facts: [
      'Luxurious overwater villas',
      'Vibrant marine life',
      'Pristine beaches',
      'Romantic sunsets'
    ]
  },
  {
    id: 3,
    name: 'Arun'
  }
] 