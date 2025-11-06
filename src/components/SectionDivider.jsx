import React from "react";
import dividerImage from "../assets/images/section-divider.png";
const SectionDivider = () => {
  return (
    <section className="bg-[#171717] text-white  relative overflow-hidden">
      <img
        style={{
          width: "-webkit-fill-available",
        }}
        src={dividerImage}
        alt="The Fame Exchange"
      />
    </section>
  );
};

export default SectionDivider;
