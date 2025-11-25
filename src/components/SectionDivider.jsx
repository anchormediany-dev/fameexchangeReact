import React from "react";
import dividerImage from "../assets/home/bannerathletes.png";
const SectionDivider = () => {
  return (
    <section className="bg-[#171717] text-white relative overflow-hidden">
      <img
        style={{
          width: "-webkit-fill-available",
        }}
        src={dividerImage}
        className=" object-center h-[540px]"
        alt="The Fame Exchange"
      />
    </section>
  );
};

export default SectionDivider;
