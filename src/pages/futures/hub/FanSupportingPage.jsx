import { useGetMyFanSubscriptionsQuery } from "../../../app/futuresHubApi";

export default function FanSupportingPage() {
  const { data: subsRes, isLoading } = useGetMyFanSubscriptionsQuery();
  const subs = (subsRes?.data || []).filter((s) => s.status === "active");

  if (isLoading) return <div className="text-center text-gray-400 py-24">Loading…</div>;

  return (
    <div>
      <h1 className="text-3xl font-black text-white mb-1">Creators You Support</h1>
      <p className="text-gray-400 text-sm mb-6">Your active fan-tier subscriptions.</p>
      {subs.length === 0 ? (
        <div className="text-center py-16 bg-[#191919] border border-[#2a2a2a] rounded-2xl">
          <p className="text-white font-semibold mb-1">You're not supporting any creators yet</p>
          <p className="text-gray-500 text-sm">A creator directory is coming soon.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {subs.map((s) => (
            <div key={s._id} className="flex items-center justify-between bg-[#191919] border border-[#2a2a2a] rounded-xl p-4">
              <p className="text-white text-sm font-semibold">{s.tierId?.name || "Fan tier"}</p>
              <p className="text-[#a38b41] text-sm font-bold">${s.price}/mo</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
