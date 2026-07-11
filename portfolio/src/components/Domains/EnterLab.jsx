import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./EnterLab.css";

export default function EnterLab() {
  const ref = useRef(null);

  // progress is scoped to this section (0 = pinned at top, 1 = scrolled past),
  // so the zoom-through fires at the right moment no matter how long the page is
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.85], [1, 2.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const rotate = useTransform(scrollYProgress, [0, 0.85], [0, 90]);
  const blur = useTransform(scrollYProgress, [0, 0.7], [0, 10]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <section className="enter-lab" ref={ref}>

      <motion.div
        className="enter-particle-core"
        style={{
          scale,
          opacity,
          rotate,
        }}
      />

      <motion.div
        className="enter-content"
        style={{
          opacity,
          filter,
        }}
      >

        <span>AI WORKSPACE</span>

        <h2>Entering Neural Space</h2>

        <p>

          Initializing Computer Vision Engine

        </p>

      </motion.div>

    </section>
  );
}
