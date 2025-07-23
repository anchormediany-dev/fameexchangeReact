import { motion } from "framer-motion";

const HeroSection = ({ itemVariants, fadeIn }) => (
  <motion.section
    variants={fadeIn}
    className="mt-10 lg:mt-16 2xl:mt-20 py-12 2xl:py-16 container mx-auto text-center"
  >
    <motion.h1
      variants={itemVariants}
      className="text-4xl md:text-5xl lg:text-6xl font-bold"
    >
      How to <span className="gredient-text">Buy</span> or{" "}
      <span className="gredient-text">Sell</span> a Branded Talent Share (BTS)
    </motion.h1>
  </motion.section>
);

export default HeroSection;
