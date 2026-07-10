import { useEffect, useState } from "react";
import "./Loader.css";

export default function Loader({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let value = 0;

    const interval = setInterval(() => {
      value += Math.floor(Math.random() * 8) + 2;

      if (value >= 100) {
        value = 100;
        setProgress(100);

        clearInterval(interval);

        setTimeout(() => {
          onFinish?.();
        }, 600);
      } else {
        setProgress(value);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className={`loader ${progress === 100 ? "loader-exit" : ""}`}>
      <div className="loader-content">
        <div className="loader-logo">
          <span>{"<"}</span>
          <span className="gradient">J</span>
          <span>{"/>"}</span>
        </div>

        <div className="loader-text">
          <p>Initializing Portfolio</p>
          <span>{progress}%</span>
        </div>

        <div className="loader-bar">
          <div
            className="loader-progress"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="loader-status">
          {progress < 30 && "Loading assets..."}
          {progress >= 30 &&
            progress < 60 &&
            "Compiling components..."}
          {progress >= 60 &&
            progress < 90 &&
            "Rendering experience..."}
          {progress >= 90 && "Launching..."}
        </div>
      </div>

      <div className="loader-grid"></div>

      <div className="loader-glow loader-glow-1"></div>
      <div className="loader-glow loader-glow-2"></div>
    </div>
  );
}