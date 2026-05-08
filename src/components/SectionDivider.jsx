import React from "react";
import dividerImage from "../assets/home/BTSEXPEOPLE.png";
const SectionDivider = () => {
  return (
    <section className="bg-[#171717] text-white relative overflow-hidden">
      <img
        src={dividerImage}
        className="w-full h-auto object-center"
        alt="The Fame Exchange"
      />
    </section>
  );
};

export default SectionDivider;
