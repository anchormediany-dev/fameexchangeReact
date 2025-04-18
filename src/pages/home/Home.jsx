import Futures from "../../components/Futures";
import FameCoin from "../../components/FameCoin";
import NetworkStatistics from "../../components/NetworkStatistics";
import TokenLeaderboard from "../../components/TokenLeaderboard";
import FeatureSection from "../../components/FeatureSection";
import Process from "../../components/Process";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import VideoBanner from "../../components/VideoBanner";
const Home = () => {
  return (
    <div className="mt-20">
      <Navbar />
      <VideoBanner />
      <NetworkStatistics />
      <TokenLeaderboard />
      <FeatureSection />
      <Futures />
      <FameCoin />
      <Process />
      <Footer />
    </div>
  );
};

export default Home;
