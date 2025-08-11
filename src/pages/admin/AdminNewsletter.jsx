import { useGetNewslettersQuery } from "../../app/authApi";
import { motion } from "framer-motion";
import { FiRefreshCcw } from "react-icons/fi";
export default function AdminNewsletter() {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGetNewslettersQuery();

  const rows = Array.isArray(data?.data) ? data.data : [];
  const total = data?.total ?? rows.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">
          Newsletter Subscribers
        </h1>
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
        <div className="text-gray-300 mb-3">
          Total subscribers:{" "}
          <span className="text-white font-semibold">{total}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  S.No
                </th>
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Email
                </th>
                {/* <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Source
                </th>
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Status
                </th> */}
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Date
                </th>
                <th className="text-left p-3 text-gray-300 font-semibold text-sm">
                  Time
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
                      "Failed to load newsletter list."}
                  </td>
                </tr>
              </tbody>
            ) : rows.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-300">
                    No subscribers yet.
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {rows.map((r, idx) => {
                  const d = r.createdAt ? new Date(r.createdAt) : null;
                  return (
                    <tr
                      key={r._id}
                      className="border-b border-white/10 hover:bg-white/5 transition"
                    >
                      <td className="p-3">
                        <span className="inline-flex w-7 h-7 items-center justify-center rounded-md bg-[#a38b41] text-white text-xs font-bold">
                          {idx + 1}
                        </span>
                      </td>
                      <td className="p-3 text-white text-sm">{r.email}</td>
                      {/* <td className="p-3 text-gray-300 text-sm">
                        {r.source || "—"}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            r.status === "subscribed"
                              ? "bg-green-500/15 text-green-300 border border-green-500/30"
                              : "bg-gray-500/15 text-gray-300 border border-gray-500/30"
                          }`}
                        >
                          {r.status || "—"}
                        </span>
                      </td> */}
                      <td className="p-3 text-gray-300 text-sm">
                        {d ? d.toLocaleDateString() : "—"}
                      </td>
                      <td className="p-3 text-gray-300 text-sm">
                        {d ? d.toLocaleTimeString() : "—"}
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
