import { useEffect, useState } from "react";
import "./CommandPalette.css";

const pages = [
  { name: "Hero", id: "hero" },
  { name: "About", id: "about" },
  { name: "Domains", id: "domains" },
  { name: "Projects", id: "projects" },
  { name: "Timeline", id: "experience" },
  { name: "Contact", id: "contact" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }

      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handler);

    return () =>
      window.removeEventListener("keydown", handler);
  }, []);

  if (!open) return null;

  return (
    <div
      className="palette-overlay"
      onClick={() => setOpen(false)}
    >
      <div
        className="palette"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          placeholder="Jump anywhere..."
          autoFocus
        />

        <div className="palette-results">

          {pages.map((page) => (

            <button
              key={page.id}
              onClick={() => {
                document
                  .getElementById(page.id)
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });

                setOpen(false);
              }}
            >
              {page.name}
            </button>

          ))}

        </div>

      </div>

    </div>
  );
}