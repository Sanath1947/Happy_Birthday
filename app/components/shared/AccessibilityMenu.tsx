'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AccessibilitySettings {
  fontSize: number
  contrast: 'normal' | 'high'
  reducedMotion: boolean
  audioDescriptions: boolean
}

export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 16,
    contrast: 'normal',
    reducedMotion: false,
    audioDescriptions: false,
  })

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    const updated = { ...settings, ...newSettings }
    setSettings(updated)
    applySettings(updated)
  }

  const applySettings = (settings: AccessibilitySettings) => {
    document.documentElement.style.fontSize = `${settings.fontSize}px`
    document.body.classList.toggle('high-contrast', settings.contrast === 'high')
    document.body.classList.toggle('reduced-motion', settings.reducedMotion)
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-blue-600 rounded-full"
        aria-label="Accessibility Settings"
      >
        <AccessibilityIcon />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-full mb-4 p-6 bg-black rounded-xl shadow-lg"
          >
            <h3 className="text-lg font-bold mb-4">Accessibility Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Font Size</label>
                <input
                  type="range"
                  min="14"
                  max="24"
                  value={settings.fontSize}
                  onChange={(e) => updateSettings({ fontSize: Number(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Contrast</label>
                <select
                  value={settings.contrast}
                  onChange={(e) => updateSettings({ contrast: e.target.value as 'normal' | 'high' })}
                  className="w-full p-2 rounded bg-gray-800"
                >
                  <option value="normal">Normal</option>
                  <option value="high">High Contrast</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="reducedMotion"
                  checked={settings.reducedMotion}
                  onChange={(e) => updateSettings({ reducedMotion: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="reducedMotion">Reduce Motion</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="audioDescriptions"
                  checked={settings.audioDescriptions}
                  onChange={(e) => updateSettings({ audioDescriptions: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="audioDescriptions">Audio Descriptions</label>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 