import Futures from "../../components/Futures";
import FameCoin from "../../components/FameCoin";
import NetworkStatistics from "../../components/NetworkStatistics";
import TokenLeaderboard from "../../components/TokenLeaderboard";
import FeatureSection from "../../components/FeatureSection";
import Process from "../../components/Process";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import VideoBanner from "../../components/VideoBanner";
import { useLocation } from "react-router-dom";
import CalculatingNetworthPopup from "../../components/CalculatingNetworthPopup";
import { useState, useEffect } from "react";
const Home = () => {
  const location = useLocation();
  const [isCalculatingNetworthOpen, setIsCalculatingNetworthOpen] =
    useState(false);

  useEffect(() => {
    if (location.state?.isCalculatingNetworth) {
      setIsCalculatingNetworthOpen(true);

      // Optional auto close after 3 seconds
      const timer = setTimeout(() => {
        setIsCalculatingNetworthOpen(false);
      }, 3000);

      // Clear the state so it doesn’t reopen on reload
      window.history.replaceState({}, document.title);

      return () => clearTimeout(timer);
    }
  }, [location.state]);
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
      {isCalculatingNetworthOpen && <CalculatingNetworthPopup />}
    </div>
  );
};

export default Home;
