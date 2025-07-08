import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

const FeedbackPopup = ({ isFeedbackShow, onClick }) => {
  const [feedbackText, setFeedbackText] = useState("");

  const handleSubmit = () => {
    if (feedbackText.trim()) {
      console.log("Feedback submitted:", feedbackText);
      onClick(); // Close modal via parent
      setFeedbackText("");
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

        <textarea
          rows={4}
          placeholder="Write your feedback here..."
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-400 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#a38b41] text-sm"
        />

        <button
          onClick={handleSubmit}
          className="w-full mt-5 py-2 rounded-xl font-semibold text-black bg-gradient-to-r from-[#a38b41] via-[#c2ab67] to-[#e6ca7c] hover:scale-105 active:scale-95 transition-all"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default FeedbackPopup;
