import "./SystemStats.css";

export default function SystemStats() {
  return (
    <div className="system-stats">

      <div>

        <small>CPU</small>

        <strong>12%</strong>

      </div>

      <div>

        <small>GPU</small>

        <strong>CUDA</strong>

      </div>

      <div>

        <small>RAM</small>

        <strong>16GB</strong>

      </div>

      <div>

        <small>FPS</small>

        <strong>60</strong>

      </div>

    </div>
  );
}