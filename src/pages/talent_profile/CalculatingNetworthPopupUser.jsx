import { AnimatePresence, motion } from "framer-motion";
import { FaSpinner, FaTimes } from "react-icons/fa";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const popupVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
  exit: { scale: 0.9, opacity: 0, transition: { duration: 0.2 } },
};

function pretty(n) {
  if (n === null || n === undefined) return "—";
  if (typeof n === "number") return n.toLocaleString();
  if (typeof n === "string" && /^\d+(\.\d+)?$/.test(n))
    return Number(n).toLocaleString();
  return String(n);
}

export default function CalculatingNetworthPopupUser({
  open,
  loading,
  data,
  error,
  onClose,
}) {
  const social = data?.socialMedia || {};
  const createdAt = data?.createdAt ? new Date(data.createdAt) : null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="relative w-full max-w-3xl bg-[#0f0f0f] text-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/10"
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute right-3 top-3 p-2 rounded-lg hover:bg-white/10 transition"
              aria-label="Close"
            >
              <FaTimes />
            </button>

            {/* Header */}
            <h2 className="text-2xl font-semibold text-[#a38b41]">
              {loading ? "Calculating Your Net worth" : "Net worth Summary"}
            </h2>
            <p className="text-gray-300 mt-1">
              {loading ? "Processing your social media. Please wait…" : ""}
            </p>

            {/* Loading */}
            {loading && (
              <div className="flex flex-col items-center justify-center gap-4 py-10">
                <FaSpinner className="animate-spin text-5xl text-[#a38b41]" />
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div className="mt-6 bg-red-500/10 border border-red-500/30 text-red-200 rounded-xl p-4">
                {error?.data?.error ||
                  error?.data?.message ||
                  error?.error ||
                  "Failed to calculate net worth."}
              </div>
            )}

            {/* Data */}
            {!loading && !error && data && (
              <div className="mt-6 space-y-6">
                {/* Top summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                    <div className="text-sm text-gray-400">Full Name</div>
                    <div className="text-xl font-semibold">
                      {data.fullName || "—"}
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                    <div className="text-sm text-gray-400">Brand / Token</div>
                    <div className="text-xl font-semibold">
                      {(data.tokenBrand?.brandName || "—") +
                        " • " +
                        (data.tokenBrand?.tokenName || "—")}
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                    <div className="text-sm text-gray-400">Total Net worth</div>
                    <div className="text-2xl font-bold">
                      {pretty(data.netWorth)} {data.currency || ""}
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                    <div className="text-sm text-gray-400">Total Followers</div>
                    <div className="text-2xl font-bold">
                      {pretty(data.totalFollowers)}
                    </div>
                  </div>
                </div>

                {/* By platform */}
                {Object.keys(social).length > 0 && (
                  <div>
                    <div className="text-sm text-gray-400 mb-3">
                      By Platform
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {Object.entries(social).map(([platform, stats]) => {
                        const count =
                          stats?.followers ??
                          stats?.subscribers ??
                          stats?.count ??
                          0;
                        const label =
                          (stats?.followers !== undefined && "Followers") ||
                          (stats?.subscribers !== undefined && "Subscribers") ||
                          "Count";
                        return (
                          <div
                            key={platform}
                            className="rounded-xl bg-white/5 border border-white/10 p-4 flex items-center justify-between gap-4"
                          >
                            <div className="min-w-0">
                              <div className="text-white capitalize font-medium">
                                {platform}
                              </div>
                              {stats?.url ? (
                                <a
                                  href={stats.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-xs text-[#a38b41] break-all hover:underline"
                                >
                                  {stats.url}
                                </a>
                              ) : (
                                <div className="text-xs text-gray-400">
                                  No URL
                                </div>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="text-[#a38b41] text-xl font-semibold">
                                {pretty(count)}
                              </div>
                              <div className="text-xs text-gray-400">
                                {label}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
