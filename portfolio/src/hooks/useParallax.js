import { useEffect, useRef } from "react";

export default function useParallax(speed = 30) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const move = (e) => {
      const x =
        (e.clientX / window.innerWidth - 0.5) * speed;

      const y =
        (e.clientY / window.innerHeight - 0.5) * speed;

      element.style.transform = `
        translate3d(${x}px, ${y}px, 0)
      `;
    };

    window.addEventListener("mousemove", move);

    return () =>
      window.removeEventListener("mousemove", move);
  }, [speed]);

  return ref;
}