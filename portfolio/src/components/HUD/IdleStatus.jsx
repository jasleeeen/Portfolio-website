import "./IdleStatus.css";
import useIdle from "../../hooks/useIdle";

export default function IdleStatus() {

  const idle = useIdle();

  return (

    <div className={`idle-status ${idle ? "idle" : ""}`}>

      <span></span>

      {idle ? "IDLE" : "ACTIVE"}

    </div>

  );

}