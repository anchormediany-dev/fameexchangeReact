import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { openSignupModal as openSignupModalAction } from "../../features/auth/signupModalSlice";

const CallToAction = ({ colors, itemVariants }) => {
  const dispatch = useDispatch();

  return (
    <motion.section
      variants={itemVariants}
      className="px-4 sm:px-6 lg:px-8 container mx-auto mb-16 text-center text-[#000]"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="rounded-xl p-8 gradient-bg"
      >
        <motion.h2
          whileHover={{ scale: 1.05 }}
          className="text-3xl font-bold mb-4"
        >
          Ready to Start Trading BTS?
        </motion.h2>

        <motion.p whileHover={{ scale: 1.05 }} className="text-xl mb-6">
          Join The Fame Exchange today and connect with your favorite Talent
        </motion.p>

        <motion.button
          onClick={() => dispatch(openSignupModalAction())} // ✅ dispatch here
          whileHover={{
            scale: 1.05,
            backgroundColor: colors.background,
            color: colors.primary,
          }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 rounded-full font-bold transition-all"
          style={{ backgroundColor: colors.background, color: colors.primary }}
        >
          Join Now
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

export default CallToAction;
