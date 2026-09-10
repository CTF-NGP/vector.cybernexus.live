export default function MarqueeLogoScroller({ logos = [], speed = 25 }) {
  const track = [...logos, ...logos, ...logos]

  return (
    <div className="ticker-scroller" aria-label="Sponsor logos">
      <div className="ticker-track" style={{ '--ticker-duration': `${speed}s` }}>
        {track.map((logo, index) => (
          <a
            className="ticker-logo"
            key={`${logo.name ?? ''}-${index}`}
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
