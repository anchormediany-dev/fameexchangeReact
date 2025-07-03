import { motion } from "framer-motion";

const FeatureCards = ({ features, colors, itemVariants }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    exit="hidden"
    variants={{
      hidden: { opacity: 0, y: 10 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { staggerChildren: 0.1 },
      },
    }}
    className="grid md:grid-cols-2 gap-6 mt-10"
  >
    {features.map(({ icon, title, description }, index) => (
      <motion.div
        key={index}
        variants={itemVariants}
        whileHover={{ scale: 1.03 }}
        className="rounded-xl p-6 gradient-bg text-black shadow-md"
      >
        <div className="flex items-center mb-3">
          {icon && <span className="text-xl mr-3 text-black">{icon}</span>}
          <h4 className="text-xl font-bold text-black">{title}</h4>
        </div>
        <p className="text-lg text-black">{description}</p>
      </motion.div>
    ))}
  </motion.div>
);

export default FeatureCards;
