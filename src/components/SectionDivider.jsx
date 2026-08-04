import dividerImage from "../assets/home/btsbanner.png";
const SectionDivider = () => {
  return (
    <section className="bg-[#171717] text-white relative overflow-hidden h-[300px] sm:h-[360px] md:h-[420px] lg:h-[460px]">
      {/* Blurred, scaled-up fill so the sharp image never has to be
          cropped or stretched to reach the edges — same technique as a
          video player's letterbox fill. Purely decorative backdrop. */}
      <img
        src={dividerImage}
        aria-hidden="true"
        alt=""
        className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110"
      />
      {/* The real, undistorted image — always fully visible. */}
      <img
        src={dividerImage}
        className="relative w-full h-full object-contain object-center"
        alt="The Fame Exchange"
      />
    </section>
  );
};

export default SectionDivider;
