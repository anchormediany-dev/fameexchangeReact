import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const HowToBuySell = () => {
  return (
    <div className="mt-20 flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow py-10 bg-gradient-custom-vertical2 bg-gradient-custom-horizontal2">
        <div className="container  mx-auto flex flex-col gap-8 px-4 sm:px-6 md:px-8 lg:px-12">
          <h3 className="text-primary max-w-[1407px] text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-bold">
            How To Buy/Sell
          </h3>

          <p className="text-[#5F5F5F]  max-w-[1407px] text-sm sm:text-base  md:text-lg lg:text-xl leading-relaxed sm:leading-[180%] tracking-wide font-normal text-justify">
            Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit Ut Aliquam,
            Purus Sit Amet Luctus Venenatis, Lectus Magna Fringilla Urna,
            Porttitor Rhoncus Dolor Purus Non Enim Praesent Elementum Facilisis
            Leo, Vel Fringilla Est Ullamcorper Eget Nulla Facilisi Etiam
            Dignissim Diam Quis Enim Lobortis Scelerisque Fermentum Dui Faucibus
            In Ornare Quam Viverra Orci Sagittis Eu Volutpat Odio Facilisis
            Mauris Sit Amet Massa Vitae Tortor Condimentum Lacinia Quis Vel Eros
            Donec Ac Odio Tempor Orci Dapibus Ultrices In Iaculis Nunc Sed Augue
            Lacus, Viverra Vitae Congue Eu, Consequat Ac Felis Donec Et Odio
            Pellentesque Diam Volutpat Commodo Sed Egestas Egestas Fringilla
            Phasellus Faucibus
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HowToBuySell;
