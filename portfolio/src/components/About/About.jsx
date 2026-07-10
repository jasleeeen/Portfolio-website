import "./About.css";

const About = () => {
  const stats = [
    { value: "15+", label: "Projects Built" },
    { value: "10+", label: "Technologies" },
    { value: "2026", label: "Graduation" },
    { value: "AI", label: "Specialization" },
  ];

  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">About Me</span>
          <h2>Building Intelligent Solutions with AI & Full Stack Development</h2>
          <p>
            I'm a Computer Science Engineering student passionate about
            Artificial Intelligence, Computer Vision, Machine Learning, and
            modern web development. I enjoy building applications that solve
            real-world problems while creating clean, interactive user
            experiences.
          </p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <h3>Who I Am</h3>

            <p>
              My work spans across AI, Deep Learning, FastAPI, React, and cloud
              technologies. From training computer vision models to developing
              complete full-stack applications, I love transforming ideas into
              practical software.
            </p>

            <p>
              I have experience working on projects involving object detection,
              retrieval-augmented generation (RAG), multimodal AI, 3D
              reconstruction, and modern web applications.
            </p>

            <div className="highlights">
              <div className="highlight">
                <span>✓</span>
                <p>Artificial Intelligence & Machine Learning</p>
              </div>

              <div className="highlight">
                <span>✓</span>
                <p>Computer Vision & Deep Learning</p>
              </div>

              <div className="highlight">
                <span>✓</span>
                <p>FastAPI, React & Full Stack Development</p>
              </div>

              <div className="highlight">
                <span>✓</span>
                <p>Cloud Deployment & API Development</p>
              </div>
            </div>
          </div>

          <div className="about-stats">
            {stats.map((item) => (
              <div key={item.label} className="stat-card">
                <h3>{item.value}</h3>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;