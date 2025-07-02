import { motion } from "framer-motion";

const AMLSectionCard = ({ section, delay }) => {
  return (
    <motion.section
      key={section.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`p-8 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-lg hover:border-[#e2cb68]/30 transition-all duration-300 ${
        section.id === 5
          ? "bg-gradient-to-br from-[#e2cb68]/10 to-[#e2cb68]/5 border-[#e2cb68]/20"
          : "bg-gradient-to-br from-white/5 to-white/2"
      }`}
      id={`section-${section.id}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold gradientText flex items-center gap-2">
          {section.icon} {section.title}
        </h2>
      </div>
      <div className="text-gray-300">{section.content}</div>
    </motion.section>
  );
};

export default AMLSectionCard;
