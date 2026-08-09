import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

const GAP = 36
const PULL = 160
const PULL_FORCE = 0.4

export default function KineticGrid({ className = '' }) {
  const canvasRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reduceMotion) return

    const ctx = canvas.getContext('2d')
    let width = 0
    let height = 0
    let rafId = 0
    let running = false
    let visible = false
    let needsDraw = true
    let points = []
    const pointer = { x: -9999, y: -9999 }

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      needsDraw = true
      build()
    }

    const build = () => {
      points = []
      const cols = Math.floor(width / GAP)
      const rows = Math.floor(height / GAP)
      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          const x = (c + 0.5) * GAP
          const y = (r + 0.5) * GAP
          points.push({ ox: x, oy: y, x, y })
        }
      }
    }

    const tick = () => {
      rafId = 0
      if (!visible) {
        running = false
        return
      }
      let dirty = false
      for (const p of points) {
        const dx = p.ox - pointer.x
        const dy = p.oy - pointer.y
        const dist = Math.hypot(dx, dy)
        if (dist < PULL) {
          const t = (1 - dist / PULL) * PULL_FORCE
          p.x = p.ox + dx * t
          p.y = p.oy + dy * t
          if (p.x !== p.ox || p.y !== p.oy) dirty = true
        } else {
          p.x = p.ox
          p.y = p.oy
        }
      }
      if (dirty || pointer.x > -9999 || needsDraw) {
        needsDraw = false
        ctx.clearRect(0, 0, width, height)
        for (const p of points) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(203, 147, 255, 0.55)'
          ctx.fill()
        }
      }
      rafId = requestAnimationFrame(tick)
    }

    const start = () => {
      if (!running) {
        running = true
        rafId = requestAnimationFrame(tick)
      }
    }

    const stop = () => {
      running = false
      cancelAnimationFrame(rafId)
      rafId = 0
    }

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
    }

    const onPointerLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) start()
        else stop()
      },
      { threshold: 0 },
    )

    resize()
    observer.observe(canvas.parentElement)
    window.addEventListener('resize', resize)
    canvas.parentElement.addEventListener('pointermove', onPointerMove)
    canvas.parentElement.addEventListener('pointerleave', onPointerLeave)

    return () => {
      stop()
      observer.disconnect()
      window.removeEventListener('resize', resize)
      canvas.parentElement.removeEventListener('pointermove', onPointerMove)
      canvas.parentElement.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [reduceMotion])

  return <canvas ref={canvasRef} className={`kinetic-grid ${className}`} aria-hidden="true" />
}
