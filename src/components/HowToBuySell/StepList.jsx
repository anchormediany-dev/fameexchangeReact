import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const StepList = ({ steps, stepVariants, colors }) => (
  <div className="relative">
    <div
      className="absolute left-8 top-0 h-full w-0.5 bg-gray-600 opacity-30"
      style={{ marginLeft: "28px" }}
    ></div>
    {steps.map((step, i) => (
      <motion.div
        key={step.step}
        custom={i}
        variants={stepVariants}
        initial="hidden"
        animate="visible"
        className="flex relative mb-8 last:mb-0"
      >
        <div className="flex flex-col items-center mr-6 z-10">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="rounded-full w-14 h-14 flex items-center justify-center gradient-bg text-black"
          >
            {step.icon}
          </motion.div>
          {i < steps.length - 1 && (
            <div className="w-0.5 h-full bg-gray-500 opacity-30 my-2"></div>
          )}
        </div>
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="flex-1 p-6 rounded-xl"
          style={{
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.border}`,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="flex items-center mb-4">
            <span className="text-xl font-bold mr-3 gredient-text">
              Step {step.step}
            </span>
            <h3 className="text-xl font-bold" style={{ color: colors.text }}>
              {step.title}
            </h3>
          </div>
          <ul className="space-y-2 pl-1">
            {step.details.map((detail, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm"
                style={{ color: colors.textSecondary }}
              >
                <FiArrowRight className="mt-1 text-base gredient-icon" />
                <span>{detail.replace(/^•\s*/, "")}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    ))}
  </div>
);

export default StepList;
