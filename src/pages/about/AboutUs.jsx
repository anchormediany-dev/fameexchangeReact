import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const AboutUs = () => {
  return (
    <div className="mt-20 flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow py-10 bg-gradient-custom-vertical2 bg-gradient-custom-horizontal2">
        <div className="container  flex flex-col gap-8 px-4 sm:px-6 md:px-8 lg:px-12">
          <h3 className="text-primary max-w-[1407px] text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-bold">
            About Us
          </h3>

          <p className="text-[#5F5F5F] max-w-[1407px] text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed sm:leading-[180%] tracking-wide font-normal text-justify">
            THE FAME EXCHANGE Is A Website That Utilizes The Blockchain
            Technologies And Focuses On Creating A Trading Platform Which Will
            Allow For The Promotion, Leveraging And Transparent Use Of Social
            Media Platforms For The Purpose Of Raising Both Intrinsic And Actual
            Value.
            <br />
            <br />
            The Fame Exchange Is Your Sports And Entertainment Exchange Platform
            For The Famecoin Our Digital Crypto Currency Instrument For All
            Talents, Athletes And Influencers That Will Have Their Specially
            Created Talent Token And Distinct Brand Offered To All Their Fans
            And Any Investor That Would Like To Be On Their Team! The Mission Of
            THE FAME EXCHANGE Is To Develop A Community And Culture Of Crypto
            Fans, Traders, Talents, Athletes And Influencers Who Use The
            Platform To Support, Interact And Earn With One Another. THE FAME
            EXCHANGE Platform Offers A Reliable, Interactive, And Scalable
            Social Trading Environment As Well As A User-Friendly Interface For
            Its Community To Handle Different Types Of Transactions Involving A
            Unique Crypto Asset Which Is Exchangeable For The Native The Fame
            Exchange Token "Talent Token" Which Rewards Participants Who Create
            Value Or Trade Various Talents, Athletes And Influencers
            Personalized Branded Tokens On The The Fame Exchange Ecosystem.
            Through Leveraging Their Own Social Media Growth A Talent, Athlete
            And Influencer Through Our Proprietary Algo-Rhythm Will Be Awarded A
            Set Number Of Talent Tokens, Which They Can Then Offer To Their Fan
            Base And Following. This Fan Base And Following Along With Crypto
            Enthusiasts, Fans And Traders Can Buy Sell And Trade On The Fame
            Exchange Marketplaces (Proprietary Trading Platform) Increasing Or
            Decreasing The Aggregated Value Of An Talents, Athletes And
            Influencers Through Supply And Demand.
            <br /> Our Vision Is To Create An Interactive Ecosystem Where The
            User, Fan And Follower Of A Talents, Athletes And Influencers Can
            Directly And Indirectly Both Support And Benefit From The Emergence
            And Flourishing Of That Person. We Foresee A Platform Whereby People
            Are Very Much Well-Informed And Are Able To Connect, Support And
            Earn With Each Other In A More Secure And Entertaining Way.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
