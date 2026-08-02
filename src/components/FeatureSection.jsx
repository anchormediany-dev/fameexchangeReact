import fansGetTo from "../assets/images/fans-get-to.png";
import easyToTrade from "../assets/images/easy-to-trade.png";
import checkoutOurInVerse from "../assets/images/checkout-our-in-verse.png";

const FeatureSection = () => {
  return (
    <section
      id="features"
      className="relative text-white px-4 py-12 overflow-hidden"
    >
      {/* Main Content */}
      <div className="relative z-10 container grid grid-cols-1 md:grid-cols-2 gap-28">
        {/* Feature Card 1 */}
        <div className="relative">
          <img
            src={fansGetTo}
            alt="Fans at Concert"
            className="w-full object-center"
          />
          <h3 className="font-heading-xl text-primary mt-4">Fans Get To</h3>
          <p className="text-grayLight font-paragraph-xl mt-1">
            Earn With Athlete, Artists & Personalities Talent Shares
          </p>
        </div>

        {/* Feature Card 2 */}
        <div>
          <img
            src={easyToTrade}
            alt="Man trading"
            className="w-full object-center"
          />
          <h3 className="font-heading-xl text-primary mt-4">Easy To Trade</h3>
          <p className="text-grayLight font-paragraph-xl mt-1">
            Buy & Sell Branded Talent Shares
          </p>
        </div>

        {/* Feature Card 3 */}
        <div id="in-verse">
          <img src={easyToTrade} alt="Woman with glasses" className="w-full" />
          <h3 className="font-heading-xl text-primary mt-4">Personalities</h3>
          <p className="text-grayLight font-paragraph-xl mt-1">
            Get Evaluated And List Your Talent Shares
          </p>
        </div>

        {/* Feature Card 4 */}
        <div>
          <img
            src={checkoutOurInVerse}
            alt="Virtual city"
            className="w-full object-center"
          />
          <h3 className="font-heading-xl text-primary mt-4">
            Check Out Our In-Verse
          </h3>
          <p className="text-grayLight font-paragraph-xl mt-1">
            Connect And Meet With The Famous
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
