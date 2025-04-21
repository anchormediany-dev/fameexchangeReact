import { AnimatePresence, motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const popupVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
  exit: { scale: 0.9, opacity: 0, transition: { duration: 0.2 } },
};

const CalculatingNetworthPopup = () => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 w-full h-full px-10 z-50 bg-transparent backdrop-blur-sm flex justify-center items-center"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className="bg-black rounded-[20px] p-8 sm:p-16 text-white relative flex flex-col gap-5 items-center"
          variants={popupVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <h2 className="text-xl font-semibold text-primary">
            Calculating Your Networth
          </h2>
          <p className="text-gray-300 text-sm text-center">
            Processing Your Social Media, Please Wait. <br />
            Analyzing Snapshot Account
          </p>

          <FaSpinner className="animate-spin text-primary text-7xl" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CalculatingNetworthPopup;
