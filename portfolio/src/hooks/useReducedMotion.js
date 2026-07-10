import { useEffect, useState } from "react";

export default function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    setReduced(media.matches);

    const listener = (e) => setReduced(e.matches);

    media.addEventListener("change", listener);

    return () =>
      media.removeEventListener("change", listener);
  }, []);

  return reduced;
}