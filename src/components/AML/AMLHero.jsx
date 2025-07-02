import { motion } from "framer-motion";
import { FiFileText, FiCalendar, FiEdit2 } from "react-icons/fi";

const AMLHero = () => (
  <section className="text-center mb-16 md:mb-24">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="inline-flex gradient-bg items-center justify-center px-6 py-3 rounded-full mb-6 backdrop-blur-sm"
    >
      <FiFileText className="text-[#171717] mr-2" />
      <span className="text-[#171717] font-medium text-sm uppercase tracking-wider">
        Compliance Policy
      </span>
    </motion.div>

    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
    >
      Anti-Money Laundering <br className="hidden sm:block" />
      <span className="gredient-text">Policy</span>
    </motion.h1>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 text-gray-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed"
    >
      <div className="flex items-center bg-white/5 px-4 py-2 rounded-lg backdrop-blur-sm">
        <FiCalendar className="mr-2 text-[#e2cb68]" />
        <span>
          Effective: <span className="gredient-text">June 15, 2025</span>
        </span>
      </div>
      <div className="flex items-center bg-white/5 px-4 py-2 rounded-lg backdrop-blur-sm">
        <FiEdit2 className="mr-2 text-[#e2cb68]" />
        <span>
          Last updated: <span className="gredient-text">June 15, 2025</span>
        </span>
      </div>
    </motion.div>
  </section>
);

export default AMLHero;
