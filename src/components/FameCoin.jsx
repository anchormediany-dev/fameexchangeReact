import React from "react";
import FameCoinLogo from "../assets/icons/famecoin-logo.svg?react";
const FameCoin = () => {
  return (
    <section className="famecoin-bg text-white relative min-h-[80vh] flex items-center justify-center">
      <div className="absolute inset-0 bg-[#070707]/50 z-0" />
      <div className="container relative z-10 flex flex-col items-center text-center space-y-8 py-12">
        <h1 className="text-p2 sm:text-p1 md:text-h6 lg:text-h5 xl:text-h4 2xl:text-h3 lg:text-5xl font-bold text-primary">
          The Platform For FANS To Exchange Famecoin
        </h1>
        <FameCoinLogo className="max-w-[424px] h-full" />

        <button className="bg-lightYellow cursor-pointer hover:scale-105 text-black font-medium px-6 py-3 rounded-md transition-all duration-300  relative group text-p5  2xl:text-p1">
          Transfer Your Fame Coin To The Platform Now
        </button>
      </div>
    </section>
  );
};

export default FameCoin;
