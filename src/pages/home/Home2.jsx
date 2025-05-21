import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import CalculatingNetworthPopup from "../../components/CalculatingNetworthPopup";
import CongratulationsPopup from "../../components/CongratulationsPopup";
import Navbar2 from "../../components/Navbar2";
import HeroSection from "../../components/HeroSection";
import BrandedTalentShares from "../../components/BrandedTalentShares";
import TalentTradingSection from "../../components/TalentTradingSection";
import Footer2 from "../../components/Footer2";
import DownloadApp from "../../components/DownloadApp";
import VideoBanner2 from "../../components/VideoBanner2";
import GigsEvents from "../../components/GigsEvents";
import MeetAndGreet from "../../components/MeetGreetSection";
import TheFuturesSection from "../../components/TheFuturesSection";
import OurTeam from "../../components/our_team/OurTeam";
import ContactUs from "../../components/contact/ContactUs";
import Podcast from "../../components/podcast/Podcast";
import Faq from "../../components/faq/Faq";
const Home2 = () => {
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
    <div>
      <Navbar2 />
      <HeroSection />
      <TalentTradingSection />
      <BrandedTalentShares />
      <DownloadApp />
      <MeetAndGreet />
      <Podcast />
      <TheFuturesSection />
      <GigsEvents />
      <VideoBanner2 />
      <OurTeam />
      <Faq />
      <ContactUs />
      <Footer2 />
      {isCalculatingNetworthOpen && <CalculatingNetworthPopup />}
      {showCongratulationsPopup && <CongratulationsPopup />}
    </div>
  );
};

export default Home2;
