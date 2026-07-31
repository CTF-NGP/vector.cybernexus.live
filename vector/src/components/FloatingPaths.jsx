import { motion, useReducedMotion } from 'motion/react'

const pathData = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  d: `M-${330 - index * 8} -${120 + index * 9}C-${330 - index * 8} -${120 + index * 9} -${230 - index * 8} ${180 - index * 8} ${120 - index * 8} ${300 - index * 8}C${470 - index * 8} ${420 - index * 8} ${560 - index * 8} ${730 - index * 8} ${560 - index * 8} ${730 - index * 8}`,
  width: 0.55 + index * 0.035,
  opacity: 0.08 + index * 0.012,
}))

export default function FloatingPaths({ className = '' }) {
  const reduceMotion = useReducedMotion()

  return (
    <div className={`floating-paths ${className}`} aria-hidden="true">
      <svg viewBox="0 0 696 316" fill="none" preserveAspectRatio="none">
        {pathData.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={path.opacity}
            initial={{ pathLength: 0.25, opacity: 0.35 }}
            animate={reduceMotion ? undefined : { pathLength: 1, opacity: [0.2, 0.65, 0.2], pathOffset: [0, 1, 0] }}
            transition={{ duration: 18 + path.id * 0.35, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </svg>
    </div>
  )
}
