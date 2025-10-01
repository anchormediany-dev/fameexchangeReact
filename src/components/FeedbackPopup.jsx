import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

const FeedbackPopup = ({ isFeedbackShow, onClick, onSubmit, request }) => {
  const [feedbackText, setFeedbackText] = useState("");

  // Reset form when popup opens
  useEffect(() => {
    if (isFeedbackShow) {
      setFeedbackText("");
    }
  }, [isFeedbackShow]);

  const handleSubmit = () => {
    if (feedbackText.trim()) {
      if (onSubmit) {
        // If onSubmit prop exists, use it
        onSubmit(feedbackText);
      } else {
        // Fallback to original behavior
        console.log("Feedback submitted:", feedbackText);
        onClick(); // Close modal via parent
        setFeedbackText("");
      }
    }
  };

  const handleClose = () => {
    onClick(); // Close modal via parent
  };

  if (!isFeedbackShow) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-gradient-to-br from-[#1e1e1e] to-[#2c2c2c] border border-white/10 rounded-2xl shadow-lg p-6 w-full max-w-md relative">
        {/* Close Icon */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition"
        >
          <FiX size={18} />
        </button>

        <h2 className="text-xl font-bold mb-2 text-center text-[#a38b41]">
          How Was Your Session?
        </h2>

        <p className="text-sm text-gray-300 text-center mb-4">
          Share your experience with us. Your feedback helps us improve!
        </p>

        {/* Show request info if available */}
        {/* {request && (
          <div className="bg-white/5 rounded-lg p-3 mb-4 text-sm">
            <p className="text-white">
              Session with:{" "}
              <span className="text-[#a38b41]">{request.fanName}</span>
            </p>
            <p className="text-gray-300">
              {request.date} at {request.time}
            </p>
          </div>
        )} */}

        <textarea
          rows={4}
          placeholder="Write your feedback here..."
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-400 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#a38b41] text-sm"
        />

        <button
          onClick={handleSubmit}
          disabled={!feedbackText.trim()}
          className={`w-full mt-5 py-2 rounded-xl font-semibold text-black transition-all ${
            feedbackText.trim()
              ? "bg-gradient-to-r from-[#a38b41] via-[#c2ab67] to-[#e6ca7c] hover:scale-105 active:scale-95 cursor-pointer"
              : "bg-gray-500/50 cursor-not-allowed"
          }`}
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default FeedbackPopup;
