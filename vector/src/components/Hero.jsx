import { useEffect, useState } from 'react'
import { EVENT_DATE, PLATFORM_URL } from '../event'
import Arrow from './Arrow'
import FloatingPaths from './FloatingPaths'

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

export default function Hero() {
  const platformHref = PLATFORM_URL || '#platform-access'

  return (
    <section className="hero" id="top">
      <FloatingPaths className="path-field" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true"></div>
      <div className="hero-copy">
        <p className="eyebrow">Onsite capture the flag / 10.10.2026</p>
        <h1>V3CT0R<br /><em>CTF 26</em></h1>
        <p className="hero-description">An onsite challenge for security minds ready to find the signal inside the noise.</p>
        <div className="hero-actions">
          <a className="button primary" href={platformHref} target={PLATFORM_URL ? '_blank' : undefined} rel={PLATFORM_URL ? 'noreferrer' : undefined}>Enter platform <Arrow /></a>
          <a className="button ghost" href="#about">Explore event <span>↓</span></a>
        </div>
      </div>
      <div className="hero-meta">
        <div><span>Location</span><strong>NGPiTech<br />Coimbatore</strong></div>
        <div><span>Window</span><strong>09:00 — 16:30<br />IST</strong></div>
        <Countdown />
      </div>
      <div className="signal-stamp" aria-hidden="true"><span>VECTOR</span><b>26</b></div>
    </section>
  )
}