import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCheck,
  FaTimes,
  FaCalendarAlt,
  FaClock,
  FaSpinner,
} from "react-icons/fa";
import { isSameMonth, parseISO, format } from "date-fns";
import {
  useGetAllFanRequestsQuery,
  useTalentConfirmationRequestMutation,
  useRescheduleTalentConfirmationMutation,
  useGetUpcomingSessionsQuery,
} from "../../app/authApi";
import { toast } from "react-toastify";

const PendingRequestsList = () => {
  const [currentDate] = useState(new Date());
  const [activeRequestId, setActiveRequestId] = useState(null);
  const [loadingAction, setLoadingAction] = useState(null);
  const [showReschedulePopup, setShowReschedulePopup] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [rescheduleForm, setRescheduleForm] = useState({
    availableDates: "",
    time: "",
    place: "",
    fansName: "",
    accessType: "online",
  });
  const {
    data: fanRequestsData,
    isLoading,
    isError,
    error,
  } = useGetAllFanRequestsQuery();

  const [confirmTalentRequest, { isLoading: isConfirming }] =
    useTalentConfirmationRequestMutation();

  const [
    rescheduleTalentRequest,
    {
      isLoading: isRescheduling,
      isError: isRescheduleError,
      error: rescheduleError,
    },
  ] = useRescheduleTalentConfirmationMutation();

  const userLocalData = JSON.parse(localStorage.getItem("user"));
  const roleId = userLocalData?.id;
  const {
    data: sessionsData,
    // isLoading,
    // isError,
    // error,
  } = useGetUpcomingSessionsQuery(roleId, {
    skip: !roleId,
  });
  const handleReschedule = (request) => {
    setSelectedRequest(request);
    setRescheduleForm({
      availableDates: "",
      time: "",
      place: "",
      fansName: request.fanName || "",
      accessType: "online",
    });
    setShowReschedulePopup(true);
  };
  useEffect(() => {
    if (showReschedulePopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showReschedulePopup]);
  const handleClosePopup = () => {
    setShowReschedulePopup(false);
    setSelectedRequest(null);
    setRescheduleForm({
      availableDates: "",
      time: "",
      place: "",
      fansName: "",
      accessType: "online",
    });
  };

  const handleRescheduleFormChange = (field, value) => {
    setRescheduleForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRescheduleSubmit = async () => {
    const { availableDates, time, place, accessType } = rescheduleForm;
    if (!availableDates || !time || !place || !accessType) {
      toast.error("Please fill in all fields to reschedule.");
      return;
    }

    try {
      const payload = {
        selectedRequestId: selectedRequest.id,
        confirmedDate: availableDates,
        time: time,
        location: place,
        accessType: accessType,
      };
      const response = await rescheduleTalentRequest(payload).unwrap();
      toast.success(response?.message || "Rescheduled successfully!");
      handleClosePopup();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to reschedule.");
      console.log(err);
    }
  };

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
    const request = filteredRequests.find((r) => r.id === requestId);
    if (!request) return;

    const payload = {
      requestId: request.id,
      confirmedDate: request.rawDate,
      time: request.time,
      location: request.location,
      fanName: request.fanName,
      accessType: request.accessType,
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
    <>
      <section className="">
        <AnimatePresence>
          {filteredRequests.length > 0 ? (
            <div className={`space-y-3 ${scrollClass}`}>
              {filteredRequests.map((request) => (
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
                          {request.date}
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
                          handleTalentConfirmation(request.id, "declined")
                        }
                        disabled={
                          isConfirming && activeRequestId === request.id
                        }
                        className={`flex items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all text-xs sm:text-sm w-full sm:w-auto ${
                          isConfirming && activeRequestId === request.id
                            ? "cursor-not-allowed"
                            : ""
                        } ${
                          isConfirming &&
                          activeRequestId === request.id &&
                          loadingAction === "decline"
                            ? "bg-gray-500/40 text-white"
                            : "bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400"
                        }`}
                      >
                        {isConfirming &&
                        activeRequestId === request.id &&
                        loadingAction === "decline" ? (
                          <FaSpinner className="animate-spin text-xs" />
                        ) : (
                          <FaTimes />
                        )}
                        <span>Decline</span>
                      </button>

                      <button
                        onClick={() =>
                          handleTalentConfirmation(request.id, "accepted")
                        }
                        disabled={
                          isConfirming && activeRequestId === request.id
                        }
                        className={`flex items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all text-xs sm:text-sm w-full sm:w-auto ${
                          isConfirming && activeRequestId === request.id
                            ? "cursor-not-allowed"
                            : ""
                        } ${
                          isConfirming &&
                          activeRequestId === request.id &&
                          loadingAction === "accepted"
                            ? "bg-gray-500/40 text-white"
                            : "bg-gradient-to-r from-[#a38b41] to-[#c2ab67] text-black"
                        }`}
                      >
                        {isConfirming &&
                        activeRequestId === request.id &&
                        loadingAction === "accepted" ? (
                          <FaSpinner className="animate-spin text-xs" />
                        ) : (
                          <FaCheck />
                        )}
                        <span>Confirm</span>
                      </button>

                      <button
                        onClick={() => handleReschedule(request)}
                        className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 transition-colors text-xs sm:text-sm w-full sm:w-auto"
                      >
                        <FaCalendarAlt />
                        <span>Reschedule</span>
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

      {/* Reschedule Popup */}
      {showReschedulePopup && selectedRequest && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-2xl border border-white/10 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">
                  Reschedule Request
                </h3>
                <button
                  onClick={handleClosePopup}
                  className="text-gray-400 hover:text-white text-2xl font-bold transition-colors"
                >
                  ×
                </button>
              </div>

              {/* Reschedule Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Available Dates
                  </label>
                  <select
                    value={rescheduleForm.availableDates}
                    onChange={(e) =>
                      handleRescheduleFormChange(
                        "availableDates",
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#a38b41] focus:border-transparent outline-none text-white transition-all"
                  >
                    <option value="">Select available date</option>
                    {sessionsData?.sessions?.map((session) => (
                      <option key={session._id} value={session.sessionDate}>
                        {session.sessionDate}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={rescheduleForm.time}
                    onChange={(e) =>
                      handleRescheduleFormChange("time", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#a38b41] focus:border-transparent outline-none text-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Access Type
                  </label>
                  <select
                    value={rescheduleForm.accessType}
                    onChange={(e) =>
                      handleRescheduleFormChange("accessType", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#a38b41] focus:border-transparent outline-none text-white transition-all"
                  >
                    <option value="online">Online</option>
                    <option value="onsite">Onsite</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Meeting Location
                  </label>
                  <input
                    type="text"
                    placeholder="Meeting Location"
                    value={rescheduleForm.place}
                    onChange={(e) =>
                      handleRescheduleFormChange("place", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#a38b41] focus:border-transparent outline-none text-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Fan's Name
                  </label>
                  <input
                    type="text"
                    value={rescheduleForm.fansName}
                    readOnly
                    className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-6">
                <button
                  onClick={handleClosePopup}
                  className="flex-1 px-4 py-3 cursor-pointer bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRescheduleSubmit}
                  disabled={isRescheduling}
                  className="flex-1 px-4 py-3 cursor-pointer bg-[#a38b41] text-white rounded-lg hover:bg-[#b59a4a] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isRescheduling ? (
                    <span className="flex items-center justify-center gap-2">
                      <FaSpinner className="animate-spin" />
                      Rescheduling...
                    </span>
                  ) : (
                    "Reschedule"
                  )}
                </button>
              </div>

              {isRescheduleError && (
                <p className="text-red-400 text-center text-sm mt-3">
                  {rescheduleError?.data?.message ||
                    "Failed to reschedule. Please try again."}
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default PendingRequestsList;
