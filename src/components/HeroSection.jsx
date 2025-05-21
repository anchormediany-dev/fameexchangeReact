import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HeroSection = () => {
  // Ref for the section to track scroll position
  const sectionRef = useRef(null);

  // Get scroll progress for this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Create parallax effect values based on scroll
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]); // Heading
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]); // Description
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 200]); // Button
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="w-full hero-bg flex flex-col justify-center min-h-[90vh] sm:min-h-screen px-4 sm:px-6 lg:px-8 py-20 sm:py-0 relative overflow-hidden"
    >
      {/* Parallax Stars/Particles Background */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.3 + 0.1,
            y: useTransform(
              scrollYProgress,
              [0, 1],
              [0, Math.random() * 200 * (Math.random() > 0.5 ? 1 : -1)]
            ),
          }}
        />
      ))}

      <motion.div
        className="container mx-auto relative z-10"
        style={{ opacity }}
      >
        {/* Main Heading with parallax effect */}
        <motion.h2
          className="heading-700-50 text-white mb-4 sm:mb-6 leading-tight"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y: y1 }}
        >
          <motion.span className="block heading-700-40" variants={itemVariants}>
            The Fame Exchange
          </motion.span>

          <motion.span className="block mt-2 sm:mt-3" variants={itemVariants}>
            The First-of-its-Kind
          </motion.span>

          <motion.span className="block" variants={itemVariants}>
            Trading Platform for
          </motion.span>

          <motion.span className="block" variants={itemVariants}>
            Entertainment and Sports
          </motion.span>
        </motion.h2>

        {/* Description with parallax effect */}
        <motion.p
          className="heading-400-20 text-gray-300 mb-6 sm:mb-8 md:mb-10 max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ y: y2 }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an
        </motion.p>

        {/* CTA Button with parallax effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4"
          style={{ y: y3 }}
        >
          <motion.button
            className="bg-[#e0aa0d] cursor-pointer text-white py-3 px-6 sm:py-4 sm:px-8 rounded-md transition-all duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(224, 170, 13, 0.6)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            Start Investment
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Gradient overlay */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.5], [0, 0.8]),
        }}
      />
    </section>
  );
};

export default HeroSection;
