import { schedule } from '../event'

export default function ScheduleSection() {
  return (
    <section className="schedule section" id="schedule">
      <div className="schedule-title"><p className="eyebrow">[ 005 / 10 OCTOBER ]</p><h2>One clean<br />run of play.</h2></div>
      <div className="timeline">
        {schedule.map(([time, title, detail]) => (
          <div className="timeline-row" key={time}><time>{time}</time><span className="timeline-node"></span><div><h3>{title}</h3><p>{detail}</p></div></div>
        ))}
      </div>
    </section>
  )
}
