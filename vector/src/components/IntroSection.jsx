const stats = [
  ['10', <>October<br />2026</>],
  ['7.5', <>Hours of<br />competition</>],
  ['01', <>Onsite<br />location</>],
  ['∞', <>Paths to<br />a flag</>],
]

export default function IntroSection() {
  return (
    <section className="intro section" id="about">
      <p className="intro-index">[ 001 / EVENT SIGNAL ]</p>
      <div className="intro-content">
        <h2>A full day of<br /><em>careful intrusion.</em></h2>
        <p>V3CT0R CTF 26 brings students together for an onsite cybersecurity competition built around curiosity, collaboration, and technical instinct.</p>
      </div>
      <div className="stats-grid">
        {stats.map(([value, label]) => <div key={value}><strong>{value}</strong><span>{label}</span></div>)}
      </div>
    </section>
  )
}
