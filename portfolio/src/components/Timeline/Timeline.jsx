import "./Timeline.css";
import experience from "../../data/experience";

export default function Timeline() {
  return (
    <section
      id="experience"
      className="timeline-section"
    >
      <div className="timeline-header">

        <span>JOURNEY</span>

        <h2>Experience</h2>

        <p>
          Every opportunity added another layer to my understanding
          of software engineering and Artificial Intelligence.
        </p>

      </div>

      <div className="timeline">

        {experience.map((item, index) => (

          <div
            key={index}
            className="timeline-item"
          >

            <div className="timeline-dot"></div>

            <div className="timeline-card">

              <span className="timeline-year">
                {item.period}
              </span>

              <h3>{item.title}</h3>

              <h4>{item.company}</h4>

              <p>{item.description}</p>

            </div>

          </div>

        ))}

      </div>
    </section>
  );
}