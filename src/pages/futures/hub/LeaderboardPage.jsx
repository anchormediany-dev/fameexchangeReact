import { FiAward } from "react-icons/fi";
import { useGetFanLeaderboardQuery } from "../../../app/futuresHubApi";

export default function LeaderboardPage() {
  const { data, isLoading } = useGetFanLeaderboardQuery();
  const fans = data?.data || [];

  if (isLoading) return <div className="text-center text-gray-400 py-24">Loading…</div>;

  return (
    <div>
      <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-2">
        <FiAward className="text-[#a38b41]" /> Leaderboard
      </h1>
      <p className="text-gray-400 text-sm mb-6">Your top fans, ranked by all-time XP.</p>

      {fans.length === 0 ? (
        <div className="text-center py-16 bg-[#191919] border border-[#2a2a2a] rounded-2xl">
          <p className="text-white font-semibold mb-1">No fans yet</p>
          <p className="text-gray-500 text-sm">Share your profile to attract fans and build your leaderboard.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {fans.map((f, i) => (
            <div key={f.userId} className="flex items-center justify-between bg-[#191919] border border-[#2a2a2a] rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className={`text-sm font-bold w-6 ${i === 0 ? "text-[#e6ca7c]" : "text-gray-500"}`}>
                  {i === 0 ? "\u{1F451}" : `#${i + 1}`}
                </span>
                <div>
                  <p className="text-white text-sm font-semibold">{f.display_name}</p>
                  <p className="text-gray-500 text-xs capitalize">{f.badge || "Newcomer"}</p>
                </div>
              </div>
              <p className="text-[#a38b41] text-sm font-bold">{f.xp.toLocaleString()} XP</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
