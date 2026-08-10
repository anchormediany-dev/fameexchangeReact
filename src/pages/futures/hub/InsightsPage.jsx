import { FiBarChart2, FiUsers, FiZap, FiEye } from "react-icons/fi";
import { useGetInsightsQuery } from "../../../app/futuresHubApi";

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

export default function InsightsPage() {
  const { data, isLoading } = useGetInsightsQuery();
  const info = data?.data;

  if (isLoading) return <div className="text-center text-gray-400 py-24">Loading…</div>;

  return (
    <div>
      <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-2">
        <FiBarChart2 className="text-[#a38b41]" /> Insights
      </h1>
      <p className="text-gray-400 text-sm mb-6">Track fan mission completions and see which projects get the most attention.</p>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Mission Completions" value={info?.missionCompletions || 0} icon={FiZap} />
        <StatCard label="Active Fans" value={info?.activeFans || 0} icon={FiUsers} />
        <StatCard label="XP Earned by Fans" value={(info?.xpEarned || 0).toLocaleString()} icon={FiZap} />
      </div>

      <div className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5">
        <p className="text-white font-semibold text-sm mb-4 flex items-center gap-1.5">
          <FiEye className="text-[#a38b41]" /> Most Viewed Projects
        </p>
        {!info?.mostViewedProjects?.length ? (
          <p className="text-gray-500 text-sm">No projects yet.</p>
        ) : (
          <div className="space-y-2">
            {info.mostViewedProjects.map((p) => (
              <div key={p._id} className="flex items-center justify-between text-sm">
                <p className="text-gray-300">{p.title}</p>
                <p className="text-[#a38b41] font-semibold">{p.views || 0} views</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
