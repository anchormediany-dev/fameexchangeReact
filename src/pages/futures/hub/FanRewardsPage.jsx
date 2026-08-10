import { toast } from "react-toastify";
import { FiGift } from "react-icons/fi";
import {
  useGetXPRewardsQuery,
  useGetMyFuturesFanProfileQuery,
  useRedeemXPRewardMutation,
  useGetMyXPRedemptionsQuery,
} from "../../../app/futuresHubApi";

export default function FanRewardsPage() {
  const { data: rewardsRes, isLoading } = useGetXPRewardsQuery();
  const { data: fanProfileRes } = useGetMyFuturesFanProfileQuery();
  const [redeemReward, { isLoading: redeeming }] = useRedeemXPRewardMutation();
  const { data: redemptionsRes } = useGetMyXPRedemptionsQuery();

  const rewards = rewardsRes?.data || [];
  const xp = fanProfileRes?.data?.xp || 0;
  const redemptions = redemptionsRes?.data || [];

  const handleRedeem = async (rewardId) => {
    try {
      await redeemReward(rewardId).unwrap();
      toast.success("Redeemed!");
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't redeem reward.");
    }
  };

  if (isLoading) return <div className="text-center text-gray-400 py-24">Loading…</div>;

  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-3xl font-black text-white flex items-center gap-2">
          <FiGift className="text-[#a38b41]" /> XP Rewards
        </h1>
        <p className="text-[#a38b41] font-bold">{xp} XP</p>
      </div>
      <p className="text-gray-400 text-sm mb-6">Redeem your XP for tickets, merch, and more.</p>

      {rewards.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-10">No rewards available yet — check back soon.</p>
      ) : (
        <div className="space-y-3">
          {rewards.map((r) => (
            <div key={r._id} className="flex items-center justify-between bg-[#191919] border border-[#2a2a2a] rounded-xl p-4">
              <div>
                <p className="text-white text-sm font-semibold">{r.title}</p>
                <p className="text-gray-500 text-xs mt-0.5 capitalize">{r.category} · {r.xp_cost} XP</p>
              </div>
              <button
                type="button"
                onClick={() => handleRedeem(r._id)}
                disabled={redeeming || xp < r.xp_cost}
                className="text-xs font-semibold text-black bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] px-3 py-1.5 rounded-lg hover:brightness-110 transition disabled:opacity-40"
              >
                Redeem
              </button>
            </div>
          ))}
        </div>
      )}

      {redemptions.length > 0 && (
        <div className="mt-6">
          <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-2">Your Redemptions</p>
          <div className="space-y-2">
            {redemptions.map((r) => (
              <div key={r._id} className="flex items-center justify-between text-sm">
                <p className="text-gray-300">{r.reward_title}</p>
                <p className="text-gray-500 text-xs capitalize">{r.status}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
