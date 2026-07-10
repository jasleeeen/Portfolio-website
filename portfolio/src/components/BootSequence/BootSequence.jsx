import { useEffect, useState } from "react";
import "./BootSequence.css";

const steps = [
  "Initializing Workspace...",
  "Loading Neural Engine...",
  "Connecting AI Modules...",
  "Loading Computer Vision...",
  "Loading Deep Learning...",
  "Building Point Cloud...",
  "Workspace Ready",
];

export default function BootSequence({ onFinish }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= steps.length - 1) {
      const t = setTimeout(() => {
        onFinish?.();
      }, 900);

      return () => clearTimeout(t);
    }

    const timer = setTimeout(() => {
      setIndex(index + 1);
    }, 650);

    return () => clearTimeout(timer);
  }, [index, onFinish]);

  return (
    <div className="boot-screen">

      <div className="boot-window">

        <h2>AI WORKSPACE</h2>

        <div className="boot-terminal">

          {steps.slice(0, index + 1).map((step) => (
            <p key={step}>
              ✓ {step}
            </p>
          ))}

          <span className="cursor">▋</span>

        </div>

      </div>

    </div>
  );
}