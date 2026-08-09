import Hero from './Hero'
import AnimatedSection from './AnimatedSection'
import IntroSection from './IntroSection'
import MissionSection from './MissionSection'
import GlobeFeatureSection from './ui/GlobeFeatureSection'
import CompetitionSection from './CompetitionSection'
import TracksSection from './TracksSection'
import ScheduleSection from './ScheduleSection'
import VenueSection from './VenueSection'
import FaqSection from './FaqSection'
import SponsorsSection from './SponsorsSection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <AnimatedSection><IntroSection /></AnimatedSection>
      <MissionSection />
      <GlobeFeatureSection />
      <AnimatedSection><CompetitionSection /></AnimatedSection>
      <TracksSection />
      <AnimatedSection><ScheduleSection /></AnimatedSection>
      <AnimatedSection><VenueSection /></AnimatedSection>
      <AnimatedSection><FaqSection /></AnimatedSection>
      <AnimatedSection><SponsorsSection /></AnimatedSection>
    </>
  )
}
