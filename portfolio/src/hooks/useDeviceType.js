import { useEffect, useState } from "react";

export default function useDeviceType() {

  const getDevice = () => {

    if (window.innerWidth <= 768) return "mobile";

    if (window.innerWidth <= 1100) return "tablet";

    return "desktop";

  };

  const [device, setDevice] = useState(getDevice());

  useEffect(() => {

    const resize = () => {

      setDevice(getDevice());

    };

    window.addEventListener("resize", resize);

    return () =>
      window.removeEventListener("resize", resize);

  }, []);

  return device;

}