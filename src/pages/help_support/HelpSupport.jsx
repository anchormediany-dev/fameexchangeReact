// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";

// const HelpSupport = () => {
//   return (
//     <div className="mt-20 ">
//       <div className="py-12  bg-gradient-custom-vertical2 bg-gradient-custom-horizontal2">
//         <div className="flex container flex-col pb-[435px]   gap-[70px]">
//           {" "}
//           <h3 className="text-primary text-center text-[40px] font-bold">
//             How May We Help You?
//           </h3>
//           <div className="bg-[#38383880]  transition py-[17px] pr-[20px] pl-[20px] sm:pl-[40px] md:pl-[60px] lg:pl-[80px] flex justify-between items-center">
//             <h4 className="text-[#6D6D6D] font-medium text-[25px]">
//               I have question about
//             </h4>
//             <button className="py-[12px] sm:py-[20px] md:py-[25px] lg:py-[30px] cursor-pointer font-medium hover:scale-105 text-2xl px-[20px] sm:px-[30px] md:px-[50px] lg:px-[70px] bg-[#00000080]">
//               Get Help
//             </button>
//           </div>
//         </div>
//       </div>
//       <Navbar />
//       <Footer />
//     </div>
//   );
// };

// export default HelpSupport;
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const HelpSupport = () => {
  return (
    <div className="mt-20 flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow py-12 bg-gradient-custom-vertical2 bg-gradient-custom-horizontal2">
        <div className="container max-w-screen-xl mx-auto flex flex-col gap-12 px-4 sm:px-6 lg:px-8">
          <h3 className="text-primary text-center text-3xl sm:text-4xl lg:text-5xl font-bold">
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
