import womenScafold from "../assets/images/women-scafold.png";
import menSinging from "../assets/images/men-singing.png";
import raphaelRenter from "../assets/images/raphael-renter.png";
import { useState } from "react";
import LoginSignupModal from "./LoginSignupModal";
const Futures = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };
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
      <section
        id="futured"
        className="relative text-white pt-12 px-4 md:px-10 lg:px-20"
      >
        {/* Fixed Bubbles */}
        {/* <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute w-60 h-60 bg-white/5 rounded-full top-[-100px] left-[-100px]" />
          <div className="absolute w-40 h-40 bg-white/5 rounded-full bottom-[-50px] right-[-50px]" />
        </div> */}

        {/* Content Layer */}
        <div className="relative z-10 text-center container max-w-4xl mx-auto">
          <h2 className="text-p2 py-5 sm:text-p1 md:text-h6 lg:text-h5 xl:text-h4 2xl:text-h3 lg:text-5xl font-bold text-center text-white">
            FUTURES
          </h2>
          <p className="text-grayLight font-medium text-p3">
            Haven’t Been Able To Qualify? Welcome, You Are Now An Integral Part
            Of Our Platform.
            <br />
            <span className="text-yellow-400 font-semibold">
              Register To Be Seen And Heard!
            </span>{" "}
            You Are A Rising Star
          </p>
        </div>

        {/* Images */}
        <div className="relative z-10 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <img
            src={raphaelRenter}
            alt="Performer 1"
            className="w-full h-[600px] object-cover object-center"
          />
          <img
            src={womenScafold}
            alt="Performer 2"
            className="w-full h-[600px] object-cover object-center"
          />
          <img
            src={menSinging}
            alt="Performer 3"
            className="w-full h-[600px] object-cover object-center"
          />
        </div>

        {/* Button */}
        <div className="relative z-10 flex justify-center mt-10 pb-12">
          <button
            onClick={openLoginModal}
            className="bg-lightYellow cursor-pointer hover:scale-105 text-black font-medium px-6 py-3 rounded-md transition-all duration-300 relative group text-p5 2xl:text-p1"
          >
            Discover More
          </button>
        </div>

        {/* Import Famecoin Heading */}
        <h2 className="relative z-10 text-p2 pb-12 sm:text-p1 md:text-h6 lg:text-h5 xl:text-h4 2xl:text-h3 lg:text-5xl font-bold text-center text-primary">
          <span className="text-white">Import Your</span> Famecoin
        </h2>
      </section>{" "}
      {/* Login Modal */}
      <LoginSignupModal
        isOpen={isLoginModalOpen}
        setIsOpenLoginSignup={setIsLoginModalOpen}
        onClose={closeLoginModal}
      />
    </>
  );
};

export default Futures;
