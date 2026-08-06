import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { PLATFORM_URL } from '../../event'
import Arrow from '../Arrow'

gsap.registerPlugin(CustomEase)

const links = [
  { to: '/', label: 'Home', index: '01' },
  { to: '/volunteers', label: 'Volunteer', index: '02' },
]

export default function KineticMenu({ open, onClose }) {
  const root = useRef(null)
  const reduceMotion = useRef(false)

  useEffect(() => {
    reduceMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    if (!root.current) return

    const ease = gsap.parseEase('kinetic-menu')
      ? 'kinetic-menu'
      : CustomEase.create('kinetic-menu', '0.65, 0.01, 0.05, 0.99')

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease, duration: 0.7 } })
      const overlay = root.current.querySelector('.kinetic-overlay')
      const panels = root.current.querySelectorAll('.kinetic-panel')
      const items = root.current.querySelectorAll('.kinetic-item')
      const meta = root.current.querySelectorAll('[data-fade]')
      const firstLink = root.current.querySelector('.kinetic-link')

      if (open) {
        document.body.style.overflow = 'hidden'
        tl.set(root.current, { display: 'block' })
        if (reduceMotion.current) {
          tl.set([overlay, panels, items, meta], { autoAlpha: 1, yPercent: 0, y: 0, opacity: 1 })
        } else {
          tl.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 })
            .fromTo(panels, { yPercent: 105 }, { yPercent: 0, stagger: 0.09, duration: 0.7 }, '<0.05')
            .fromTo(items, { yPercent: 130, rotate: 6, opacity: 0 }, { yPercent: 0, rotate: 0, opacity: 1, stagger: 0.06, duration: 0.65 }, '<+=0.2')
            .fromTo(meta, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, stagger: 0.05, duration: 0.4 }, '<+=0.1')
        }
        if (firstLink) firstLink.focus()
      } else {
        document.body.style.overflow = ''
        if (reduceMotion.current) {
          tl.set(root.current, { display: 'none' })
        } else {
          tl.to(items, { yPercent: 40, opacity: 0, stagger: 0.03, duration: 0.25 })
            .to(panels, { yPercent: 105, stagger: 0.05, duration: 0.4 }, '<')
            .to(overlay, { autoAlpha: 0, duration: 0.3 }, '<')
            .set(root.current, { display: 'none' })
        }
      }
    }, root)

    return () => ctx.revert()
  }, [open])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && open) onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const platformHref = PLATFORM_URL || '#platform-access'

  const spawnRipple = (e) => {
    const link = e.currentTarget
    const ripple = link.querySelector('.kinetic-ripple')
    const rect = link.getBoundingClientRect()
    ripple.style.left = `${e.clientX - rect.left}px`
    ripple.style.top = `${e.clientY - rect.top}px`
    gsap.fromTo(ripple, { scale: 0, opacity: 0.7 }, { scale: 1, opacity: 0, duration: 0.7, ease: 'power2.out', overwrite: true })
  }

  return (
    <div ref={root} className="kinetic-nav" aria-hidden={!open}>
      <button type="button" className="kinetic-overlay" onClick={onClose} tabIndex={-1} aria-label="Close menu" />
      <nav className="kinetic-menu" aria-label="Mobile navigation">
        <div className="kinetic-panel" />
        <div className="kinetic-panel" />
        <div className="kinetic-panel" />
        <div className="kinetic-glow" />
        <ul className="kinetic-list">
          {links.map((link) => (
            <li className="kinetic-item" key={link.to}>
              <span className="kinetic-index" aria-hidden="true">{link.index}</span>
              <Link
                className="kinetic-link"
                to={link.to}
                onClick={onClose}
                onMouseEnter={spawnRipple}
                onMouseMove={spawnRipple}
              >
                {link.label}
                <span className="kinetic-ripple" aria-hidden="true" />
              </Link>
            </li>
          ))}
          <li className="kinetic-item">
            <span className="kinetic-index" aria-hidden="true">03</span>
            <a
              className="kinetic-link kinetic-link-external"
              href={platformHref}
              target={PLATFORM_URL ? '_blank' : undefined}
              rel={PLATFORM_URL ? 'noreferrer' : undefined}
              onClick={onClose}
              onMouseEnter={spawnRipple}
              onMouseMove={spawnRipple}
            >
              Platform <Arrow />
              <span className="kinetic-ripple" aria-hidden="true" />
            </a>
          </li>
        </ul>
        <div className="kinetic-meta" data-fade>
          <span>[ 00 / MAIN MENU ]</span>
          <span>V3CT0R CTF 26 · 10.10.2026</span>
        </div>
      </nav>
    </div>
  )
}
