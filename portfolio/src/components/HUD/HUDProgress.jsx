import "./HUDProgress.css";
import { useEffect, useState } from "react";

export default function HUDProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max =
        document.documentElement.scrollHeight -
        window.innerHeight;

      setProgress((window.scrollY / max) * 100);
    };

    update();

    window.addEventListener("scroll", update);

    return () =>
      window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="hud-progress">
      <div
        className="hud-progress-bar"
        style={{ height: `${progress}%` }}
      />
    </div>
  );
}