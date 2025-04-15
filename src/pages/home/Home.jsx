import Hero from "../../components/Hero";
import Futures from "../../components/Futures";
import FameCoin from "../../components/FameCoin";
import NetworkStatistics from "../../components/NetworkStatistics";
import TokenLeaderboard from "../../components/TokenLeaderboard";
import FeatureSection from "../../components/FeatureSection";
import Process from "../../components/Process";

const Home = () => {
  return (
    <div className="pt-20">
      <Hero />
      <NetworkStatistics />
      <TokenLeaderboard />
      <FeatureSection />
      <Futures />
      <FameCoin />
      <Process />
    </div>
  );
};

export default Home;
