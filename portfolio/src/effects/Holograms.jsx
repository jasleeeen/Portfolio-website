import "./Holograms.css";

const windows = [
  {
    title: "GPU",
    value: "RTX Compute",
    status: "CUDA ONLINE",
    x: "6%",
    y: "18%",
    accent: "#7c5cff",
  },
  {
    title: "Computer Vision",
    value: "YOLO v11",
    status: "Inference Ready",
    x: "76%",
    y: "14%",
    accent: "#3ba7ff",
  },
  {
    title: "3D Reconstruction",
    value: "214,382 Points",
    status: "Gaussian Splatting",
    x: "12%",
    y: "72%",
    accent: "#34d6ff",
  },
  {
    title: "Embeddings",
    value: "768 Dimensions",
    status: "CLIP Space",
    x: "72%",
    y: "74%",
    accent: "#ff9d42",
  },
];

export default function Holograms() {
  return (
    <div className="holograms">

      {windows.map((item) => (
        <div
          key={item.title}
          className="holo-card"
          style={{
            left: item.x,
            top: item.y,
            "--accent": item.accent,
          }}
        >

          <div className="holo-header">

            <span className="holo-dot"></span>

            <span>{item.title}</span>

          </div>

          <div className="holo-value">
            {item.value}
          </div>

          <div className="holo-footer">

            <span>{item.status}</span>

            <div className="bars">

              <span></span>
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