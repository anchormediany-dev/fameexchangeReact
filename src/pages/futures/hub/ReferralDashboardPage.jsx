import { FiShare2, FiAward } from "react-icons/fi";
import { useGetReferralDashboardQuery } from "../../../app/futuresHubApi";

export default function ReferralDashboardPage() {
  const { data, isLoading } = useGetReferralDashboardQuery();
  const info = data?.data;

  if (isLoading) return <div className="text-center text-gray-400 py-24">Loading…</div>;

  const topReferrers = info?.topReferrers || [];

  return (
    <div>
      <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-2">
        <FiShare2 className="text-[#a38b41]" /> Referral Dashboard
      </h1>
      <p className="text-gray-400 text-sm mb-6">See which of your fans bring in the most new fans.</p>

      <div className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5 mb-6 max-w-xs">
        <p className="text-2xl font-black text-white">{info?.totalReferred || 0}</p>
        <p className="text-gray-500 text-xs uppercase tracking-wide font-semibold mt-1">Fans Referred</p>
      </div>

      <p className="text-white font-semibold text-sm mb-3 flex items-center gap-1.5">
        <FiAward className="text-[#a38b41]" /> Top Referrers
      </p>
      {topReferrers.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No referrals yet — fans who share their own referral link and bring in new fans will show up here.
        </p>
      ) : (
        <div className="space-y-2">
          {topReferrers.map((r, i) => (
            <div key={r.fanId} className="flex items-center justify-between bg-[#191919] border border-[#2a2a2a] rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-sm font-bold w-5">#{i + 1}</span>
                <p className="text-white text-sm font-semibold">{r.display_name}</p>
              </div>
              <p className="text-[#a38b41] text-sm font-bold">{r.count} referred</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
