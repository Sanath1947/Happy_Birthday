import type { Metadata } from 'next'
import { Montserrat, Playfair_Display } from 'next/font/google'
import ErrorBoundary from './components/shared/ErrorBoundary'
import './globals.css'

// Font optimization
const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Our Journey Together | For Vinisha',
  description: 'A celebration of our love story and memories together, dedicated to Vinisha on her birthday',
  keywords: ['love story', 'birthday gift', 'memories', 'journey together'],
  authors: [{ name: 'Your Name' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#000000',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    title: 'Our Journey Together | For Vinisha',
    description: 'A celebration of our love story and memories together',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${montserrat.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-black text-white min-h-screen font-sans antialiased">
        {/* Audio Context Provider would go here */}
        <div className="relative z-0">
          {/* Background gradient overlay */}
          <div 
            className="fixed inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black pointer-events-none"
            style={{ zIndex: -1 }}
          />
          
          {/* Main content */}
          <div className="relative z-10">
            {children}
          </div>
        </div>

        {/* Background music toggle (will be implemented later) */}
        <div className="fixed bottom-4 right-4 z-50">
          <button 
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
            aria-label="Toggle background music"
          >
            {/* Music icon will go here */}
          </button>
        </div>
      </body>
    </html>
  )
} 