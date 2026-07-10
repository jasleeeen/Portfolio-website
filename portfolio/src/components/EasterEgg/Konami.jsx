import { useEffect } from "react";

const code = [
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

export default function Konami() {

  useEffect(() => {

    let index = 0;

    const handler = (e) => {

      if (e.key === code[index]) {

        index++;

        if (index === code.length) {

          document.body.classList.toggle("konami-mode");

          index = 0;

        }

      } else {

        index = 0;

      }

    };

    window.addEventListener("keydown", handler);

    return () =>
      window.removeEventListener("keydown", handler);

  }, []);

  return null;

}