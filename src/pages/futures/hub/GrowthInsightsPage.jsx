import { FiTrendingUp, FiUsers, FiActivity, FiRepeat } from "react-icons/fi";
import { useGetGrowthInsightsQuery } from "../../../app/futuresHubApi";

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

function BarChart({ data, valueKey, labelFmt }) {
  const max = Math.max(1, ...data.map((d) => d[valueKey]));
  return (
    <div className="flex items-end gap-1">
      {data.map((d) => (
        <div key={d.date} className="flex-1 flex flex-col items-center gap-1.5">
          <div className="w-full h-20 flex items-end">
            <div
              className="w-full bg-gradient-to-t from-[#a18a3f] to-[#e6ca7c] rounded-t"
              style={{ height: `${Math.max((d[valueKey] / max) * 100, d[valueKey] > 0 ? 6 : 0)}%` }}
              title={`${d[valueKey]}`}
            />
          </div>
          {labelFmt && <span className="text-[9px] text-gray-500">{labelFmt(d.date)}</span>}
        </div>
      ))}
    </div>
  );
}

export default function GrowthInsightsPage() {
  const { data, isLoading } = useGetGrowthInsightsQuery();
  const info = data?.data;

  if (isLoading) return <div className="text-center text-gray-400 py-24">Loading…</div>;

  return (
    <div>
      <h1 className="text-3xl font-black text-white mb-1">Growth Insights</h1>
      <p className="text-gray-400 text-sm mb-6">Track fan engagement and mission completion trends over the last 30 days.</p>

      <div className="grid sm:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Fans" value={info?.totalFans || 0} icon={FiUsers} />
        <StatCard label="Weekly Engagement" value={info?.weeklyEngagement || 0} icon={FiActivity} />
        <StatCard label="Active Fans (7d)" value={info?.activeFans7d || 0} icon={FiTrendingUp} />
        <StatCard label="Retention Rate" value={`${info?.retentionRate || 0}%`} icon={FiRepeat} />
      </div>

      <div className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5 mb-6">
        <p className="text-white font-semibold text-sm mb-1">Fan Growth</p>
        <p className="text-gray-500 text-xs mb-4">Cumulative fan count over 30 days</p>
        {!info?.totalFans ? (
          <p className="text-gray-500 text-sm">No fans yet. Share your invite link to start growing.</p>
        ) : (
          <BarChart data={info.fanGrowth} valueKey="total" labelFmt={(d) => d.slice(8)} />
        )}
      </div>

      <div className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5">
        <p className="text-white font-semibold text-sm mb-1">Daily Engagement</p>
        <p className="text-gray-500 text-xs mb-4">Mission completions per day, last 7 days</p>
        {!info?.dailyEngagement?.some((d) => d.completions > 0) ? (
          <p className="text-gray-500 text-sm">No engagement yet this week.</p>
        ) : (
          <BarChart data={info.dailyEngagement} valueKey="completions" labelFmt={(d) => d.slice(5)} />
        )}
      </div>
    </div>
  );
}
