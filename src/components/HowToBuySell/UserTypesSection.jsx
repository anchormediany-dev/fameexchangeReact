import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { FiUser } from "react-icons/fi";

const UserTypesSection = ({
  userTypes,
  itemVariants,
  containerVariants,
  colors,
}) => (
  <motion.section
    variants={containerVariants}
    className="px-4 sm:px-6 lg:px-8 container mx-auto mb-16"
  >
    <motion.h2
      variants={itemVariants}
      className="text-3xl font-bold mb-8 text-center flex items-center  justify-center "
    >
      <FiUser className="mr-3 gredient-icon" />{" "}
      <span className="gredient-text">User Types</span>
    </motion.h2>

    <motion.div
      variants={containerVariants}
      className="grid md:grid-cols-3 gap-6"
    >
      {userTypes.map((user) => (
        <motion.div
          key={user.type}
          variants={itemVariants}
          whileHover={{ y: -5 }}
          className="p-6 rounded-xl transition-all"
          style={{
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.border}`,
          }}
        >
          <div className="flex items-center mb-4">
            <div
              className="p-2 rounded-full mr-3 gradient-bg"
              style={{
                color: colors.background,
              }}
            >
              {user.icon}
            </div>
            <h3 className="text-xl font-bold gredient-text">
              {user.type}
            </h3>
          </div>
          <p className="mb-4" style={{ color: colors.textSecondary }}>
            {user.description}
          </p>
          <div className="space-y-2">
            {user.features.map((feature, i) => (
              <p
                key={i}
                className="flex items-center"
                style={{ color: colors.textSecondary }}
              >
                <FaCheckCircle
                  className="mr-2 gredient-icon"
                />
                {feature}
              </p>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  </motion.section>
);

export default UserTypesSection;
