import { useEffect, useState } from "react";

export default function useIdle(delay = 60000) {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    let timer;

    const reset = () => {
      setIdle(false);

      clearTimeout(timer);

      timer = setTimeout(() => {
        setIdle(true);
      }, delay);
    };

    reset();

    ["mousemove", "keydown", "scroll", "click"].forEach((event) =>
      window.addEventListener(event, reset)
    );

    return () => {
      clearTimeout(timer);

      ["mousemove", "keydown", "scroll", "click"].forEach((event) =>
        window.removeEventListener(event, reset)
      );
    };
  }, [delay]);

  return idle;
}