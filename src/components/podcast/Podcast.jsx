// import { motion } from "framer-motion";
// import micImage from "../../assets/images/podcast-bg.png";

// const Podcast = () => {
//   // Simple, reliable animation variants
//   const fadeInUp = {
//     hidden: {
//       opacity: 0,
//       y: 30,
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.8,
//         ease: "easeOut",
//       },
//     },
//   };

//   const fadeIn = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 1,
//         ease: "easeOut",
//       },
//     },
//   };

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.3,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   return (
//     <motion.div
//       className="min-h-screen bg-cover bg-center bg-no-repeat w-full relative flex items-center justify-center text-white px-4"
//       style={{
//         backgroundImage: `url(${micImage})`,
//       }}
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, amount: 0.2 }}
//       variants={fadeIn}
//     >
//       <motion.div
//         className="absolute z-50 top-10 left-[50%] md:left-[60%] -translate-x-1/2"
//         variants={staggerContainer}
//       >
//         <motion.h1
//           className="custom-heading-one mb-4 sm:mb-6"
//           variants={fadeInUp}
//         >
//           FAMEX <span className="text-[#a38b41]">PODCAST</span>
//         </motion.h1>

//         <motion.p variants={fadeInUp}>
//           The experience that will be sure to give you exposure to spot light
//           your career
//         </motion.p>
//       </motion.div>

//       <motion.div
//         className="flex md:justify-between md:flex-row flex-col gap-3 container z-50 absolute bottom-10"
//         variants={staggerContainer}
//       >
//         <motion.div className="" variants={fadeInUp}>
//           <motion.button
//             className="custom-button-two"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             transition={{ duration: 0.2 }}
//           >
//             BE INTERVIEWED
//           </motion.button>
//         </motion.div>

//         <motion.a
//           className="text-gray-400"
//           href="mailto:info@FAMEXPODCAST.com"
//           variants={fadeInUp}
//           whileHover={{
//             color: "#a38b41",
//             transition: { duration: 0.2 },
//           }}
//         >
//           info@FAMEXPODCAST.com
//         </motion.a>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default Podcast;
import { motion } from "framer-motion";
import micImage from "../../assets/images/podcast-bg3.png";

const Podcast = () => {
  // Animation variants
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

  const fadeInRight = {
    hidden: {
      opacity: 0,
      x: 30,
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

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  // Letter animation for heading
  const letterAnimation = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Word animation for paragraph
  const wordAnimation = {
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

  const famexLetters = "FAMEX".split("");
  const podcastLetters = "PODCAST".split("");

  const paragraphWords =
    "The experience that will be sure to give you exposure to spotlight your career".split(
      " "
    );

  return (
    <motion.section
      id="podcast"
      className="relative h-[60vh] md:h-[70vh] bg-cover bg-center bg-no-repeat w-full flex items-center text-white px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        backgroundImage: `url(${micImage})`,
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${micImage})`,
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
          {/* Left Content */}
          <motion.div
            className="lg:col-span-8 text-center lg:text-left"
            variants={staggerContainer}
          >
            {/* Live Badge */}
            {/* <motion.div
              className="flex justify-center lg:justify-start mb-6"
              variants={fadeInUp}
            >
              <motion.div
                className="inline-flex items-center px-4 py-2 rounded-full bg-[#a38b41]/20 border border-[#a38b41]/40"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="w-2 h-2 bg-[#a38b41] rounded-full mr-2"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="text-sm font-medium text-[#a38b41] uppercase tracking-wider">
                  Live Podcast
                </span>
              </motion.div>
            </motion.div> */}

            {/* Animated Heading */}
            <div className="mb-8">
              {/* FAMEX */}
              <motion.h1 className="custom-heading-one">
                <motion.div
                  className="inline-block"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
                >
                  {famexLetters.map((letter, index) => (
                    <motion.span
                      key={index}
                      className="inline-block"
                      variants={letterAnimation}
                      whileHover={{
                        scale: 1.1,
                        color: "#c2ab67",
                        transition: { duration: 0.2 },
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.div>
                <br />
                {/* PODCAST */}
                <motion.div
                  className="inline-block text-[#a38b41]"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ staggerChildren: 0.1, delayChildren: 0.8 }}
                >
                  {podcastLetters.map((letter, index) => (
                    <motion.span
                      key={index}
                      className="inline-block"
                      variants={letterAnimation}
                      whileHover={{
                        scale: 1.1,
                        textShadow: "0 0 20px rgba(163, 139, 65, 0.8)",
                        transition: { duration: 0.2 },
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.h1>
            </div>

            {/* Animated Paragraph */}
            <motion.div
              className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.08, delayChildren: 1.5 }}
            >
              {paragraphWords.map((word, index) => (
                <motion.span
                  key={index}
                  className={`inline-block mr-2 ${
                    word === "exposure" ? "text-[#a38b41] font-semibold" : ""
                  }`}
                  variants={wordAnimation}
                  whileHover={
                    word === "exposure"
                      ? {
                          scale: 1.1,
                          color: "#c2ab67",
                          transition: { duration: 0.2 },
                        }
                      : {}
                  }
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA Section */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center"
              variants={fadeInUp}
            >
              {/* Interview Button */}
              <motion.button
                className="custom-button-two "
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(163, 139, 65, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ transitionDelay: "2s" }}
              >
                <motion.div className="absolute  inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative z-10">BE INTERVIEWED</span>
              </motion.button>

              {/* Email Contact */}
              <motion.a
                href="mailto:info@FAMEXPODCAST.com"
                className="text-gray-400 font-medium text-base group relative"
                whileHover={{
                  color: "#a38b41",
                }}
                transition={{ duration: 0.3 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ transitionDelay: "2.2s" }}
              >
                <span>info@FAMEXPODCAST.com</span>
                <motion.div className="absolute bottom-0 left-0 h-[2px] bg-[#a38b41] w-0 group-hover:w-full transition-all duration-300" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Visual Element */}
          <motion.div
            className="lg:col-span-4 hidden lg:flex justify-center items-center"
            variants={fadeInRight}
          >
            <motion.div
              className="relative"
              animate={{
                y: [-8, 8, -8],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Main Circle */}
              <motion.div
                className="w-56 h-56 border-2 border-[#a38b41]/30 rounded-full flex items-center justify-center backdrop-blur-sm"
                whileHover={{
                  borderColor: "rgba(163, 139, 65, 0.6)",
                  scale: 1.05,
                }}
                transition={{ duration: 0.3 }}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                style={{ transitionDelay: "1.8s" }}
              >
                {/* Microphone */}
                <motion.div
                  className="w-16 h-24 bg-gradient-to-b from-[#a38b41]/40 to-[#a38b41]/20 rounded-t-full border border-[#a38b41]/40"
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Sound Waves */}
              <motion.div className="absolute inset-0 flex items-center justify-center">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute border border-[#a38b41]/20 rounded-full"
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [0.4, 0, 0.4],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeOut",
                    }}
                    style={{
                      width: `${56 + i * 20}px`,
                      height: `${56 + i * 20}px`,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Corner Decorations */}
      <motion.div
        className="absolute top-8 right-8 w-3 h-3 bg-[#a38b41]/60 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-8 left-8 w-2 h-2 bg-[#a38b41]/40 rounded-full"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </motion.section>
  );
};

export default Podcast;
