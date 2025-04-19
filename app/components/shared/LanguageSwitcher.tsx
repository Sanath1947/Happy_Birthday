'use client'

import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' }
  ]

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-black/80 backdrop-blur-sm rounded-full p-2">
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => changeLanguage(lang.code)}
            className={`px-4 py-2 rounded-full ${
              i18n.language === lang.code
                ? 'bg-blue-600'
                : 'hover:bg-blue-900/50'
            }`}
          >
            {lang.name}
          </motion.button>
        ))}
      </div>
    </div>
  )
} 