import FaqChatAccordion from './ui/FaqChatAccordion'

const rules = [
  ['01', 'Compete as yourself.', 'One account per participant. Sharing accounts or flags is not allowed.'],
  ['02', 'Keep it clean.', 'No denial-of-service, brute-forcing, or attacking infrastructure beyond the intended scope.'],
  ['03', 'Ask through the right channel.', 'Support requests go through the official event channel, not the challenge boxes.'],
  ['04', 'Play fair.', 'Use of automated flag submission or collusion outside your team will result in disqualification.'],
  ['05', 'Be present.', 'An onsite event runs on you. Arrive on time, keep your team verified, and stay until wrap-up.'],
]

const questions = [
  { id: 1, question: 'Where does the competition take place?', answer: 'V3CT0R CTF 26 is an onsite event at Ancor NGPiTech, Coimbatore.', icon: '📍' },
  { id: 2, question: 'Is this site the CTF platform?', answer: 'No. This is the event website. Challenges, flag submissions, and the scoreboard are hosted separately on the CTF platform.', icon: '💻', iconPosition: 'right' },
  { id: 3, question: 'What should participants bring?', answer: 'Bring a laptop, charger, and any permitted personal equipment. Final participant guidance will be shared before the event.', icon: '🎒' },
  { id: 4, question: 'Who runs V3CT0R CTF 26?', answer: 'The Department of Computer Science and Engineering (Cyber Security) and ISEA Cybersecurity Club at NGPiTech.', icon: '🏴', iconPosition: 'right' },
]

export default function FaqSection() {
  return (
    <section className="faq section" id="faq">
      <span id="platform-access" className="platform-anchor" aria-hidden="true"></span>
      <div className="rules-block">
        <p className="eyebrow">[ 007 / RULES ]</p>
        <h2>Read the<br /><em>protocol.</em></h2>
        <div className="rules">
          {rules.map(([number, title, detail]) => (
            <div className="rule" key={number}>
              <span>{number}</span>
              <div><strong>{title}</strong><p>{detail}</p></div>
            </div>
          ))}
        </div>
      </div>
      <div className="faq-block">
        <p className="eyebrow">[ 008 / FAQ ]</p>
        <h2>Answers,<br /><em>decoded.</em></h2>
        <FaqChatAccordion data={questions} />
      </div>
    </section>
  )
}
