import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import Arrow from './Arrow'
import { PLATFORM_URL } from '../event'

const marqueeWords = ['Onsite CTF', 'Signal in the noise', 'NGPiTech', '10.10.2026', 'Coimbatore', 'CSE-CS × ISEA Club', 'Enter the platform']

export default function Footer() {
  const wrapper = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: wrapper,
    offset: ['start end', 'end end'],
  })

  const giantY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : ['14vh', '0vh'])
  const giantScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.85, 1])
  const giantOpacity = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0, 1])
  const bodyY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [56, 0])
  const bodyOpacity = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0, 1])
  const stripOpacity = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0, 1])

  const platformHref = PLATFORM_URL || '#platform-access'

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })

  return (
    <div
      ref={wrapper}
      className="cinematic-footer"
      style={{ clipPath: 'polygon(0 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      <footer className="cinematic-footer-panel">
        <div className="footer-aurora" aria-hidden="true" />
        <div className="footer-grid" aria-hidden="true" />

        <motion.div className="footer-giant" aria-hidden="true" style={{ x: '-50%', y: giantY, scale: giantScale, opacity: giantOpacity }}>
          V3CT0R_26
        </motion.div>

        <motion.div className="footer-marquee" style={{ opacity: stripOpacity }} aria-hidden="true">
          <div className="footer-marquee-track">
            {[...marqueeWords, ...marqueeWords].map((word, i) => (
              <span key={i}><b>✦</b> {word}</span>
            ))}
          </div>
        </motion.div>

        <motion.div className="footer-body" style={{ y: bodyY, opacity: bodyOpacity }}>
          <p className="eyebrow">[ 010 / SIGN-OFF ]</p>
          <h2>End of<br /><em>transmission.</em></h2>
          <div className="footer-actions">
            <a className="button primary" href={platformHref} target={PLATFORM_URL ? '_blank' : undefined} rel={PLATFORM_URL ? 'noreferrer' : undefined}>Enter platform <Arrow /></a>
            <a className="button ghost" href="#top">Return to top <Arrow dir="up" /></a>
          </div>
        </motion.div>

        <div className="footer-bottom">
          <span className="footer-date">10 October 2026 · 09:00 — 16:30 IST</span>
          <span className="footer-mark">V3CT0R<span>_</span>26</span>
          <button className="footer-top-btn" type="button" onClick={scrollToTop} aria-label="Scroll to top">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M8 14V2M3 7l5-5 5 5" /></svg>
          </button>
        </div>
      </footer>
    </div>
  )
}
