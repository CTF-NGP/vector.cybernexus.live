import MarqueeLogoScroller from './MarqueeLogoScroller'

const sponsors = [
  {
    logo: '/2ngp-itech-logo.png',
    href: 'https://drngpit.ac.in',
  },
  {
   logo: '/isea-logo.png',
    href: 'https://isea.gov.in',
  },
  {
    logo: 'infoziant-logo.png',
    invert: true,
    href: 'https://www.infoziant.com',
  }
]

export default function SponsorsSection() {
  return (
    <section className="sponsors section" id="sponsors">
      <div className="sponsors-orbit" aria-hidden="true"><i></i><i></i><i></i></div>
      <div className="sponsors-heading">
        <p className="eyebrow">[ 009 / SPONSOR NETWORK ]</p>
        <h2>Back the<br /><em>signal.</em></h2>
        <p>Support the next generation of cybersecurity talent at NGPiTech.</p>
      </div>
      <MarqueeLogoScroller logos={sponsors} />
      <a className="sponsor-cta" href="mailto:vector@cybernexus.live">Become a sponsor <span>↗</span></a>
    </section>
  )
}
