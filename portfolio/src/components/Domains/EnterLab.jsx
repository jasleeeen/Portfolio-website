import { motion, useScroll, useTransform } from "framer-motion";
import "./EnterLab.css";

export default function EnterLab() {
  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0.12, 0.2], [1, 2.8]);
  const opacity = useTransform(scrollYProgress, [0.12, 0.19], [1, 0]);

  const rotate = useTransform(scrollYProgress, [0.12, 0.2], [0, 90]);

  return (
    <section className="enter-lab">

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