import "./Achievements.css";

const achievements = [
  {
    number: "15+",
    title: "Projects",
  },
  {
    number: "25+",
    title: "Technologies",
  },
  {
    number: "4+",
    title: "Years Coding",
  },
  {
    number: "100%",
    title: "Passion",
  },
];

export default function Achievements() {
  return (
    <section className="achievements">

      <div className="achievement-header">

        <span>HIGHLIGHTS</span>

        <h2>Achievements</h2>

      </div>

      <div className="achievement-grid">

        {achievements.map((item) => (

          <div
            key={item.title}
            className="achievement-card"
          >

            <h3>{item.number}</h3>

            <span>{item.title}</span>

          </div>

        ))}

      </div>

    </section>
  );
}