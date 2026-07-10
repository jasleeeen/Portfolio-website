import "./CurrentSection.css";
import useSectionTracker from "../../hooks/useSectionTracker";

export default function CurrentSection() {
  const current = useSectionTracker();

  return (
    <div className="current-section">

      <span>ACTIVE</span>

      <h4>{current}</h4>

    </div>
  );
}