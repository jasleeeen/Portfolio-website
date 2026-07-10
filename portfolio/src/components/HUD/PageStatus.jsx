import "./PageStatus.css";
import usePageVisibility from "../../hooks/usePageVisibility";

export default function PageStatus() {

  const visible = usePageVisibility();

  return (

    <div className="page-status">

      <span className={visible ? "online" : "away"}></span>

      <strong>

        {visible ? "FOCUSED" : "BACKGROUND"}

      </strong>

    </div>

  );

}