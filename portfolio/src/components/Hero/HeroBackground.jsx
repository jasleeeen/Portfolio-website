import { useEffect, useRef } from "react";
import PointCloud from "../../effects/PointCloud";

export default function HeroBackground() {
  const light = useRef();

  useEffect(() => {
    const move = (e) => {
      if (!light.current) return;

      light.current.style.left = `${e.clientX}px`;
      light.current.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <div className="workspace">

      {/* Animated Grid */}
      <div className="workspace-grid"></div>

      {/* Interactive Point Cloud */}
      <PointCloud />

      {/* Noise Overlay */}
      <div className="workspace-noise"></div>

      {/* Cursor Light */}
      <div
        ref={light}
        className="workspace-light"
      ></div>

      {/* Ambient Glows */}
      <div className="workspace-gradient one"></div>

      <div className="workspace-gradient two"></div>

      <div className="workspace-gradient three"></div>

    </div>
  );
}