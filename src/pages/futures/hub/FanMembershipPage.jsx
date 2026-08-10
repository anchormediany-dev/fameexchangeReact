import { toast } from "react-toastify";
import { FiCreditCard, FiHeart } from "react-icons/fi";
import { useGetMyFanSubscriptionsQuery, useCancelFanSubscriptionMutation } from "../../../app/futuresHubApi";

export default function FanMembershipPage() {
  const { data: subsRes, isLoading } = useGetMyFanSubscriptionsQuery();
  const [cancelFanSubscription, { isLoading: canceling }] = useCancelFanSubscriptionMutation();

  const subs = (subsRes?.data || []).filter((s) => s.status === "active" || s.status === "pending");

  const handleCancel = async (id) => {
    try {
      await cancelFanSubscription(id).unwrap();
      toast.success("Subscription canceled.");
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't cancel subscription.");
    }
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-2">
        <FiCreditCard className="text-[#a38b41]" /> Membership
      </h1>
      <p className="text-gray-400 text-sm mb-6">Manage your fan-tier subscriptions and billing.</p>

      {isLoading ? (
        <div className="text-center text-gray-400 py-24">Loading…</div>
      ) : subs.length === 0 ? (
        <div className="text-center py-16 bg-[#191919] border border-[#2a2a2a] rounded-2xl">
          <FiHeart className="text-gray-600 mx-auto mb-3" size={28} />
          <p className="text-white font-semibold mb-1">No active membership</p>
          <p className="text-gray-500 text-sm">Subscribe to a creator's fan tier to support them directly.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {subs.map((s) => (
            <div key={s._id} className="bg-[#191919] border border-[#2a2a2a] rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-semibold">{s.tierId?.name || "Fan tier"}</p>
                  <p className="text-gray-500 text-xs mt-0.5 capitalize">{s.status}</p>
                </div>
                <p className="text-[#a38b41] text-sm font-bold">${s.price}/mo</p>
              </div>
              {s.status === "active" && (
                <button
                  type="button"
                  onClick={() => handleCancel(s._id)}
                  disabled={canceling}
                  className="mt-3 text-xs font-semibold text-gray-400 border border-[#444] px-3 py-1.5 rounded-lg hover:text-red-400 hover:border-red-400 transition disabled:opacity-50"
                >
                  Cancel Subscription
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
