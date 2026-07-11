import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./Scene.css";

const EASE = [0.22, 0.61, 0.36, 1];

// parent orchestrates; children cascade in order
const copyStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const riseIn = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function Scene({ domain, index = 0 }) {
  const ref = useRef(null);

  // glow drifts slower than the content = subtle depth as you scroll past
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [110, -110]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);

  return (
    <motion.section
      ref={ref}
      className="scene"
      initial="hidden"
      whileInView="show"
      viewport={{
        once: false,
        amount: 0.4,
      }}
    >
      <motion.div
        className="scene-glow"
        style={{
          background: `radial-gradient(circle, ${domain.accent}55, transparent 70%)`,
          y: glowY,
          scale: glowScale,
        }}
      />

      <motion.div className="scene-left" variants={copyStagger}>

        <motion.span
          variants={riseIn}
          className="scene-number"
          style={{
            color: domain.accent,
          }}
        >
          {domain.badge}
        </motion.span>

        <motion.span
          variants={riseIn}
          className="scene-subtitle"
          style={{
            color: domain.accent,
          }}
        >
          {domain.subtitle}
        </motion.span>

        <motion.h2 variants={riseIn}>{domain.title}</motion.h2>

        <motion.p variants={riseIn}>{domain.description}</motion.p>

        <motion.div className="scene-tags" variants={riseIn}>
          {domain.keywords.map((tag) => (
            <span
              key={tag}
              className="scene-tag"
              style={{ "--accent": domain.accent }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

      </motion.div>

      <div className="scene-right">

        {domain.stats.map((stat, i) => (
          <motion.div
            className="scene-card"
            key={stat.label}
            style={{ "--accent": domain.accent }}
            initial={{ opacity: 0, y: 46, rotate: index % 2 ? -1.5 : 1.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.28 + i * 0.13 }}
          >
            <h3>{stat.value}</h3>

            <span>{stat.label}</span>
          </motion.div>
        ))}

      </div>

    </motion.section>
  );
}
