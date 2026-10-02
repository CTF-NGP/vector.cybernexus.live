import { useEffect, useState } from 'react'
import { EVENT_DATE, PLATFORM_URL, SCOREBOARD_URL, getEventPhase } from '../event'
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

function useEventPhase() {
  const [phase, setPhase] = useState(() => getEventPhase())

  useEffect(() => {
    const timer = window.setInterval(() => setPhase(getEventPhase()), 30000)
    return () => window.clearInterval(timer)
  }, [])

  return phase
}

function LiveBanner() {
  return (
    <div className="countdown live-banner" aria-live="polite" aria-label="V3CT0R CTF 26 is live now">
      <div className="countdown-unit live-unit">
        <strong><span className="live-dot" aria-hidden="true" /> LIVE</strong>
        <span>challenge window open • ends 4:30 PM IST</span>
      </div>
    </div>
  )
}

function PostCard() {
  return (
    <div className="countdown post-card" aria-label="V3CT0R CTF 26 has concluded">
      <div className="countdown-unit">
        <strong>See you @ V3CT0R CTF 27</strong>
        <span>event concluded • thanks for playing</span>
      </div>
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
  const phase = useEventPhase()
  const scoreboardHref = SCOREBOARD_URL || ''

  const eyebrow = phase === 'live'
    ? '● LIVE NOW / 09:00–16:30 IST'
    : phase === 'post'
      ? 'Event concluded'
      : 'Onsite capture the flag / 10.10.2026'

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
        <p className="eyebrow">{eyebrow}</p>
        <h1>V3CT0R<br /><em>CTF 26</em></h1>
        <p className="hero-description">An onsite challenge for security minds ready to find the signal inside the noise. Even light cannot leave here — it only bends around the event, and what you see is the horizon doing the bending.{phase === 'post' ? ' See you @ V3CT0R CTF 27.' : ''}</p>
        {phase === 'post' ? (
          <div className="hero-actions">
            {scoreboardHref ? (
              <a className="button primary" href={scoreboardHref} target="_blank" rel="noreferrer">View scoreboard <Arrow /></a>
            ) : null}
            <a className="button ghost" href="#about">Explore event <Arrow dir="down" /></a>
          </div>
        ) : phase === 'live' ? (
          <div className="hero-actions">
            <a className="button primary" href={platformHref} target={PLATFORM_URL ? '_blank' : undefined} rel={PLATFORM_URL ? 'noreferrer' : undefined}>Enter platform <Arrow /></a>
            <a className="button ghost" href="#tracks">View tracks <Arrow dir="down" /></a>
          </div>
        ) : (
          <div className="hero-actions">
            <a className="button primary" href={platformHref} target={PLATFORM_URL ? '_blank' : undefined} rel={PLATFORM_URL ? 'noreferrer' : undefined}>Register <Arrow /></a>
            <a className="button ghost" href="#about">Explore event <Arrow dir="down" /></a>
          </div>
        )}
        {phase === 'pre' ? (
          <p className="hero-fee-note">₹300 / person • Teams 1–4 • Lunch + refreshments included</p>
        ) : phase === 'live' ? (
          <p className="hero-fee-note">Event in progress • Ends 4:30 PM IST</p>
        ) : (
          <p className="hero-fee-note">See you @ V3CT0R CTF 27</p>
        )}
      </div>
      <div className="hero-meta">
        <div><span>Location</span><strong>NGPiTech<br />Coimbatore</strong></div>
        <div><span>Window</span><strong>09:00 AM — 4:30 PM<br />IST</strong></div>
        {phase === 'live' ? <LiveBanner /> : phase === 'post' ? <PostCard /> : <Countdown />}
      </div>
    </section>
  )
}