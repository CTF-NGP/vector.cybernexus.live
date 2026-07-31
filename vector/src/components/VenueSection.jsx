export default function VenueSection() {
  return (
    <section className="venue section" id="venue">
      <div className="ascii-block" aria-label="V3CT0R CTF venue visual">
        <pre>{`    ░░░░░░░░░░░░░░░░░░░░░
  ░░  NGPiTECH // 10.10  ░░
 ░  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ░
░  ▓  V3CT0R SIGNAL BASE ▓  ░
░   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   ░
 ░░   CSE-CS × ISEA CLUB  ░░
   ░░░░░░░░░░░░░░░░░░░░░░░`}</pre>
      </div>
      <div className="venue-copy">
        <p className="eyebrow">[ 006 / SIGNAL BASE ]</p>
        <h2>Meet at<br />NGPiTech.</h2>
        <p>Dr. N.G.P. Institute of Technology hosts V3CT0R CTF 26. Bring your laptop, charger, and your sharpest ideas.</p>
        <div className="organizer"><span>Organized by</span><strong>Department of CSE (Cyber Security)<br />&amp; ISEA Cybersecurity Club</strong></div>
      </div>
    </section>
  )
}
