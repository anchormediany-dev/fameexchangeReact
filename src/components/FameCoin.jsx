import React from "react";
import FameCoinLogo from "../assets/icons/famecoin-logo.svg?react";
import { useState } from "react";
import LoginSignupModal from "./LoginSignupModal";
const FameCoin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  // for login modals
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsOpen(false);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };
  return (
    <>
      <section className="famecoin-bg text-white relative min-h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-[#070707]/50 z-0" />
        <div className="container relative z-10 flex flex-col items-center text-center space-y-8 py-12">
          <h1 className="font-heading-display text-primary">
            The Platform For FANS To Exchange Famecoin
          </h1>
          <FameCoinLogo className="max-w-[424px] h-full" />

          <button
            onClick={openLoginModal}
            className="bg-lightYellow cursor-pointer hover:scale-105 text-black px-6 py-3 rounded-md transition-all duration-300  relative group font-button-bold"
          >
            Transfer Your Fame Coin To The Platform Now
          </button>
        </div>
      </section>
      {/* Login Modal */}
      <LoginSignupModal
        isOpen={isLoginModalOpen}
        setIsOpenLoginSignup={setIsLoginModalOpen}
        onClose={closeLoginModal}
      />
    </>
  );
};

export default FameCoin;
