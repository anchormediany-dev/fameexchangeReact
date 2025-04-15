import womenScafold from "../assets/images/women-scafold.png";
import menSinging from "../assets/images/men-singing.png";
import raphaelRenter from "../assets/images/raphael-renter.png";
const Futures = () => {
  return (
    <section className="bg-black text-white py-16 px-4 md:px-10 lg:px-20">
      <div className="text-center container max-w-4xl mx-auto">
        <h2 className="text-p2 py-5 sm:text-p1 md:text-h6 lg:text-h5 xl:text-h4 2xl:text-h3 lg:text-5xl font-bold text-center text-white">
          FUTURES
        </h2>
        <p className="text-grayLight text-sm mt-1">
          Haven’t Been Able To Qualify? Welcome, You Are Now An Integral Part Of
          Our Platform.
          <br />
          <span className="text-yellow-400 font-semibold">
            Register To Be Seen And Heard!
          </span>{" "}
          You Are A Rising Star
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
        <img
          src={raphaelRenter}
          alt="Performer 1"
          className="w-full h-[600px] object-cover object-center"
        />
        <img
          src={womenScafold}
          alt="Performer 2"
          className="w-full h-[600px] object-cover object-center"
        />
        <img
          src={menSinging}
          alt="Performer 3"
          className="w-full h-[600px] object-cover object-center"
        />
      </div>

      <div className="flex justify-center mt-10">
        <button class="bg-lightYellow hover:scale-105 text-black font-medium px-6 py-3 rounded-md transition-all duration-300  relative group text-p5  2xl:text-p1">
          Discover More
        </button>
      </div>
    </section>
  );
};

export default Futures;
