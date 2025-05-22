import { motion } from "framer-motion";
import micImage from "../../assets/images/podcast-bg.png";

const Podcast = () => {
  // Simple, reliable animation variants
  const fadeInUp = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-cover bg-center bg-no-repeat w-full relative flex items-center justify-center text-white px-4"
      style={{
        backgroundImage: `url(${micImage})`,
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeIn}
    >
      <motion.div
        className="absolute z-50 top-10 left-[50%] md:left-[60%] -translate-x-1/2"
        variants={staggerContainer}
      >
        <motion.h1
          className="custom-heading-one mb-4 sm:mb-6"
          variants={fadeInUp}
        >
          FAMEX <span className="text-[#a38b41]">PODCAST</span>
        </motion.h1>

        <motion.p variants={fadeInUp}>
          The experience that will be sure to give you exposure to spot light
          your career
        </motion.p>
      </motion.div>

      <motion.div
        className="flex md:justify-between md:flex-row flex-col gap-3 container z-50 absolute bottom-10"
        variants={staggerContainer}
      >
        <motion.div className="" variants={fadeInUp}>
          <motion.button
            className="custom-button-two"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            BE INTERVIEWED
          </motion.button>
        </motion.div>

        <motion.a
          className="text-gray-400"
          href="mailto:info@FAMEXPODCAST.com"
          variants={fadeInUp}
          whileHover={{
            color: "#a38b41",
            transition: { duration: 0.2 },
          }}
        >
          info@FAMEXPODCAST.com
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default Podcast;
