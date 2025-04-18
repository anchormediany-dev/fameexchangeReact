import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
const SignupModal = ({ isOpen, onClose }) => {
  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const contentVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: 0.1 } },
    exit: { y: 50, opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full z-50 bg-transparent backdrop-blur-sm flex justify-center items-center"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="bg-black rounded-[20px] p-16 text-white relative flex flex-col justify-center items-center"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-white focus:outline-none"
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-primary">Sign Up</h2>
            <Link
              to="/signup"
              onClick={onClose}
              className="bg-gray cursor-pointer text-center hover:bg-primary hover:scale-105 text-white font-medium py-3 px-6 w-full mb-3  rounded-xl transition-all duration-300 text-p5  2xl:text-p1"
            >
              TRADER/FAN
            </Link>
            <Link
              to="/signup"
              onClick={onClose}
              className="bg-gray text-center cursor-pointer hover:bg-primary hover:scale-105 text-white font-medium py-3 px-6 w-full mb-3  rounded-xl transition-all duration-300 text-p5  2xl:text-p1"
            >
              TALENT/ATHLETE/INFLUENCER
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignupModal;
