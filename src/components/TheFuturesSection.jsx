import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
// import futuresImage from "../assets/images/future-bg.png";
// import futuresImage from "../assets/images/futures-bg.png";
// import futuresImage from "../assets/images/future-bg-2.png";
import futuresImage from "../assets/home/thefutures.png";
import { useNavigate } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";
import { FiMusic } from "react-icons/fi";
const TheFuturesSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const sectionStyle = {
    backgroundImage: `url(${futuresImage})`,
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.4,
        ease: "easeOut",
      },
    },
  };

  const backgroundVariants = {
    hidden: {
      scale: 1.1,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        delay: 0.3,
        ease: "easeOut",
      },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      x: -50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const subtitleVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const glowVariants = {
    animate: {
      textShadow: [
        "0 0 5px rgba(163, 139, 65, 0.3)",
        "0 0 20px rgba(163, 139, 65, 0.6)",
        "0 0 5px rgba(163, 139, 65, 0.3)",
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Split text into individual letters for animation
  const titleText = "THE FUTURES";
  const subtitleText = "BE SPONSORED & GET ADOPTED";

  return (
    <motion.section
      ref={sectionRef}
      className="w-full h-screen md:h-[85vh] lg:h-[80vh] bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={sectionStyle}
      id="futures"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={backgroundVariants}
    >
      {/* Semi-transparent black overlay */}
      <motion.div className="absolute inset-0" variants={overlayVariants} />

      {/* Content container */}
      <motion.div
        className="absolute inset-0 container mx-auto px-6 md:px-8 lg:px-12"
        variants={containerVariants}
      >
        <motion.div
          className="h-full flex flex-col justify-start w-[400px] 2xl:py-16 py-12"
          variants={contentVariants}
        >
          <motion.h1
            className="text-[#a38b41] custom-heading-one tracking-wide"
            variants={titleVariants}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
          >
            <motion.span variants={glowVariants} animate="animate">
              {titleText.split("").map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  custom={index}
                  style={{
                    display: letter === " " ? "inline" : "inline-block",
                  }}
                  whileHover={{
                    y: -5,
                    scale: 1.1,
                    transition: { duration: 0.2 },
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-white tracking-wider  uppercase mt-2"
            variants={subtitleVariants}
            whileHover={{
              scale: 1.02,
              color: "#f0f0f0",
              transition: { duration: 0.2 },
            }}
          >
            <motion.span
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
            >
              {subtitleText.split("").map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  style={{
                    display: letter === " " ? "inline" : "inline-block",
                  }}
                  whileHover={{
                    y: -2,
                    color: "#a38b41",
                    transition: { duration: 0.2 },
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.span>
          </motion.p>
          <motion.button
            onClick={() => navigate("/futures")}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="mt-4 px-4 py-2  cursor-pointer bg-gradient-to-r from-[#a18a3f] w-fit to-[#e6ca7c] text-white rounded-lg flex items-center gap-2 hover:brightness-110 transition-all"
          >
            The Fame Collective
            <motion.div whileHover={{ x: 3, y: -3 }}>
              <GoArrowUpRight size={20} />
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Decorative animated elements */}
      <motion.div
        className="absolute top-20 right-20 w-2 h-2 bg-[#a38b41] rounded-full opacity-60"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 1,
        }}
      />

      <motion.div
        className="absolute bottom-32 right-32 w-1 h-1 bg-white rounded-full opacity-40"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 2,
        }}
      />

      <motion.div
        className="absolute top-1/3 right-10 w-1.5 h-1.5 bg-[#a38b41] rounded-full opacity-50"
        animate={{
          y: [0, -15, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 0.5,
        }}
      />

      {/* Subtle particle effect */}
      <motion.div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-[#a38b41] rounded-full opacity-30"
            style={{
              top: `${20 + i * 15}%`,
              left: `${70 + i * 5}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </motion.section>
  );
};

export default TheFuturesSection;
