import "./FPSCounter.css";
import useFPS from "../../hooks/useFPS";

export default function FPSCounter() {

  const fps = useFPS();

  return (

    <div className="fps-counter">

      <span>FPS</span>

      <strong>{fps}</strong>

    </div>

  );

}