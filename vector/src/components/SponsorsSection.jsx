import MarqueeLogoScroller from './MarqueeLogoScroller'

const sponsors = [
  {
    tier: 'Community partner',
    name: 'ISEA',
    detail: 'Information Security Education & Awareness (ISEA) Project Phase-III,\n Ministry of Electronics & Information Technology (MeitY),\n Government of India (GoI)',
    logo: 'https://www.google.com/s2/favicons?domain=isea.gov.in&sz=128',
    href: 'https://isea.gov.in',
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
