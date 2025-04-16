import React from "react";
import fansGetTo from "../assets/images/fans-get-to.png";
import easyToTrade from "../assets/images/easy-to-trade.png";
import personalities from "../assets/images/personalities.png";
import checkoutOurInVerse from "../assets/images/checkout-our-in-verse.png";

const FeatureSection = () => {
  return (
    <section
      id="nft"
      className="relative text-white px-4 py-12 overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at top left, #2d2d2d 0%, #0b0b0b 80%)",
      }}
    >
      {/* Decorative Bubbles */}
      <div className="absolute w-60 h-60 bg-white/10 rounded-full top-[-80px] left-[-60px] z-0" />
      <div className="absolute w-40 h-40 bg-white/10 rounded-full bottom-[-40px] right-[-40px] z-0" />
      <div className="absolute w-32 h-32 bg-white/5 rounded-full bottom-[100px] right-[50px] z-0" />

      {/* Main Content */}
      <div className="relative z-10 container grid grid-cols-1 md:grid-cols-2 gap-28">
        {/* Feature Card 1 */}
        <div className="relative">
          <img
            src={fansGetTo}
            alt="Fans at Concert"
            className="w-full object-center"
          />
          <h3 className="text-p1 font-bold text-primary mt-4">Fans Get To</h3>
          <p className="text-grayLight text-sm mt-1">
            Earn With Athlete/ Artists & Personalities Talent Token
          </p>
        </div>

        {/* Feature Card 2 */}
        <div>
          <img
            src={easyToTrade}
            alt="Man trading"
            className="w-full object-center"
          />
          <h3 className="text-p1 font-bold text-primary mt-4">Easy To Trade</h3>
          <p className="text-grayLight text-sm mt-1">
            Famecoin For Branded Talent Token
          </p>
        </div>

        {/* Feature Card 3 */}
        <div id="in-verse">
          <img src={easyToTrade} alt="Woman with glasses" className="w-full" />
          <h3 className="text-p1 font-bold text-primary mt-4">Personalities</h3>
          <p className="text-grayLight text-sm mt-1">
            Get Evaluated And Receive Talent Token To BRAND
          </p>
        </div>

        {/* Feature Card 4 */}
        <div>
          <img
            src={checkoutOurInVerse}
            alt="Virtual city"
            className="w-full object-center"
          />
          <h3 className="text-p1 font-bold text-primary mt-4">
            Check Out Our In-Verse
          </h3>
          <p className="text-grayLight text-sm mt-1">
            Connect And Meet With The Famous
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
