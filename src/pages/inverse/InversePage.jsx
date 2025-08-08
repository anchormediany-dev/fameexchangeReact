import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import { FaSearch, FaTimes } from "react-icons/fa";
import talents from "../../data/talentData";
import FeedbackPopup from "../../components/FeedbackPopup";
import TalentDatesCalendar from "../../components/inverse/TalentDatesCalendar";
import TalentConfirmationForm from "../../components/inverse/TalentConfirmationForm";
import FanInverseRequestForm from "../../components/inverse/FanInverseRequestForm";
import { useGetUpcomingSessionsQuery } from "../../app/authApi";
const InversePage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isFeedbackShow, setIsFeedbackShow] = useState(false);
  const location = useLocation();
  const { selectedRequestId, selectedFanName } = location.state || {};
  const {
    data: sessionsData,
    isLoading,
    isError,
    error,
  } = useGetUpcomingSessionsQuery();
  useEffect(() => {
    // Wait for content to render
    const hash = location.hash;
    if (hash) {
      // Slight timeout ensures DOM is ready
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [location]);
  const handleFeedbackPopup = () => {
    setIsFeedbackShow(false);
  };
  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.trim()) {
      const results = talents.filter((talent) =>
        talent.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  // Select a talent
  const handleSelectTalent = (talent) => {
    setSelectedTalent(talent);
    setSearchValue("");
    setShowResults(false);
  };

  return (
    <section className="w-full z-50 bg-gradient-to-br py-12 2xl:py-16 flex flex-col 2xl:gap-16 gap-12 px-4 sm:px-6 lg:px-8">
      <div className="2xl:gap-16 gap-12 px-4 container sm:px-6 lg:px-8 mt-10 lg:mt-16 2xl:mt-20">
        {/* Search Bar */}
        <section className="flex justify-end items-center">
          <div className="lg:w-[25%] mb-3 relative">
            <div className="relative group">
              <div className="relative overflow-hidden rounded-2xl transition-all duration-500 ease-out bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/8">
                {/* Search Input */}
                <input
                  type="text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  onFocus={() => setShowResults(true)}
                  onBlur={() => setTimeout(() => setShowResults(false), 200)}
                  placeholder="Search talents..."
                  className="relative z-10 w-full h-14 sm:h-16 bg-transparent pl-5 pr-24 text-white placeholder-gray-400 focus:outline-none text-sm sm:text-base font-medium placeholder:font-normal"
                />

                {/* Search Icon */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 z-20">
                  {searchValue && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchValue("");
                        setSearchResults([]);
                      }}
                      className="p-2 text-gray-400 hover:text-white transition-all duration-200 rounded-xl hover:bg-white/10 active:scale-95 z-30"
                    >
                      <FaTimes size={12} />
                    </button>
                  )}
                  <div className="p-2 text-gray-400">
                    <FaSearch size={12} />
                  </div>
                </div>
              </div>

              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute z-50 mt-2 w-full bg-gray-800 rounded-lg shadow-lg border border-gray-700 max-h-60 overflow-y-auto">
                  {searchResults.map((talent) => (
                    <div
                      key={talent.id}
                      className="p-3 hover:bg-gray-700 cursor-pointer flex items-center gap-3"
                      onClick={() => handleSelectTalent(talent)}
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                        {talent.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          {talent.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {talent.category} • {talent.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="flex flex-col 2xl:gap-16 gap-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 items-stretch">
            <div className="lg:col-span-2 flex flex-col space-y-3 h-full">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 md:p-4 flex-1">
                <div className="text-center mb-6">
                  <h1 className="custom-heading-seven mb-2 uppercase">
                    <span className="font-semibold">Welcome to our </span>
                    <br />
                    <span className="font-bold text-primary2">Inverse</span>
                  </h1>
                </div>
                <p className="text-gray-400 leading-relaxed text-center">
                  Experience the revolutionary platform that connects fans
                  directly with their favourite talents. Our Inverse system
                  allows you to request personalized interactions, schedule
                  meetings, and create unforgettable moments with the
                  personalities you admire most.
                </p>
              </div>

              {/* Selected Talent Info */}
              {/* {selectedTalent && (
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 md:p-4 flex-1">
                  <h2 className="text-xl font-bold text-primary2 mb-4 text-center">
                    Selected Talent
                  </h2>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center">
                      {selectedTalent.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-white">
                        {selectedTalent.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {selectedTalent.category} • {selectedTalent.price}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">
                    {selectedTalent.description}
                  </p>
                </div>
              )} */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 md:p-4 flex-1">
                <div className="flex flex-col gap-2 justify-center">
                  <h2 className="text-2xl font-bold text-primary2 mb-6 text-center">
                    Talent Token Brand
                  </h2>
                  <img
                    className="rounded-md"
                    src="https://images.unsplash.com/photo-1472691681358-fdf00a4bfcfe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE5fHxldmVudHxlbnwwfHwwfHx8MA%3D%3D"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 flex flex-col space-y-3 h-full">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 md:p-4">
                <div>
                  <h2 className="text-2xl font-bold uppercase text-white mb-6 text-center">
                    Request your{" "}
                    <span className="font-bold text-primary2">
                      "Inverse Experience"
                    </span>
                  </h2>
                  <a
                    href="#tickets"
                    className="max-w-[80%] mx-auto flex items-center justify-center space-x-2 p-3 rounded-xl transition-all duration-300 font-semibold hover:scale-105 text-white"
                    style={{ backgroundColor: "#a38b41" }}
                  >
                    <span className="text-sm">Inverse Request</span>
                    <FiExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <TalentDatesCalendar
                sessionsData={sessionsData}
                isLoading={isLoading}
                isError={isError}
                error={error}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col 2xl:gap-16 gap-12 mt-10 lg:mt-16 2xl:mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 items-stretch">
            <FanInverseRequestForm />
            <TalentConfirmationForm
              selectedFanName={selectedFanName}
              selectedRequestId={selectedRequestId}
              sessionsData={sessionsData}
              isLoading={isLoading}
              isError={isError}
              error={error}
            />
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <button
          onClick={() => setIsFeedbackShow(true)}
          className="custom-button-two"
        >
          Add Feedback
        </button>

        <FeedbackPopup
          isFeedbackShow={isFeedbackShow}
          onClick={handleFeedbackPopup}
        />
      </div>
    </section>
  );
};

export default InversePage;
