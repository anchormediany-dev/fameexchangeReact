import { useSelector } from "react-redux";
import { FiAward, FiHeart } from "react-icons/fi";
import { useGetMyFuturesFanProfileQuery, useGetTalentFanLeaderboardQuery } from "../../../app/futuresHubApi";

export default function FanLeaderboardPage() {
  const user = useSelector((s) => s?.auth?.user);
  const { data: fanProfileRes } = useGetMyFuturesFanProfileQuery();
  const talentId = fanProfileRes?.data?.talentId;
  const { data: leaderboardRes, isLoading } = useGetTalentFanLeaderboardQuery(talentId, { skip: !talentId });
  const fans = leaderboardRes?.data || [];

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-2">
        <FiAward className="text-[#a38b41]" /> Leaderboard
      </h1>
      <p className="text-gray-400 text-sm mb-6">See how you rank among your creator's other supporters.</p>

      {!talentId ? (
        <div className="text-center py-16 bg-[#191919] border border-[#2a2a2a] rounded-2xl">
          <FiHeart className="text-gray-600 mx-auto mb-3" size={28} />
          <p className="text-white font-semibold mb-1">Subscribe to a creator first</p>
          <p className="text-gray-500 text-sm">Join their fan tier to join the leaderboard.</p>
        </div>
      ) : isLoading ? (
        <div className="text-center text-gray-400 py-24">Loading…</div>
      ) : fans.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-10">No ranked fans yet — be the first to earn XP.</p>
      ) : (
        <div className="space-y-2">
          {fans.map((f, i) => {
            const isMe = String(f.userId) === String(user?._id || user?.id);
            return (
              <div
                key={f.userId}
                className={`flex items-center justify-between rounded-xl p-4 border ${
                  isMe ? "bg-[#a38b41]/10 border-[#a38b41]" : "bg-[#191919] border-[#2a2a2a]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 font-bold text-sm w-6">{i + 1}</span>
                  <p className={`text-sm font-semibold ${isMe ? "text-[#e6ca7c]" : "text-white"}`}>
                    {f.display_name}
                    {isMe && " (You)"}
                  </p>
                </div>
                <p className="text-[#a38b41] text-sm font-bold">{(f.xp || 0).toLocaleString()} XP</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
