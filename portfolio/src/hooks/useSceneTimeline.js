import { useEffect, useState } from "react";

export default function useSceneTimeline() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scroll = window.scrollY;

      const max =
        document.documentElement.scrollHeight -
        window.innerHeight;

      setProgress(scroll / max);
    };

    update();

    window.addEventListener("scroll", update, {
      passive: true,
    });

    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return progress;
}