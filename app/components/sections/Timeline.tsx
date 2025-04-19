'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

interface TimelineEvent {
  date: string
  title: string
  description: string
  image: string
}

const timelineEvents: TimelineEvent[] = [
  {
    date: 'October 10, 2020',
    title: 'First Meeting',
    description: 'The day our paths crossed and our story began',
    image: '/images/first-meeting.jpg'
  },
  {
    date: 'Early 2021',
    title: 'Friendship Blossoms',
    description: 'From casual conversations to deep connections',
    image: '/images/friendship.jpg'
  },
  {
    date: 'May 2021',
    title: 'The Separation',
    description: 'Distance made our hearts grow fonder',
    image: '/images/separation.jpg'
  },
  {
    date: 'January 2022',
    title: 'UK Journey Begins',
    description: 'A new chapter across the oceans',
    image: '/images/uk-journey.jpg'
  },
  {
    date: 'Special Day',
    title: 'Birthday Surprise',
    description: 'Making moments special despite the distance',
    image: '/images/birthday.jpg'
  },
  {
    date: 'December',
    title: 'The Proposal',
    description: 'When "us" became forever',
    image: '/images/proposal.jpg'
  },
  {
    date: 'Present',
    title: 'Reunion in India',
    description: 'Together again, stronger than ever',
    image: '/images/reunion.jpg'
  }
]

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  return (
    <section 
      ref={containerRef}
      className="relative py-20 px-4 md:px-8 min-h-screen"
    >
      <h2 className="text-3xl md:text-5xl font-playfair text-center mb-16">
        Our Story
      </h2>

      <div className="max-w-6xl mx-auto relative">
        {/* Vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-900" />

        {timelineEvents.map((event, index) => (
          <motion.div
            key={event.date}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className={`relative flex items-center mb-20 ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            {/* Content */}
            <div className="w-1/2 px-8">
              <div className={`bg-blue-900/20 backdrop-blur-sm p-6 rounded-lg
                            hover:bg-blue-900/30 transition-all duration-300
                            transform hover:scale-105`}>
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-blue-200 mb-4">{event.date}</p>
                <p className="text-gray-300">{event.description}</p>
              </div>
            </div>

            {/* Timeline dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full" />
          </motion.div>
        ))}
      </div>
    </section>
  )
} 