import { motion, useReducedMotion } from 'motion/react'

const pathData = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  d: `M-${330 - index * 14} -${120 + index * 16}C-${330 - index * 14} -${120 + index * 16} -${230 - index * 14} ${180 - index * 14} ${120 - index * 14} ${300 - index * 14}C${470 - index * 14} ${420 - index * 14} ${560 - index * 14} ${730 - index * 14} ${560 - index * 14} ${730 - index * 14}`,
  width: 0.6 + index * 0.05,
  opacity: 0.1 + index * 0.018,
}))

export default function FloatingPaths({ className = '' }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <div className={`floating-paths ${className}`} aria-hidden="true">
        <svg viewBox="0 0 696 316" fill="none" preserveAspectRatio="none">
          {pathData.map((path) => (
            <path
              key={path.id}
              d={path.d}
              stroke="currentColor"
              strokeWidth={path.width}
              strokeOpacity={path.opacity}
            />
          ))}
        </svg>
      </div>
    )
  }

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
            initial={{ pathLength: 0.25, opacity: 0.3 }}
            animate={{
              pathLength: [0.25, 1, 1, 0.25],
              opacity: [0.3, 0.7, 0.7, 0.3],
            }}
            transition={{ duration: 14 + path.id * 0.3, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </svg>
    </div>
  )
}
