import { motion } from "framer-motion";
import useReducedMotion from "../../hooks/useReducedMotion";

export default function Reveal({
  children,
  delay = 0,
}) {
  const reduced = useReducedMotion();

  if (reduced) return children;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: .25,
      }}
      transition={{
        duration: .8,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}