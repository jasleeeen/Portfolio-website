import { motion, useScroll, useTransform } from "framer-motion";
import "./Shutdown.css";

export default function Shutdown() {

  const { scrollYProgress } = useScroll();

  const opacity = useTransform(
    scrollYProgress,
    [0.92, 1],
    [0, 1]
  );

  const scale = useTransform(
    scrollYProgress,
    [0.92, 1],
    [0.9, 1]
  );

  return (

    <motion.section
      className="shutdown"
      style={{
        opacity,
        scale,
      }}
    >

      <span>SYSTEM STATUS</span>

      <h2>Workspace Offline</h2>

      <p>

        Thanks for exploring my AI Workspace.

      </p>

      <div className="shutdown-terminal">

        <p>$ save_session</p>

        <p>✓ Complete</p>

        <p>$ disconnect</p>

        <p>✓ Workspace Offline</p>

      </div>

    </motion.section>

  );

}