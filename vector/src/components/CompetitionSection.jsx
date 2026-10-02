import { motion, useReducedMotion } from 'motion/react'
import Arrow from './Arrow'
import { PLATFORM_URL } from '../event'

const facts = [
  ['Format', 'Onsite capture-the-flag. Final challenge structure is announced closer to the event.'],
  ['Teams', 'Teams of 1–4 members per team. Solo participation allowed. Teams are verified at check-in.'],
  ['Entry — ₹300 / person', 'Pay per person. Lunch and refreshments included. No GST applicable for students.'],
  ['Equipment', 'Bring a laptop, charger, personal hotspot devices, and any permitted personal gear. Food is provided — just bring your gear.'],
]

const channels = [
  {
    label: 'Event website',
    title: 'You are here.',
    points: ['Event details and schedule', 'Rules, FAQ, and venue info', 'Registration guidance'],
    active: true,
  },
  {
    label: 'CTF platform',
    title: 'The flags live there.',
    points: ['Challenge access', 'Flag submissions', 'Scoreboard', 'Team size 1–4 • ₹300 / person'],
    active: false,
  },
]

export default function CompetitionSection() {
  const reduceMotion = useReducedMotion()
  const platformHref = PLATFORM_URL || '#platform-access'

  return (
    <section className="competition section" id="competition">
      <div className="competition-heading">
        <p className="eyebrow">[ 003 / THE COMPETITION ]</p>
        <h2>One signal.<br /><em>Many ways in.</em></h2>
      </div>
      <div className="fact-grid">
        {facts.map(([title, detail], index) => (
          <motion.div
            className="fact"
            key={title}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{title}</h3>
            <p>{detail}</p>
          </motion.div>
        ))}
      </div>
      <div className="channel-split">
        {channels.map((channel) => (
          <div className={channel.active ? 'channel channel-active' : 'channel'} key={channel.label}>
            <p className="eyebrow">{channel.label}</p>
            <h3>{channel.title}</h3>
            <ul>
              {channel.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
            {!channel.active && (
              <a className="channel-link" href={platformHref} target={PLATFORM_URL ? '_blank' : undefined} rel={PLATFORM_URL ? 'noreferrer' : undefined}>
                Register Now <Arrow />
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
