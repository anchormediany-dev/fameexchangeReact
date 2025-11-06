import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GoArrowUpRight } from "react-icons/go";
import talentTradingImage from "../assets/images/talent-trading-image.png";
import imageText from "../assets/images/fame-exchange-image-text.png";
import { useNavigate } from "react-router-dom";
const TalentTradingSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="bg-[#171717] text-white py-12 2xl:py-16 px-6 md:px-16 relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-2 container"
      >
        <img
          style={{
            width: "-webkit-fill-available",
          }}
          src={imageText}
          alt="Graphic Text"
        />
      </motion.div>

      <div className="relative z-10 container grid 2xl:grid-cols-2 items-center gap-10">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-1 custom-heading-four"
          >
            TALENT TRADING
          </motion.p>
          <motion.img
            initial={{ opacity: 0, scale: 1.05 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }
            }
            transition={{ duration: 0.7, delay: 0.3 }}
            src="https://cdn.pixabay.com/photo/2021/08/08/15/01/trading-6531134_640.jpg"
            alt="Talent Trading"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        {/* Text Content */}
        <div className="space-y-6">
          <motion.h3
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="custom-heading-one"
          >
            TRANSFORMING FAN INTERACTION & TALENT MONETIZATION
          </motion.h3>

          <div className="group h-40 w-96  flex justify-end items-center w-full transition-all duration-500 hover:scale-105">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-[#878787]"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip.
            </motion.p>
            <img
              src="/fame-gif.gif"
              alt="fame coin"
              className=" w-96 h-96   transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <motion.button
            onClick={() => navigate("/all-talents")}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-[#a18a3f] cursor-pointer to-[#e6ca7c] text-white rounded-lg flex items-center gap-2 hover:brightness-110 transition-all"
          >
            Read More
            <motion.div whileHover={{ x: 3, y: -3 }}>
              <GoArrowUpRight size={24} />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default TalentTradingSection;
