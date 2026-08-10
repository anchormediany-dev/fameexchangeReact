import { useState } from "react";
import { toast } from "react-toastify";
import { FiCheck, FiZap, FiAward } from "react-icons/fi";
import SubscriptionCheckoutModal from "../SubscriptionCheckoutModal";
import {
  useGetMyMembershipQuery,
  useStartMembershipCheckoutMutation,
  useCancelMembershipMutation,
} from "../../../app/futuresHubApi";

// Copy sourced from the real Base44 membership page screenshot — not
// invented placeholder text.
const PLANS = [
  {
    key: "starter",
    label: "Starter",
    tagline: "Get in the game",
    amount: 29,
    icon: FiZap,
    features: [
      "5 free AI advisors + unlock 5 more of your choice",
      "Daily Fame Plan",
      "Growth Studio with AI content ideas",
      "Fan leaderboard access",
      "No projects, video vault, or membership setup",
    ],
  },
  {
    key: "pro",
    label: "Pro",
    tagline: "Most popular",
    amount: 79,
    icon: FiZap,
    popular: true,
    features: [
      "Everything in Starter",
      "All 18 AI advisors unlocked",
      "Projects page (1 active project at a time)",
      "Monetization Lab",
      "Career Roadmap",
    ],
  },
  {
    key: "elite",
    label: "Elite",
    tagline: "The full package",
    amount: 199,
    icon: FiAward,
    features: [
      "Everything in Pro",
      "Video Vault access",
      "Fan membership included",
      "Unlimited projects & crowdfunding",
      "Brand Protection & contract review",
    ],
  },
];

export default function MembershipPage() {
  const { data: membershipRes, isLoading } = useGetMyMembershipQuery();
  const [startMembershipCheckout] = useStartMembershipCheckoutMutation();
  const [cancelMembership, { isLoading: canceling }] = useCancelMembershipMutation();
  const [checkoutPlan, setCheckoutPlan] = useState(null);

  const membership = membershipRes?.data;
  const activePlan = membership?.status === "active" ? membership.plan : null;

  const handleCancel = async () => {
    try {
      await cancelMembership().unwrap();
      toast.success("Membership canceled.");
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't cancel membership.");
    }
  };

  if (isLoading) return <div className="text-center text-gray-400 py-24">Loading…</div>;

  const activePlanObj = PLANS.find((p) => p.key === checkoutPlan);

  return (
    <div>
      <h1 className="text-3xl font-black text-white mb-1">Membership</h1>
      <p className="text-gray-400 mb-8">Unlock your full Fame Team and accelerate your career.</p>

      <div className="grid sm:grid-cols-3 gap-5">
        {PLANS.map((p) => {
          const isActive = activePlan === p.key;
          return (
            <div
              key={p.key}
              className={`relative rounded-2xl p-6 border flex flex-col ${
                p.popular
                  ? "border-[#a38b41] bg-[#191919]"
                  : isActive
                  ? "border-[#a38b41] bg-[#a38b41]/10"
                  : "border-[#2a2a2a] bg-[#191919]"
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <div className="w-11 h-11 rounded-xl bg-[#111111] border border-[#2a2a2a] flex items-center justify-center mb-4">
                <p.icon className="text-[#a38b41]" size={20} />
              </div>

              <p className="text-white font-bold text-lg">{p.label}</p>
              <p className="text-gray-500 text-xs mb-3">{p.tagline}</p>

              <p className="text-3xl font-black text-white mb-5">
                ${p.amount}
                <span className="text-sm text-gray-400 font-normal">/month</span>
              </p>

              <ul className="space-y-2.5 mb-6 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                    <FiCheck className="text-[#a38b41] mt-0.5 flex-shrink-0" size={14} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {isActive ? (
                <div className="space-y-2">
                  <p className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-semibold py-2">
                    <FiCheck /> Active
                  </p>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={canceling}
                    className="w-full py-2.5 rounded-lg border border-[#444] text-gray-400 text-sm hover:border-red-400 hover:text-red-400 transition disabled:opacity-50"
                  >
                    {canceling ? "Canceling…" : "Cancel"}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setCheckoutPlan(p.key)}
                  disabled={Boolean(activePlan)}
                  className={`w-full py-2.5 rounded-lg font-semibold text-sm transition disabled:opacity-40 ${
                    p.popular
                      ? "bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black hover:brightness-110"
                      : "border border-[#444] text-white hover:border-[#a38b41]"
                  }`}
                >
                  Subscribe ${p.amount}/mo
                </button>
              )}
            </div>
          );
        })}
      </div>

      {checkoutPlan && (
        <SubscriptionCheckoutModal
          title={`${activePlanObj?.label} Membership`}
          priceLabel={`$${activePlanObj?.amount}/mo`}
          startCheckout={() => startMembershipCheckout({ plan: checkoutPlan }).unwrap()}
          onClose={() => setCheckoutPlan(null)}
          onSuccess={() => setCheckoutPlan(null)}
        />
      )}
    </div>
  );
}
