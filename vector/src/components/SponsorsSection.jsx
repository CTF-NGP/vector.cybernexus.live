import { motion, useReducedMotion } from 'motion/react'

const sponsors = [
  {
    tier: 'Title partner',
    name: 'Acme Security',
    detail: 'Lead the signal.',
    logo: 'acme',
  },
  {
    tier: 'Network partner',
    name: 'NordVPN',
    detail: 'Power the connection.',
    logo: 'nord',
  },
  {
    tier: 'Network partner',
    name: 'TryHackMe',
    detail: 'Train the players.',
    logo: 'thm',
  },
  {
    tier: 'Community partner',
    name: 'HackTheBox',
    detail: 'Build the field.',
    logo: 'htb',
  },
  {
    tier: 'Community partner',
    name: 'OWASP',
    detail: 'Anchor the standards.',
    logo: 'owasp',
  },
  {
    tier: 'Community partner',
    name: 'CyberSec Club',
    detail: 'Grow the community.',
    logo: 'club',
  },
]

function SponsorLogo({ name }) {
  switch (name) {
    case 'acme':
      return (
        <svg viewBox="0 0 40 40" className="sponsor-logo" aria-hidden="true">
          <polygon points="20,5 35,35 5,35" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="20" y1="5" x2="20" y2="35" stroke="currentColor" strokeWidth="2" />
          <line x1="5" y1="22" x2="35" y2="22" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    case 'nord':
      return (
        <svg viewBox="0 0 40 40" className="sponsor-logo" aria-hidden="true">
          <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M20 12l8 10-8 8-8-8z" fill="currentColor" opacity="0.85" />
        </svg>
      )
    case 'thm':
      return (
        <svg viewBox="0 0 40 40" className="sponsor-logo" aria-hidden="true">
          <rect x="8" y="8" width="24" height="24" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M14 20l4 4 8-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'htb':
      return (
        <svg viewBox="0 0 40 40" className="sponsor-logo" aria-hidden="true">
          <path d="M20 4L36 20 20 36 4 20z" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M20 13l5 7-5 7-5-7z" fill="currentColor" opacity="0.85" />
        </svg>
      )
    case 'owasp':
      return (
        <svg viewBox="0 0 40 40" className="sponsor-logo" aria-hidden="true">
          <path d="M20 6l4 5h8l-6 6 2 8-8-4-8 4 2-8-6-6h8z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 40 40" className="sponsor-logo" aria-hidden="true">
          <circle cx="20" cy="20" r="13" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="20" cy="20" r="5" fill="currentColor" opacity="0.85" />
        </svg>
      )
  }
}

export default function SponsorsSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="sponsors section" id="sponsors">
      <div className="sponsors-orbit" aria-hidden="true"><i></i><i></i><i></i></div>
      <div className="sponsors-heading">
        <p className="eyebrow">[ 009 / SPONSOR NETWORK ]</p>
        <h2>Back the<br /><em>signal.</em></h2>
        <p>Support the next generation of cybersecurity talent at NGPiTech.</p>
      </div>
      <div className="sponsor-grid">
        {sponsors.map((sponsor, index) => (
          <motion.article
            className="sponsor-card"
            key={sponsor.name}
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="sponsor-tier">{sponsor.tier}</span>
            <div className="sponsor-mark"><SponsorLogo name={sponsor.logo} /></div>
            <strong>{sponsor.name}</strong>
            <p>{sponsor.detail}</p>
          </motion.article>
        ))}
      </div>
      <a className="sponsor-cta" href="mailto:vector@cybernexus.live">Become a sponsor <span>↗</span></a>
    </section>
  )
}
