import './App.css'
import AnimatedSection from './components/AnimatedSection'
import CompetitionSection from './components/CompetitionSection'
import FaqSection from './components/FaqSection'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import IntroSection from './components/IntroSection'
import MissionSection from './components/MissionSection'
import ScheduleSection from './components/ScheduleSection'
import SponsorsSection from './components/SponsorsSection'
import TracksSection from './components/TracksSection'
import VenueSection from './components/VenueSection'

function App() {
  return (
    <main>
      <Header />
      <Hero />
      <AnimatedSection><IntroSection /></AnimatedSection>
      <MissionSection />
      <AnimatedSection><CompetitionSection /></AnimatedSection>
      <TracksSection />
      <AnimatedSection><ScheduleSection /></AnimatedSection>
      <AnimatedSection><VenueSection /></AnimatedSection>
      <AnimatedSection><FaqSection /></AnimatedSection>
      <AnimatedSection><SponsorsSection /></AnimatedSection>
      <Footer />
    </main>
  )
}

export default App
