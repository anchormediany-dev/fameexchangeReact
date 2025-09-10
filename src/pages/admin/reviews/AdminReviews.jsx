import React from "react";
import { useGetReviewsQuery } from "../../../app/authApi";
import AddAdminReviews from "./AddAdminReviews";

const AdminReviews = () => {
  const { data, isLoading, isError, error, refetch } = useGetReviewsQuery();
  const reviews = data?.reviews || data?.data || [];

  return (
    <div className="space-y-6">
      <AddAdminReviews />

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h2
            className="text-xl font-bold"
            style={{
              background: "linear-gradient(to right, #a38b41, #d4c374)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Recent Reviews
          </h2>
          <button
            onClick={() => refetch()}
            className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition text-sm"
          >
            Refresh
          </button>
        </div>

        {isLoading ? (
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-10 bg-white/10 rounded animate-pulse" />
            ))}
          </div>
        ) : isError ? (
          <div className="bg-red-500/10 border border-red-500/30 text-red-200 rounded-xl p-3">
            {error?.data?.message || error?.error || "Failed to load reviews"}
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-gray-300">No reviews yet.</div>
        ) : (
          <ul className="space-y-3">
            {reviews.map((r, i) => (
              <li
                key={r?._id || i}
                className="p-3 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="flex items-center justify-between">
                  <div className="text-white font-medium">
                    {r?.customerName || "Anonymous"}
                  </div>
                  <div className="text-xs text-gray-400">
                    Rating: <span className="text-white">{r?.starsRating}</span>
                  </div>
                </div>
                <div className="text-gray-300 text-sm mt-1">
                  {r?.reviewDetail}
                </div>
                <div className="text-xs mt-2">
                  <span className="px-2 py-0.5 rounded-lg border border-white/10 bg-white/5">
                    {r?.status || "pending"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminReviews;
