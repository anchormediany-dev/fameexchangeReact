import { useState } from "react";
import {
  useGetKYCListingsQuery,
  useAdminKycConfirmationMutation,
} from "../../app/authApi";
import { motion, AnimatePresence } from "framer-motion";
import { FiRefreshCcw, FiX } from "react-icons/fi";
import { FaCheck, FaSpinner, FaTimes } from "react-icons/fa";

export default function AdminKycListings() {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetKYCListingsQuery();
  const [confirmTalentRequest, { isLoading: isConfirming }] =
    useAdminKycConfirmationMutation();
  // Copy then sort (newest first). No useMemo, no fixed timezone.
  const rows = Array.isArray(data?.data)
    ? [...data.data].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    : [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2
          className="text-xl font-bold"
          style={{
            background: "linear-gradient(to right, #a38b41, #d4c374)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          KYC Requests
        </h2>

        <motion.button
          type="button"
          onClick={refetch}
          disabled={isFetching}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          aria-busy={isFetching}
          className="
            relative inline-flex items-center gap-2 rounded-xl px-4 py-2
            bg-gradient-to-br from-white/10 to-white/5
            hover:from-white/20 hover:to-white/10
            text-white text-sm font-medium
            ring-1 ring-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]
            backdrop-blur-md transition-colors
            focus:outline-none focus:ring-2 focus:ring-[#a38b41]/40
            disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          {isFetching ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
              <span>Refreshing…</span>
            </>
          ) : (
            <>
              <FiRefreshCcw className="h-4 w-4" />
              <span>Refresh</span>
            </>
          )}
        </motion.button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  S.No
                </th>

                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Name
                </th>

                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Date/ Time
                </th>

                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Status
                </th>
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Actions
                </th>
              </tr>
            </thead>

            {isLoading ? (
              <tbody>
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-300">
                    Loading…
                  </td>
                </tr>
              </tbody>
            ) : isError ? (
              <tbody>
                <tr>
                  <td colSpan={6} className="p-6 text-center text-red-300">
                    {error?.data?.error ||
                      error?.data?.message ||
                      error?.error ||
                      "Failed to load contacts."}
                  </td>
                </tr>
              </tbody>
            ) : rows.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-300">
                    No inverse requests yet.
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {rows.map((r, idx) => {
                  const d = r?.createdAt ? new Date(r?.createdAt) : null;
                  return (
                    <tr
                      key={r?._id}
                      className="border-b border-white/10 hover:bg-white/5 transition cursor-pointer"
                    >
                      <td className="p-3">
                        <span className="inline-flex w-7 h-7 items-center justify-center rounded-md bg-[#a38b41] text-white text-xs font-bold">
                          {idx + 1}
                        </span>
                      </td>

                      <td className="p-3 text-white text-sm">
                        {r?.userId?.name}
                      </td>
                      <td
                        className="p-3 text-gray-300 text-sm"
                        title={r?.createdAt}
                      >
                        {d ? d.toLocaleDateString() : "—"}{" "}
                        {d ? d.toLocaleTimeString() : "—"}
                      </td>

                      <td className="p-3 text-white text-sm">
                        {r?.status === "VERIFIED" && (
                          <span
                            className={`px-2 py-0.5 rounded-lg border text-xs text-green-300 border-green-400/30 bg-green-400/10`}
                          >
                            VERIFIED
                          </span>
                        )}{" "}
                        {r?.status === "PENDING" && (
                          <span
                            className={`px-2 py-0.5 rounded-lg border text-xs text-yellow-300 border-yellow-400/30 bg-yellow-400/10`}
                          >
                            PENDING
                          </span>
                        )}
                        {r?.status === "REJECTED" && (
                          <span
                            className={`px-2 py-0.5 rounded-lg border text-xs text-red-300 border-red-400/30 bg-red-400/10`}
                          >
                            REJECTED
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-white text-sm">
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                          <button className="custom-button-two cursor-pointer">
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
