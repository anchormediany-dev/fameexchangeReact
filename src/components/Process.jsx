import React from "react";
import processImg from "../assets/images/process-img.png";
const Process = () => {
  return (
    <section className="process-bg text-white relative min-h-[80vh] flex items-center justify-center">
      <div className="absolute inset-0 bg-[#070707]/85 z-0" />
      <div className="container relative z-10 py-20">
        <div className="pb-[120px]">
          {" "}
          <h1 className="text-p2 sm:text-p1 md:text-h6 lg:text-h5 xl:text-h4 2xl:text-h3 lg:text-5xl font-bold text-center text-white">
            The Process
          </h1>
          <p className="text-center font-medium text-p3 mt-8 text-primary">
            Reverse this process to convers your Famecoin into Fiat Currency
          </p>
        </div>
        <div>
          <img src={processImg} alt="" />
        </div>{" "}
        <div className="flex justify-center pt-[115px]">
          <button className="bg-lightYellow cursor-pointer hover:scale-105 text-black font-medium px-6 py-3 rounded-md transition-all duration-300  relative group text-p5  2xl:text-p1">
            Discover More
          </button>
        </div>
      </div>{" "}
    </section>
  );
};

export default Process;
