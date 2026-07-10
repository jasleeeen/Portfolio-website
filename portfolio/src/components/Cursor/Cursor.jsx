import "./Cursor.css";
import useCursorPhysics from "../../hooks/useCursorPhysics";
import { useEffect } from "react";

export default function Cursor() {
  const { cursor, ring } = useCursorPhysics();

  useEffect(() => {
    const enter = () => {
      ring.current?.classList.add("cursor-hover");
    };

    const leave = () => {
      ring.current?.classList.remove("cursor-hover");
    };

    const elements = document.querySelectorAll(
      "button,a,.panel,.glass,.floating-panel"
    );

    elements.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring"></div>

      <div ref={cursor} className="cursor-dot"></div>
    </>
  );
}