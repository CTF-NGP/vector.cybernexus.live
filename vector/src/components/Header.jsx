import { useEffect, useMemo, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Search } from 'lucide-react'
import { PLATFORM_URL, tracks, schedule } from '../event'
import Arrow from './Arrow'
import KineticMenu from './ui/KineticMenu'

const resourceItems = [
  { to: '#about', label: 'About', meta: 'What the event is', icon: '◆' },
  { to: '#mission', label: 'Mission', meta: 'Why it exists', icon: '◎' },
  { to: '#competition', label: 'Competition', meta: 'Format and facts', icon: '▲' },
  { to: '#tracks', label: 'Tracks', meta: 'Web · Crypto · Forensics · Reverse · Pwn · OSINT', icon: '⌬' },
  { to: '#schedule', label: 'Schedule', meta: '10.10.2026 timeline', icon: '◷' },
  { to: '#venue', label: 'Venue', meta: 'NGPiTech, Coimbatore', icon: '⌂' },
  { to: '#faq', label: 'FAQ', meta: 'Answers, decoded', icon: '?' },
  { to: '#sponsors', label: 'Sponsors', meta: 'Back the signal', icon: '✜' },
]

const searchIndex = [
  ...tracks.map(([n, title, detail]) => ({ label: `Track ${n} — ${title}: ${detail}`, to: '#tracks' })),
  ...schedule.map(([t, title, detail]) => ({ label: `${t} — ${title}: ${detail}`, to: '#schedule' })),
  { label: 'Rules & protocol', to: '#faq' },
  { label: 'FAQ — answers, decoded', to: '#faq' },
  { label: 'Venue — NGPiTech, Coimbatore', to: '#venue' },
  { label: 'Sponsors — back the signal', to: '#sponsors' },
  { label: 'About this event', to: '#about' },
  { label: 'Competition format', to: '#competition' },
]

function useScrollSpy() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const targets = [...resourceItems.map((i) => i.to.slice(1)), 'top']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!targets.length) return undefined
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])
  return active
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [resourceOpen, setResourceOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const searchRef = useRef(null)
  const resourceRef = useRef(null)
  const active = useScrollSpy()

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
    setResourceOpen(false)
    setQuery('')
    if (href.startsWith('#')) {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setResourceOpen(false)
    }
    const onPointerDown = (e) => {
      if (resourceRef.current && !resourceRef.current.contains(e.target)) {
        setResourceOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [])

  const onSearchKey = (e) => {
    if (!results.length) return
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected((s) => (s + 1) % results.length) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSelected((s) => (s - 1 + results.length) % results.length) }
    else if (e.key === 'Enter') { e.preventDefault(); const r = results[selected]; if (r) navigateTo(r.entry.to) }
    else if (e.key === 'Escape') setSearchOpen(false)
  }

  return (
    <header className="site-header">
      <div className="header-announce" aria-hidden="true">
        <span>Registration open</span>
        <span>NGPiTech · Coimbatore</span>
        <span>10.10.2026 / 09:00 IST</span>
      </div>
      <div className="header-main">
        <NavLink className="brand" to="/" end aria-label="V3CT0R CTF 26 home">
          V3CT0R<span>_</span>26
        </NavLink>

        <nav className="nav" aria-label="Main navigation">
          <NavLink to="/" end>Home</NavLink>
          <div className="resource-nav" ref={resourceRef} onMouseEnter={() => setSearchOpen(false)}>
            <button
              className="resource-button"
              type="button"
              aria-expanded={resourceOpen}
              aria-haspopup="true"
              aria-controls="resource-panel"
              onClick={() => { setResourceOpen((o) => !o); setSearchOpen(false) }}
            >
              Explore <span className="resource-caret">▾</span>
            </button>
            <div className={'resource-panel' + (resourceOpen ? ' is-open' : '')} id="resource-panel">
              <div className="resource-grid">
                {resourceItems.slice(0, 4).map((item) => (
                  <a key={item.to} className={'resource-card' + (active === item.to ? ' is-active' : '')} href={item.to} aria-current={active === item.to ? 'true' : undefined} onClick={() => setResourceOpen(false)}>
                    <span className="resource-icon" aria-hidden="true">{item.icon}</span>
                    <span className="resource-card-text">
                      <strong>{item.label}</strong>
                      <small>{item.meta}</small>
                    </span>
                  </a>
                ))}
              </div>
              <div className="resource-quick">
                {resourceItems.slice(4).map((item) => (
                  <a key={item.to} href={item.to} onClick={() => setResourceOpen(false)}>{item.label}</a>
                ))}
              </div>
            </div>
          </div>
          <NavLink to="/volunteers">Volunteer</NavLink>
        </nav>

        <div className="header-search" ref={searchRef}>
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
        </div>

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
      </div>
      <KineticMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  )
}