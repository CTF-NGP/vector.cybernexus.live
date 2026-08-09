import LogoMarquee from './ui/LogoMarquee'

const sponsors = [
  {
    tier: 'Venue partner',
    name: 'NGPiTech',
    detail: 'Dr. N.G.P. Institute of Technology, Coimbatore',
    logo: '/2ngp-itech-logo.png',
    href: 'https://drngpit.ac.in',
  },
  {
    tier: 'Community partner',
    name: 'ISEA',
    detail: 'Information Security Education & Awareness (ISEA) Project Phase-III,\n Ministry of Electronics & Information Technology (MeitY),\n Government of India (GoI)',
    logo: '/isea-logo.png',
    href: 'https://isea.gov.in',
  }
]

export default function SponsorsSection() {
  const marqueeLogos = sponsors.map((s) => ({
    src: s.logo,
    alt: s.name,
    href: s.href,
  }))
  return (
    <section className="sponsors section" id="sponsors">
      <div className="sponsors-orbit" aria-hidden="true"><i></i><i></i><i></i></div>
      <div className="sponsors-heading">
        <p className="eyebrow">[ 009 / SPONSOR NETWORK ]</p>
        <h2>Back the<br /><em>signal.</em></h2>
        <p>Support the next generation of cybersecurity talent at NGPiTech.</p>
      </div>
      <LogoMarquee logos={marqueeLogos} />
      <a className="sponsor-cta" href="mailto:vector@cybernexus.live">Become a sponsor <span>↗</span></a>
    </section>
  )
}
