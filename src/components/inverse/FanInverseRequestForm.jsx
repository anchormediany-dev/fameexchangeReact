import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useFanInverseRequestMutation } from "../../app/authApi";
import { toast } from "react-toastify";
import { animate } from "framer-motion";
const FanInverseRequestForm = ({
  isTalentName,
  sessionsData,
  selectedSession,
}) => {
  const [fanRequest, setFanRequest] = useState({
    talentName: isTalentName ? isTalentName : "",
    date: selectedSession?.data?.sessionDate,
    time: selectedSession?.data?.sessionTime,
    desiredLocation: selectedSession?.data?.where,
    sessionId: selectedSession?.data?._id,
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    cardName: "",
  });

  const location = useLocation();

  const [sendFanRequest, { isLoading, isError, error }] =
    useFanInverseRequestMutation();
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
      // talentName: "",
      date: "",
      time: "",
      desiredLocation: "",
      sessionId: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvv: "",
      cardName: "",
    });
  };

  // Send request
  const handleSendRequest = async () => {
    if (
      !isTalentName
        ? isTalentName
        : fanRequest.talentName ||
          !fanRequest.date ||
          !fanRequest.time ||
          !fanRequest.desiredLocation ||
          !fanRequest.sessionId ||
          !fanRequest.cardType
    )
      // {
      //   toast.error("Please fill in all the required fields.");
      //   return;
      // }
      try {
        const requestBody = {
          talentName: isTalentName ? isTalentName : fanRequest.talentName,
          date: selectedSession?.data?.sessionDate,
          time: selectedSession?.data?.sessionTime,
          location: selectedSession?.data?.where,
          sessionId: selectedSession?.data?._id,
          paymentMethod:
            fanRequest.cardType === "credit" ? "Credit Card" : "Debit Card",
        };
        await sendFanRequest(requestBody).unwrap();
        toast.success("Inverse request sent successfully!");
        handleClear();
      } catch (err) {
        toast.error(error?.data?.message);
      }
  };

  // Cancel request
  const handleCancel = () => {
    handleClear();
  };
  useEffect(() => {
    if (location.hash !== "#inverse-request-form") return;

    let rafId;
    let animControls;
    let tries = 0;
    const maxTries = 60; // ~1s (60 frames)

    const go = () => {
      const el = document.getElementById("inverse-request-form");
      if (!el) {
        if (tries++ < maxTries) rafId = requestAnimationFrame(go);
        return;
      }

      const targetY = el.getBoundingClientRect().top + window.pageYOffset - 200; // 👈 100px offset
      const startY = window.pageYOffset;

      // Respect reduced motion
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) {
        window.scrollTo(0, targetY);
        return;
      }

      // Framer Motion-powered smooth scroll
      animControls = animate(startY, targetY, {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // expo-ish
        onUpdate: (latest) => window.scrollTo(0, latest),
      });
    };

    go();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (animControls) animControls.stop();
    };
  }, [location.hash]);

  return (
    <div
      className="lg:col-span-2 flex flex-col space-y-3 h-full"
      id="inverse-request-form"
    >
      {/* Fan Request Form section */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 md:p-4 flex-1">
        <h2 className="text-2xl font-bold text-primary2 mb-6 text-center">
          Fan Inverse Request Form
        </h2>
        {!isTalentName && (
          <div className="animate-pulse mt-4 text-center">
            <p className="text-gray-500">Select a talent from the top</p>
          </div>
        )}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Talent Selected
            </label>
            <input
              type="text"
              value={isTalentName ? isTalentName : fanRequest.talentName}
              readOnly
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
              type="text"
              readOnly
              placeholder="Date"
              value={selectedSession?.data?.sessionDate}
              // onChange={(e) => handleFanRequestChange("date", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Time
            </label>
            <input
              type="text"
              readOnly
              placeholder="Time"
              value={selectedSession?.data?.sessionTime}
              // onChange={(e) => handleFanRequestChange("time", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Price (USD)
            </label>
            <input
              type="text"
              readOnly
              placeholder="Price"
              value={`${selectedSession?.data?.price || 0}`}
              // onChange={(e) => handleFanRequestChange("time", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Desired Location
            </label>
            <input
              type="text"
              value={selectedSession?.data?.where}
              // onChange={(e) =>
              //   handleFanRequestChange("desiredLocation", e.target.value)
              // }
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
            className="px-6 cursor-pointer py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            Clear
          </button>
          <button
            onClick={handleSendRequest}
            className="px-6 py-3 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Send Request
          </button>
          <button
            onClick={handleCancel}
            className="px-6 py-3 cursor-pointer bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FanInverseRequestForm;
