import { motion } from 'motion/react'

export default function VolunteerCard({ volunteer, className }) {
  const { name, role, avatar } = volunteer;

  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="volunteer-card-inner"
      >
        <div className="volunteer-card-photo">
          <img src={avatar} alt={name} width={400} height={400} loading="lazy" draggable={false} />
          <span className="volunteer-card-index" aria-hidden="true">+</span>
        </div>
        <div className="volunteer-card-meta">
          <span className="volunteer-card-name">{name}</span>
          <span className="volunteer-card-role">{role}</span>
        </div>
      </motion.div>
    </div>
  );
}
