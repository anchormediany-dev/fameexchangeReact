import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  closeSignupModal,
  selectSignupModalOpen,
} from "../features/auth/signupModalSlice";
import useBodyScrollLock from "../hooks/useBodyScrollLock";

const SignupModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectSignupModalOpen); // ✅

  const onClose = () => dispatch(closeSignupModal());
  useBodyScrollLock(isOpen);

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
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center" // 👈 give it a tint
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="bg-black rounded-[20px] p-16 text-white relative flex flex-col items-center"
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

            <h2 className="font-paragraph-xl mb-4 text-primary">Sign Up</h2>

            <Link
              to="/signup/fan"
              onClick={onClose}
              className="bg-gray text-center hover:bg-primary hover:scale-105 text-white py-3 px-6 w-full mb-3 rounded-xl transition-all duration-300 font-button-lg-alt"
            >
              TRADER/FAN
            </Link>

            <Link
              to="/signup/talent"
              onClick={onClose}
              className="bg-gray text-center hover:bg-primary hover:scale-105 text-white py-3 px-6 w-full mb-3 rounded-xl transition-all duration-300 font-button-lg-alt"
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
