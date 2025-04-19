import { Suspense } from 'react'
import Hero from './components/sections/Hero'
import Timeline from './components/sections/Timeline'
import Gallery from './components/sections/Gallery'
import Destinations from './components/sections/Destinations'
import LoveNotes from './components/sections/LoveNotes'
import CreateMemory from './components/sections/CreateMemory'
import LoveCalendar from './components/sections/LoveCalendar'
import ContentManager from './components/admin/ContentManager'
import CollaborationPanel from './components/collaboration/CollaborationPanel'
import SignIn from './components/auth/SignIn'
import Footer from './components/shared/Footer'
import { MusicProvider } from './contexts/MusicContext'
import MusicControl from './components/shared/MusicControl'
import EasterEggs from './components/shared/EasterEggs'
import Loading from './loading'

export default function Home() {
  return (
    <MusicProvider>
      <Suspense fallback={<Loading />}>
        <main className="min-h-screen">
          <EasterEggs />
          <MusicControl />
          <Hero />
          <Timeline />
          <Gallery />
          <Destinations />
          <LoveNotes />
          <CreateMemory />
          <LoveCalendar />
          <ContentManager />
          <CollaborationPanel />
          <Footer />
        </main>
      </Suspense>
    </MusicProvider>
  )
} 