import { memo, useEffect, useState } from 'react'
import { animate, motion, useMotionValue } from 'motion/react'
import useMeasure from 'react-use-measure'

const InfiniteSlider = memo(function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = 'horizontal',
  reverse = false,
  className = '',
}) {
  const [currentDuration, setCurrentDuration] = useState(duration)
  const [ref, { width, height }] = useMeasure()
  const translation = useMotionValue(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [key, setKey] = useState(0)

  useEffect(() => {
    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const size = direction === 'horizontal' ? width : height
    const contentSize = size + gap
    const from = reverse ? -contentSize / 2 : 0
    const to = reverse ? 0 : -contentSize / 2

    if (reduced) {
      translation.set(to)
      return undefined
    }

    let controls

    if (isTransitioning) {
      controls = animate(translation, [translation.get(), to], {
        ease: 'linear',
        duration:
          currentDuration *
          Math.abs((translation.get() - to) / contentSize),
        onComplete: () => {
          setIsTransitioning(false)
          setKey((prev) => prev + 1)
        },
      })
    } else {
      controls = animate(translation, [from, to], {
        ease: 'linear',
        duration: currentDuration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
        onRepeat: () => translation.set(from),
      })
    }

    return controls?.stop
  }, [
    key,
    translation,
    currentDuration,
    width,
    height,
    gap,
    isTransitioning,
    direction,
    reverse,
  ])

  const hoverProps = durationOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true)
          setCurrentDuration(durationOnHover)
        },
        onHoverEnd: () => {
          setIsTransitioning(true)
          setCurrentDuration(duration)
        },
      }
    : {}

  return (
    <div className={className}>
      <motion.div
        ref={ref}
        className="logo-marquee-track"
        style={{
          ...(direction === 'horizontal'
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  )
})

const LogoImage = memo(function LogoImage({ logo }) {
  const img = (
    <img
      alt={logo.alt}
      src={logo.src}
      loading="lazy"
      className="logo-marquee-img"
    />
  )
  if (!logo.href) return img
  return (
    <a
      className="logo-marquee-link"
      href={logo.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={logo.alt}
    >
      {img}
    </a>
  )
})

export default function LogoMarquee({ logos = [], className = '' }) {
  return (
    <div className={'logo-marquee ' + className} aria-label="Sponsor logos">
      <InfiniteSlider gap={42} reverse duration={80} durationOnHover={25}>
        {[...logos, ...logos].map((logo, i) => (
          <LogoImage key={`${logo.alt}-${i}`} logo={logo} />
        ))}
      </InfiniteSlider>
    </div>
  )
}
