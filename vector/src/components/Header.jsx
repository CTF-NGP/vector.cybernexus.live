import { useMemo, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Search } from 'lucide-react'
import { PLATFORM_URL, tracks, schedule } from '../event'
import Arrow from './Arrow'
import SterlingGateKineticNav from './ui/SterlingGateKineticNav'

const searchIndex = [
  ...tracks.map(([n, title, detail]) => ({ label: `Track ${n} — ${title}: ${detail}`, to: '#tracks' })),
  ...schedule.map(([t, title, detail]) => ({ label: `${t} — ${title}: ${detail}`, to: '#schedule' })),
  { label: 'Rules & protocol', to: '#faq' },
  { label: 'FAQ — answers, decoded', to: '#faq' },
  { label: 'Global signal — one noise, every horizon', to: '#signal' },
  { label: 'Venue — NGPiTech, Coimbatore', to: '#venue' },
  { label: 'Sponsors — back the signal', to: '#sponsors' },
  { label: 'About this event', to: '#about' },
  { label: 'Competition format', to: '#competition' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const searchRef = useRef(null)

  const platformHref = PLATFORM_URL || '#platform-access'

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return searchIndex
      .map((entry, i) => ({ entry, i }))
      .filter(({ entry }) => entry.label.toLowerCase().includes(q))
      .slice(0, 6)
  }, [query])

  const navigateTo = (href) => {
    setSearchOpen(false)
    setQuery('')
    if (href.startsWith('#')) {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const onSearchKey = (e) => {
    if (!results.length) return
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected((s) => (s + 1) % results.length) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSelected((s) => (s - 1 + results.length) % results.length) }
    else if (e.key === 'Enter') { e.preventDefault(); const r = results[selected]; if (r) navigateTo(r.entry.to) }
    else if (e.key === 'Escape') setSearchOpen(false)
  }

  return (
    <>
      <header className="site-header">
      {/* <div className="header-announce" aria-hidden="true">
        <span>Registration open</span>
        <span>NGPiTech · Coimbatore</span>
        <span>10.10.2026 / 09:00 IST</span>
      </div> */}
      <div className="header-main">
        <NavLink className="brand" to="/" end aria-label="V3CT0R CTF 26 home">
          V3CT0R<span>_</span>26
        </NavLink>

        <nav className="nav" aria-label="Main navigation">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/volunteers">Volunteer</NavLink>
        </nav>

        {/* <div className="header-search" ref={searchRef}>
          <div className="search-field">
            <Search className="search-icon" aria-hidden="true" />
            <input
              type="text"
              value={query}
              placeholder="Search the signal…"
              aria-label="Search"
              aria-expanded={searchOpen}
              onFocus={() => setSearchOpen(true)}
              onChange={(e) => { setQuery(e.target.value); setSearchOpen(true); setSelected(0) }}
              onKeyDown={onSearchKey}
            />
          </div>
          {searchOpen && results.length > 0 && (
            <div className="search-results" role="listbox">
              {results.map((r, i) => (
                <button
                  key={r.entry.to + r.i}
                  type="button"
                  role="option"
                  aria-selected={selected === i}
                  className={'search-result' + (selected === i ? ' is-selected' : '')}
                  onMouseEnter={() => setSelected(i)}
                  onClick={() => navigateTo(r.entry.to)}
                >
                  {r.entry.label}
                </button>
              ))}
            </div>
          )}
        </div> */}

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