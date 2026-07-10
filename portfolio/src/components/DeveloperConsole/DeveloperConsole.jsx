import { useEffect, useState } from "react";
import "./DeveloperConsole.css";
import "./ConsoleInput.css";
import ConsoleInput from "./ConsoleInput";

export default function DeveloperConsole() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (
        e.ctrlKey &&
        e.shiftKey &&
        e.key.toLowerCase() === "a"
      ) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };

    window.addEventListener("keydown", handler);

    return () =>
      window.removeEventListener("keydown", handler);
  }, []);

  if (!open) return null;

  return (
    <div className="dev-console-overlay">

      <div className="dev-console">

        <div className="console-header">

          <span>Developer Console</span>

          <button
            onClick={() => setOpen(false)}
          >
            ✕
          </button>

        </div>

        <div className="console-body">

          <ConsoleInput />

        </div>

      </div>

    </div>
  );
}