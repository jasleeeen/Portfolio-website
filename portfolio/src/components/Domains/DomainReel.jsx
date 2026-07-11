import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import "./DomainReel.css";

import domains from "../../data/domains";
import Scene from "./Scene";
import useLenis from "../../hooks/useLenis";

/**
 * Cinematic pinned fly-through. A tall track provides the scroll distance; the
 * inner stage stays pinned to the viewport while the shared scroll progress
 * dollies the camera forward through each domain frame (see Scene.jsx). A short
 * prologue dissolves away as the first domain arrives; the ambient wash, the
 * counter and the dots all pick up the active domain's accent.
 */
export default function DomainReel() {
  useLenis();

  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const total = domains.length;
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(total - 1, Math.max(0, Math.floor(v * total)));
    setActive((prev) => (prev === i ? prev : i));
  });

  // prologue: fades and pushes toward the camera as the reel begins
  const introOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const introScale = useTransform(scrollYProgress, [0, 0.08], [1, 2.3]);
  const introBlur = useTransform(scrollYProgress, [0, 0.06], [0, 12]);
  const introFilter = useTransform(introBlur, (b) => `blur(${b}px)`);

  const accent = domains[active].accent;

  return (
    <section
      id="domains"
      className="reel-track"
      ref={trackRef}
      style={{ height: `${(total + 1) * 100}vh` }}
    >
      <div className="reel-stage">
        {/* accent wash that shifts with the active domain */}
        <div
          className="reel-ambient"
          style={{
            background: `radial-gradient(60% 55% at 50% 58%, ${accent}22, transparent 72%)`,
          }}
        />

        {/* soft top/bottom cuts so frames dissolve at the edges (filmic) */}
        <div className="reel-vignette" aria-hidden="true" />

        {/* prologue */}
        <motion.div
          className="reel-intro"
          style={{ opacity: introOpacity, scale: introScale, filter: introFilter }}
        >
          <span className="reel-intro-kicker">AI Workspace</span>
          <h2 className="reel-intro-title">Entering Neural Space</h2>
          <p className="reel-intro-sub">Five domains. One engineer.</p>
        </motion.div>

        {/* the frames */}
        {domains.map((d, i) => (
          <Scene
            key={d.id}
            domain={d}
            index={i}
            total={total}
            progress={scrollYProgress}
          />
        ))}

        {/* HUD */}
        <div className="reel-hud">
          <span className="reel-counter" style={{ color: accent }}>
            {String(active + 1).padStart(2, "0")}
            <i>/</i>
            {String(total).padStart(2, "0")}
          </span>
        </div>

        <div className="reel-dots" aria-hidden="true">
          {domains.map((d, i) => (
            <span
              key={d.id}
              className={"reel-dot" + (i === active ? " is-on" : "")}
              style={i === active ? { background: d.accent, boxShadow: `0 0 12px ${d.accent}` } : undefined}
            />
          ))}
        </div>

        <div className="reel-rail" aria-hidden="true">
          <motion.span style={{ scaleX: scrollYProgress, background: accent }} />
        </div>

        <span className="reel-scrollhint" aria-hidden="true">
          scroll <b>↓</b>
        </span>
      </div>
    </section>
  );
}
