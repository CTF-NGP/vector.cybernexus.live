import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { Link } from 'react-router-dom'
import { PLATFORM_URL } from '../../event'

gsap.registerPlugin(CustomEase)

const navLinks = [
  { to: '#about', label: 'About us', shape: '1' },
  { to: '#mission', label: 'Our mission', shape: '2' },
  { to: '#tracks', label: 'Tracks', shape: '3' },
  { to: '#schedule', label: 'Schedule', shape: '4' },
  { to: '#faq', label: 'FAQ', shape: '5' },
]

const secondaryLinks = [
  { to: '/', label: 'Home', internal: true },
  { to: '/volunteers', label: 'Volunteer', internal: true },
]

export default function SterlingGateKineticNav({ open, onClose }) {
  const containerRef = useRef(null)
  const closeBtnRef = useRef(null)
  const restoreFocusRef = useRef(null)
  const reduceMotion = useRef(false)

  useEffect(() => {
    reduceMotion.current =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    try {
      if (!gsap.parseEase('sg-nav')) {
        CustomEase.create('sg-nav', '0.65, 0.01, 0.05, 0.99')
      }
    } catch (e) {
      console.warn('CustomEase failed to load, falling back to default.', e)
    }

    const ctx = gsap.context(() => {
      const menuItems = container.querySelectorAll(
        '.menu-list-item[data-shape]',
      )
      const shapesContainer = container.querySelector(
        '.ambient-background-shapes',
      )

      menuItems.forEach((item) => {
        const shapeIndex = item.getAttribute('data-shape')
        const shape = shapesContainer
          ? shapesContainer.querySelector(`.bg-shape-${shapeIndex}`)
          : null
        if (!shape) return

        const shapeEls = shape.querySelectorAll('.shape-element')

        const onEnter = () => {
          if (shapesContainer) {
            shapesContainer
              .querySelectorAll('.bg-shape')
              .forEach((s) => s.classList.remove('active'))
          }
          shape.classList.add('active')
          if (reduceMotion.current) return
          gsap.fromTo(
            shapeEls,
            { scale: 0.5, opacity: 0, rotation: -10 },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: 'back.out(1.7)',
              overwrite: 'auto',
            },
          )
        }

        const onLeave = () => {
          if (reduceMotion.current) {
            shape.classList.remove('active')
            return
          }
          gsap.to(shapeEls, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => shape.classList.remove('active'),
            overwrite: 'auto',
          })
        }

        item.addEventListener('mouseenter', onEnter)
        item.addEventListener('mouseleave', onLeave)
        item._cleanup = () => {
          item.removeEventListener('mouseenter', onEnter)
          item.removeEventListener('mouseleave', onLeave)
        }
      })
    }, container)

    return () => {
      ctx.revert()
      container
        .querySelectorAll('.menu-list-item[data-shape]')
        .forEach((item) => item._cleanup && item._cleanup())
    }
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const navWrap = containerRef.current.querySelector('.nav-overlay-wrapper')
      const menu = containerRef.current.querySelector('.menu-content')
      const overlay = containerRef.current.querySelector('.overlay')
      const bgPanels = containerRef.current.querySelectorAll('.backdrop-layer')
      const menuLinks = containerRef.current.querySelectorAll('.nav-link')
      const fadeTargets = containerRef.current.querySelectorAll(
        '[data-menu-fade]',
      )
      const closeBtnIcon = containerRef.current
        .querySelector('.nav-close-btn .menu-button-icon')

      const reduced = reduceMotion.current
      const tl = gsap.timeline({
        defaults: { ease: reduced ? 'none' : 'sg-nav', duration: 0.7 },
      })

      if (open) {
        document.body.style.overflow = 'hidden'
        if (navWrap) navWrap.setAttribute('data-nav', 'open')

        tl.set(navWrap, { display: 'block' })
          .set(menu, { xPercent: 0 }, '<')
          .fromTo(closeBtnIcon, { rotate: 0 }, { rotate: 315 }, '<')

        if (reduced) {
          tl.set(
            [overlay, bgPanels, menuLinks, fadeTargets],
            { autoAlpha: 1, xPercent: 0, yPercent: 0, rotate: 0 },
            '<',
          )
        } else {
          tl.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, '<')
            .fromTo(
              bgPanels,
              { xPercent: 101 },
              { xPercent: 0, stagger: 0.12, duration: 0.575 },
              '<',
            )
            .fromTo(
              menuLinks,
              { yPercent: 140, rotate: 10 },
              { yPercent: 0, rotate: 0, stagger: 0.05 },
              '<+=0.35',
            )
          if (fadeTargets.length) {
            tl.fromTo(
              fadeTargets,
              { autoAlpha: 0, yPercent: 50 },
              { autoAlpha: 1, yPercent: 0, stagger: 0.04, clearProps: 'all' },
              '<+=0.2',
            )
          }
        }
      } else {
        document.body.style.overflow = ''
        if (navWrap) navWrap.setAttribute('data-nav', 'closed')

        if (reduced) {
          tl.set(navWrap, { display: 'none' })
        } else {
          tl.to(overlay, { autoAlpha: 0 })
            .to(menu, { xPercent: 120 }, '<')
            .set(navWrap, { display: 'none' })
        }
      }
    }, containerRef)

    return () => ctx.revert()
  }, [open])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && open) onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return undefined
    const container = containerRef.current
    const closeBtn = closeBtnRef.current
    restoreFocusRef.current = document.activeElement
    let attempts = 0
    const tryFocus = () => {
      attempts += 1
      closeBtn?.focus()
      if (!closeBtn?.contains(document.activeElement) && attempts < 20) {
        setTimeout(tryFocus, 25)
      }
    }
    tryFocus()
    const onTab = (e) => {
      if (e.key !== 'Tab') return
      const focusables = [...container.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )].filter((el) => el.offsetParent !== null)
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onTab)
    return () => {
      document.removeEventListener('keydown', onTab)
      restoreFocusRef.current?.focus?.()
    }
  }, [open])

  const platformHref = PLATFORM_URL || '#platform-access'

  return (
    <div ref={containerRef}>
      <section className="fullscreen-menu-container">
        <div data-nav="closed" className="nav-overlay-wrapper">
          <div className="overlay" onClick={onClose}></div>
          <nav className="menu-content" aria-label="Site navigation">
            <button
              ref={closeBtnRef}
              type="button"
              className="nav-close-btn"
              onClick={onClose}
              aria-expanded={open}
              aria-controls="sg-menu-list"
            >
              <span className="menu-button-text">Close</span>
              <span className="icon-wrap">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="menu-button-icon"
                  aria-hidden="true"
                >
                  <path d="M7.33333 16L7.33333 -3.2055e-07L8.66667 -3.78832e-07L8.66667 16L7.33333 16Z" fill="currentColor" />
                  <path d="M16 8.66667L-2.62269e-07 8.66667L-3.78832e-07 7.33333L16 7.33333L16 8.66667Z" fill="currentColor" />
                  <path d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z" fill="currentColor" />
                  <path d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z" fill="currentColor" />
                  <path d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z" fill="currentColor" />
                  <path d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z" fill="currentColor" />
                </svg>
              </span>
            </button>

            <div className="menu-bg">
              <div className="backdrop-layer first"></div>
              <div className="backdrop-layer second"></div>
              <div className="backdrop-layer"></div>

              <div className="ambient-background-shapes">
                <svg className="bg-shape bg-shape-1" viewBox="0 0 400 400" fill="none" aria-hidden="true">
                  <circle className="shape-element" cx="80" cy="120" r="40" fill="rgba(203,147,255,0.15)" />
                  <circle className="shape-element" cx="300" cy="80" r="60" fill="rgba(128,224,223,0.12)" />
                  <circle className="shape-element" cx="200" cy="300" r="80" fill="rgba(203,147,255,0.1)" />
                  <circle className="shape-element" cx="350" cy="280" r="30" fill="rgba(128,224,223,0.15)" />
                </svg>

                <svg className="bg-shape bg-shape-2" viewBox="0 0 400 400" fill="none" aria-hidden="true">
                  <path className="shape-element" d="M0 200 Q100 100, 200 200 T 400 200" stroke="rgba(203,147,255,0.2)" strokeWidth="60" fill="none" />
                  <path className="shape-element" d="M0 280 Q100 180, 200 280 T 400 280" stroke="rgba(128,224,223,0.15)" strokeWidth="40" fill="none" />
                </svg>

                <svg className="bg-shape bg-shape-3" viewBox="0 0 400 400" fill="none" aria-hidden="true">
                  <circle className="shape-element" cx="50" cy="50" r="8" fill="rgba(203,147,255,0.3)" />
                  <circle className="shape-element" cx="150" cy="50" r="8" fill="rgba(128,224,223,0.3)" />
                  <circle className="shape-element" cx="250" cy="50" r="8" fill="rgba(203,147,255,0.3)" />
                  <circle className="shape-element" cx="350" cy="50" r="8" fill="rgba(128,224,223,0.3)" />
                  <circle className="shape-element" cx="100" cy="150" r="12" fill="rgba(203,147,255,0.25)" />
                  <circle className="shape-element" cx="200" cy="150" r="12" fill="rgba(128,224,223,0.25)" />
                  <circle className="shape-element" cx="300" cy="150" r="12" fill="rgba(203,147,255,0.25)" />
                  <circle className="shape-element" cx="50" cy="250" r="10" fill="rgba(128,224,223,0.3)" />
                  <circle className="shape-element" cx="150" cy="250" r="10" fill="rgba(203,147,255,0.3)" />
                  <circle className="shape-element" cx="250" cy="250" r="10" fill="rgba(128,224,223,0.3)" />
                  <circle className="shape-element" cx="350" cy="250" r="10" fill="rgba(203,147,255,0.3)" />
                  <circle className="shape-element" cx="100" cy="350" r="6" fill="rgba(128,224,223,0.3)" />
                  <circle className="shape-element" cx="200" cy="350" r="6" fill="rgba(203,147,255,0.3)" />
                  <circle className="shape-element" cx="300" cy="350" r="6" fill="rgba(128,224,223,0.3)" />
                </svg>

                <svg className="bg-shape bg-shape-4" viewBox="0 0 400 400" fill="none" aria-hidden="true">
                  <path className="shape-element" d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100" fill="rgba(203,147,255,0.12)" />
                  <path className="shape-element" d="M250 200 Q300 150, 350 200 Q400 250, 350 300 Q400 250, 350 300 Q300 350, 250 300 Q200 250, 250 200" fill="rgba(128,224,223,0.1)" />
                </svg>

                <svg className="bg-shape bg-shape-5" viewBox="0 0 400 400" fill="none" aria-hidden="true">
                  <line className="shape-element" x1="0" y1="100" x2="300" y2="400" stroke="rgba(203,147,255,0.15)" strokeWidth="30" />
                  <line className="shape-element" x1="100" y1="0" x2="400" y2="300" stroke="rgba(128,224,223,0.12)" strokeWidth="25" />
                  <line className="shape-element" x1="200" y1="0" x2="400" y2="200" stroke="rgba(203,147,255,0.1)" strokeWidth="20" />
                </svg>
              </div>
            </div>

            <div className="menu-content-wrapper">
              <ul className="menu-list" id="sg-menu-list">
                {navLinks.map((link) => (
                  <li className="menu-list-item" data-shape={link.shape} key={link.to}>
                    <a href={link.to} className="nav-link" onClick={onClose}>
                      <p className="nav-link-text">{link.label}</p>
                      <span className="nav-link-hover-bg" aria-hidden="true"></span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="menu-secondary" data-menu-fade>
                <span className="menu-secondary-label">[ MAIN ]</span>
                {secondaryLinks.map((link) => (
                  <Link key={link.to} to={link.to} className="menu-secondary-link" onClick={onClose}>
                    {link.label}
                  </Link>
                ))}
                <a
                  className="menu-secondary-link"
                  href={platformHref}
                  target={PLATFORM_URL ? '_blank' : undefined}
                  rel={PLATFORM_URL ? 'noreferrer' : undefined}
                  onClick={onClose}
                >
                  Platform
                </a>
              </div>
            </div>
          </nav>
        </div>
      </section>
    </div>
  )
}
