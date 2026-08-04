import { PLATFORM_URL } from '../event'
import Arrow from './Arrow'

export default function Footer() {
  const platformHref = PLATFORM_URL || '#platform-access'

  return (
    <footer>
      <div className="footer-mark">V3CT0R<span>_</span>26</div>
      <div><p>10 October 2026</p><p>09:00 — 16:30 IST</p></div>
      <a href={platformHref} target={PLATFORM_URL ? '_blank' : undefined} rel={PLATFORM_URL ? 'noreferrer' : undefined}>Enter platform <Arrow /></a>
    </footer>
  )
}
