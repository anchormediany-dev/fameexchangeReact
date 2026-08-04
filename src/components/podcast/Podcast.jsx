import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import micImage from "../../assets/home/thefamepodcast.png";

const Podcast = () => {
  const navigate = useNavigate();
  const handlePodcastClick = () => navigate("/signup/fan");
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

  return (
    <motion.section
      id="podcast"
      onClick={handlePodcastClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handlePodcastClick(); }}
      className="relative cursor-pointer h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[50vh] xl:h-[80vh] bg-black bg-contain bg-right bg-no-repeat w-full flex items-center text-white px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        backgroundImage: `url(${micImage})`,
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-contain bg-right bg-no-repeat"
        style={{
          backgroundImage: `url(${micImage})`,
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-black/10"
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
            {/* <div className="mb-8">
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
            </div> */}

            {/* Animated Paragraph */}
            {/* <motion.div
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
            </motion.div> */}

            {/* Tagline above CTA */}
            <motion.div
              className="hidden lg:block mb-6 text-center lg:text-left"
              variants={fadeInUp}
            >
              <p className="text-2xl md:text-3xl font-semibold text-white leading-tight">
                Give us 15 minutes
              </p>
              <p className="text-lg md:text-xl text-gray-300 mt-1">
                Tell us about you the{" "}
                <span className="text-[#a38b41] font-semibold">BRAND</span>.
              </p>
            </motion.div>

          </motion.div>

          {/* Right Visual Element */}
          {/* <motion.div
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
          </motion.div> */}
        </div>
      </div>

      {/* <motion.div
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
      /> */}

      {/* <motion.div
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
      /> */}
    </motion.section>
  );
};

export default Podcast;
