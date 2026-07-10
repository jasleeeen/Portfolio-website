import { useEffect, useState } from "react";

export default function useScrollDirection() {
  const [direction, setDirection] = useState("down");

  useEffect(() => {
    let last = window.scrollY;

    const update = () => {
      const current = window.scrollY;

      if (current > last) {
        setDirection("down");
      } else {
        setDirection("up");
      }

      last = current;
    };

    window.addEventListener("scroll", update);

    return () =>
      window.removeEventListener("scroll", update);
  }, []);

  return direction;
}