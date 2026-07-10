import "./ScrollDirection.css";
import useScrollDirection from "../../hooks/useScrollDirection";

export default function ScrollDirection() {

  const direction = useScrollDirection();

  return (

    <div className="scroll-direction">

      <span>SCROLL</span>

      <strong>{direction.toUpperCase()}</strong>

    </div>

  );

}