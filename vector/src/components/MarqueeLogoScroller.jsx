export default function MarqueeLogoScroller({ logos = [], speed = 25 }) {
  const track = [...logos, ...logos]

  return (
    <div className="marquee-scroller" aria-label="Sponsor logos">
      <div className="marquee-track" style={{ '--marquee-duration': `${speed}s` }}>
        {track.map((logo, index) => (
          <a
            className={'marquee-logo' + (logo.invert ? ' marquee-logo--invert' : '')}
            key={`${logo.name}-${index}`}
            href={logo.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={logo.name}
          >
            <img src={logo.logo} alt={`${logo.name} logo`} loading="lazy" />
          </a>
        ))}
      </div>
    </div>
  )
}
