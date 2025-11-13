import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GoArrowUpRight } from "react-icons/go";
import talentTradingImage from "../assets/home/talent-trading.jpg";
import imageText from "../assets/images/fame-exchange-image-text.png";
import { useNavigate } from "react-router-dom";

const TalentTradingSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="bg-[#171717] text-white py-16 lg:py-20 2xl:py-24 px-4 sm:px-6 md:px-16 relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        // className="mt-2 container mx-auto mb-12 lg:mb-16"
      >
        {/* <img
          src={imageText}
          alt="Graphic Text"
          // className="w-full max-w-3xl mx-auto"
          style={{
            width: "-webkit-fill-available",
          }}
        /> */}
      </motion.div>

      <div className="relative z-10 container mx-auto grid lg:grid-cols-2 items-center gap-10 lg:gap-12 xl:gap-16  px-4 ">
        {/* Image Section */}
        <div className="rounded-2xl overflow-hidden order-1 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-4 lg:mb-6 custom-heading-four text-[#a38b41] text-lg sm:text-xl md:text-2xl"
          >
            TALENT TRADING
          </motion.p>
          <div className="max-h-[280px] sm:max-h-[320px] md:max-h-[380px] lg:max-h-[420px] xl:max-h-[480px]">
            <motion.img
              initial={{ opacity: 0, scale: 1.05 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 1.05 }
              }
              transition={{ duration: 0.7, delay: 0.3 }}
              src={talentTradingImage}
              alt="Talent Trading"
              className="w-full h-full object-cover object-center rounded-2xl"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-8 lg:space-y-10 xl:space-y-12 order-2 lg:order-2">
          <motion.h3
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="custom-heading-four text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight"
          >
            TRANSFORMING FAN INTERACTION & TALENT MONETIZATION
          </motion.h3>

          <div className="flex flex-col lg:flex-row items-center gap-6  w-full transition-all duration-500">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-[#878787] text-sm sm:text-base md:text-lg lg:text-base xl:text-lg flex-1 leading-relaxed"
            >
              Through our innovative Talent Trading platform, fans can now buy,
              sell, and hold Branded Talent Shares—creating a new level of
              engagement where support becomes real investment. For talent, this
              unlocks a powerful revenue stream and deeper fan loyalty, turning
              fame into measurable value.
            </motion.p>
            <div className="flex-shrink-0">
              <img
                src="/fame-gif.gif"
                alt="fame coin"
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 transition-transform duration-700"
              />
            </div>
          </div>

          <motion.button
            onClick={() => navigate("/all-talents")}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="px-6 py-3 bg-gradient-to-r from-[#a18a3f] cursor-pointer to-[#e6ca7c] text-white rounded-lg flex items-center gap-2 hover:brightness-110 transition-all text-sm sm:text-base w-full sm:w-auto justify-center mt-4 lg:mt-6"
          >
            Read More
            <motion.div whileHover={{ x: 3, y: -3 }}>
              <GoArrowUpRight size={20} className="sm:w-6 sm:h-6" />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default TalentTradingSection;
