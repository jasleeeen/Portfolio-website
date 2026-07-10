import "./Viewport.css";
import useWindowSize from "../../hooks/useWindowSize";

export default function Viewport() {
  const { width, height } = useWindowSize();

  return (
    <div className="viewport-widget">

      <span>VIEWPORT</span>

      <strong>
        {width} × {height}
      </strong>

    </div>
  );
}