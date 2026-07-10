import { useEffect, useState } from "react";
import "./CursorTrail.css";

export default function CursorTrail() {

  const [points, setPoints] = useState([]);

  useEffect(() => {

    const move = (e) => {

      setPoints((prev) => [

        ...prev.slice(-18),

        {
          x: e.clientX,
          y: e.clientY,
          id: Date.now() + Math.random(),
        },

      ]);

    };

    window.addEventListener("mousemove", move);

    return () =>
      window.removeEventListener("mousemove", move);

  }, []);

  return (

    <>

      {points.map((point) => (

        <span
          key={point.id}
          className="cursor-trail"
          style={{
            left: point.x,
            top: point.y,
          }}
        />

      ))}

    </>

  );

}