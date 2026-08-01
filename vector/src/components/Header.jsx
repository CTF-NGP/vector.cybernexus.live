import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PLATFORM_URL } from '../event'
import Arrow from './Arrow'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  const routeLinks = [
    { label: 'Home', to: '/' }
  ]

  if (isHome) {
    routeLinks.push({ label: 'Volunteers', to: '/volunteers' })
  }

  const anchorLinks = isHome ? [
    { label: 'About', href: '#about' },
    { label: 'Mission', href: '#mission' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Tracks', href: '#tracks' },
    { label: 'Venue', href: '#venue' },
    { label: 'FAQ', href: '#faq' }
  ] : []

  const platformHref = PLATFORM_URL || '#platform-access'

  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="V3CT0R CTF 26 home">
        V3CT0R<span>_</span>
      </Link>
      <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Main navigation">
        {routeLinks.map((link) => (
          <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}>{link.label}</Link>
        ))}
        {anchorLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
        ))}
      </nav>
      <a className="nav-cta" href={platformHref} target={PLATFORM_URL ? '_blank' : undefined} rel={PLATFORM_URL ? 'noreferrer' : undefined}>
        Platform <Arrow />
      </a>
      <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">
        <span></span><span></span>
      </button>
    </header>
  )
}