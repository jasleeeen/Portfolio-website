import { useEffect, useState } from "react";

export default function TypingText({
  text,
  speed = 35,
}) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let i = 0;

    setDisplay("");

    const interval = setInterval(() => {
      i++;

      setDisplay(text.slice(0, i));

      if (i >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <>{display}</>;
}