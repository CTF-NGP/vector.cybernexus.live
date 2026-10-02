import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { PLATFORM_URL, getEventPhase } from '../event'
import Arrow from './Arrow'
import SterlingGateKineticNav from './ui/SterlingGateKineticNav'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [phase, setPhase] = useState(() => getEventPhase())

  useEffect(() => {
    const timer = window.setInterval(() => setPhase(getEventPhase()), 30000)
    return () => window.clearInterval(timer)
  }, [])

  const platformHref = PLATFORM_URL || '#platform-access'
  const announceFirst = phase === 'live'
    ? '● LIVE — Event in progress'
    : phase === 'post'
      ? 'Event concluded — See you @ V3CT0R CTF 27'
      : 'Registration open — ₹300 / person'

  const scrollTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

  return (
    <>
      <header className="site-header">
      { <div className="header-announce" aria-hidden="true">
        <span>{announceFirst}</span>
        <span>NGPiTech · Coimbatore</span>
        <span>10.10.2026 / 09:00 IST</span>
      </div> }
      <div className="header-main">
        <NavLink className="brand" to="/" end aria-label="V3CT0R CTF 26 home" onClick={scrollTop}>
          V3CT0R<span>_</span>26
        </NavLink>

        <nav className="nav" aria-label="Main navigation">
          <NavLink to="/" end onClick={scrollTop}>Home</NavLink>
          <NavLink to="/volunteers" onClick={scrollTop}>Volunteer</NavLink>
        </nav>

        <a className="nav-cta" href={platformHref} target={PLATFORM_URL ? '_blank' : undefined} rel={PLATFORM_URL ? 'noreferrer' : undefined}>
          Register <Arrow />
        </a>
        <button
          className="menu-button"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="sg-menu-list"
          aria-label="Toggle navigation"
        >
          <span></span><span></span>
        </button>
      </div>
      </header>
      <SterlingGateKineticNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}