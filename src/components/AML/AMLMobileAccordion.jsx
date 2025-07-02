import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const AMLMobileAccordion = ({ section, isExpanded, onToggle, delay }) => (
  <motion.div
    key={section.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-white/5 rounded-xl shadow-lg border border-white/10 backdrop-blur-sm overflow-hidden"
  >
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-6 text-left"
    >
      <div className="flex items-center gap-3">
        <div className="text-xl font-bold text-[#e2cb68]">{section.id}.</div>
        <h2 className="text-xl font-bold gradientText flex items-center gap-2">
          {section.icon} {section.title}
        </h2>
      </div>
      {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
    </button>

    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{
        opacity: isExpanded ? 1 : 0,
        height: isExpanded ? "auto" : 0,
      }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <div className="px-6 pb-6 pt-0 text-gray-300">{section.content}</div>
    </motion.div>
  </motion.div>
);

export default AMLMobileAccordion;
