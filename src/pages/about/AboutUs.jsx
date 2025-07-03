import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const AboutUs = () => {
  return (
    <div className="mt-10 lg:mt-16 flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow py-10 bg-gradient-custom-vertical2 bg-gradient-custom-horizontal2">
        <div className="container flex flex-col gap-8 px-4 sm:px-6 md:px-8 lg:px-12">
          <h3 className="gredient-text max-w-[1407px] text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-bold">
            About Us
          </h3>

          <p className="text-[#5F5F5F] max-w-[1407px] text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed sm:leading-[180%] tracking-wide font-normal text-justify">
            The Fame Exchange is a groundbreaking social trading platform where
            entertainment, sports, and finance converge. Built for a new
            generation of creators, athletes, influencers, and their audiences,
            we empower Talent to monetize their public influence by offering
            Branded Talent Shares (B.T.S.) — allowing fans and investors to buy,
            hold, or sell shares in their favorite personalities using real
            currency. This is not crypto, not crowdfunding, and not speculation
            — it's a structured, accessible marketplace where fame is tracked,
            scored, and converted into opportunity.
            <br />
            <br />
            Powered by proprietary AI technology, each talent's Fame Score
            reflects their cultural impact, media presence, and public
            engagement. Whether you're an emerging artist or a global icon, The
            Fame Exchange enables you to build real economic value from your
            influence, while offering fans a meaningful and rewarding way to
            support — and benefit from — your success. We are redefining how
            fame works, making it measurable, investable, and mutually
            empowering.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
