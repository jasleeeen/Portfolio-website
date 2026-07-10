import { useEffect } from "react";

const sequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function useKonami(callback) {
  useEffect(() => {
    let index = 0;

    const handler = (e) => {
      if (e.key === sequence[index]) {
        index++;

        if (index === sequence.length) {
          callback();
          index = 0;
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener("keydown", handler);

    return () =>
      window.removeEventListener("keydown", handler);
  }, [callback]);
}