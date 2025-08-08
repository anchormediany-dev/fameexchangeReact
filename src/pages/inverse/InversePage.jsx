import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import FeedbackPopup from "../../components/FeedbackPopup";
import TalentDatesCalendar from "../../components/inverse/TalentDatesCalendar";
import TalentConfirmationForm from "../../components/inverse/TalentConfirmationForm";
import FanInverseRequestForm from "../../components/inverse/FanInverseRequestForm";
import {
  useGetUpcomingSessionsQuery,
  useGetUsersQuery,
} from "../../app/authApi";
import SearchTalents from "../../components/inverse/SearchTalents";
const InversePage = () => {
  const [selectedSearchuser, setSelectedSearchUser] = useState(null);
  const {
    data: usersData,
    isLoading: isUsersLoading,
    refetch: refetchUsers,
  } = useGetUsersQuery();
  console.log(usersData);
  const [isFeedbackShow, setIsFeedbackShow] = useState(false);
  const location = useLocation();
  const { selectedRequestId, selectedFanName } = location.state || {};
  const {
    data: sessionsData,
    isLoading,
    isError,
    error,
  } = useGetUpcomingSessionsQuery(selectedSearchuser);
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
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
  return (
    <section className="w-full z-50 bg-gradient-to-br py-12 2xl:py-16 flex flex-col 2xl:gap-16 gap-12 px-4 sm:px-6 lg:px-8">
      <div className="2xl:gap-16 gap-12 px-4 container sm:px-6 lg:px-8 mt-10 lg:mt-16 2xl:mt-20">
        <SearchTalents
          usersData={usersData}
          isUsersLoading={isUsersLoading}
          refetchUsers={refetchUsers}
          setSelectedSearchUser={setSelectedSearchUser}
        />
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
                selectedSearchuser={selectedSearchuser}
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
