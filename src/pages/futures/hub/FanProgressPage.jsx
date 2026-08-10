import { FiBarChart2, FiUsers, FiZap, FiTrendingUp } from "react-icons/fi";
import { useGetFanProgressQuery } from "../../../app/futuresHubApi";

function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5">
      <div className="flex items-center justify-between mb-2">
        <p className="text-gray-500 text-xs uppercase tracking-wide font-semibold">{label}</p>
        {Icon && <Icon className="text-[#a38b41]" size={16} />}
      </div>
      <p className="text-2xl font-black text-white">{value}</p>
    </div>
  );
}

export default function FanProgressPage() {
  const { data, isLoading } = useGetFanProgressQuery();
  const info = data?.data;

  if (isLoading) return <div className="text-center text-gray-400 py-24">Loading…</div>;

  const maxTrend = Math.max(1, ...(info?.trend || []).map((t) => t.count));

  return (
    <div>
      <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-2">
        <FiBarChart2 className="text-[#a38b41]" /> Fan Progress
      </h1>
      <p className="text-gray-400 text-sm mb-6">Track mission completions and see what keeps your fans coming back.</p>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Completions" value={info?.completions || 0} icon={FiZap} />
        <StatCard label="Active Fans" value={info?.activeFans || 0} icon={FiUsers} />
        <StatCard label="XP Distributed" value={(info?.xpDistributed || 0).toLocaleString()} icon={FiTrendingUp} />
      </div>

      <div className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5 mb-6">
        <p className="text-white font-semibold text-sm mb-4">Completions — Last 7 Days</p>
        {!info?.trend?.some((t) => t.count > 0) ? (
          <p className="text-gray-500 text-sm">No mission completions yet. Publish missions and encourage fans to participate.</p>
        ) : (
          <div className="flex items-end gap-2">
            {info.trend.map((t) => (
              <div key={t.date} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full h-24 flex items-end">
                  <div
                    className="w-full bg-gradient-to-t from-[#a18a3f] to-[#e6ca7c] rounded-t"
                    style={{ height: `${Math.max((t.count / maxTrend) * 100, t.count > 0 ? 6 : 0)}%` }}
                  />
                </div>
                <span className="text-[10px] text-gray-500">{t.date.slice(5)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5">
        <p className="text-white font-semibold text-sm mb-3">Top Missions by Completions</p>
        {!info?.topMissions?.length ? (
          <p className="text-gray-500 text-sm">No data yet.</p>
        ) : (
          <div className="space-y-2">
            {info.topMissions.map((m) => (
              <div key={m.title} className="flex items-center justify-between text-sm">
                <p className="text-gray-300">{m.title}</p>
                <p className="text-[#a38b41] font-semibold">{m.completions}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
