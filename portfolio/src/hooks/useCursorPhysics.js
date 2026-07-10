import { useEffect, useRef } from "react";

export default function useCursorPhysics() {
  const cursor = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let ringX = mouseX;
    let ringY = mouseY;

    const speed = 0.14;

    const move = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursor.current) {
        cursor.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px,0)`;
      }
    };

    window.addEventListener("mousemove", move);

    const animate = () => {
      ringX += (mouseX - ringX) * speed;
      ringY += (mouseY - ringY) * speed;

      if (ring.current) {
        ring.current.style.transform = `translate3d(${ringX}px, ${ringY}px,0)`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return {
    cursor,
    ring,
  };
}