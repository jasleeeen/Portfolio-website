import { motion } from "framer-motion";
import "./Scene.css";

export default function Scene({ domain }) {
  return (
    <motion.section
      className="scene"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
      }}
      viewport={{
        once: false,
        amount: 0.4,
      }}
    >
      <div
        className="scene-glow"
        style={{
          background: `radial-gradient(circle, ${domain.accent}55, transparent 70%)`,
        }}
      />

      <div className="scene-left">

        <span
          className="scene-number"
          style={{
            color: domain.accent,
          }}
        >
          {domain.badge}
        </span>

        <span
          className="scene-subtitle"
          style={{
            color: domain.accent,
          }}
        >
          {domain.subtitle}
        </span>

        <h2>{domain.title}</h2>

        <p>{domain.description}</p>

        <div className="scene-tags">
          {domain.keywords.map((tag) => (
            <span
              key={tag}
              className="scene-tag"
            >
              {tag}
            </span>
          ))}
        </div>

      </div>

      <div className="scene-right">

        {domain.stats.map((stat) => (
          <div
            className="scene-card"
            key={stat.label}
          >
            <h3>{stat.value}</h3>

            <span>{stat.label}</span>
          </div>
        ))}

      </div>

    </motion.section>
  );
}