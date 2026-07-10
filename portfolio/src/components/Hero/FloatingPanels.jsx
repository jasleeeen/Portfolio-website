import "./FloatingPanels.css";

const panels = [
  {
    title: "Computer Vision",
    value: "Retina Scan",
    status: "ACTIVE",
    x: "8%",
    y: "12%",
    delay: "0s",
  },
  {
    title: "Deep Learning",
    value: "Epoch 42 / 100",
    status: "TRAINING",
    x: "72%",
    y: "16%",
    delay: ".8s",
  },
  {
    title: "3D Reconstruction",
    value: "214K Points",
    status: "READY",
    x: "12%",
    y: "72%",
    delay: "1.4s",
  },
  {
    title: "Agent",
    value: "Thinking...",
    status: "ONLINE",
    x: "74%",
    y: "70%",
    delay: "2s",
  },
];

export default function FloatingPanels() {
  return (
    <div className="floating-panels">
      {panels.map((panel, index) => (
        <div
          key={index}
          className="floating-panel"
          style={{
            left: panel.x,
            top: panel.y,
            animationDelay: panel.delay,
          }}
        >
          <div className="panel-top">
            <span className="panel-dot"></span>
            <span>{panel.title}</span>
          </div>

          <h3>{panel.value}</h3>

          <div className="panel-bottom">
            <span>{panel.status}</span>

            <div className="signal">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}