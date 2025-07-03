import { motion } from "framer-motion";

const HeroSection = ({ itemVariants, fadeIn }) => (
  <motion.section
    variants={fadeIn}
    className="py-16 px-4 sm:px-6 mt-16 lg:px-8 container mx-auto text-center"
  >
    <motion.h1
      variants={itemVariants}
      className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
    >
      How to <span className="gredient-text">Buy</span> or{" "}
      <span className="gredient-text">Sell</span> a Branded Talent Share (BTS)
    </motion.h1>
    <motion.p variants={itemVariants} className="text-xl max-w-4xl mx-auto">
      Your complete guide to trading digital engagement units on The Fame
      Exchange platform
    </motion.p>
  </motion.section>
);

export default HeroSection;
