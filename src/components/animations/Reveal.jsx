import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Reveal = ({ children, className, delay = 0 }) => {
  const ref = useRef(null);

  // Wait until 100% in view, and only fire once
  const isInView = useInView(ref, { once: true, amount: 0.5});

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
