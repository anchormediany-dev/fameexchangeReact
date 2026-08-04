import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import phoneMockupImage from "../assets/images/app-phones.png";

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const navigate = useNavigate();

  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const phoneVariant = {
    hidden: { opacity: 0, x: -50, rotate: -25 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: -12,
      transition: { type: "spring", stiffness: 100, damping: 15, delay: 0.2 },
    },
  };

  return (
    <div
      ref={sectionRef}
      id="mobileapp"
      className="relative w-full overflow-hidden bg-black py-12 2xl:py-16"
    >
      <div className="absolute inset-0 bg-app-section bg-center z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-16 py-8 sm:py-12 lg:py-16">
        <div className="relative w-full lg:w-1/2 mb-6 sm:mb-8 lg:mb-0">
          <div className="pt-[80%] sm:pt-[70%] md:pt-[60%] lg:pt-[50%] relative">
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={phoneVariant}
              className="absolute left-[10%] sm:left-[15%] top-[18%] sm:top-[14%] md:top-[22%] lg:top-[5%] w-[80%] sm:w-[65%] transform -rotate-12 z-10"
            >
              <div className="relative">
                <img
                  src={phoneMockupImage}
                  alt="Phone mockup"
                  className="w-full rounded-[30px] sm:rounded-[40px] shadow-lg sm:shadow-2xl bg-[#e2cb68]"
                />
                <div className="absolute inset-[8px] sm:inset-[10px] rounded-[22px] sm:rounded-[30px] bg-[#e2cb68]/30" />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 text-white text-center lg:text-left px-4 sm:px-0 lg:pl-8">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUpVariant}
            transition={{ duration: 0.6 }}
            className="custom-heading-six tracking-wide mb-2 sm:mb-3 text-[#a38b41]"
          >
            Mobile App
          </motion.div>

          <motion.h1
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUpVariant}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="custom-heading-one mb-2 sm:mb-3"
          >
            Download Now
          </motion.h1>

          <motion.p
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUpVariant}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-300 mb-6 max-w-xl lg:max-w-none mx-auto"
          >
            The Fame Exchange app is available now on iOS and Android. Trade
            talent, track your portfolio, and never miss a drop — all from
            your phone.
          </motion.p>

          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUpVariant}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex items-center justify-center lg:justify-start gap-4 mb-6 text-gray-300"
          >
            <span className="flex items-center gap-2">
              <FaApple className="text-2xl" />
              <span className="text-sm">iOS</span>
            </span>
            <span className="text-gray-600">|</span>
            <span className="flex items-center gap-2">
              <FaGooglePlay className="text-xl" />
              <span className="text-sm">Android</span>
            </span>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUpVariant}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              type="button"
              onClick={() => navigate("/download-app")}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 20px rgba(230, 202, 124, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              className="font-medium text-black py-3 px-8 rounded-md bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] hover:brightness-110 transition-all cursor-pointer"
            >
              Download Now
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;
