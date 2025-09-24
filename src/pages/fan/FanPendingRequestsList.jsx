import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCheck,
  FaTimes,
  FaCalendarAlt,
  FaClock,
  FaSpinner,
} from "react-icons/fa";
import { isSameMonth, parseISO, format } from "date-fns";
import { useNavigate } from "react-router-dom";
import {
  useGetAllFanRequestsQuery,
  useFanRequestConfirmationMutation,
} from "../../app/authApi";
import { toast } from "react-toastify";

const FanPendingRequestsList = ({ userData }) => {
  const [currentDate] = useState(new Date());
  const [activeRequestId, setActiveRequestId] = useState(null);
  const [loadingAction, setLoadingAction] = useState(null);
  const navigate = useNavigate();

  const {
    data: fanRequestsData,
    isLoading,
    isError,
    error,
  } = useGetAllFanRequestsQuery();

  const [confirmTalentRequest, { isLoading: isConfirming }] =
    useFanRequestConfirmationMutation();
  const userLocalData = JSON.parse(localStorage.getItem("user"));
  const roleId = userLocalData?.id;

  const transformRequests = (data) => {
    if (!data?.data) return [];
    return data.data.map((request) => ({
      id: request._id,
      date: format(parseISO(request.date), "MMMM d, yyyy"),
      time: request.time,
      status: (request.status || "").toLowerCase(),
      fanName: request.fanId?.name || "Unknown Fan",
      location: request.location || "Virtual Meeting",
      details: request.paymentMethod
        ? `Payment: ${request.paymentMethod}`
        : "Meeting request",
      rescheduledStatus: request.rescheduledStatus || "",
      rawDate: request.date,
    }));
  };

  const requests = transformRequests(fanRequestsData);

  const filteredRequests = requests.filter((req) => {
    const requestDate = parseISO(req.rawDate);
    return isSameMonth(requestDate, currentDate) && req.status === "pending";
  });

  const handleTalentConfirmation = async (requestId, status) => {
    console.log(requestId);
    const payload = {
      selectedRequestId: requestId,
      status,
    };

    try {
      setActiveRequestId(requestId);

      setLoadingAction(status);
      await confirmTalentRequest(payload).unwrap();
      toast.success(
        `Request ${
          status === "accepted" ? "confirmed" : "declined"
        } successfully.`
      );
    } catch (err) {
      console.error("Talent confirmation error:", err);
      toast.error(err?.data?.message || "Request failed.");
    } finally {
      setActiveRequestId(null);
      setLoadingAction(null);
    }
  };

  if (isLoading) {
    return (
      <section className="w-full max-w-3xl mx-auto px-3 sm:px-4 flex items-center justify-center">
        <div className="text-center py-8">
          <FaSpinner className="animate-spin text-3xl text-[#a38b41] mx-auto mb-4" />
          <p className="text-gray-400">Loading pending requests...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    toast.error(error?.data?.message || "Failed to load pending requests");
    return (
      <section className="w-full max-w-3xl mx-auto px-3 sm:px-4">
        <div className="text-center py-8 bg-[#1f1f1f] rounded-xl border border-dashed border-red-500/30">
          <div className="mx-auto w-16 h-16 rounded-full bg-[#1a1a1a] border-2 border-dashed border-red-500/30 flex items-center justify-center mb-4">
            <FaTimes className="text-red-500/50 text-xl" />
          </div>
          <h4 className="text-base sm:text-lg font-medium text-white mb-2">
            Error loading requests
          </h4>
          <p className="text-gray-500 text-sm">
            {error?.data?.message || "Please try again later"}
          </p>
        </div>
      </section>
    );
  }

  const scrollClass =
    filteredRequests.length > 8
      ? "max-h-[60vh] md:max-h-[70vh] overflow-y-auto overscroll-contain pr-1"
      : "";

  return (
    <section className="w-full px-3 sm:px-4">
      <AnimatePresence>
        {userData?.length > 0 ? (
          <div className={`space-y-3 ${scrollClass}`}>
            {userData?.map((request) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-xl p-3 sm:p-4 border ${
                  request.rescheduledStatus
                    ? "border-yellow-500/40 hover:border-yellow-500/60"
                    : "border-white/10 hover:border-[#a38b41]/40"
                } transition-all`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                  {/* Left: info */}
                  <div className="flex items-start sm:items-center gap-3 w-full">
                    <FaClock className="text-[#a38b41] mt-1 sm:mt-0 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm sm:text-base truncate">
                        {format(request?.date, "MMMM d, yyyy")}
                      </div>
                      <div className="text-gray-300 text-xs sm:text-sm">
                        {request.time} • {request.location}
                      </div>
                      <div className="text-gray-400 text-xs mt-1">
                        <span className="text-[#a38b41]">
                          {request.fanName}
                        </span>
                      </div>
                      {request.rescheduledStatus && (
                        <div className="text-yellow-500 text-[11px] sm:text-xs mt-1">
                          {request.rescheduledStatus.replace(/-/g, " ")}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: actions (stack on mobile) */}
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <button
                      onClick={() =>
                        handleTalentConfirmation(request._id, "accepted")
                      }
                      disabled={isConfirming && activeRequestId === request._id}
                      className={`flex items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all text-xs sm:text-sm w-full sm:w-auto ${
                        isConfirming && activeRequestId === request._id
                          ? "cursor-not-allowed"
                          : ""
                      } ${
                        isConfirming &&
                        activeRequestId === request._id &&
                        loadingAction === "accepted"
                          ? "bg-gray-500/40 text-white"
                          : "bg-gradient-to-r from-[#a38b41] to-[#c2ab67] text-black"
                      }`}
                    >
                      {isConfirming &&
                      activeRequestId === request._id &&
                      loadingAction === "accepted" ? (
                        <FaSpinner className="animate-spin text-xs" />
                      ) : (
                        <FaCheck />
                      )}
                      <span>Confirm</span>
                    </button>{" "}
                    <button
                      onClick={() =>
                        handleTalentConfirmation(request._id, "declined")
                      }
                      disabled={isConfirming && activeRequestId === request._id}
                      className={`flex items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all text-xs sm:text-sm w-full sm:w-auto ${
                        isConfirming && activeRequestId === request._id
                          ? "cursor-not-allowed"
                          : ""
                      } ${
                        isConfirming &&
                        activeRequestId === request._id &&
                        loadingAction === "decline"
                          ? "bg-gray-500/40 text-white"
                          : "bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400"
                      }`}
                    >
                      {isConfirming &&
                      activeRequestId === request._id &&
                      loadingAction === "decline" ? (
                        <FaSpinner className="animate-spin text-xs" />
                      ) : (
                        <FaTimes />
                      )}
                      <span>Decline</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-[#1f1f1f] rounded-xl border border-dashed border-white/10">
            <div className="mx-auto w-16 h-16 rounded-full bg-[#1a1a1a] border-2 border-dashed border-[#a38b41]/30 flex items-center justify-center mb-4">
              <FaCalendarAlt className="text-[#a38b41]/50 text-xl" />
            </div>
            <h4 className="text-base sm:text-lg font-medium text-white mb-2">
              No pending requests
            </h4>
            <p className="text-gray-500 text-sm">
              No meeting requests for {format(currentDate, "MMMM yyyy")}
            </p>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FanPendingRequestsList;
