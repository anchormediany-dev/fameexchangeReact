import Hero from "../../components/Hero";
import Futures from "../../components/Futures";
import FameCoin from "../../components/FameCoin";
import NetworkStatistics from "../../components/NetworkStatistics";

const Home = () => {
  return (
    <div className="pt-20">
      <Hero />
      <NetworkStatistics />
      <Futures />
      <FameCoin />
    </div>
  );
};

export default Home;
