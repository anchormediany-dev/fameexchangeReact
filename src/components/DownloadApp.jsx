import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import phoneMockupImage from "../assets/images/app-phones.png";

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Animation variants
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  // Phone animation variant
  const phoneVariant = {
    hidden: { opacity: 0, x: -50, rotate: -25 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: -12,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2,
      },
    },
  };

  // Light flare animation variants
  const flareVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 0.1,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
  };

  // Grid animation
  const gridVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.2 },
    },
  };

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black py-12 2xl:py-16"
    >
      {/* Background grid and effects */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={gridVariant}
        className="absolute inset-0 bg-app-section bg-center z-0"
      >
        {/* Grid overlay with animation */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></motion.div>
      </motion.div>

      {/* Main content container */}
      <div className="relative z-10 container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-16 py-8 sm:py-12 lg:py-16">
        {/* Phone mockups - left side */}
        <div className="relative w-full lg:w-1/2 mb-6 sm:mb-8 lg:mb-0">
          <div className="pt-[80%] sm:pt-[70%] md:pt-[60%] lg:pt-[50%] relative">
            {/* Phone 1 - Background phone with animation */}
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={phoneVariant}
              className="absolute left-[10%] sm:left-[15%] top-[18%] sm:top-[14%] md:top-[22%]  lg:top-[5%] w-[80%] sm:w-[65%] transform -rotate-12 z-10"
            >
              <div className="relative">
                <img
                  src={phoneMockupImage}
                  alt="Phone mockup"
                  className="w-full rounded-[30px] sm:rounded-[40px]  shadow-lg sm:shadow-2xl bg-[#e2cb68]"
                />

                {/* Phone screen glow effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  // animate={
                  //   isInView ? { opacity: [0, 0.6, 0.3] } : { opacity: 0 }
                  // }
                  transition={{
                    duration: 2,
                    delay: 0.8,
                    times: [0, 0.5, 1],
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute inset-[8px] sm:inset-[10px] rounded-[22px] sm:rounded-[30px] bg-[#e2cb68]"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Text content - right side with staggered animations */}
        <div className="w-full lg:w-1/2 text-white text-center lg:text-left px-4 sm:px-0 lg:pl-8">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUpVariant}
            transition={{ duration: 0.6 }}
            className="custom-heading-six tracking-wide mb-2 sm:mb-3"
          >
            Application
          </motion.div>

          <motion.h1
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUpVariant}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="custom-heading-one mb-2 sm:mb-3"
          >
            User-Friendly,
          </motion.h1>

          <motion.h1
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUpVariant}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="custom-heading-one mb-4 sm:mb-6"
          >
            World-Class App
          </motion.h1>

          <motion.p
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUpVariant}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Our app and website are designed to be intuitive and easy to use,
            making investing in your favourite talents simple and enjoyable.
          </motion.p>

          <motion.button
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUpVariant}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(230, 202, 124, 0.4)",
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#a38b41] hover:brightness-110 cursor-pointer font-medium text-black transition-all duration-300 py-3 px-6 mt-6 bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] rounded-md"
          >
            Download App
          </motion.button>
        </div>
      </div>

      {/* Light flare effects with animations */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={flareVariant}
        className="absolute top-0 right-0 w-40 h-40 sm:w-64 sm:h-64 bg-yellow-500 rounded-full filter blur-3xl opacity-10 z-5"
      />

      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={flareVariant}
        transition={{ delay: 0.2 }}
        className="absolute top-20 right-20 sm:right-40 w-20 h-20 sm:w-32 sm:h-32 bg-red-500 rounded-full filter blur-3xl opacity-10 z-5"
      />

      {/* Additional floating particles for tech feel */}
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          initial={{
            opacity: 0,
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
          }}
          animate={
            isInView
              ? {
                  opacity: 0.1 + Math.random() * 0.1,
                  x: [
                    Math.random() * 100 - 50,
                    Math.random() * 100 - 50,
                    Math.random() * 100 - 50,
                  ],
                  y: [
                    Math.random() * 100 - 50,
                    Math.random() * 100 - 50,
                    Math.random() * 100 - 50,
                  ],
                }
              : {}
          }
          transition={{
            duration: 10 + Math.random() * 10,
            times: [0, 0.5, 1],
            repeat: Infinity,
            repeatType: "reverse",
            delay: index * 0.2,
          }}
          className={`absolute w-${Math.floor(Math.random() * 3) + 2} h-${
            Math.floor(Math.random() * 3) + 2
          } bg-white rounded-full blur-sm z-5`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export default AppShowcase;
