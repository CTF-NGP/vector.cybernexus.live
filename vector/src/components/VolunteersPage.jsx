import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { volunteers, VOLUNTEER_GROUPS } from '../data/volunteers'
import VolunteerCard from './ui/VolunteerCard'
import ProfileModal from './ui/ProfileModal'

const FEATURE_CATEGORIES = new Set(['principal', 'dean', 'hod', 'faculty', 'visionary'])

export default function VolunteersPage() {
  const [selectedVolunteer, setSelectedVolunteer] = useState(null)
  const reduceMotion = useReducedMotion()

  const renderCard = (volunteer, feature) => (
    <motion.div
      key={volunteer.id}
      onClick={() => setSelectedVolunteer(volunteer)}
      className={'volunteer-card' + (feature ? ' volunteer-feature' : '')}
      initial={reduceMotion ? false : { scale: 0.95 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25 }}
    >
      <VolunteerCard volunteer={volunteer} />
    </motion.div>
  )

  return (
    <>
      <section className="volunteers section" id="volunteers">
        <div className="volunteers-heading">
          <p className="eyebrow">[ 010 / VOLUNTEER TEAM ]</p>
          <h2>Meet the<br /><em>team.</em></h2>
          <p>The heart of V3CT0R CTF 26.</p>
        </div>

        {VOLUNTEER_GROUPS.map(group => {
          const members = volunteers.filter(v => v.category === group.category)
          if (!members.length) return null
          const isFeature = FEATURE_CATEGORIES.has(group.category)
          return (
            <div className="volunteer-group" key={group.category}>
              <p className="volunteer-group-title">{group.title}</p>
              {isFeature ? (
                <div className="volunteer-feature-grid">
                  {members.map(v => renderCard(v, true))}
                </div>
              ) : (
                <div className="volunteer-grid">
                  {members.map(v => renderCard(v, false))}
                </div>
              )}
            </div>
          )
        })}
      </section>

      <AnimatePresence>
        {selectedVolunteer && (
          <ProfileModal volunteer={selectedVolunteer} onClose={() => setSelectedVolunteer(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
