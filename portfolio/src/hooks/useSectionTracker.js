import { useEffect, useState } from "react";

export default function useSectionTracker() {
  const [section, setSection] = useState("Hero");

  useEffect(() => {
    const sections = [...document.querySelectorAll("section[id]")];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.45,
      }
    );

    sections.forEach((section) =>
      observer.observe(section)
    );

    return () => observer.disconnect();
  }, []);

  return section;
}