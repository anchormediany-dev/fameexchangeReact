import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRescheduleTalentConfirmationMutation } from "../../app/authApi"; // Import the mutation hook
import { toast } from "react-toastify";
const TalentConfirmationForm = ({
  selectedRequestId,
  selectedFanName,
  sessionsData,
  isLoading,
  isError,
  error,
}) => {
  const [responseForm, setResponseForm] = useState({
    availableDates: "",
    time: "",
    place: "",
    fansName: selectedFanName || "",
  });

  const location = useLocation();

  // Initialize the mutation hook for reschedule
  const [
    rescheduleTalentRequest,
    {
      isLoading: isRescheduling,
      isError: isRescheduleError,
      error: rescheduleError,
    },
  ] = useRescheduleTalentConfirmationMutation();

  const handleResponseChange = (field, value) => {
    setResponseForm({
      ...responseForm,
      [field]: value,
    });
  };

  // Handle reschedule request
  const handleReschedule = async () => {
    const { availableDates, time, place } = responseForm;
    if (!availableDates || !time || !place) {
      toast.error("Please fill in all fields to reschedule.");
      return;
    }

    try {
      const payload = {
        selectedRequestId,
        confirmedDate: availableDates,
        time: time,
        location: place,
      };
      const response = await rescheduleTalentRequest(payload).unwrap();
      toast.success(response?.message);
    } catch (err) {
      toast.error(err?.data?.message);
      console.log(err);
    }
  };

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

  // Check for loading and error states
  if (isLoading) {
    return <p>Loading sessions...</p>;
  }

  if (isError) {
    return <p>Error: {error?.message || "Failed to load sessions."}</p>;
  }

  return (
    <div className="lg:col-span-2 flex flex-col space-y-3 h-full">
      <div
        id="reschedule-section"
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 md:p-4 h-full flex flex-col"
      >
        {/* Response Form */}
        <h2 className="text-2xl font-bold text-primary2 mb-6 text-center">
          Talent Confirmation
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Available Dates
            </label>
            <select
              value={responseForm.availableDates}
              onChange={(e) =>
                handleResponseChange("availableDates", e.target.value)
              }
              className="w-full px-4 py-3 border-2 border-gray-300 outline-1 outline-gray-300 text-primary2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Time
            </label>
            <input
              type="time"
              value={responseForm.time}
              onChange={(e) => handleResponseChange("time", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Place
            </label>
            <select
              value={responseForm.place}
              onChange={(e) => handleResponseChange("place", e.target.value)}
              className="w-full px-4 py-3 border border-gray-400 outline-1 outline-gray-300 text-primary2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="">Select place</option>
              <option value="new-york">New York</option>
              <option value="los-angeles">Los Angeles</option>
              <option value="chicago">Chicago</option>
              <option value="houston">Houston</option>
              <option value="phoenix">Phoenix</option>
              <option value="philadelphia">Philadelphia</option>
              <option value="san-antonio">San Antonio</option>
              <option value="san-diego">San Diego</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Fan's Name
            </label>
            <input
              type="text"
              value={responseForm.fansName}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter fan's name"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-8 justify-center">
          <button
            onClick={handleReschedule}
            className="px-8 py-3 bg-primary2 text-white rounded-lg hover:bg-primary2 transition-colors font-medium"
            disabled={isRescheduling}
          >
            {isRescheduling ? "Rescheduling..." : "Reschedule"}
          </button>
        </div>

        {/* Show error if reschedule failed */}
        {isRescheduleError && (
          <p className="text-red-500 text-center mt-4">
            {rescheduleError?.message || "Failed to reschedule."}
          </p>
        )}
      </div>
    </div>
  );
};

export default TalentConfirmationForm;
