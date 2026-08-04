import { motion, useReducedMotion } from 'motion/react'

const SOCIAL_ICONS = {
  github: {
    label: 'GitHub',
    svg: (
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    ),
  },
  instagram: {
    label: 'Instagram',
    svg: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
  },
  linkedin: {
    label: 'LinkedIn',
    svg: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
  website: {
    label: 'Website',
    svg: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </>
    ),
  },
}

export default function ProfileModal({ volunteer, onClose }) {
  const { name, role, avatar, bio = '', social = {} } = volunteer;
  const reduceMotion = useReducedMotion();

  const socialLinks = Object.entries(social)
    .map(([key, href]) => href ? { key, href, ...SOCIAL_ICONS[key] } : null)
    .filter((link) => link && link.label)

  return (
    <div className="profile-modal-backdrop" onClick={onClose}>
      <motion.div
        className="profile-modal-content"
        onClick={(e) => e.stopPropagation()}
        initial={reduceMotion ? false : { scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button className="profile-modal-close" onClick={onClose}>
          ×
        </button>
        <div className="profile-modal-body">
          <div className="profile-modal-image">
            <img src={avatar} alt={name} />
          </div>
          <div className="profile-modal-info">
            <h2>{name}</h2>
            <p className="profile-role">{role}</p>
            {bio && <p className="profile-bio">{bio}</p>}
            {socialLinks.length > 0 && (
              <div className="profile-social">
                {socialLinks.map((link) => (
                  <a key={link.key} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      {link.svg}
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
