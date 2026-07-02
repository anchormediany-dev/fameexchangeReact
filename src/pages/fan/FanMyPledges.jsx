import { useGetMyPledgesQuery } from "../../app/tradingApi";
import { Link } from "react-router-dom";
import { FiTrendingUp, FiClock, FiCheck, FiX, FiRefreshCw } from "react-icons/fi";

const REFUND_DAYS = 90;

function statusBadge(status) {
  const map = {
    pending: {
      label: "Pending",
      cls: "bg-amber-500/15 text-amber-400 border-amber-500/30",
      icon: <FiClock className="w-3 h-3" />,
    },
    fulfilled: {
      label: "Fulfilled",
      cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
      icon: <FiCheck className="w-3 h-3" />,
    },
    refunded: {
      label: "Refunded",
      cls: "bg-gray-500/15 text-gray-400 border-gray-500/30",
      icon: <FiRefreshCw className="w-3 h-3" />,
    },
  };
  const s = map[status] || map.pending;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${s.cls}`}>
      {s.icon}
      {s.label}
    </span>
  );
}

function refundDeadline(pledgedAt) {
  if (!pledgedAt) return null;
  const deadline = new Date(new Date(pledgedAt).getTime() + REFUND_DAYS * 86400000);
  const daysLeft = Math.ceil((deadline.getTime() - Date.now()) / 86400000);
  if (daysLeft <= 0) return null;
  return daysLeft;
}

export default function FanMyPledges() {
  const { data, isLoading, isError } = useGetMyPledgesQuery();
  const pledges = data?.pledges || [];

  if (isLoading) {
    return (
      <div className="bg-[#1f1f1f] rounded-xl p-6 space-y-3 animate-pulse">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-16 bg-[#2a2a2a] rounded-lg" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-[#1f1f1f] rounded-xl p-6 text-center text-red-400 text-sm">
        Failed to load your pledges.
      </div>
    );
  }

  return (
    <div className="bg-[#1f1f1f] rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <FiTrendingUp className="text-[#F3BA18] text-xl" />
          <h2 className="text-white font-bold text-base uppercase tracking-wide">
            My Futures Pledges
          </h2>
        </div>
        <Link
          to="/futures"
          className="text-[#F3BA18] text-xs font-semibold hover:underline"
        >
          Browse Futures →
        </Link>
      </div>

      {pledges.length === 0 ? (
        <div className="text-center py-8 space-y-3">
          <div className="text-3xl">🌟</div>
          <p className="text-gray-400 text-sm">You haven't pledged to any futures yet.</p>
          <Link
            to="/futures"
            className="inline-block custom-button-two px-5 py-2 rounded-lg text-xs font-semibold"
          >
            Explore Fame Futures →
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {pledges.map((p) => {
            const talent = p.talent_id;
            const daysLeft = p.status === "pending" ? refundDeadline(p.pledged_at) : null;

            return (
              <li
                key={p._id}
                className="bg-[#2a2a2a] rounded-xl p-4 border border-[#333] hover:border-[#444] transition"
              >
                <div className="flex items-start gap-3">
                  {/* Talent avatar */}
                  {talent?.image ? (
                    <img
                      src={talent.image}
                      alt={talent.name}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center text-[#F3BA18] font-bold text-sm flex-shrink-0">
                      {talent?.name?.[0]?.toUpperCase() || "?"}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-white font-semibold text-sm truncate">
                        {talent?.name || "Unknown Talent"}
                      </span>
                      {statusBadge(p.status)}
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-xs text-gray-400">
                      <span>
                        Pledged{" "}
                        <span className="text-[#F3BA18] font-semibold">
                          ${Number(p.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </span>
                      <span>
                        Bonus{" "}
                        <span className="text-emerald-400 font-semibold">
                          +{((p.bonus_rate || 0) * 100).toFixed(0)}%
                        </span>
                      </span>
                      {p.status === "fulfilled" && p.awarded_units != null && (
                        <span>
                          Shares{" "}
                          <span className="text-white font-semibold">
                            {Number(p.awarded_units).toFixed(4)}
                          </span>{" "}
                          @ ${Number(p.awarded_entry_price || 0).toFixed(2)}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1 text-[11px] text-gray-600">
                      <span>
                        {new Date(p.pledged_at).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      {p.status === "pending" && daysLeft !== null && (
                        <span className="text-amber-600 flex items-center gap-0.5">
                          <FiClock className="w-3 h-3" />
                          {daysLeft}d refund window
                        </span>
                      )}
                      {p.status === "refunded" && p.refunded_at && (
                        <span className="text-gray-600">
                          Refunded {new Date(p.refunded_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
