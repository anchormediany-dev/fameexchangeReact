import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import {
  FiUser,
  FiUsers,
  FiArrowRight,
  FiCheck,
  FiTrash2,
  FiCompass,
  FiTarget,
  FiGift,
  FiShare2,
  FiCopy,
} from "react-icons/fi";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MotionPageWrapper from "../../components/MotionPageWrapper";
import AuthGate from "../../components/AuthGate";
import SubscriptionCheckoutModal from "./SubscriptionCheckoutModal";
import {
  useGetMyFuturesTalentProfileQuery,
  useGetMyFuturesFanProfileQuery,
  useCreateMyFuturesTalentProfileMutation,
  useCreateMyFuturesFanProfileMutation,
  useGetMyMembershipQuery,
  useStartMembershipCheckoutMutation,
  useCancelMembershipMutation,
  useGetMyFanTiersQuery,
  useCreateFanTierMutation,
  useDeleteFanTierMutation,
  useGetMyFanSubscriptionsQuery,
  useGetMyCareerRoadmapQuery,
  useGenerateCareerRoadmapMutation,
  useGetMyMissionsQuery,
  useCreateMissionMutation,
  useCompleteMissionMutation,
  useGetXPRewardsQuery,
  useRedeemXPRewardMutation,
  useGetMyXPRedemptionsQuery,
  useGetMyReferralInfoQuery,
  useGetMyDailyPlanQuery,
  useGenerateDailyPlanMutation,
  useCompleteDailyTaskMutation,
} from "../../app/futuresHubApi";

// Phase 2 built identity + the qualification gate. Phase 3 (this file's
// latest addition) adds real Stripe billing on top of it: platform
// Membership plans and a talent's own custom fan tiers. Prices mirror
// services/futuresStripeService.js on the backend — sourced from Base44's
// live membership page, not guessed.
const PLATFORM_PLANS = [
  { key: "starter", label: "Starter", amount: 29 },
  { key: "pro", label: "Pro", amount: 79 },
  { key: "elite", label: "Elite", amount: 199 },
];

function CreatorPathCard({ qualifies, isLoadingProfile, onCreate, creating }) {
  const [niche, setNiche] = useState("");

  if (isLoadingProfile) return null;

  if (!qualifies) {
    return (
      <div className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-6">
        <FiUser className="w-8 h-8 text-[#a38b41] mb-3" />
        <h3 className="text-white font-bold text-lg mb-2">I'm a Creator</h3>
        <p className="text-gray-400 text-sm mb-4">
          Fame Futures is currently open to approved FameExchange talent. Apply as a talent
          first, then come back here.
        </p>
        <Link
          to="/connect-socials"
          className="inline-flex items-center gap-2 text-[#a38b41] text-sm font-semibold hover:underline"
        >
          Apply as talent <FiArrowRight />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#191919] border border-[#a38b41]/30 rounded-2xl p-6">
      <FiUser className="w-8 h-8 text-[#a38b41] mb-3" />
      <h3 className="text-white font-bold text-lg mb-2">I'm a Creator</h3>
      <p className="text-gray-400 text-sm mb-4">
        You're an approved talent — create your Fame Futures profile to get started.
      </p>
      <input
        type="text"
        value={niche}
        onChange={(e) => setNiche(e.target.value)}
        placeholder="Your niche (e.g. Musician, Actor)"
        className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 mb-3 outline-none focus:border-[#a38b41]"
      />
      <button
        type="button"
        disabled={creating}
        onClick={() => onCreate({ niche })}
        className="w-full bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black font-semibold py-2.5 rounded-lg hover:brightness-110 transition-all disabled:opacity-60"
      >
        {creating ? "Creating…" : "Create My Profile"}
      </button>
    </div>
  );
}

function FanPathCard({ onCreate, creating, referredBy }) {
  return (
    <div className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-6">
      <FiUsers className="w-8 h-8 text-[#a38b41] mb-3" />
      <h3 className="text-white font-bold text-lg mb-2">I'm a Fan</h3>
      <p className="text-gray-400 text-sm mb-4">
        Follow and support creators as they grow — join their missions, earn XP, and get
        exclusive access.
      </p>
      {referredBy && (
        <p className="text-emerald-400 text-xs mb-3">You were referred by a friend — they'll earn XP when you join!</p>
      )}
      <button
        type="button"
        disabled={creating}
        onClick={() => onCreate(referredBy ? { referredBy } : {})}
        className="w-full border border-[#a38b41] text-[#a38b41] font-semibold py-2.5 rounded-lg hover:bg-[#a38b41]/10 transition-all disabled:opacity-60"
      >
        {creating ? "Creating…" : "Join as a Fan"}
      </button>
    </div>
  );
}

// ── Talent: platform Membership plans ─────────────────────────────────────
function MembershipSection() {
  const { data: membershipRes, isLoading } = useGetMyMembershipQuery();
  const [startMembershipCheckout] = useStartMembershipCheckoutMutation();
  const [cancelMembership, { isLoading: canceling }] = useCancelMembershipMutation();
  const [checkoutPlan, setCheckoutPlan] = useState(null); // plan key while modal is open

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

  if (isLoading) return null;

  return (
    <div className="mt-10">
      <h2 className="text-white font-bold text-xl mb-1">Membership</h2>
      <p className="text-gray-400 text-sm mb-5">Unlock more AI advisors, projects, and tools.</p>

      <div className="grid sm:grid-cols-3 gap-4">
        {PLATFORM_PLANS.map((p) => {
          const isActive = activePlan === p.key;
          return (
            <div
              key={p.key}
              className={`rounded-2xl p-5 border ${
                isActive ? "border-[#a38b41] bg-[#a38b41]/10" : "border-[#2a2a2a] bg-[#191919]"
              }`}
            >
              <p className="text-white font-bold">{p.label}</p>
              <p className="text-2xl font-black text-[#a38b41] mt-1">
                ${p.amount}
                <span className="text-sm text-gray-400 font-normal">/mo</span>
              </p>
              {isActive ? (
                <div className="mt-4 space-y-2">
                  <p className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                    <FiCheck /> Active
                  </p>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={canceling}
                    className="w-full py-2 rounded-lg border border-[#444] text-gray-400 text-xs hover:border-red-400 hover:text-red-400 transition disabled:opacity-50"
                  >
                    {canceling ? "Canceling…" : "Cancel"}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setCheckoutPlan(p.key)}
                  disabled={Boolean(activePlan)}
                  className="w-full mt-4 py-2 rounded-lg bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black text-xs font-semibold hover:brightness-110 transition disabled:opacity-40"
                >
                  Subscribe
                </button>
              )}
            </div>
          );
        })}
      </div>

      {checkoutPlan && (
        <SubscriptionCheckoutModal
          title={`${PLATFORM_PLANS.find((p) => p.key === checkoutPlan)?.label} Membership`}
          priceLabel={`$${PLATFORM_PLANS.find((p) => p.key === checkoutPlan)?.amount}/mo`}
          startCheckout={() => startMembershipCheckout({ plan: checkoutPlan }).unwrap()}
          onClose={() => setCheckoutPlan(null)}
          onSuccess={() => setCheckoutPlan(null)}
        />
      )}
    </div>
  );
}

// ── Talent: manage my own custom fan tiers ─────────────────────────────────
function FanTiersSection() {
  const { data: tiersRes, isLoading } = useGetMyFanTiersQuery();
  const [createFanTier, { isLoading: creating }] = useCreateFanTierMutation();
  const [deleteFanTier] = useDeleteFanTierMutation();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", price: "", description: "" });

  const tiers = tiersRes?.data || [];

  const handleCreate = async (e) => {
    e.preventDefault();
    const price = Number(form.price);
    if (!form.name.trim() || !(price > 0)) {
      toast.error("Give your tier a name and a price above $0.");
      return;
    }
    try {
      await createFanTier({ name: form.name.trim(), price, description: form.description.trim() }).unwrap();
      setForm({ name: "", price: "", description: "" });
      setShowForm(false);
      toast.success("Tier created.");
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't create tier.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFanTier(id).unwrap();
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't delete tier.");
    }
  };

  if (isLoading) return null;

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-white font-bold text-xl">My Fan Tiers</h2>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="text-[#a38b41] text-sm font-semibold hover:underline"
        >
          {showForm ? "Cancel" : "+ New Tier"}
        </button>
      </div>
      <p className="text-gray-400 text-sm mb-5">
        Let fans subscribe directly to you for perks you decide on.
      </p>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5 mb-5 space-y-3">
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Tier name (e.g. Inner Circle)"
            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41]"
          />
          <input
            type="number"
            min="1"
            step="1"
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
            placeholder="Price per month (USD)"
            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41]"
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="What do fans get?"
            rows={2}
            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41] resize-none"
          />
          <button
            type="submit"
            disabled={creating}
            className="w-full bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black font-semibold py-2.5 rounded-lg hover:brightness-110 transition-all disabled:opacity-60"
          >
            {creating ? "Creating…" : "Create Tier"}
          </button>
        </form>
      )}

      {tiers.length === 0 ? (
        <p className="text-gray-500 text-sm">No tiers yet — create one to let fans support you directly.</p>
      ) : (
        <div className="space-y-3">
          {tiers.map((t) => (
            <div
              key={t._id}
              className="flex items-center justify-between bg-[#191919] border border-[#2a2a2a] rounded-xl p-4"
            >
              <div>
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-gray-400 text-xs mt-0.5">${t.price}/mo{t.description ? ` · ${t.description}` : ""}</p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(t._id)}
                className="text-gray-500 hover:text-red-400 transition p-1.5"
                title="Delete tier"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Talent: AI-generated career roadmap (Phase 4) ──────────────────────────
function CareerRoadmapSection() {
  const { data: roadmapRes, isLoading } = useGetMyCareerRoadmapQuery();
  const [generateRoadmap, { isLoading: generating }] = useGenerateCareerRoadmapMutation();

  const roadmap = roadmapRes?.data?.[0];

  const handleGenerate = async () => {
    try {
      await generateRoadmap().unwrap();
      toast.success("Roadmap generated!");
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't generate roadmap.");
    }
  };

  if (isLoading) return null;

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-white font-bold text-xl flex items-center gap-2">
          <FiCompass className="text-[#a38b41]" /> Career Roadmap
        </h2>
        <button
          type="button"
          onClick={handleGenerate}
          disabled={generating}
          className="text-[#a38b41] text-sm font-semibold hover:underline disabled:opacity-50"
        >
          {generating ? "Generating…" : roadmap ? "Regenerate" : "Generate My Roadmap"}
        </button>
      </div>
      <p className="text-gray-400 text-sm mb-5">
        AI-generated, grounded in your creator profile.
      </p>

      {!roadmap ? (
        <p className="text-gray-500 text-sm">
          No roadmap yet — generate one to get a concrete 30/90-day plan.
        </p>
      ) : (
        <div className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5 space-y-5">
          <div>
            <p className="text-[#a38b41] text-xs uppercase tracking-wider font-semibold mb-1">
              Current Position
            </p>
            <p className="text-gray-300 text-sm">{roadmap.current_position}</p>
          </div>
          <div>
            <p className="text-[#a38b41] text-xs uppercase tracking-wider font-semibold mb-1">
              Next Milestone
            </p>
            <p className="text-gray-300 text-sm">{roadmap.next_milestone}</p>
          </div>
          <div>
            <p className="text-[#a38b41] text-xs uppercase tracking-wider font-semibold mb-2">
              30-Day Plan
            </p>
            <ul className="space-y-1.5">
              {roadmap.thirty_day_plan?.map((item, i) => (
                <li key={i} className="text-gray-300 text-sm flex gap-2">
                  <span className="text-[#a38b41]">•</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[#a38b41] text-xs uppercase tracking-wider font-semibold mb-2">
              90-Day Vision
            </p>
            <ul className="space-y-1.5">
              {roadmap.ninety_day_vision?.map((item, i) => (
                <li key={i} className="text-gray-300 text-sm flex gap-2">
                  <span className="text-[#a38b41]">•</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Talent: AI-generated daily task list (Phase 5, via Maya) ───────────────
function DailyPlanSection() {
  const today = new Date().toISOString().slice(0, 10);
  const { data: planRes, isLoading } = useGetMyDailyPlanQuery(today);
  const [generatePlan, { isLoading: generating }] = useGenerateDailyPlanMutation();
  const [completeTask] = useCompleteDailyTaskMutation();

  const plan = planRes?.data?.[0];

  const handleGenerate = async () => {
    try {
      await generatePlan().unwrap();
      toast.success("Today's plan is ready!");
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't generate plan.");
    }
  };

  if (isLoading) return null;

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-white font-bold text-xl">Daily Plan</h2>
        <button
          type="button"
          onClick={handleGenerate}
          disabled={generating}
          className="text-[#a38b41] text-sm font-semibold hover:underline disabled:opacity-50"
        >
          {generating ? "Generating…" : plan ? "Regenerate" : "Generate Today's Plan"}
        </button>
      </div>
      <p className="text-gray-400 text-sm mb-5">Maya's daily accountability tasks, grounded in your profile.</p>

      {!plan ? (
        <p className="text-gray-500 text-sm">No plan for today yet — generate one to get started.</p>
      ) : (
        <div className="space-y-2">
          {plan.tasks.map((t) => (
            <div
              key={t._id}
              className={`flex items-start gap-3 bg-[#191919] border rounded-xl p-4 ${
                t.completed ? "border-emerald-700/40" : "border-[#2a2a2a]"
              }`}
            >
              <button
                type="button"
                onClick={() => !t.completed && completeTask({ planId: plan._id, taskId: t._id })}
                disabled={t.completed}
                className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition ${
                  t.completed ? "bg-emerald-500 border-emerald-500" : "border-[#555] hover:border-[#a38b41]"
                }`}
              >
                {t.completed && <FiCheck size={12} className="text-black" />}
              </button>
              <div>
                <p className={`text-sm font-semibold ${t.completed ? "text-gray-500 line-through" : "text-white"}`}>
                  {t.title}
                </p>
                <p className="text-gray-500 text-xs mt-0.5">{t.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Talent: growth missions (self-set, manual XP) ───────────────────────
function MissionsSection() {
  const { data: missionsRes, isLoading } = useGetMyMissionsQuery();
  const [createMission, { isLoading: creating }] = useCreateMissionMutation();
  const [completeMission] = useCompleteMissionMutation();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", xp_reward: "" });

  const missions = missionsRes?.data || [];
  const active = missions.filter((m) => m.status === "active");
  const completed = missions.filter((m) => m.status === "completed");

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("Give your mission a title.");
      return;
    }
    try {
      await createMission({
        title: form.title.trim(),
        description: form.description.trim(),
        xp_reward: Number(form.xp_reward) || 0,
      }).unwrap();
      setForm({ title: "", description: "", xp_reward: "" });
      setShowForm(false);
      toast.success("Mission added.");
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't create mission.");
    }
  };

  const handleComplete = async (id) => {
    try {
      const res = await completeMission(id).unwrap();
      toast.success(`Mission complete! +${res.data.mission.xp_reward} XP`);
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't complete mission.");
    }
  };

  if (isLoading) return null;

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-white font-bold text-xl flex items-center gap-2">
          <FiTarget className="text-[#a38b41]" /> Growth Missions
        </h2>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="text-[#a38b41] text-sm font-semibold hover:underline"
        >
          {showForm ? "Cancel" : "+ New Mission"}
        </button>
      </div>
      <p className="text-gray-400 text-sm mb-5">Set your own growth goals and earn XP for hitting them.</p>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5 mb-5 space-y-3">
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="Mission title (e.g. Post 3 TikToks this week)"
            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41]"
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Details (optional)"
            rows={2}
            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41] resize-none"
          />
          <input
            type="number"
            min="0"
            step="1"
            value={form.xp_reward}
            onChange={(e) => setForm((f) => ({ ...f, xp_reward: e.target.value }))}
            placeholder="XP reward"
            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41]"
          />
          <button
            type="submit"
            disabled={creating}
            className="w-full bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black font-semibold py-2.5 rounded-lg hover:brightness-110 transition-all disabled:opacity-60"
          >
            {creating ? "Adding…" : "Add Mission"}
          </button>
        </form>
      )}

      {active.length === 0 && completed.length === 0 ? (
        <p className="text-gray-500 text-sm">No missions yet — add one to start earning XP.</p>
      ) : (
        <div className="space-y-2">
          {active.map((m) => (
            <div key={m._id} className="flex items-center justify-between bg-[#191919] border border-[#2a2a2a] rounded-xl p-4">
              <div>
                <p className="text-white text-sm font-semibold">{m.title}</p>
                {m.description && <p className="text-gray-500 text-xs mt-0.5">{m.description}</p>}
              </div>
              <button
                type="button"
                onClick={() => handleComplete(m._id)}
                className="flex-shrink-0 ml-3 text-xs font-semibold text-black bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] px-3 py-1.5 rounded-lg hover:brightness-110 transition"
              >
                Complete (+{m.xp_reward} XP)
              </button>
            </div>
          ))}
          {completed.map((m) => (
            <div key={m._id} className="flex items-center justify-between bg-[#161616] border border-emerald-700/30 rounded-xl p-4 opacity-70">
              <p className="text-gray-400 text-sm line-through">{m.title}</p>
              <p className="text-emerald-400 text-xs font-semibold">+{m.xp_reward} XP</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Fan: XP reward catalog + redemption ─────────────────────────────────
function XPRewardsSection() {
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

  if (isLoading) return null;

  return (
    <div className="mt-10 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-white font-bold text-xl flex items-center gap-2">
          <FiGift className="text-[#a38b41]" /> XP Rewards
        </h2>
        <p className="text-[#a38b41] font-bold text-sm">{xp} XP</p>
      </div>
      <p className="text-gray-400 text-sm mb-5">Redeem your XP for tickets, merch, and more.</p>

      {rewards.length === 0 ? (
        <p className="text-gray-500 text-sm text-center">No rewards available yet — check back soon.</p>
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

// ── Fan: referral link + stats ───────────────────────────────────────────
function ReferralSection() {
  const { data: referralRes, isLoading } = useGetMyReferralInfoQuery();
  const info = referralRes?.data;

  if (isLoading || !info) return null;

  const link = `${window.location.origin}/futures/dashboard?ref=${info.referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    toast.success("Referral link copied!");
  };

  return (
    <div className="mt-10 max-w-md mx-auto">
      <h2 className="text-white font-bold text-xl mb-1 text-center flex items-center justify-center gap-2">
        <FiShare2 className="text-[#a38b41]" /> Invite Friends
      </h2>
      <p className="text-gray-400 text-sm text-center mb-5">
        Earn XP for every friend who joins with your link.
      </p>
      <div className="flex gap-2">
        <input
          readOnly
          value={link}
          className="flex-1 bg-[#191919] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-xs text-gray-300 outline-none"
        />
        <button
          type="button"
          onClick={handleCopy}
          className="bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black rounded-lg px-3 hover:brightness-110 transition-all"
        >
          <FiCopy size={16} />
        </button>
      </div>
      <div className="flex justify-center gap-8 mt-5 text-center">
        <div>
          <p className="text-2xl font-black text-white">{info.totalReferred}</p>
          <p className="text-gray-500 text-xs">Referred</p>
        </div>
        <div>
          <p className="text-2xl font-black text-[#a38b41]">{info.xpEarned}</p>
          <p className="text-gray-500 text-xs">XP Earned</p>
        </div>
      </div>
    </div>
  );
}

// ── Fan: talents I currently support ────────────────────────────────────
function FanSupportingSection() {
  const { data: subsRes, isLoading } = useGetMyFanSubscriptionsQuery();
  const subs = (subsRes?.data || []).filter((s) => s.status === "active");

  if (isLoading) return null;

  return (
    <div className="mt-10 max-w-md mx-auto">
      <h2 className="text-white font-bold text-xl mb-1 text-center">Creators You Support</h2>
      {subs.length === 0 ? (
        <p className="text-gray-500 text-sm text-center mt-3">
          You're not supporting any creators yet — a creator directory is coming soon.
        </p>
      ) : (
        <div className="space-y-3 mt-5">
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

function DashboardContent() {
  const user = useSelector((s) => s?.auth?.user);
  const [searchParams] = useSearchParams();
  const referredBy = searchParams.get("ref");
  const {
    data: talentProfileRes,
    isLoading: talentLoading,
  } = useGetMyFuturesTalentProfileQuery();
  const { data: fanProfileRes, isLoading: fanLoading } = useGetMyFuturesFanProfileQuery();
  const [createTalentProfile, { isLoading: creatingTalent }] =
    useCreateMyFuturesTalentProfileMutation();
  const [createFanProfile, { isLoading: creatingFan }] = useCreateMyFuturesFanProfileMutation();

  const talentProfile = talentProfileRes?.data;
  const qualifiesAsTalent = Boolean(talentProfileRes?.qualifies);
  const fanProfile = fanProfileRes?.data;
  const isLoading = talentLoading || fanLoading;

  if (isLoading) {
    return <div className="text-center text-gray-400 py-24">Loading…</div>;
  }

  // Already has a profile — Phase 3 added real billing (Membership / fan
  // tiers), Phase 4 added the AI advisor team. Missions/gamification still
  // land in a later phase.
  if (talentProfile || fanProfile) {
    const name = talentProfile ? talentProfile.stage_name : fanProfile.display_name;
    return (
      <div className="max-w-3xl mx-auto py-20 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-3">Welcome, {name}</h1>
          <p className="text-gray-400">
            Your Fame Futures {talentProfile ? "creator" : "fan"} profile is set up.
          </p>
          {talentProfile && (
            <Link
              to="/futures/team"
              className="inline-flex items-center gap-2 mt-4 text-[#a38b41] text-sm font-semibold hover:underline"
            >
              Meet your Fame Team <FiArrowRight />
            </Link>
          )}
        </div>
        {talentProfile ? (
          <>
            <CareerRoadmapSection />
            <DailyPlanSection />
            <MissionsSection />
            <MembershipSection />
            <FanTiersSection />
          </>
        ) : (
          <>
            <FanSupportingSection />
            <XPRewardsSection />
            <ReferralSection />
          </>
        )}
      </div>
    );
  }

  // No profile yet — choose a path.
  return (
    <div className="max-w-3xl mx-auto py-20 px-4">
      <div className="text-center mb-10">
        <p className="text-[#a38b41] text-xs uppercase tracking-widest font-semibold mb-2">
          Fame Futures
        </p>
        <h1 className="text-3xl md:text-4xl font-black text-white">
          Welcome, {user?.name || "there"}
        </h1>
        <p className="text-gray-400 mt-2">How do you want to show up here?</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <CreatorPathCard
          qualifies={qualifiesAsTalent}
          isLoadingProfile={isLoading}
          creating={creatingTalent}
          onCreate={(body) => createTalentProfile(body)}
        />
        <FanPathCard
          creating={creatingFan}
          referredBy={referredBy}
          onCreate={(body) => createFanProfile(body)}
        />
      </div>
    </div>
  );
}

export default function FuturesDashboard() {
  return (
    <MotionPageWrapper>
      <div className="bg-[#171717] min-h-screen text-white">
        <Navbar />
        <div className="pt-32">
          <AuthGate
            title="Sign in to Fame Futures"
            message="Sign in to your Fame Exchange account to get started."
          >
            <DashboardContent />
          </AuthGate>
        </div>
        <Footer />
      </div>
    </MotionPageWrapper>
  );
}
