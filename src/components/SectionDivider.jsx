import dividerImage from "../assets/home/btsbanner.png";
const SectionDivider = () => {
  return (
    <section className="bg-[#171717] text-white relative overflow-hidden h-[300px] sm:h-[360px] md:h-[420px] lg:h-[460px]">
      {/* The source image itself is a wide (~4:1) banner with the left/right
          edges extended out from the original artwork's own edge pixels
          (gold light-streaks continued outward) — no separate blurred
          backdrop layer needed anymore, object-cover alone reaches full
          width at any viewport with no empty gaps and no cropping of the
          actual subjects/logo in the middle. */}
      <img
        src={dividerImage}
        className="w-full h-full object-cover object-center"
        alt="The Fame Exchange"
      />
    </section>
  );
};

export default SectionDivider;
