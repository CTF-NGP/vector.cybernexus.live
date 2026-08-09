import { tracks } from '../event'
import Arrow from './Arrow'

export default function TracksSection() {
  return (
    <section className="tracks section" id="tracks">
      <div className="tracks-header"><p className="eyebrow">[ 004 / CHALLENGE MAP ]</p><h2>Choose a line.<br />Break the system.</h2></div>
      <div className="track-grid">
        {tracks.map(([number, title, description], index) => (
          <article className={`track track-${index + 1}`} key={title}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div><Arrow className="track-arrow" dir="ne" /></article>
        ))}
      </div>
    </section>
  )
}
