import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { volunteers } from '../data/volunteers'
import VolunteerCard from './ui/VolunteerCard'
import ProfileModal from './ui/ProfileModal'

export default function VolunteersPage() {
  const [selectedVolunteer, setSelectedVolunteer] = useState(null)
  const reduceMotion = useReducedMotion()

  return (
    <>
      <section className="volunteers section" id="volunteers">
        <div className="volunteers-heading">
          <p className="eyebrow">[ 010 / VOLUNTEER TEAM ]</p>
          <h2>Meet the<br /><em>team.</em></h2>
          <p>The heart of V3CT0R CTF 26.</p>
        </div>
        <div className="volunteer-grid">
          {volunteers.map(volunteer => (
            <motion.div
              key={volunteer.id}
              onClick={() => setSelectedVolunteer(volunteer)}
              className="volunteer-card"
              initial={reduceMotion ? false : { scale: 0.95 }}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <VolunteerCard volunteer={volunteer} />
            </motion.div>
          ))}
        </div>
      </section>

      {selectedVolunteer && (
        <ProfileModal volunteer={selectedVolunteer} onClose={() => setSelectedVolunteer(null)} />
      )}
    </>
  )
}