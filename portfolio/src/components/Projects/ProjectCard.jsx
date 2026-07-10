import { ArrowUpRight, Github } from "lucide-react";
import useProjectReveal from "../../hooks/useProjectReveal";
import GlassCard from "../UI/GlassCard";

export default function ProjectCard({ project }) {
  const reveal = useProjectReveal();

  return (
    <div
      ref={reveal}
      className="project-card"
    >
      <GlassCard>

        <div
          className="project-image"
          style={{
            background: project.gradient,
          }}
        >
          <span>{project.badge}</span>
        </div>

        <div className="project-content">

          <h3>{project.title}</h3>

          <p>{project.description}</p>

          <div className="project-tags">

            {project.tech.map((item) => (
              <span key={item}>
                {item}
              </span>
            ))}

          </div>

          <div className="project-links">

            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
            >
              <Github size={18} />
              Code
            </a>

            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
            >
              <ArrowUpRight size={18} />
              Demo
            </a>

          </div>

        </div>

      </GlassCard>
    </div>
  );
}