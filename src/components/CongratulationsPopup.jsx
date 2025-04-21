import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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

const CongratulationsPopup = ({ onClose }) => {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    onClose?.();
    setTimeout(() => {
      navigate("/login");
    }, 300);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 w-full h-full px-4 sm:px-10 z-50 bg-transparent backdrop-blur-sm flex justify-center items-center"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className="bg-black rounded-[20px] p-6 sm:p-12 text-white text-center max-w-md w-full
                     overflow-y-auto max-h-screen sm:overflow-visible"
          variants={popupVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-2">
            Congratulation
          </h2>
          <h3 className="text-lg mb-4">
            Welcome To{" "}
            <span className="text-yellow-400 font-semibold">
              The Fame Exchange!
            </span>
          </h3>
          <p className="text-sm text-gray-300 mb-2">
            We've Checked Out Your Network And Are Glad To Award You With
          </p>
          <p className="text-2xl font-bold text-white mb-4">100000</p>
          <p className="text-sm text-gray-300 mb-6">
            Get The Word Out There And Share Your Coin With The World By
            Clicking The Share Button In Your Dashboard!
          </p>
          <button
            onClick={handleGoToDashboard}
            type="button"
            className="bg-gray text-center hover:bg-primary hover:text-white w-full hover:scale-105 text-primary font-medium px-6 py-3 rounded-md transition-all duration-300 group text-p5 cursor-pointer 2xl:text-p1"
          >
            Go To Dashboard
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CongratulationsPopup;
