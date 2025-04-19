/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: {
          100: '#E3F2FD',
          900: '#1E3A8A',
        },
        accent: {
          100: '#FFF8E1',
          900: '#B7791F',
        },
      },
      fontFamily: {
        sans: ['var(--font-montserrat)'],
        display: ['var(--font-playfair)'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
} 