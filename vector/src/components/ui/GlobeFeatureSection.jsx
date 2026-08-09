import Arrow from '../Arrow'
import { Globe } from './Globe'

export default function GlobeFeatureSection() {
  return (
    <section className="globe-feature section" id="signal">
      <div className="globe-feature-inner">
        <div className="globe-copy">
          <p className="eyebrow">[ 002.5 / GLOBAL SIGNAL ]</p>
          <h2>
            One noise.<br />
            <em>Every horizon.</em>
          </h2>
          <p>
            V3CT0R CTF 26 runs onsite at NGPiTech — but the mindset it trains
            is global. Track the signal, bend the map, and see where one good
            hunch can take you.
          </p>
          <a className="button primary" href="#tracks">
            Explore the tracks <Arrow />
          </a>
        </div>
        <div className="globe-stage">
          <Globe />
        </div>
      </div>
    </section>
  )
}
