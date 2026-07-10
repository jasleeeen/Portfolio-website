import "./MagneticButton.css";
import useMagnetic from "../../hooks/useMagnetic";

export default function MagneticButton({
  children,
  href,
  className = "",
}) {
  const magnetic = useMagnetic(0.25);

  return (
    <a
      ref={magnetic}
      href={href}
      className={`magnetic-btn ${className}`}
    >
      {children}
    </a>
  );
}