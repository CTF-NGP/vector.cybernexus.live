import KineticGrid from './KineticGrid'

const steps = [
  ['01', 'Check in', 'Arrive at Dr. N.G.P. Institute of Technology and verify your team.'],
  ['02', 'Connect', 'Receive access details for the separately hosted CTF platform.'],
  ['03', 'Investigate', 'Navigate challenges, collaborate with your team, and capture flags.'],
  ['04', 'Close out', 'Final submissions lock at 16:00; results follow at 16:15.'],
]

export default function MissionSection() {
  return (
    <section className="mission section" id="mission">
      <KineticGrid />
      <div className="mission-heading">
        <p className="eyebrow">[ 002 / EVENT PROTOCOL ]</p>
        <h2>Follow the vector.</h2>
      </div>
      <ol className="protocol">
        {steps.map(([number, title, description]) => (
          <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></li>
        ))}
      </ol>
    </section>
  )
}