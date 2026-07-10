import { useEffect, useState } from "react";
import "./NetworkStatus.css";

export default function NetworkStatus() {

  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {

    const on = () => setOnline(true);
    const off = () => setOnline(false);

    window.addEventListener("online", on);
    window.addEventListener("offline", off);

    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };

  }, []);

  return (
    <div className="network-status">

      <span className={online ? "green" : "red"} />

      <strong>{online ? "ONLINE" : "OFFLINE"}</strong>

    </div>
  );
}