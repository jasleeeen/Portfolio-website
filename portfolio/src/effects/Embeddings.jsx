import { useEffect, useMemo, useState } from "react";
import "./Embeddings.css";

const WORDS = [
  "Vision",
  "CNN",
  "YOLO",
  "ResNet",
  "Transformer",
  "CLIP",
  "RAG",
  "LangGraph",
  "Agent",
  "Reasoning",
  "Embedding",
  "Vector",
  "PyTorch",
  "FastAPI",
  "CUDA",
  "NeRF",
  "Gaussian",
  "Depth",
  "Point Cloud",
  "Attention",
  "Token",
  "Inference",
  "Segmentation",
  "Detection",
  "OpenCV",
  "Tensor",
  "Feature Map",
  "Backbone",
  "Fusion",
  "Memory",
];

export default function Embeddings() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const resize = () =>
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  const items = useMemo(() => {
    return WORDS.map((word, index) => ({
      id: index,
      word,
      left: Math.random() * 90,
      top: Math.random() * 90,
      delay: Math.random() * 8,
      duration: 14 + Math.random() * 10,
      scale: 0.8 + Math.random() * 0.6,
      rotate: -20 + Math.random() * 40,
    }));
  }, [size]);

  return (
    <div className="embeddings">

      {items.map((item) => (
        <div
          key={item.id}
          className="embedding-token"
          style={{
            left: `${item.left}%`,
            top: `${item.top}%`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
            transform: `scale(${item.scale}) rotate(${item.rotate}deg)`,
          }}
        >
          {item.word}
        </div>
      ))}

    </div>
  );
}