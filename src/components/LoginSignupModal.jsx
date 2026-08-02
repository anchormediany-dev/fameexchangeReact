import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { useEffect } from "react";
const LoginSignupModal = ({ isOpen, onClose, setIsOpenLoginSignup }) => {
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

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoginSignupOpen, setIsLoginSignupOpen] = useState(false);

  // for login modals
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsOpenLoginSignup(false);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };
  // for signup modals
  const openSignupModal = () => {
    setIsSignupModalOpen(true);
    setIsLoginSignupOpen(false);
    setIsOpenLoginSignup(false);
  };

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
  };
  const closeLoginSignupModal = () => {
    setIsLoginSignupOpen(false);
  };
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("body-no-scroll");
    } else {
      document.body.classList.remove("body-no-scroll");
    }

    return () => {
      document.body.classList.remove("body-no-scroll");
    };
  }, [isOpen]);
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full px-10 z-50 bg-transparent backdrop-blur-sm flex justify-center items-center"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          >
            <motion.div
              className="bg-black rounded-[20px] p-8 sm:p-16 max-w-[500px] text-white relative flex flex-col justify-center items-center" // Modal background
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
              <h2 className="font-paragraph-xl mb-4 text-primary">
                Please Sign Up Or Log In To Trade Any Talent Tokens
              </h2>
              <button
                onClick={openLoginModal}
                className="bg-gray cursor-pointer hover:bg-primary hover:scale-105 text-white font-button-lg-alt py-3 px-6 w-full mb-3  rounded-xl transition-all duration-300"
              >
                Log In
              </button>
              <button
                onClick={openSignupModal}
                className="bg-gray cursor-pointer hover:bg-primary hover:scale-105 text-white py-3 px-6 w-full mb-3  rounded-xl transition-all duration-300 font-button-lg-alt"
              >
                Sign Up
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <SignupModal isOpen={isSignupModalOpen} onClose={closeSignupModal} />
    </>
  );
};

export default LoginSignupModal;
