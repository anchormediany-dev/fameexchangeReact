import { motion } from "framer-motion";
import { FiInfo, FiAlertCircle, FiArrowRight } from "react-icons/fi";

const TipsAndNotes = ({
  tips,
  importantNotes,
  itemVariants,
  containerVariants,
  colors,
}) => (
  <motion.section
    variants={itemVariants}
    className="px-4 sm:px-6 lg:px-8 container mx-auto mb-16"
  >
    <motion.div
      variants={containerVariants}
      className="grid md:grid-cols-2 gap-8"
    >
      {/* Tips */}
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        className="rounded-xl p-8"
        style={{
          backgroundColor: colors.cardBg,
          border: `1px solid ${colors.border}`,
        }}
      >
        <motion.h3
          whileHover={{ x: 5 }}
          className="text-2xl font-bold mb-6 !flex items-center gredient-text"
        >
          <FiInfo className="mr-3 gredient-icon" /> Tips for All Users
        </motion.h3>
        <ul className="space-y-3">
          {tips.map((tip, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              whileHover={{ x: 5 }}
              className="flex"
              style={{ color: colors.textSecondary }}
            >
              <FiArrowRight className="mt-1 text-base mr-2 gredient-icon" />
              {tip}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Important Notes */}
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        className="rounded-xl p-8"
        style={{
          backgroundColor: colors.cardBg,
          border: `1px solid ${colors.error}30`,
        }}
      >
        <motion.h3
          whileHover={{ x: 5 }}
          className="text-2xl font-bold mb-6 flex items-center"
          style={{ color: colors.error }}
        >
          <FiAlertCircle className="mr-3" /> Important Notes
        </motion.h3>
        <ul className="space-y-3">
          {importantNotes.map((note, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              whileHover={{ x: 5 }}
              className="flex"
              style={{ color: colors.textSecondary }}
            >
            <FiArrowRight style={{ color: colors.error }} className="mt-1 text-base mr-2 gredient-icon" />
              {note}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  </motion.section>
);

export default TipsAndNotes;
