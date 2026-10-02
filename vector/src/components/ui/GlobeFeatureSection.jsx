import { Suspense, lazy } from 'react'
import Arrow from '../Arrow'

// WebGL canvas below the fold — load it only when this section renders.
const Globe = lazy(() => import('./Globe').then((m) => ({ default: m.Globe })))

export default function GlobeFeatureSection() {
  return (
    <section className="globe-feature section" id="signal">
      <div className="globe-feature-inner">
        <div className="globe-copy">
          <p className="eyebrow">[ 003 / GLOBAL SIGNAL ]</p>
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
          <Suspense fallback={null}>
            <Globe />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
