import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 40 },
};

const pageTransition = {
  duration: 0.4,
  ease: "easeOut",
};

const MotionPageWrapper = ({ children }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      onAnimationComplete={() => setIsAnimating(false)}
      className="relative pb-10 min-h-screen bg-[#0b0b0b] text-white overflow-hidden"
    >
      {/* ✨ Shimmer Loader */}
      {isAnimating && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0b0b0b] z-50">
          <div className="shimmer-loader w-48 h-4 rounded bg-[#1a1a1a] relative overflow-hidden">
            <div className="shimmer-light absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
          </div>
        </div>
      )}

      {/* Page Content */}
      <div
        className={`transition-opacity duration-300 ${
          isAnimating ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default MotionPageWrapper;
