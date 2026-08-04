import dividerImage from "../assets/home/btsbanner.png";
const SectionDivider = () => {
  return (
    <section className="bg-[#171717] text-white relative overflow-hidden">
      <img
        src={dividerImage}
        className="w-full max-w-3xl mx-auto h-auto object-center"
        alt="The Fame Exchange"
      />
    </section>
  );
};

export default SectionDivider;
