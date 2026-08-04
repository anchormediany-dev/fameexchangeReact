import dividerImage from "../assets/home/btsbanner.png";
const SectionDivider = () => {
  return (
    <section className="bg-[#171717] text-white relative overflow-hidden">
      <img
        src={dividerImage}
        className="w-full h-[300px] sm:h-[360px] md:h-[420px] lg:h-[460px] object-cover object-center"
        alt="The Fame Exchange"
      />
    </section>
  );
};

export default SectionDivider;
