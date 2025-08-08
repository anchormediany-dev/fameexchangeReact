import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const FanInverseRequestForm = ({ isTalentName }) => {
  const [fanRequest, setFanRequest] = useState({
    talentName: isTalentName ? isTalentName : "",
    date: "",
    time: "",
    desiredLocation: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    cardName: "",
  });

  const location = useLocation();

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

  // Handle fan request form changes
  const handleFanRequestChange = (field, value) => {
    setFanRequest((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Clear form
  const handleClear = () => {
    setFanRequest({
      talentName: "",
      date: "",
      time: "",
      desiredLocation: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvv: "",
      cardName: "",
    });
  };

  // Send request
  const handleSendRequest = () => {
    console.log("Sending request:", fanRequest);
    // Add your send request logic here
  };

  // Cancel request
  const handleCancel = () => {
    handleClear();
  };

  return (
    <div className="lg:col-span-2 flex flex-col space-y-3 h-full">
      {/* Fan Request Form section */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 md:p-4 flex-1">
        <h2 className="text-2xl font-bold text-primary2 mb-6 text-center">
          Fan Inverse Request Form
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Talent Selected
            </label>
            <input
              type="text"
              value={isTalentName ? isTalentName : fanRequest.talentName}
              // readOnly
              onChange={(e) =>
                handleFanRequestChange("talentName", e.target.value)
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter talent name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Date
            </label>
            <input
              type="date"
              value={fanRequest.date}
              onChange={(e) => handleFanRequestChange("date", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Time
            </label>
            <input
              type="time"
              value={fanRequest.time}
              onChange={(e) => handleFanRequestChange("time", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Desired Location
            </label>
            <input
              type="text"
              value={fanRequest.desiredLocation}
              onChange={(e) =>
                handleFanRequestChange("desiredLocation", e.target.value)
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter desired location"
            />
          </div>
          {/* Payment Information Section */}
          <div className="pt-4 border-t border-white/10">
            <h3 className="text-lg font-medium text-gray-300 mb-4">
              Select Payment Method
            </h3>

            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="radio"
                  name="cardType"
                  value="debit"
                  checked={fanRequest.cardType === "debit"}
                  onChange={() => handleFanRequestChange("cardType", "debit")}
                  className="accent-[#a38b41] w-4 h-4"
                />
                Debit Card
              </label>
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="radio"
                  name="cardType"
                  value="credit"
                  checked={fanRequest.cardType === "credit"}
                  onChange={() => handleFanRequestChange("cardType", "credit")}
                  className="accent-[#a38b41] w-4 h-4"
                />
                Credit Card
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-8 justify-center">
          <button
            onClick={handleClear}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            Clear
          </button>
          <button
            onClick={handleSendRequest}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Send Request
          </button>
          <button
            onClick={handleCancel}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FanInverseRequestForm;
