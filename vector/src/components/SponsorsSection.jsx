import MarqueeLogoScroller from './MarqueeLogoScroller'

const sponsors = [
  {
    logo: '/Logo PNG.png',
    href: 'https://www.drngpit.ac.in',
    name: 'Dr NGP Institute of Technology',
  },
  {
    logo: '/isea-logo.png',
    href: 'https://isea.gov.in',
    name: 'ISEA',
  },
  {
    logo: 'infoziant-logo.png',
    href: 'https://www.infoziant.com',
    name: 'Infoziant',
  },
  {
    logo: 'hebesec-cyber-security-logo.png',
    href: 'https://www.hebesec.com/',
    name: 'HebeSec',
  }
]

export default function SponsorsSection() {
  return (
    <section className="sponsors-ticker" id="sponsors">
      <div className="sponsors-ticker-inner">
        <span className="sponsors-ticker-label">Backed by</span>
        <div className="sponsors-ticker-divider" aria-hidden="true"></div>
        <MarqueeLogoScroller logos={sponsors} speed={35} />
      </div>
    </section>
  )
}
