import "./GlassCard.css";
import useParallax from "../../hooks/useParallax";

export default function GlassCard({
  children,
  className = "",
}) {
  const ref = useParallax(18);

  return (
    <div
      ref={ref}
      className={`glass-card ${className}`}
    >
      {children}
    </div>
  );
}