import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const HelpSupport = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow mt-10 lg:mt-16 2xl:mt-20 py-12 2xl:py-16 bg-gradient-custom-vertical2 bg-gradient-custom-horizontal2">
        <div className="container max-w-screen-xl mx-auto flex flex-col gap-12 px-4 sm:px-6 lg:px-8">
          <h3 className="gredient-text text-center text-3xl sm:text-4xl lg:text-5xl font-bold">
            How May We Help You?
          </h3>

          <div className="bg-[#38383880] flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 py-4 sm:py-5 px-5 sm:px-10 md:px-16 lg:px-20 transition">
            <h4 className="text-[#6D6D6D] font-medium text-xl sm:text-2xl">
              I have a question about
            </h4>

            <button className="bg-[#00000080] text-white font-medium text-lg sm:text-xl px-6 sm:px-10 md:px-14 py-3 sm:py-4 md:py-5 transition-transform hover:scale-105">
              Get Help
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HelpSupport;
