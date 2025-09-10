import React, { useMemo, useState } from "react";
import {
  useGetReviewsQuery,
  useDeleteReviewMutation,
} from "../../../app/authApi";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import ConfirmDialog from "../../../utils/ConfirmDialog";

const statusCls = (s = "") => {
  const val = String(s).toLowerCase();
  if (val === "approved")
    return "text-green-300 border-green-400/30 bg-green-400/10";
  if (val === "rejected") return "text-red-300 border-red-400/30 bg-red-400/10";
  return "text-yellow-300 border-yellow-400/30 bg-yellow-400/10"; // pending/default
};

const AdminReviews = () => {
  const navigate = useNavigate();
  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetReviewsQuery();
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();

  const reviews = useMemo(() => data?.reviews || data?.data || [], [data]);
  const isBusy = isLoading || isFetching;

  // Modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [target, setTarget] = useState(null);

  const askDelete = (review) => {
    setTarget(review);
    setConfirmOpen(true);
  };

  const closeConfirm = () => {
    if (isDeleting) return;
    setConfirmOpen(false);
    setTarget(null);
  };

  const doDelete = async () => {
    if (!target?._id) return;
    try {
      await deleteReview(target._id).unwrap();
      toast.success("Review deleted");
      closeConfirm();
    } catch (err) {
      toast.error(
        err?.data?.message || err?.error || "Failed to delete review"
      );
    }
  };

  return (
    <div className="space-y-6">
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
            Customer Reviews
          </h2>
          <div className="flex items-center gap-2">
            <button
              className="custom-button-two"
              onClick={() => navigate("/admin/add-review")}
            >
              Add Review
            </button>
          </div>
        </div>

        {/* Error */}
        {isError && (
          <div className="mb-3 flex items-center justify-between bg-red-500/10 border border-red-500/30 text-red-200 rounded-xl p-3">
            <div>
              <p className="font-semibold">Failed to load reviews</p>
              <p className="text-sm opacity-80">
                {error?.data?.message || error?.error || "Unknown error"}
              </p>
            </div>
            <button
              onClick={() => refetch()}
              className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  S.No
                </th>
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Customer
                </th>
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Rating
                </th>
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Status
                </th>
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Review
                </th>

                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {isBusy &&
                [...Array(5)].map((_, i) => (
                  <tr key={`skel-${i}`} className="border-b border-white/5">
                    {[...Array(7)].map((__, j) => (
                      <td key={j} className="p-3">
                        <div className="h-4 w-full max-w-[220px] bg-white/10 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))}

              {/* Empty */}
              {!isBusy && !isError && reviews.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-gray-300">
                    No reviews yet.
                  </td>
                </tr>
              )}

              {/* Rows */}
              {!isBusy &&
                !isError &&
                reviews.length > 0 &&
                reviews.map((r, idx) => (
                  <tr
                    key={r?._id || idx}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-3">
                      <span
                        className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                        style={{ backgroundColor: "#a38b41" }}
                      >
                        {idx + 1}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="text-white text-sm font-medium">
                        {r?.customerName || "Anonymous"}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="text-gray-200 text-sm">
                        {typeof r?.starsRating === "number"
                          ? r.starsRating
                          : "—"}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-lg border text-xs ${statusCls(
                          r?.status
                        )}`}
                      >
                        {r?.status || "pending"}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="text-gray-300 text-sm max-w-[520px] truncate">
                        {r?.reviewDetail || "—"}
                      </div>
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() => askDelete(r)}
                        className="px-2 py-1 rounded-lg bg-red-500/20 text-red-200 border border-red-400/30 hover:bg-red-500/30 transition flex items-center gap-1 text-xs"
                        title="Delete review"
                      >
                        <FiTrash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reusable confirm dialog */}
      <ConfirmDialog
        open={confirmOpen}
        onClose={closeConfirm}
        onConfirm={doDelete}
        pending={isDeleting}
        variant="danger"
        title="Delete review?"
        // description={
        //   target
        //     ? `You’re about to delete the review by ${
        //         target.customerName || "Anonymous"
        //       }. This action cannot be undone.`
        //     : ""
        // }
      >
        {/* {target?.reviewDetail} */}
      </ConfirmDialog>
    </div>
  );
};

export default AdminReviews;
