import { GoArrowUpRight } from "react-icons/go";
import talentTradingImage from "../assets/images/talent-trading-image.png";
import imageText from "../assets/images/fame-exchange-image-text.png";
const TalentTradingSection = () => {
  return (
    <section className="bg-[#171717] text-white py-16 px-6 md:px-16 relative overflow-hidden">
      <div className="mb-10">
        <img src={imageText} alt="" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-10">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden">
          <p className="text-center mb-1 heading-500-35">TALENT TRADING</p>
          <img
            src={talentTradingImage}
            alt="Talent Trading"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        {/* Text Content */}
        <div className="space-y-6">
          <h2 className="heading-700-50 leading-tight">
            TRANSFORMING FAN
            <br />
            INTERACTION & TALENT
            <br />
            MONETIZATION
          </h2>
          <p className="text-[#878787] heading-400-20  max-w-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip.
          </p>

          <button className="mt-4 px-6 py-3 bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-white rounded-lg flex items-center gap-2 hover:brightness-110 transition-all">
            Read More <GoArrowUpRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TalentTradingSection;
