import { motion, useTransform } from "framer-motion";
import "./Scene.css";

/**
 * One domain "frame" in the pinned fly-through. Everything is layered at the
 * center of the stage and driven by the reel's shared scroll progress, so the
 * camera appears to dolly forward: the frame rises from the distance (small,
 * faded), reaches you at full size, then rushes past and blurs away as the
 * next one surfaces behind it. Planes move at different rates for depth.
 */
export default function Scene({ domain, index, total, progress }) {
  const seg = 1 / total;
  const center = (index + 0.5) * seg;
  const inAt = center - seg * 0.95;
  const outAt = center + seg * 0.95;

  // main plane: copy + cards
  const opacity = useTransform(
    progress,
    [inAt, center - seg * 0.34, center + seg * 0.34, outAt],
    [0, 1, 1, 0]
  );
  const scale = useTransform(progress, [inAt, center, outAt], [0.66, 1, 1.55]);
  const y = useTransform(progress, [inAt, outAt], [64, -64]);
  const pointer = useTransform(opacity, (o) => (o > 0.55 ? "auto" : "none"));

  // far plane: the giant ghost number — bigger swing = reads as "further back"
  const numScale = useTransform(progress, [inAt, center, outAt], [0.5, 1, 2.6]);
  const numY = useTransform(progress, [inAt, outAt], [130, -130]);
  const numBlur = useTransform(
    progress,
    [inAt, center - seg * 0.3, center + seg * 0.3, outAt],
    [10, 0, 0, 14]
  );
  const numFilter = useTransform(numBlur, (b) => `blur(${b}px)`);

  // mid plane: cards drift laterally as the camera passes
  const cardsX = useTransform(progress, [inAt, center, outAt], [90, 0, -150]);

  return (
    <motion.div
      className="scene"
      style={{ opacity, scale, y, pointerEvents: pointer }}
    >
      <motion.div
        className="scene-glow"
        style={{
          background: `radial-gradient(circle, ${domain.accent}40, transparent 66%)`,
        }}
      />

      <motion.span
        className="scene-bignum"
        aria-hidden="true"
        style={{
          scale: numScale,
          y: numY,
          filter: numFilter,
          color: domain.accent,
        }}
      >
        {domain.badge}
      </motion.span>

      <div className="scene-inner">
        <div className="scene-copy">
          <span className="scene-kicker" style={{ color: domain.accent }}>
            <i style={{ background: domain.accent }} />
            {domain.subtitle}
          </span>

          <h2 className="scene-title">{domain.title}</h2>

          <p className="scene-desc">{domain.description}</p>

          <div className="scene-tags">
            {domain.keywords.map((k) => (
              <span key={k} className="scene-tag">
                {k}
              </span>
            ))}
          </div>
        </div>

        <motion.div className="scene-cards" style={{ x: cardsX }}>
          {domain.stats.map((s, i) => (
            <div
              className="scene-card"
              key={s.label}
              style={{ "--i": i, borderColor: domain.accent + "33" }}
            >
              <h3 style={{ color: domain.accent }}>{s.value}</h3>
              <span>{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
