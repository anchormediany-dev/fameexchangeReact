import React from "react";
import processImg from "../assets/images/process-img.png";
import { useState } from "react";
import LoginSignupModal from "./LoginSignupModal";
const Process = () => {
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
      {" "}
      <section className="process-bg text-white relative  flex items-center justify-center">
        <div className="absolute inset-0 bg-[#070707]/85 z-0" />
        <div className="container relative z-10 py-12">
          <div className="md:pb-[120px] pb-12">
            {" "}
            <h1 className="font-heading-hero text-center text-white">
              The Process
            </h1>
            <p className="text-center font-button-xl-alt mt-8 text-primary">
              Reverse this process to withdraw your funds as cash
            </p>
          </div>
          <div>
            <img src={processImg} alt="" />
          </div>{" "}
          <div className="flex justify-center pt-[115px]">
            <button
              onClick={openLoginModal}
              className="bg-lightYellow cursor-pointer hover:scale-105 text-black font-medium px-6 py-3 rounded-md transition-all duration-300  relative group font-button-xl-alt"
            >
              Discover More
            </button>
          </div>
        </div>{" "}
      </section>
      <LoginSignupModal
        isOpen={isLoginModalOpen}
        setIsOpenLoginSignup={setIsLoginModalOpen}
        onClose={closeLoginModal}
      />
    </>
  );
};

export default Process;
