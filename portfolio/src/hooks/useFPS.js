import { useEffect, useState } from "react";

export default function useFPS() {
  const [fps, setFps] = useState(60);

  useEffect(() => {
    let frames = 0;
    let last = performance.now();

    let id;

    const loop = (time) => {
      frames++;

      if (time >= last + 1000) {
        setFps(frames);
        frames = 0;
        last = time;
      }

      id = requestAnimationFrame(loop);
    };

    id = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(id);
  }, []);

  return fps;
}