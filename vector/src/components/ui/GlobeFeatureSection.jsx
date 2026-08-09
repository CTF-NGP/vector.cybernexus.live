import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'
import Arrow from '../Arrow'

const GLOBE_CONFIG = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [203 / 255, 147 / 255, 255 / 255],
  glowColor: [0.55, 0.4, 0.85],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
    { location: [11.0168, 76.9558], size: 0.14 },
  ],
}

export function Globe({ className = '', config = GLOBE_CONFIG }) {
  const canvasRef = useRef(null)
  const pointerInteracting = useRef(null)
  const pointerInteractionMovement = useRef(0)
  const phiRef = useRef(0)
  const sizeRef = useRef(0)

  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? 'grabbing' : 'grab'
    }
  }

  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const onRender = (state) => {
      if (!pointerInteracting.current && !reducedMotion) phiRef.current += 0.005
      state.phi = phiRef.current + pointerInteractionMovement.current / 200
      state.width = sizeRef.current * 2
      state.height = sizeRef.current * 2
    }

    const onResize = () => {
      if (canvasRef.current) {
        sizeRef.current = canvasRef.current.offsetWidth
      }
    }

    window.addEventListener('resize', onResize)
    onResize()

    const globe = createGlobe(canvas, {
      ...config,
      width: sizeRef.current * 2,
      height: sizeRef.current * 2,
      onRender,
    })

    const timer = setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = '1'
    })

    return () => {
      window.removeEventListener('resize', onResize)
      clearTimeout(timer)
      globe.destroy()
    }
  }, [config])

  return (
    <div className={'globe-canvas-host ' + className}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="globe-canvas"
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current,
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
      />
    </div>
  )
}

export default function GlobeFeatureSection() {
  return (
    <section className="globe-feature section" id="signal">
      <div className="globe-feature-inner">
        <div className="globe-copy">
          <p className="eyebrow">[ GLOBAL SIGNAL ]</p>
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
