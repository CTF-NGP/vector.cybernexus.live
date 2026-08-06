import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PLATFORM_URL } from '../event'
import Arrow from './Arrow'
import KineticMenu from './ui/KineticMenu'

const routeLinks = [
  { label: 'Home', to: '/' },
  { label: 'Volunteer', to: '/volunteers' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const platformHref = PLATFORM_URL || '#platform-access'

  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="V3CT0R CTF 26 home">
        V3CT0R<span>_</span>26
      </Link>
      <nav className="nav" aria-label="Main navigation">
        {routeLinks.map((link) => (
          <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}>{link.label}</Link>
        ))}
      </nav>
      <a className="nav-cta" href={platformHref} target={PLATFORM_URL ? '_blank' : undefined} rel={PLATFORM_URL ? 'noreferrer' : undefined}>
        Platform <Arrow />
      </a>
      <button
        className="menu-button"
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
        aria-controls="kinetic-menu"
        aria-label="Toggle navigation"
      >
        <span></span><span></span>
      </button>
      <KineticMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  )
}
