import { useEffect, useState } from "react";
import "./Navigation.css";

const links = [
  { label: "About", id: "about" },
  { label: "Domains", id: "domains" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id) => {
    setOpen(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>

      <button
        className="nav-logo"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
      >
        <span>JKS</span>
      </button>

      <nav className={`nav-links ${open ? "open" : ""}`}>
        {links.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <button
        className="nav-menu"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

    </header>
  );
}