import { useState } from "react";
import { useGetAllFanRequestsForAdminQuery } from "../../app/authApi";
import { motion, AnimatePresence } from "framer-motion";
import { FiRefreshCcw, FiX } from "react-icons/fi";

export default function AdminInverse() {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetAllFanRequestsForAdminQuery();

  // Copy then sort (newest first). No useMemo, no fixed timezone.
  const rows = Array.isArray(data?.data)
    ? [...data.data].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    : [];

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const onOpen = (item) => {
    setSelected(item);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    setSelected(null);
  };

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
          Inverse Requests
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
                  Fan Name
                </th>
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Talent Name
                </th>

                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Date/ Time
                </th>

                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Desired Location
                </th>
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Status
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
                      onClick={() => onOpen(r)}
                    >
                      <td className="p-3">
                        <span className="inline-flex w-7 h-7 items-center justify-center rounded-md bg-[#a38b41] text-white text-xs font-bold">
                          {idx + 1}
                        </span>
                      </td>
                      <td className="p-3 text-white text-sm">
                        {r?.fanId?.name}
                      </td>
                      <td className="p-3 text-white text-sm">
                        {r?.talentName}
                      </td>
                      <td
                        className="p-3 text-gray-300 text-sm"
                        title={r?.createdAt}
                      >
                        {d ? d.toLocaleDateString() : "—"}{" "}
                        {d ? d.toLocaleTimeString() : "—"}
                      </td>

                      <td className="p-3 text-white text-sm">{r?.location}</td>
                      <td className="p-3 text-white text-sm">{r?.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={onClose}
            />
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              className="relative z-10 w-full max-w-xl bg-[#1c1c1c] border border-white/10 rounded-2xl p-5 shadow-xl"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-white">
                  Inverse Request Details
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/10 text-white"
                  aria-label="Close"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="space-y-1">
                  <div className="text-gray-400">Fan Name</div>
                  <div className="text-white">
                    {selected?.fanId?.name || "—"}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-gray-400">Email</div>
                  <div className="text-white break-all">
                    {selected?.fanId?.email || "—"}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-gray-400">Payment Method</div>
                  <div className="text-white">
                    {selected?.paymentMethod || "—"}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-gray-400">Status</div>
                  <div className="text-white" title={selected?.status}>
                    {selected?.status || "—"}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-gray-400">Location</div>
                  <div className="text-white" title={selected?.status}>
                    {selected?.location || "—"}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-gray-400">Paid</div>
                  <div className="text-white" title={selected?.status}>
                    {(selected?.ispaid === true && "Yes") ||
                      (selected?.ispaid === false && "No") ||
                      "—"}
                  </div>
                </div>
              </div>

              {/* <div className="mt-4 space-y-1">
                <div className="text-gray-400 text-sm">Message</div>
                <div className="text-white/90 whitespace-pre-wrap bg-white/5 border border-white/10 rounded-lg p-3">
                  {selected.message || "—"}
                </div>
              </div> */}

              <div className="mt-5 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
