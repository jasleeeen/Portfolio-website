import "./StatusBadge.css";

export default function StatusBadge({
  text = "ONLINE",
}) {
  return (
    <div className="status-badge">

      <span className="status-dot"></span>

      <span>{text}</span>

    </div>
  );
}