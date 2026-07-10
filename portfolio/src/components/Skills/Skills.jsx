import "./Skills.css";

const skills = [
  "Python",
  "PyTorch",
  "TensorFlow",
  "OpenCV",
  "FastAPI",
  "Scikit-learn",
  "SQLAlchemy",
  "LangGraph",
  "RAG",
  "Docker",
  "Git",
  "React",
  "MongoDB",
  "MySQL",
  "Computer Vision",
  "Deep Learning",
  "Multimodal AI",
  "3D Reconstruction",
];

export default function Skills() {
  return (
    <section className="skills-section">

      <div className="skills-header">

        <span>TECH STACK</span>

        <h2>Skills & Technologies</h2>

      </div>

      <div className="skills-grid">

        {skills.map((skill) => (
          <div
            key={skill}
            className="skill-chip"
          >
            {skill}
          </div>
        ))}

      </div>

    </section>
  );
}