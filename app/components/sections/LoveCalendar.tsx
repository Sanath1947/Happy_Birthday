'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface SpecialDate {
  date: string
  title: string
  description: string
  type: 'anniversary' | 'birthday' | 'milestone' | 'memory'
}

const specialDates: SpecialDate[] = [
  {
    date: '2020-10-10',
    title: 'First Meeting',
    description: 'The day our paths crossed',
    type: 'milestone'
  },
  {
    date: '2025-05-01',
    title: 'Vinisha\'s Birthday',
    description: 'A special day for my special one',
    type: 'birthday'
  },
  // Add more special dates
]

export default function LoveCalendar() {
  const [selectedDate, setSelectedDate] = useState<SpecialDate | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month + 1, 0).getDate()
  }

  const getSpecialDate = (date: string) => {
    return specialDates.find(special => special.date === date)
  }

  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-playfair text-center mb-16">
          Our Love Calendar
        </h2>

        <div className="bg-blue-950/20 backdrop-blur-sm rounded-xl p-6">
          {/* Calendar Navigation */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
              className="p-2 hover:bg-blue-900/20 rounded-full"
            >
              Previous
            </button>
            <h3 className="text-xl font-bold">
              {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h3>
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
              className="p-2 hover:bg-blue-900/20 rounded-full"
            >
              Next
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm text-blue-200 py-2">
                {day}
              </div>
            ))}
            
            {Array.from({ length: getDaysInMonth(currentMonth) }).map((_, index) => {
              const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), index + 1)
              const dateString = date.toISOString().split('T')[0]
              const special = getSpecialDate(dateString)

              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className={`aspect-square flex items-center justify-center rounded-lg
                            cursor-pointer ${special ? 'bg-blue-600/30' : 'hover:bg-blue-900/20'}`}
                  onClick={() => special && setSelectedDate(special)}
                >
                  <span className={special ? 'font-bold' : ''}>
                    {index + 1}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Selected Date Modal */}
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setSelectedDate(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-blue-950/90 backdrop-blur-sm rounded-xl p-6 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-2">{selectedDate.title}</h3>
              <p className="text-blue-200 mb-4">{selectedDate.description}</p>
              <p className="text-sm text-blue-300">{selectedDate.date}</p>
              <button
                onClick={() => setSelectedDate(null)}
                className="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
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