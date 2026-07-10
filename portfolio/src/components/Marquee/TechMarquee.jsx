import "./TechMarquee.css";

const items = [
  "Artificial Intelligence",
  "Machine Learning",
  "Deep Learning",
  "Computer Vision",
  "PyTorch",
  "FastAPI",
  "OpenCV",
  "NeRF",
  "Gaussian Splatting",
  "LangGraph",
  "RAG",
];

export default function TechMarquee() {
  return (
    <section className="tech-marquee">

      <div className="track">

        {[...items, ...items].map((item, index) => (
          <span key={index}>
            {item}
          </span>
        ))}

      </div>

    </section>
  );
}