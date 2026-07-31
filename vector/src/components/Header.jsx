import { useState } from 'react'
import { PLATFORM_URL } from '../event'
import Arrow from './Arrow'

const navigation = [
  ['About', '#about'],
  ['Mission', '#mission'],
  ['Schedule', '#schedule'],
  ['Tracks', '#tracks'],
  ['Venue', '#venue'],
  ['FAQ', '#faq'],
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const platformHref = PLATFORM_URL || '#platform-access'

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="V3CT0R CTF 26 home">
        V3CT0R<span>_</span>
      </a>
      <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Main navigation">
        {navigation.map(([label, href]) => (
          <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>
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
