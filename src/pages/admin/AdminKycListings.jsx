import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetKYCListingsQuery } from "../../app/authApi";
import { motion } from "framer-motion";
import { FiRefreshCcw } from "react-icons/fi";

const STATUS_FILTERS = [
  { value: "", label: "All" },
  { value: "PENDING", label: "Pending" },
  { value: "VERIFIED", label: "Verified" },
  { value: "REJECTED", label: "Rejected" },
];

export default function AdminKycListings() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("");
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetKYCListingsQuery({ status: statusFilter, limit: 100 });

  // Copy then sort (newest first). No useMemo, no fixed timezone.
  const rows = Array.isArray(data?.data)
    ? [...data.data].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    : [];

  const counts = rows.reduce(
    (acc, r) => {
      acc.total += 1;
      if (r?.status === "PENDING") acc.pending += 1;
      if (r?.status === "VERIFIED") acc.verified += 1;
      if (r?.status === "REJECTED") acc.rejected += 1;
      return acc;
    },
    { total: 0, pending: 0, verified: 0, rejected: 0 }
  );

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

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
          <div className="text-gray-400 text-xs uppercase tracking-wider">Total</div>
          <div className="text-white text-xl font-bold">{counts.total}</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
          <div className="text-yellow-300 text-xs uppercase tracking-wider">Pending</div>
          <div className="text-white text-xl font-bold">{counts.pending}</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
          <div className="text-green-300 text-xs uppercase tracking-wider">Verified</div>
          <div className="text-white text-xl font-bold">{counts.verified}</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
          <div className="text-red-300 text-xs uppercase tracking-wider">Rejected</div>
          <div className="text-white text-xl font-bold">{counts.rejected}</div>
        </div>
      </div>

      <div className="flex gap-2">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setStatusFilter(f.value)}
            className={`px-3 py-1.5 rounded-lg text-sm border transition ${
              statusFilter === f.value
                ? "bg-[#a38b41] border-[#a38b41] text-white"
                : "border-white/10 text-gray-300 hover:bg-white/5"
            }`}
          >
            {f.label}
          </button>
        ))}
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
                      "Failed to load KYC requests."}
                  </td>
                </tr>
              </tbody>
            ) : rows.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-300">
                    No KYC requests yet.
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
                          <button
                            onClick={() => navigate(`/kyc/${r?.userId?._id}`)}
                            className="custom-button-two cursor-pointer"
                          >
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
