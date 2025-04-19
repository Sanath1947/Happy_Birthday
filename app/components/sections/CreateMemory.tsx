'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface MemoryIdea {
  id: string
  title: string
  description: string
  date: string
}

export default function CreateMemory() {
  const [isOpen, setIsOpen] = useState(false)
  const [memories, setMemories] = useState<MemoryIdea[]>([])
  const [new 