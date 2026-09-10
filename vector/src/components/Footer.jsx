import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import Arrow from './Arrow'
import { PLATFORM_URL } from '../event'

const marqueeWords = ['Onsite CTF', 'Signal in the noise', 'NGPiTech', '10.10.2026', 'Coimbatore', 'CSE-CS × ISEA Club', 'Enter the platform']

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561 19.9312 19.9312 0 005.9932 3.0294.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057 13.1073 13.1073 0 01-1.872-.8923.077.077 0 01-.0074-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286 19.8975 19.8975 0 006.0022-3.0294.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14">
      <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14">
      <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
    </svg>
  )
}

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

        <div className="footer-info-band">
          <div className="footer-info-grid">
            <div className="footer-info-col">
              <span className="footer-info-heading">Date &amp; Time</span>
              <span className="footer-info-value">10 October 2026</span>
              <span className="footer-info-sub">09:00 — 16:30 IST</span>
            </div>
            <div className="footer-info-col">
              <span className="footer-info-heading">Location</span>
              <span className="footer-info-value">NGPiTech</span>
              <span className="footer-info-sub">Coimbatore, Tamil Nadu</span>
            </div>
            <div className="footer-info-col">
              <span className="footer-info-heading">Reach us</span>
              <span className="footer-info-links">
                <a href="https://discord.gg/6YNpUC2kJP" target="_blank" rel="noopener noreferrer"><DiscordIcon /> Discord</a>
                <a href="mailto:support@cybernexus.live"><MailIcon /> support@cybernexus.live</a>
              </span>
            </div>
            <div className="footer-info-col">
              <span className="footer-info-heading">Coordinators</span>
              <div className="footer-coordinator">
                <span className="footer-coord-label">Student</span>
                <span className="footer-coord-name">Saran Kanakavel</span>
                <a href="tel:8144225325" className="footer-coord-phone"><PhoneIcon /> 8144225325</a>
              </div>
              <div className="footer-coordinator">
                <span className="footer-coord-label">Faculty</span>
                <span className="footer-coord-name">Dr. Gokulraj S</span>
                <a href="tel:9003494844" className="footer-coord-phone"><PhoneIcon /> 9003494844</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-mark">V3CT0R<span>_</span>26</span>
          <span className="footer-copy">Organized by CSE-CS &times; ISEA Club, NGPiTech</span>
          <button className="footer-top-btn" type="button" onClick={scrollToTop} aria-label="Scroll to top">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M8 14V2M3 7l5-5 5 5" /></svg>
          </button>
        </div>
      </footer>
    </div>
  )
}
