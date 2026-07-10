import { useEffect, useRef } from "react";

export default function useMagnetic(strength = 0.35) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const move = (e) => {
      const rect = element.getBoundingClientRect();

      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      element.style.transform = `translate(${x * strength}px,${
        y * strength
      }px)`;
    };

    const leave = () => {
      element.style.transform = "translate(0px,0px)";
    };

    element.addEventListener("mousemove", move);
    element.addEventListener("mouseleave", leave);

    return () => {
      element.removeEventListener("mousemove", move);
      element.removeEventListener("mouseleave", leave);
    };
  }, [strength]);

  return ref;
}