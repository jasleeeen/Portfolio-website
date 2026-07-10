import "./DeviceStatus.css";
import useDeviceType from "../../hooks/useDeviceType";

export default function DeviceStatus() {

  const device = useDeviceType();

  return (

    <div className="device-status">

      <span>DEVICE</span>

      <strong>{device}</strong>

    </div>

  );

}