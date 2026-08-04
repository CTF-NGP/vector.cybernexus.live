import { motion, useReducedMotion } from 'motion/react'

const sponsors = [
  {
    tier: 'Community partner',
    name: 'ISEA',
    detail: 'Information Security Education & Awareness (ISEA) Project Phase-III,\n Ministry of Electronics & Information Technology (MeitY),\n Government of India (GoI)',
    logo: 'https://isea.app/assets/img/Logos/isea.png',
    href: 'https://isea.gov.in',
  }
]

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
          <a
            className="sponsor-card-link"
            href={sponsor.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${sponsor.name} — ${sponsor.tier}`}
            key={sponsor.name}
          >
            <motion.article
              className="sponsor-card"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="sponsor-tier">{sponsor.tier}</span>
              <div className="sponsor-mark">
                <img className="sponsor-logo" src={sponsor.logo} alt={`${sponsor.name} logo`} loading="lazy" />
              </div>
              <strong>{sponsor.name}</strong>
              <p>{sponsor.detail}</p>
            </motion.article>
          </a>
        ))}
      </div>
      <a className="sponsor-cta" href="mailto:coordinator@cybernexus.live">Become a sponsor <span>↗</span></a>
    </section>
  )
}
