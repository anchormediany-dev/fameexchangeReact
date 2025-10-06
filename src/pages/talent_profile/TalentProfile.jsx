import React, { useState } from "react";
import {
  FaSearch,
  FaCalculator,
  FaChartLine,
  FaWallet,
  FaTimes,
  FaCoins,
  FaSpinner,
} from "react-icons/fa";
import ImageSwitch from "./ImageSwitch";
import { useNavigate } from "react-router-dom";
import PortfolioDashboard from "../../components/PortfolioDashboard";
import CreateSession from "../../components/talent/create_session/CreateSession";
import PendingRequests from "../../components/talent/create_session/PendingRequests";
import {
  useGetUserByIdQuery,
  useUpdateMyProfileMutation,
  useNetworthCalculateMutation,
  useGetNetworthQuery,
  // Talent Overview API
  useGetTalentOverviewQuery,
} from "../../app/authApi";
import EventsSection from "../../components/talent_profile/EventsSection";
import FriendsSection from "../../components/talent_profile/FriendsSection";
import Notifications from "../../components/talent_profile/Notifications";
import TalentLinks from "../../components/talent_profile/TalentLinks";
import ConfirmedRequestsCalendar from "../../components/talent_profile/ConfirmedRequestsCalendar";
import PendingRequestsList from "../../components/talent_profile/PendingRequestsList";
import { toast } from "react-toastify";
import CalculatingNetworthPopup from "../../components/CalculatingNetworthPopup";
import CalculatingNetworthPopupUser from "./CalculatingNetworthPopupUser";
const TalentProfile = () => {
  const userLocalData = JSON.parse(localStorage.getItem("user"));
  const userId = userLocalData?.id;
  const id = userLocalData?.id;
  const { data, isLoading, isError, error, refetch } =
    useGetTalentOverviewQuery(id, {
      skip: !id,
    });
  const navigate = useNavigate();
  // const {
  //   data,
  //   isLoading: isLoadingGetNetworth,
  //   isError: isErrorGetNetworth,
  //   refetch,
  // } = useGetNetworthQuery();
  const [saveNetworth, { isLoading: isSavingNetworth }] =
    useNetworthCalculateMutation();
  const [statusMsg, setStatusMsg] = useState("");
  const [builtPayload, setBuiltPayload] = useState(null);
  const [showNetworthPopup, setShowNetworthPopup] = useState(false);
  const [networthResult, setNetworthResult] = useState(null);
  const [networthError, setNetworthError] = useState(null);
  const buildPayloadFromGet = (root) => {
    const d = root?.data ?? root;
    const sm = d?.socialMedia || {};

    return {
      fullName: d?.fullName || "",
      tokenBrandName: d?.tokenBrand?.brandName || "",
      tokenName: d?.tokenBrand?.tokenName || "",
      youtube: sm?.youtube?.url || "",
      twitter: sm?.twitter?.url || "",
      instagram: sm?.instagram?.url || "",
      facebook: sm?.facebook?.url || "",
      tiktok: sm?.tiktok?.url || "",
      snapchat: sm?.snapchat?.url || "",
    };
  };
  const handleGetNetworthAndSave = async () => {
    try {
      setStatusMsg("Calculating networth…");
      setStatusMsg("Calculating networth…");
      setShowNetworthPopup(true);
      setNetworthResult(null);
      setNetworthError(null);
      const res = await refetch();
      const source = res?.data ?? data;
      if (!source?.data) {
        throw new Error(
          res?.error?.data?.message ||
            res?.error?.error ||
            "No networth data returned"
        );
      }

      const payload = buildPayloadFromGet(source);
      setBuiltPayload(payload);

      setStatusMsg("Saving networth…");
      const saved = await saveNetworth(payload).unwrap();
      setStatusMsg("Networth saved successfully.");
      console.log("Saved networth:", saved);
      toast.success("Networth ReCalculated Successfully");
      setNetworthResult(saved?.data ?? saved);
    } catch (err) {
      toast.error("Error while Recalculating networth", err);
      setStatusMsg(
        typeof err === "string"
          ? err
          : err?.data?.message || err?.message || "Failed to save networth."
      );
      setNetworthError(err);
      setShowNetworthPopup(true);
    }
  };
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [updateMyProfile, { isLoading: isUpdating, error: isUpdatingError }] =
    useUpdateMyProfileMutation();
  // const { data: userData, isLoading, isError } = useGetUserByIdQuery(userId);
  // console.log(userData?.user?.name, "user data");
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      console.log("Searching for:", searchValue);
      // Add your search logic here
    }
  };

  const clearSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSearchValue("");
    // Keep focus on input after clearing
    const input = e.target.closest("form").querySelector("input");
    if (input) {
      input.focus();
    }
  };

  const handleInputBlur = (e) => {
    // Only blur if the click is outside the form
    const form = e.currentTarget.closest("form");
    setTimeout(() => {
      if (!form.contains(document.activeElement)) {
        setIsFocused(false);
      }
    }, 100);
  };

  const handleRecalculate = () => {
    console.log("Recalculating values...");
    // Add recalculation logic here
  };

  const handleTradingChart = () => {
    console.log("Opening trading chart...");
    // Add chart logic here
  };

  const handleImportFunds = () => {
    console.log("Importing more funds...");
    // Add import funds logic here
  };

  return (
    <section className="w-full bg-gradient-to-br py-12 2xl:py-16 flex flex-col 2xl:gap-16 gap-12 px-4 sm:px-6 lg:px-8">
      <div className="container mt-10 lg:mt-16 2xl:mt-20">
        {/* Ultra Modern Single Row Layout */}
        <div className="flex flex-col xl:flex-row gap-4 xl:gap-6 items-stretch">
          {/* Modern Compact Search Bar */}
          {/* <div className="w-full xl:w-80 2xl:w-96">
            <form onSubmit={handleSearch} className="relative group">
              <div
                className={`
                relative overflow-hidden rounded-2xl transition-all duration-500 ease-out
                ${
                  isFocused
                    ? "bg-white/10 border border-[#a38b41]/40 shadow-2xl shadow-[#a38b41]/20 scale-[1.02]"
                    : "bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/8"
                }
              `}
              >
           
                <div
                  className={`
                  absolute inset-0 bg-gradient-to-r from-[#a38b41]/10 via-transparent to-[#a38b41]/10 
                  transition-opacity duration-500 pointer-events-none z-5 ${
                    isFocused ? "opacity-100" : "opacity-0"
                  }
                `}
                />

             
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={handleInputBlur}
                  placeholder="Search"
                  className="relative z-10 w-full h-14 sm:h-16 bg-transparent pl-5 pr-24 text-white placeholder-gray-400 focus:outline-none text-sm sm:text-base font-medium placeholder:font-normal"
                />

             
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 z-20">
          
                  {searchValue && (
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()} 
                      onClick={clearSearch}
                      className="p-2 text-gray-400 hover:text-white transition-all duration-200 rounded-xl hover:bg-white/10 active:scale-95 z-30"
                    >
                      <FaTimes size={12} />
                    </button>
                  )}

          
                  <button
                    type="submit"
                    disabled={!searchValue.trim()}
                    onMouseDown={(e) => e.preventDefault()} 
                    className={`
                      group/search relative overflow-hidden px-4 py-2 rounded-xl font-bold text-xs transition-all duration-300 flex items-center gap-2 z-30
                      ${
                        searchValue.trim()
                          ? "bg-gradient-to-r from-[#a38b41] cursor-pointer via-[#c2ab67] to-[#e6ca7c] text-black shadow-lg hover:shadow-xl hover:shadow-[#a38b41]/30 hover:scale-110 active:scale-95"
                          : "bg-gray-600/30 text-gray-500 cursor-not-allowed"
                      }
                    `}
                  >
                    <FaSearch size={11} className="relative z-10" />
                    <span className="relative z-10 hidden sm:inline">
                      Enter
                    </span>

                  
                    {searchValue.trim() && (
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover/search:translate-x-full transition-transform duration-700" />
                    )}
                  </button>
                </div>

           
                <div
                  className={`
                  absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent 
                  transition-transform duration-1000 pointer-events-none z-5 ${
                    isFocused ? "translate-x-full" : ""
                  }
                `}
                />
              </div>
            </form>
          </div> */}

          {/* Ultra Modern Action Buttons */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 xl:gap-6">
            {/* Get & Save Networth */}
            <button
              onClick={handleGetNetworthAndSave}
              disabled={
                // isLoadingGetNetworth
                isLoading || isSavingNetworth
              }
              className="group relative overflow-hidden h-14 sm:h-16 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#a38b41]/30 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-[#a38b41]/15 hover:-translate-y-1 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#a38b41]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative cursor-pointer z-10 flex items-center justify-center gap-3 h-full px-3 sm:px-6">
                <div className="relative">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#a38b41]/20 to-[#a38b41]/5 border border-[#a38b41]/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <FaCalculator className="text-[#a38b41] text-sm sm:text-base" />
                  </div>
                  <div className="absolute inset-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#a38b41]/20 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />
                </div>

                <h3 className="text-white text-sm md:text-base font-medium group-hover:text-[#a38b41] transition-colors duration-300 leading-tight">
                  Recalculate Value
                </h3>
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#a38b41]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />
            </button>

            {/* Trading Chart Button */}
            <button
              onClick={handleTradingChart}
              className="group relative overflow-hidden h-14 sm:h-16 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#a38b41]/30 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-[#a38b41]/15 hover:-translate-y-1 active:scale-95"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#a38b41]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative cursor-pointer z-10 flex items-center justify-center gap-3 h-full px-3 sm:px-6">
                {/* Icon Container */}
                <div className="relative">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#a38b41]/20 to-[#a38b41]/5 border border-[#a38b41]/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <FaChartLine className="text-[#a38b41] text-sm sm:text-base" />
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#a38b41]/20 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />
                </div>

                {/* Title */}
                <h3 className="text-white text-sm md:text-base font-medium  group-hover:text-[#a38b41] transition-colors duration-300 leading-tight">
                  Trading Chart
                </h3>
              </div>

              {/* Border glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#a38b41]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />
            </button>

            {/* Import Funds Button */}
            <button
              onClick={handleImportFunds}
              className="group relative overflow-hidden h-14 sm:h-16 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#a38b41]/30 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-[#a38b41]/15 hover:-translate-y-1 active:scale-95"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#a38b41]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative cursor-pointer z-10 flex items-center justify-center gap-3 h-full px-3 sm:px-6">
                {/* Icon Container */}
                <div className="relative">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#a38b41]/20 to-[#a38b41]/5 border border-[#a38b41]/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <FaWallet className="text-[#a38b41] text-sm sm:text-base" />
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#a38b41]/20 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />
                </div>

                {/* Title */}
                <h3 className="text-white text-sm md:text-base font-medium   group-hover:text-[#a38b41] transition-colors duration-300 leading-tight">
                  Import Funds
                </h3>
              </div>

              {/* Border glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#a38b41]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />
            </button>
          </div>
        </div>
      </div>
      <ImageSwitch userData={data} updateMyProfile={updateMyProfile} />
      <div className="bg-[#171717] text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <FriendsSection userData={data} isLoading={isLoading} />
            <EventsSection userData={data} isLoading={isLoading} />
          </div>
        </div>
      </div>
      {/* <PendingRequests /> */}
      <div className="container mx-auto flex flex-col lg:flex-row gap-6 px-4 py-8 h-full min-h-[400px]">
        <section className="w-full lg:w-[40%] ">
          <h2 className="text-2xl font-bold text-primary2 mb-3 ">
            All Sessions
          </h2>
          <ConfirmedRequestsCalendar
            userData={data}
            isLoading={isLoading}
            error={error}
            isError={isError}
          />
        </section>
        <section className="w-full max-w-3xl lg:max-w-5xl mx-auto px-3 sm:px-4 ">
          <h2 className="text-2xl font-bold text-primary2 mb-3 ">
            All Fan Inverse Requests
          </h2>
          <PendingRequestsList />{" "}
        </section>
      </div>
      <CreateSession />
      <div className="bg-[#171717] px-4 md:px-8 container text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Notifications />
          <TalentLinks userData={data} />
        </div>{" "}
      </div>
      <section className=" px-4 md:px-8 container mx-auto ">
        <div className="rounded-xl p-6 bg-[#1f1f1f]">
          <PortfolioDashboard userData={data} />
        </div>
      </section>{" "}
      {/* {isSavingNetworth && <CalculatingNetworthPopup />} */}
      <CalculatingNetworthPopupUser
        open={showNetworthPopup}
        loading={isLoading || isSavingNetworth}
        data={networthResult}
        error={networthError}
        onClose={() => setShowNetworthPopup(false)}
      />
    </section>
  );
};

export default TalentProfile;
