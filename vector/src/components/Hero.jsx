import { useEffect, useState } from 'react'
import { EVENT_DATE, PLATFORM_URL } from '../event'
import Arrow from './Arrow'
import BlackHoleHeroSection from './ui/blackhole-hero-section'

function getTimeLeft() {
  const distance = Math.max(EVENT_DATE.getTime() - Date.now(), 0)

  return {
    days: Math.floor(distance / 86400000),
    hrs: Math.floor((distance / 3600000) % 24),
    min: Math.floor((distance / 60000) % 60),
    sec: Math.floor((distance / 1000) % 60),
  }
}

function Countdown() {
  const [time, setTime] = useState(getTimeLeft)

  useEffect(() => {
    const timer = window.setInterval(() => setTime(getTimeLeft()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="countdown" aria-label="Countdown until V3CT0R CTF 26">
      {Object.entries(time).map(([label, value]) => (
        <div className="countdown-unit" key={label}>
          <strong>{String(value).padStart(2, '0')}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}

function useNarrow(query = '(max-width: 767px)') {
  const [narrow, setNarrow] = useState(false)
  useEffect(() => {
    const m = window.matchMedia(query)
    const sync = () => setNarrow(m.matches)
    sync()
    m.addEventListener('change', sync)
    return () => m.removeEventListener('change', sync)
  }, [query])
  return narrow
}

export default function Hero() {
  const platformHref = PLATFORM_URL || '#platform-access'
  const narrow = useNarrow()

  return (
    <section className="hero" id="top">
      <BlackHoleHeroSection
        className="hero-hole"
        focus={narrow ? [0.5, 0.78] : [0.72, 0.46]}
        scrim={narrow ? 'top' : 'left'}
        scrimStrength={0.92}
        distance={24}
        elevation={narrow ? -7 : -5.5}
        fov={narrow ? 58 : 42}
        glow={narrow ? 0.85 : 1}
        steps={narrow ? 160 : 240}
        resolution={narrow ? 0.6 : 0.7}
        starBrightness={0.35}
        aria-hidden="true"
      />
      <div className="hero-grid" aria-hidden="true"></div>
      <div className="hero-copy">
        <p className="eyebrow">Onsite capture the flag / 10.10.2026</p>
        <h1>V3CT0R<br /><em>CTF 26</em></h1>
        <p className="hero-description">An onsite challenge for security minds ready to find the signal inside the noise. Even light cannot leave here — it only bends around the event, and what you see is the horizon doing the bending.</p>
        <div className="hero-actions">
          <a className="button primary" href={platformHref} target={PLATFORM_URL ? '_blank' : undefined} rel={PLATFORM_URL ? 'noreferrer' : undefined}>Register <Arrow /></a>
          <a className="button ghost" href="#about">Explore event <Arrow dir="down" /></a>
        </div>
      </div>
      <div className="hero-meta">
        <div><span>Location</span><strong>NGPiTech<br />Coimbatore</strong></div>
        <div><span>Window</span><strong>09:00 AM — 4:30 PM<br />IST</strong></div>
        <Countdown />
      </div>
    </section>
  )
}