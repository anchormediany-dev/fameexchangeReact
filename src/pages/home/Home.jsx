import { useLocation } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import CalculatingNetworthPopup from "../../components/CalculatingNetworthPopup";
import CongratulationsPopup from "../../components/CongratulationsPopup";
// Above-the-fold (eager): hero + first interactive section
import BrandedTalentShares from "../../components/BrandedTalentShares";
import TalentTradingSection from "../../components/TalentTradingSection";
import VideoBanner3 from "../../components/VideoBanner3";
import { useGetTalentQuery } from "../../app/authApi";
import { useGetTopTalentsQuery } from "../../app/tradingApi";
import React, { useMemo } from "react";

// Below-the-fold (lazy): split into separate chunks, fetched as the user scrolls
const DownloadApp = lazy(() => import("../../components/DownloadApp"));
const GigsEvents = lazy(() => import("../../components/GigsEvents"));
const MeetAndGreet = lazy(() => import("../../components/MeetGreetSection"));
const TheFuturesSection = lazy(() => import("../../components/TheFuturesSection"));
const OurTeam = lazy(() => import("../../components/our_team/OurTeam"));
const ContactUs = lazy(() => import("../../components/contact/ContactUs"));
const Podcast = lazy(() => import("../../components/podcast/Podcast"));
const Faq = lazy(() => import("../../components/faq/Faq"));
const CustomerReview = lazy(() => import("../../components/customer_review/CustomerReview"));
const CelebMerchandiseHero = lazy(() => import("../../components/CelebMerchandiseHero"));
const ProductSlider = lazy(() => import("../../components/ProductSlider"));

const SectionFallback = () => (
  <div className="min-h-[200px] w-full" aria-hidden="true" />
);
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

  // Top BTS leaderboard - backend confirmed: GET /api/talents/top?sort=bts
  const {
    data: topBtsData,
    isLoading: btsLoading,
    isFetching: btsFetching,
    isError: btsError,
    error: btsErrObj,
    refetch: refetchBts,
  } = useGetTopTalentsQuery({ sort: "bts", limit: 10 });
  const btsTalent = useMemo(() => {
    const arr =
      topBtsData?.talents ||
      topBtsData?.data?.talents ||
      topBtsData?.data ||
      [];
    return Array.isArray(arr) ? arr : [];
  }, [topBtsData]);
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
        talent={btsTalent.length ? btsTalent : sortedTalent}
        isLoading={btsLoading || btsFetching || isLoading || isFetching}
        isError={btsError || isError}
        error={btsErrObj || error}
        onRefresh={() => {
          refetch();
          refetchBts();
        }}
        viewAll={true}
      />
      <Suspense fallback={<SectionFallback />}>
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
      </Suspense>
      {isCalculatingNetworthOpen && <CalculatingNetworthPopup />}
      {showCongratulationsPopup && <CongratulationsPopup />}
    </div>
  );
};

export default Home;
