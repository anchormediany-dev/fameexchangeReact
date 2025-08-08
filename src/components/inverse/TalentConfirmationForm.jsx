import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const TalentConfirmationForm = () => {
  const [responseForm, setResponseForm] = useState({
    availableDates: "",
    time: "",
    place: "",
    fansName: "",
  });

  const location = useLocation();
  const selectedTalent = location.state?.selectedTalent;

  const handleResponseChange = (field, value) => {
    setResponseForm({
      ...responseForm,
      [field]: value,
    });
  };

  const handleAccepted = () => {
    console.log("Accepted:", responseForm);
  };

  const handleRejected = () => {
    console.log("Reschedule:", responseForm);
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
              {selectedTalent?.availability.map((date, index) => (
                <option key={index} value={date}>
                  {date}
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
              onChange={(e) => handleResponseChange("fansName", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter fan's name"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-8 justify-center">
          <button
            onClick={handleAccepted}
            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Accepted
          </button>
          <button
            onClick={handleRejected}
            className="px-8 py-3 bg-primary2 text-white rounded-lg hover:bg-primary2 transition-colors font-medium"
          >
            Reschedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default TalentConfirmationForm;
