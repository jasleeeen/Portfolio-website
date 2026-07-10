import "./Projects.css";
import { useState } from "react";

import projects from "../../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectFilter from "./ProjectFilter";

export default function Projects() {

  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) =>
          p.tech.includes(active)
        );

  return (
    <section
      id="projects"
      className="projects-section"
    >
      <div className="projects-header">

        <span>BUILD</span>

        <h2>Projects</h2>

        <p>
          Intelligent systems engineered
          with modern AI technologies.
        </p>

      </div>

      <ProjectFilter
        active={active}
        setActive={setActive}
      />

      <div className="projects-grid">

        {filtered.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}

      </div>

    </section>
  );
}