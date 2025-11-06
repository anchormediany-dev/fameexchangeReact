import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import CalculatingNetworthPopup from "../../components/CalculatingNetworthPopup";
import CongratulationsPopup from "../../components/CongratulationsPopup";
import HeroSection from "../../components/HeroSection";
import BrandedTalentShares from "../../components/BrandedTalentShares";
import TalentTradingSection from "../../components/TalentTradingSection";
import DownloadApp from "../../components/DownloadApp";
import GigsEvents from "../../components/GigsEvents";
import MeetAndGreet from "../../components/MeetGreetSection";
import TheFuturesSection from "../../components/TheFuturesSection";
import OurTeam from "../../components/our_team/OurTeam";
import ContactUs from "../../components/contact/ContactUs";
import Podcast from "../../components/podcast/Podcast";
import Faq from "../../components/faq/Faq";
import CustomerReview from "../../components/customer_review/CustomerReview";
import VideoBanner3 from "../../components/VideoBanner3";
import CelebMerchandiseHero from "../../components/CelebMerchandiseHero";
import { useGetTalentQuery } from "../../app/authApi";
import React, { useMemo } from "react";
import ProductSlider from "../../components/ProductSlider";
import SectionDivider from "../../components/SectionDivider";
const Home = () => {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetTalentQuery();
  const sortedTalent = React.useMemo(() => {
    const users = data?.taleUsers ?? [];
    const toNum = (v) =>
      v === 0 || v ? Number(String(v).replace(/,/g, "")) : 0;
    return [...users]
      .map((u) => ({ ...u, _net: toNum(u.networth) }))
      .sort((a, b) => b._net - a._net);
  }, [data]);
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
      <VideoBanner3 />
      <TalentTradingSection />
      <BrandedTalentShares
        talent={sortedTalent ?? []}
        isLoading={isLoading || isFetching}
        isError={isError}
        error={error}
        onRefresh={refetch}
        viewAll={true}
      />
      <SectionDivider />
      <DownloadApp />
      <MeetAndGreet />
      <Podcast />
      <CustomerReview />
      <TheFuturesSection />
      <GigsEvents />
      <CelebMerchandiseHero />
      <ProductSlider />
      <OurTeam />
      <Faq />
      <ContactUs />
      {isCalculatingNetworthOpen && <CalculatingNetworthPopup />}
      {showCongratulationsPopup && <CongratulationsPopup />}
    </div>
  );
};

export default Home;
