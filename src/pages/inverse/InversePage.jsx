import { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FiCalendar, FiUserCheck, FiCreditCard, FiSearch } from "react-icons/fi";
import TalentDatesCalendar from "../../components/inverse/TalentDatesCalendar";
import FanInverseRequestForm from "../../components/inverse/FanInverseRequestForm";
import { useAuth } from "../../utils/auth/useAuth";
import { useGetUpcomingSessionsQuery, useGetTalentQuery } from "../../app/authApi";
import SearchTalents from "../../components/inverse/SearchTalents";

const InversePage = () => {
  const { user: userDetails, isAuthenticated } = useAuth();
  const userFromLS = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  }, []);

  const isTalent =
    (userFromLS?.role || userFromLS?.usertype || "").toUpperCase() === "TALENT";
  const { roleId } = useParams();
  const defaultTalentId = useMemo(() => {
    if (isTalent && userFromLS?.id) return userFromLS.id;
    if (roleId) return roleId;
    return "";
  }, [isTalent, roleId, userFromLS?.id]);

  const [selectedSearchuser, setSelectedSearchUser] = useState(defaultTalentId);
  const [isTalentName, setIsTalentName] = useState("");

  useEffect(() => {
    if (defaultTalentId && defaultTalentId !== selectedSearchuser) {
      setSelectedSearchUser(defaultTalentId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultTalentId]);

  const {
    data,
    isLoading: isUsersLoading,
    refetch: refetchUsers,
  } = useGetTalentQuery();
  const usersData = data?.taleUsers;

  const location = useLocation();

  // Sessions for the selected talent id
  const {
    data: sessionsData,
    isLoading,
    isError,
    error,
  } = useGetUpcomingSessionsQuery(selectedSearchuser, {
    skip: !selectedSearchuser,
  });

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

  const [selectedSession, setSelectedSession] = useState(null);
  const handleSelectSession = useCallback((id, data) => {
    setSelectedSession({ id, data });
    setTimeout(() => {
      const el = document.querySelector("#inverse-request-form");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }, []);

  const sessionsCount = sessionsData?.sessions?.length || 0;
  const showSearch = userDetails?.role === "ADMIN" || userDetails?.role === "FAN";

  return (
    <section className="w-full bg-gradient-to-br from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] min-h-screen pt-24 lg:pt-28 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* â”€â”€ Hero â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="text-center mb-10 lg:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight">
            <span className="text-white">Welcome to </span>
            <span className="text-primary2">Inverse</span>
          </h1>
          <p className="mt-3 text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Book personalized 1-on-1 experiences with your favorite talents.
            Pick a session, pay securely, and lock your slot in seconds.
          </p>
        </div>

        {/* â”€â”€ Step indicator â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          <StepCard
            n={1}
            icon={<FiSearch />}
            title="Find a Talent"
            active={!selectedSearchuser}
            done={!!selectedSearchuser}
          />
          <StepCard
            n={2}
            icon={<FiCalendar />}
            title="Pick a Session"
            active={!!selectedSearchuser && !selectedSession}
            done={!!selectedSession}
          />
          <StepCard
            n={3}
            icon={<FiCreditCard />}
            title="Book & Pay"
            active={!!selectedSession}
          />
        </div>

        {/* â”€â”€ Search Talents (FAN/ADMIN only) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        {showSearch && (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 mb-6">
            <div className="mb-3 flex items-center gap-2 text-sm text-gray-400">
              <FiSearch />
              <span>Search by talent name</span>
            </div>
            <SearchTalents
              defaultTalentId={defaultTalentId}
              initialSearchTerm={
                userFromLS?.stageName ||
                userFromLS?.displayName ||
                userFromLS?.name ||
                ""
              }
              setIsTalentName={setIsTalentName}
              usersData={usersData}
              isUsersLoading={isUsersLoading}
              refetchUsers={refetchUsers}
              setSelectedSearchUser={setSelectedSearchUser}
            />
          </div>
        )}

        {/* â”€â”€ Main grid â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: info / selection summary */}
          <aside className="lg:col-span-1 space-y-4">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-primary2 mb-2">
                <FiUserCheck />
                <h3 className="font-semibold">Selected Talent</h3>
              </div>
              {selectedSearchuser ? (
                <div className="text-white text-lg font-semibold">
                  {isTalentName || "Talent selected"}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">
                  {showSearch
                    ? "Search above to pick a talent and view their available dates."
                    : "Sign in as a fan to book sessions."}
                </p>
              )}
              {selectedSearchuser && (
                <div className="mt-3 text-xs text-gray-400">
                  {isLoading ? (
                    "Loading sessionsâ€¦"
                  ) : isError ? (
                    <span className="text-red-300">
                      {error?.data?.message || "Could not load sessions"}
                    </span>
                  ) : (
                    <>
                      <span className="text-emerald-400 font-semibold">
                        {sessionsCount}
                      </span>{" "}
                      session{sessionsCount === 1 ? "" : "s"} available
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
              <h3 className="text-primary2 font-semibold mb-2">How it works</h3>
              <ol className="text-sm text-gray-400 space-y-2 list-decimal list-inside">
                <li>Pick a date with a green check on the calendar.</li>
                <li>
                  Choose a session and click{" "}
                  <span className="text-white font-semibold">Book &amp; Pay</span>{" "}
                  to checkout via Stripe, or{" "}
                  <span className="text-white">Inverse Request</span> to send a
                  custom request.
                </li>
                <li>Your booking is confirmed instantly on payment.</li>
              </ol>
            </div>

            {!isAuthenticated && (
              <div className="bg-yellow-900/15 border border-yellow-800/40 rounded-2xl p-4 text-sm text-yellow-200">
                Please sign in to book a session or send a request.
              </div>
            )}
          </aside>

          {/* Right: calendar */}
          <div className="lg:col-span-2">
            {selectedSearchuser ? (
              <TalentDatesCalendar
                sessionsData={sessionsData}
                onSelectSession={handleSelectSession}
                isLoading={isLoading}
                isError={isError}
                error={error}
                selectedSearchuser={selectedSearchuser}
                talentName={isTalentName}
              />
            ) : (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 text-center text-gray-500">
                <FiCalendar className="mx-auto w-10 h-10 mb-3 opacity-60" />
                <p>Select a talent to view their calendar.</p>
              </div>
            )}
          </div>
        </div>

        {/* â”€â”€ Inverse Request form (FAN only) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        {!isTalent && (
          <div
            id="inverse-request-form"
            className="mt-10 lg:mt-14 scroll-mt-28"
          >
            <FanInverseRequestForm
              isTalentName={isTalentName}
              sessionsData={sessionsData}
              selectedSession={selectedSession}
            />
          </div>
        )}
      </div>
    </section>
  );
};

function StepCard({ n, icon, title, active, done }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl px-4 py-3 border transition-colors ${
        done
          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
          : active
          ? "bg-primary2/10 border-primary2/40 text-white"
          : "bg-white/5 border-white/10 text-gray-500"
      }`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
          done
            ? "bg-emerald-500/30"
            : active
            ? "bg-primary2/30"
            : "bg-white/10"
        }`}
      >
        {n}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-base">{icon}</span>
        <span className="font-semibold text-sm">{title}</span>
      </div>
    </div>
  );
}

export default InversePage;
