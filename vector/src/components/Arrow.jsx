const ROT = {
  right: undefined,
  left: 'rotate(180 8 8)',
  up: 'rotate(-90 8 8)',
  down: 'rotate(90 8 8)',
  ne: 'rotate(-45 8 8)',
}

export default function Arrow({ dir = 'right', className = '' }) {
  const transform = ROT[dir] || undefined
  return (
    <svg viewBox="0 0 16 16" className={className} style={transform ? { transform } : undefined} aria-hidden="true">
      <path d="M2 8h11M9 3l5 5-5 5" />
    </svg>
  )
}
