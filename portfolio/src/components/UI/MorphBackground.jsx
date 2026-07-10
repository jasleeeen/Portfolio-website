import "./MorphBackground.css";
import useScrollMorph from "../../hooks/useScrollMorph";

export default function MorphBackground() {

  const progress = useScrollMorph();

  return (
    <div
      className="morph-bg"
      style={{
        filter: `hue-rotate(${progress * 240}deg)`,
        transform: `scale(${1 + progress * .25})`,
      }}
    />
  );

}