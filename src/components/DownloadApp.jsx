import phoneMockupImage from "../assets/images/phone_mockup_image.webp";

const AppShowcase = () => {
  return (
    <div className="relative w-full overflow-hidden bg-black py-12 2xl:py-16">
      {/* Background grid and effects */}
      <div className="absolute inset-0 bg-app-section bg-center z-0">
        {/* Grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-16 py-8 sm:py-12 lg:py-16">
        {/* Phone mockups - left side */}
        <div className="relative w-full lg:w-1/2 mb-6 sm:mb-8 lg:mb-0">
          <div className="pt-[80%] sm:pt-[70%] md:pt-[60%] lg:pt-[50%] relative">
            {/* Phone 1 - Background phone */}
            <div className="absolute left-[10%] sm:left-[15%] top-[10%] sm:top-[15%] w-[80%] sm:w-[65%] transform -rotate-12 z-10">
              <div className="relative">
                <img
                  src={phoneMockupImage}
                  alt="Phone mockup"
                  className="w-full rounded-[30px] sm:rounded-[40px] border-[6px] sm:border-[8px] border-white shadow-lg sm:shadow-2xl bg-black"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Text content - right side */}
        <div className="w-full lg:w-1/2 text-white text-center lg:text-left px-4 sm:px-0 lg:pl-8">
          <div className="custom-heading-six tracking-wide mb-2 sm:mb-3">
            Application
          </div>
          <h1 className="custom-heading-one mb-2 sm:mb-3">User-Friendly,</h1>
          <h1 className="custom-heading-one mb-4 sm:mb-6">World-Class App</h1>
          <p>
            Our app and website are designed to be intuitive and easy to use,
            making investing in your favorite talents simple and enjoyable.
          </p>

          <button className="bg-[#a38b41] hover:brightness-110 hover:scale-105 cursor-pointer font-medium text-black py-3 px-6 mt-2 bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c]">
            Download App
          </button>
        </div>
      </div>

      {/* Light flare effects */}
      <div className="absolute top-0 right-0 w-40 h-40 sm:w-64 sm:h-64 bg-yellow-500 rounded-full filter blur-3xl opacity-10 z-5"></div>
      <div className="absolute top-20 right-20 sm:right-40 w-20 h-20 sm:w-32 sm:h-32 bg-red-500 rounded-full filter blur-3xl opacity-10 z-5"></div>
    </div>
  );
};

export default AppShowcase;
