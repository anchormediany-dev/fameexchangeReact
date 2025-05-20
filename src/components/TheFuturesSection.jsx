import React from "react";
import futuresImage from "../assets/images/futures-bg.png";

const TheFuturesSection = () => {
  const sectionStyle = {
    backgroundImage: `url(${futuresImage})`,
  };

  return (
    <section
      className="w-full h-screen md:h-[85vh] lg:h-[80vh] bg-cover bg-center bg-no-repeat relative"
      style={sectionStyle}
    >
      {/* Semi-transparent black overlay */}
      <div className="absolute inset-0 "></div>

      {/* Content container */}
      <div className="absolute inset-0 container mx-auto px-6 md:px-8 lg:px-12">
        <div className="h-full flex flex-col justify-start w-[400px] 2xl:py-16 py-12">
          <h1 className="text-[#a38b41] custom-heading-one tracking-wide">
            THE FUTURES
          </h1>
          <p className="text-white tracking-wider uppercase mt-2">
            BE SPONSORED & GET ADOPTED
          </p>
        </div>
      </div>
    </section>
  );
};

export default TheFuturesSection;
