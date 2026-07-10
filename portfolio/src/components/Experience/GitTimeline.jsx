import "./GitTimeline.css";

const timeline = [
  {
    year: "2022",
    title: "Started CSE",
    subtitle: "Bachelor of Engineering",
  },
  {
    year: "2024",
    title: "Auribises",
    subtitle: "Software Developer Intern",
  },
  {
    year: "2026",
    title: "Capgemini",
    subtitle: ".NET & Azure Training",
  },
  {
    year: "Present",
    title: "AI Engineer",
    subtitle: "Building Intelligent Systems",
  },
];

export default function GitTimeline() {
  return (
    <section className="git-timeline">

      <div className="git-header">

        <span>CAREER PATH</span>

        <h2>Journey Timeline</h2>

      </div>

      <div className="git-line">

        {timeline.map((item) => (

          <div
            key={item.title}
            className="git-node"
          >

            <div className="git-dot"></div>

            <span>{item.year}</span>

            <h3>{item.title}</h3>

            <p>{item.subtitle}</p>

          </div>

        ))}

      </div>

    </section>
  );
}