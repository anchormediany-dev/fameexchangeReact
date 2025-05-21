import micImage from "../../assets/images/podcast-bg.png";
const Podcast = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat w-full relative flex items-center justify-center text-white px-4"
      style={{
        backgroundImage: `url(${micImage})`,
      }}
    >
      <div className="absolute z-50 top-10 left-[50%] md:left-[60%] -translate-x-1/2">
        <h1 className="custom-heading-one mb-4 sm:mb-6">World-Class App</h1>
        <p>
          The experience that will be sure to give you exposure to spot light
          your career
        </p>
      </div>

      <div className="flex md:justify-between md:flex-row flex-col gap-3 container z-50 absolute bottom-10">
        <div className="">
          <button
            className="
        custom-button-two"
          >
            BE INTERVIEWED
          </button>
        </div>
        <a href="mailto:info@FAMEXPODCAST.com">info@FAMEXPODCAST.com</a>
      </div>
    </div>
  );
};

export default Podcast;
