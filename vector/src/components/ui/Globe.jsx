import { useEffect, useRef } from 'react'

const MARKERS = [
  { lat: 14.5995, lon: 120.9842, size: 0.05 },
  { lat: 19.076, lon: 72.8777, size: 0.16 },
  { lat: 23.8103, lon: 90.4125, size: 0.08 },
  { lat: 30.0444, lon: 31.2357, size: 0.11 },
  { lat: 39.9042, lon: 116.4074, size: 0.13 },
  { lat: -23.5505, lon: -46.6333, size: 0.16 },
  { lat: 19.4326, lon: -99.1332, size: 0.16 },
  { lat: 40.7128, lon: -74.006, size: 0.16 },
  { lat: 34.6937, lon: 135.5022, size: 0.08 },
  { lat: 41.0082, lon: 28.9784, size: 0.1 },
  { lat: 11.0168, lon: 76.9558, size: 0.22 },
]

const TILT = 0.34

export function Globe({ className = '', markers = MARKERS }) {
  const canvasRef = useRef(null)
  const phiRef = useRef(0)
  const draggingRef = useRef(false)
  const dragStartRef = useRef(0)
  const phiAtDragRef = useRef(0)

  const project = (lat, lon, phi) => {
    const th = (lat * Math.PI) / 180
    const la = (lon * Math.PI) / 180
    const cosT = Math.cos(th)
    let x = cosT * Math.sin(la)
    let y = Math.sin(th)
    let z = cosT * Math.cos(la)

    const c1 = Math.cos(phi)
    const s1 = Math.sin(phi)
    const x1 = c1 * x + s1 * z
    const z1 = -s1 * x + c1 * z

    const c2 = Math.cos(TILT)
    const s2 = Math.sin(TILT)
    const y2 = c2 * y - s2 * z1
    const z2 = s2 * y + c2 * z1

    return [x1, y2, z2]
  }

  const draw = (now) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(1.5, window.devicePixelRatio || 1)
    const cssW = canvas.offsetWidth || 1
    const cssH = canvas.offsetHeight || 1
    if (canvas.width !== Math.round(cssW * dpr) || canvas.height !== Math.round(cssH * dpr)) {
      canvas.width = Math.round(cssW * dpr)
      canvas.height = Math.round(cssH * dpr)
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, cssW, cssH)

    const cx = cssW / 2
    const cy = cssH / 2
    const R = (Math.min(cssW, cssH) / 2) * 0.92
    const phi = phiRef.current

    const screenPt = ([x, y, z]) => [cx + x * R, cy - y * R, z]

    const horizon = (p0, p1) => {
      const z0 = p0[2]
      const z1 = p1[2]
      const t = z0 / (z0 - z1)
      return [
        p0[0] + (p1[0] - p0[0]) * t,
        p0[1] + (p1[1] - p0[1]) * t,
        0,
      ]
    }

    // outer glow
    const glow = ctx.createRadialGradient(cx, cy, R * 0.4, cx, cy, R * 1.35)
    glow.addColorStop(0, 'rgba(203, 147, 255, 0.16)')
    glow.addColorStop(0.55, 'rgba(120, 180, 255, 0.05)')
    glow.addColorStop(1, 'rgba(120, 180, 255, 0)')
    ctx.fillStyle = glow
    ctx.beginPath()
    ctx.arc(cx, cy, R * 1.35, 0, Math.PI * 2)
    ctx.fill()

    // sphere body
    const body = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.15, cx, cy, R)
    body.addColorStop(0, 'rgba(58, 70, 96, 0.34)')
    body.addColorStop(0.7, 'rgba(24, 28, 42, 0.4)')
    body.addColorStop(1, 'rgba(12, 13, 20, 0.5)')
    ctx.fillStyle = body
    ctx.beginPath()
    ctx.arc(cx, cy, R, 0, Math.PI * 2)
    ctx.fill()

    // rim
    ctx.strokeStyle = 'rgba(140, 180, 255, 0.22)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(cx, cy, R, 0, Math.PI * 2)
    ctx.stroke()

    // graticule
    const traceVisible = (pts, alpha) => {
      let seg = []
      const flush = () => {
        if (seg.length >= 2) {
          ctx.beginPath()
          ctx.moveTo(seg[0][0], seg[0][1])
          for (let i = 1; i < seg.length; i++) ctx.lineTo(seg[i][0], seg[i][1])
          ctx.strokeStyle = `rgba(125, 220, 255, ${alpha})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
        seg = []
      }
      for (let i = 0; i < pts.length - 1; i++) {
        const a = screenPt(pts[i])
        const b = screenPt(pts[i + 1])
        if (a[2] > 0.01 && b[2] > 0.01) {
          seg.push([a[0], a[1]])
        } else if (a[2] > 0.01 || b[2] > 0.01) {
          const h = screenPt(horizon(pts[i], pts[i + 1]))
          if (a[2] > 0.01) seg.push([a[0], a[1]], [h[0], h[1]])
          else seg.push([h[0], h[1]], [b[0], b[1]])
          flush()
        } else {
          flush()
        }
      }
      flush()
    }

    // meridians
    for (let lon = -150; lon <= 150; lon += 30) {
      const pts = []
      for (let lat = -90; lat <= 90; lat += 3) pts.push(project(lat, lon, phi))
      traceVisible(pts, 0.18)
    }

    // parallels
    for (let lat = -60; lat <= 60; lat += 30) {
      const pts = []
      for (let lon = -180; lon <= 180; lon += 2) pts.push(project(lat, lon, phi))
      traceVisible(pts, 0.18)
    }

    // markers
    for (const m of markers) {
      const [x, y, z] = project(m.lat, m.lon, phi)
      if (z < 0.05) continue
      const [sx, sy] = [cx + x * R, cy - y * R]
      const depth = 0.35 + 0.65 * z
      const pulse = 1 + 0.12 * Math.sin(now / 520)
      const r = (10 + m.size * 90) * depth * pulse

      const halo = ctx.createRadialGradient(sx, sy, 0, sx, sy, r)
      halo.addColorStop(0, 'rgba(251, 100, 21, 0.5)')
      halo.addColorStop(1, 'rgba(251, 100, 21, 0)')
      ctx.fillStyle = halo
      ctx.beginPath()
      ctx.arc(sx, sy, r, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
      ctx.beginPath()
      ctx.arc(sx, sy, 1.4, 0, Math.PI * 2)
      ctx.fill()
    }

    // specular highlight
    const hi = ctx.createRadialGradient(cx - R * 0.42, cy - R * 0.46, 0, cx - R * 0.42, cy - R * 0.46, R * 0.55)
    hi.addColorStop(0, 'rgba(220, 235, 255, 0.12)')
    hi.addColorStop(1, 'rgba(220, 235, 255, 0)')
    ctx.fillStyle = hi
    ctx.beginPath()
    ctx.arc(cx, cy, R, 0, Math.PI * 2)
    ctx.fill()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf
    let visible = false
    const loop = (now) => {
      raf = 0
      if (!visible || document.hidden) return
      if (!reducedMotion && !draggingRef.current) phiRef.current += 0.004
      draw(now)
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (raf || document.hidden || !visible) return
      if (reducedMotion) {
        draw(performance.now())
        return
      }
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      if (raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) start()
        else stop()
      },
      { threshold: 0.05 },
    )
    io.observe(canvas)

    const onVisibility = () => {
      if (document.hidden) stop()
      else start()
    }
    document.addEventListener('visibilitychange', onVisibility)

    const timer = setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = '1'
    })

    const onPointerDown = (e) => {
      draggingRef.current = true
      dragStartRef.current = e.clientX
      phiAtDragRef.current = phiRef.current
    }
    const onPointerMove = (e) => {
      if (!draggingRef.current) return
      phiRef.current = phiAtDragRef.current + (e.clientX - dragStartRef.current) * 0.008
    }
    const onPointerUp = () => {
      draggingRef.current = false
    }

    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    canvas.addEventListener('pointerleave', onPointerUp)

    return () => {
      stop()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      clearTimeout(timer)
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      canvas.removeEventListener('pointerleave', onPointerUp)
    }
  }, [])

  return (
    <div className={'globe-canvas-host ' + className}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="globe-canvas"
      />
    </div>
  )
}

export default Globe
