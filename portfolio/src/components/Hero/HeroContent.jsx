import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
} from "lucide-react";

export default function HeroContent() {
  return (
    <div className="hero-content hero-glass">

      <span className="hero-status">
        ● AI Workspace Online
      </span>

      <p className="hero-small">
        AI / ML Engineer
      </p>

      <h1>
        Jasleen
        <br />
        Kaur Sohal
      </h1>

      <p className="hero-description">
        Building intelligent systems that
        <span> perceive</span>,
        <span> reconstruct</span> and
        <span> reason.</span>

        <br /><br />

        Specializing in Computer Vision,
        Deep Learning,
        3D Reconstruction,
        Multimodal AI,
        and the next generation of Agentic AI.
      </p>

      <div className="hero-buttons">

        <a
          className="btn"
          href="#projects"
        >
          View Projects
          <ArrowRight size={18}/>
        </a>

        <a
          className="btn btn-outline"
          href="/resume.pdf"
          target="_blank"
        >
          Resume
          <Download size={18}/>
        </a>

      </div>

      <div className="hero-social">

        <a
          href="https://github.com/jasleeeen"
          target="_blank"
          rel="noreferrer"
        >
          <Github size={20}/>
        </a>

        <a
          href="https://linkedin.com/in/jasleen-kaur-sohal-286117271"
          target="_blank"
          rel="noreferrer"
        >
          <Linkedin size={20}/>
        </a>

      </div>

      <div className="hero-scroll">

        <span></span>

        <p>Scroll to enter workspace</p>

      </div>

    </div>
  );
}