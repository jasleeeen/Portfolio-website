import "./AIHud.css";
import { useEffect, useState } from "react";

const sections = [
  "Workspace",
  "About",
  "Computer Vision",
  "Deep Learning",
  "3D Reconstruction",
  "Multimodal AI",
  "Agentic AI",
  "Projects",
  "Experience",
  "Contact",
];

export default function AIHud() {
  const [module, setModule] = useState("Workspace");

  useEffect(() => {
    const update = () => {
      const scroll = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      const progress = scroll / height;

      const index = Math.min(
        sections.length - 1,
        Math.floor(progress * sections.length)
      );

      setModule(sections[index]);
    };

    update();

    window.addEventListener("scroll", update);

    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <aside className="ai-hud">

      <div className="hud-title">

        <span className="hud-dot"></span>

        <span>WORKSPACE</span>

      </div>

      <div className="hud-item">
        <small>Status</small>
        <strong>ONLINE</strong>
      </div>

      <div className="hud-item">
        <small>GPU</small>
        <strong>CUDA</strong>
      </div>

      <div className="hud-item">
        <small>Module</small>
        <strong>{module}</strong>
      </div>

      <div className="hud-item">
        <small>Mode</small>
        <strong>Inference</strong>
      </div>

    </aside>
  );
}