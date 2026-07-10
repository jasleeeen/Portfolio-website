import { useEffect, useState } from "react";

export default function useMouseVelocity() {

  const [velocity, setVelocity] = useState({
    x: 0,
    y: 0,
    speed: 0,
  });

  useEffect(() => {

    let lastX = 0;
    let lastY = 0;

    const move = (e) => {

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;

      setVelocity({
        x: dx,
        y: dy,
        speed: Math.sqrt(dx * dx + dy * dy),
      });

      lastX = e.clientX;
      lastY = e.clientY;

    };

    window.addEventListener("mousemove", move);

    return () =>
      window.removeEventListener("mousemove", move);

  }, []);

  return velocity;

}