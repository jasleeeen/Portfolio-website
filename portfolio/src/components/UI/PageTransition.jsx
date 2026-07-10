import { AnimatePresence, motion } from "framer-motion";

export default function PageTransition({ children }) {
  return (
    <AnimatePresence mode="wait">

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: -40,
        }}
        transition={{
          duration: .6,
        }}
      >
        {children}
      </motion.div>

    </AnimatePresence>
  );
}