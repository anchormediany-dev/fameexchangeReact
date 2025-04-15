import Hero from "../../components/Hero";
import Futures from "../../components/Futures";
import FameCoin from "../../components/FameCoin";
import NetworkStatistics from "../../components/NetworkStatistics";
import TokenLeaderboard from "../../components/TokenLeaderboard";
import FeatureSection from "../../components/FeatureSection";

const Home = () => {
  return (
    <div className="pt-20">
      <Hero />
      <NetworkStatistics />
      <TokenLeaderboard />
      <FeatureSection />
      <Futures />
      <FameCoin />
    </div>
  );
};

export default Home;
