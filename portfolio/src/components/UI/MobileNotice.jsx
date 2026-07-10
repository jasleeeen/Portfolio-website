import useMobile from "../../hooks/useMobile";
import "./MobileNotice.css";

export default function MobileNotice() {

  const mobile = useMobile();

  if (!mobile) return null;

  return (

    <div className="mobile-notice">

      Best experienced on desktop.

    </div>

  );

}