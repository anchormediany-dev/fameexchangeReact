const HeroSection = () => {
  return (
    <section className="w-full hero-bg flex flex-col justify-center min-h-[90vh] sm:min-h-screen px-4 sm:px-6 lg:px-8 py-20 sm:py-0">
      <div className="container mx-auto">
        {/* Main Heading */}
        <h2 className="heading-700-50 text-white mb-4 sm:mb-6 leading-tight">
          <span className="block heading-700-40">The Fame Exchange</span>
          <span className="block  mt-2 sm:mt-3">The First-of-its-Kind</span>
          <span className="block ">Trading Platform for</span>
          <span className="block ">Entertainment and Sports</span>
        </h2>

        {/* Description */}
        <p className="heading-400-20 text-gray-300 mb-6 sm:mb-8 md:mb-10 max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-[#e0aa0d] cursor-pointer text-white  py-3 px-6 sm:py-4 sm:px-8 rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Start Investment
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
