import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import VideoBanner from "../../components/VideoBanner";
import NetworkStatistics from "../../components/NetworkStatistics";
import TokenLeaderboard from "../../components/TokenLeaderboard";
import FameCoin from "../../components/FameCoin";
import Process from "../../components/Process";
import CalculatingNetworthPopup from "../../components/CalculatingNetworthPopup";
import CongratulationsPopup from "../../components/CongratulationsPopup";
import FAQ from "../FAQ";

const Home = () => {
  const location = useLocation();
  const [isCalculatingNetworthOpen, setIsCalculatingNetworthOpen] =
    useState(false);
  const [showCongratulationsPopup, setShowCongratulationsPopup] =
    useState(false);

  useEffect(() => {
    if (location.state?.isCalculatingNetworth) {
      setIsCalculatingNetworthOpen(true);

      const timer = setTimeout(() => {
        setIsCalculatingNetworthOpen(false);
        setTimeout(() => {
          setShowCongratulationsPopup(true);
        }, 300); // optional slight delay before showing next popup
      }, 3000);

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
      <FameCoin />
      <Process />
      <FAQ />
      <Footer />

      {isCalculatingNetworthOpen && <CalculatingNetworthPopup />}
      {showCongratulationsPopup && <CongratulationsPopup />}
    </div>
  );
};

export default Home;
