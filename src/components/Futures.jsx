import womenScafold from "../assets/images/women-scafold.png";
import menSinging from "../assets/images/men-singing.png";
import raphaelRenter from "../assets/images/raphael-renter.png";
const Futures = () => {
    return (
      <section className="bg-black text-white py-16 px-4 md:px-10 lg:px-20">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">FUTURES</h2>
          <p className="text-gray-300 text-lg md:text-xl">
            Haven’t Been Able To Qualify? Welcome, You Are Now An Integral Part Of Our Platform.
            <br />
            <span className="text-yellow-400 font-semibold">
              Register To Be Seen And Heard!
            </span>{" "}
            You Are A Rising Star
          </p>
        </div>
  
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <img
            src={raphaelRenter}
            alt="Performer 1"
            className="w-full h-[350px] object-cover rounded"
          />
          <img
            src={womenScafold}
            alt="Performer 2"
            className="w-full h-[350px] object-cover rounded"
          />
          <img
            src={menSinging}
            alt="Performer 3"
            className="w-full h-[350px] object-cover rounded"
          />
        </div>
  
        <div className="flex justify-center mt-10">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6 py-3 rounded-md shadow-md transition duration-300">
            Discover More
          </button>
        </div>
      </section>
    );
  };
  
  export default Futures;
  