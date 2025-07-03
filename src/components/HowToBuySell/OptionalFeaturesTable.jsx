import { motion } from "framer-motion";
import { FiTrendingUp } from "react-icons/fi";

const OptionalFeaturesTable = ({
  optionalFeatures,
  colors,
  itemVariants,
  containerVariants,
}) => (
  <motion.section
    variants={itemVariants}
    className="px-4 sm:px-6 lg:px-8 container mx-auto mb-16"
  >
    <motion.h2
      whileHover={{ scale: 1.02 }}
      className="text-3xl font-bold mb-8 text-center flex items-center justify-center"
      style={{ color: colors.text }}
    >
      <FiTrendingUp className="mr-3 gredient-icon" />
      Optional Features
    </motion.h2>

    <motion.div
      variants={containerVariants}
      className="overflow-hidden rounded-2xl border border-gray-700 shadow-md"
    >
      <div className="overflow-x-auto custom-scrollbar">
        <motion.table
          whileHover={{ scale: 1.002 }}
          className="w-full text-sm md:text-base"
        >
          <thead>
            <tr
             className="gradient-bg"
            >
              <th className="text-left py-4 px-6 font-semibold text-black uppercase tracking-wide">
                Feature
              </th>
              <th className="text-left py-4 px-6 font-semibold text-black uppercase tracking-wide">
                Available To
              </th>
              <th className="text-left py-4 px-6 font-semibold text-black uppercase tracking-wide">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {optionalFeatures.map((feature, index) => (
              <motion.tr
                key={index}
                variants={itemVariants}
                whileHover={{
                  backgroundColor: `${colors.primary}15`,
                  scale: 1.005,
                }}
                className={`transition-all duration-200 ${
                  index % 2 === 0 ? "bg-[#1e1e1e]" : "bg-[#252525]"
                }`}
              >
                <td
                  className="py-4 px-6 font-medium whitespace-nowrap"
                  style={{ color: colors.text }}
                >
                  {feature.feature}
                </td>
                <td
                  className="py-4 px-6 whitespace-nowrap"
                  style={{ color: colors.textSecondary }}
                >
                  {feature.availableTo}
                </td>
                <td
                  className="py-4 px-6"
                  style={{ color: colors.textSecondary }}
                >
                  {feature.description}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </motion.div>
  </motion.section>
);

export default OptionalFeaturesTable;
