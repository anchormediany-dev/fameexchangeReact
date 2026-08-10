import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FiUsers,
  FiZap,
  FiArrowRight,
  FiCheck,
  FiTrash2,
  FiTarget,
  FiCopy,
} from "react-icons/fi";
import {
  useGetMyFuturesTalentProfileQuery,
  useGetMyMembershipQuery,
  useGetMyDailyPlanQuery,
  useGetAdvisorsQuery,
  useGetMyMissionsQuery,
  useCreateMissionMutation,
  useCompleteMissionMutation,
} from "../../../app/futuresHubApi";

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

// Self-set growth missions the talent tracks for themselves — distinct from
// the fan-facing "Fan Missions" page planned for Phase 2 (fans complete
// these, talent approves); this is a lighter personal accountability tool
// that predates that split, kept here so no existing functionality is lost.
function GrowthMissions() {
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

export default function DashboardOverview() {
  const { data: talentProfileRes } = useGetMyFuturesTalentProfileQuery();
  const { data: membershipRes } = useGetMyMembershipQuery();
  const today = new Date().toISOString().slice(0, 10);
  const { data: planRes } = useGetMyDailyPlanQuery(today);
  const { data: advisorsRes } = useGetAdvisorsQuery();

  const profile = talentProfileRes?.data;
  const plan = membershipRes?.data?.status === "active" ? membershipRes.data.plan : null;
  const dailyPlan = planRes?.data?.[0];
  const advisors = (advisorsRes?.data || []).slice(0, 6);

  const link = profile ? `${window.location.origin}/futures/creator/${profile.userId}` : "";
  const handleCopy = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => toast.success("Link copied!"))
      .catch(() => toast.error("Couldn't copy — long-press or select the link to copy it manually."));
  };

  return (
    <div>
      <div className="mb-6">
        <p className="text-[#a38b41] text-xs uppercase tracking-widest font-semibold mb-1">Fame Futures</p>
        <h1 className="text-3xl font-black text-white">
          Hey <span className="text-[#a38b41]">{profile?.stage_name || "there"}</span>
        </h1>
        <p className="text-gray-400 mt-1">Here's where things stand today.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Followers" value={(profile?.total_followers || 0).toLocaleString()} icon={FiUsers} />
        <StatCard label="XP" value={(profile?.xp || 0).toLocaleString()} icon={FiZap} />
        <StatCard label="Plan" value={plan ? plan[0].toUpperCase() + plan.slice(1) : "Free"} icon={FiCheck} />
      </div>

      <div className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5 mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-bold">Today's Plan</h2>
          <Link to="daily-plan" className="text-[#a38b41] text-sm font-semibold hover:underline flex items-center gap-1">
            View Full Plan <FiArrowRight size={14} />
          </Link>
        </div>
        {!dailyPlan ? (
          <p className="text-gray-500 text-sm">No plan generated yet. Head to Daily Plan to generate one.</p>
        ) : (
          <p className="text-gray-400 text-sm">
            {dailyPlan.tasks.filter((t) => t.completed).length} of {dailyPlan.tasks.length} tasks complete
          </p>
        )}
      </div>

      <div className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5 mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-bold">My Fame Team</h2>
          <Link to="team" className="text-[#a38b41] text-sm font-semibold hover:underline flex items-center gap-1">
            View All <FiArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {advisors.map((a) => (
            <div key={a.key} className="text-center">
              <div className="w-12 h-12 rounded-full overflow-hidden mx-auto mb-1.5 bg-[#111111] border border-[#2a2a2a]">
                {a.avatar_url && <img src={a.avatar_url} alt={a.name} className="w-full h-full object-cover" />}
              </div>
              <p className="text-white text-xs font-semibold truncate">{a.name}</p>
            </div>
          ))}
        </div>
      </div>

      {profile && (
        <div className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5 mb-2">
          <h2 className="text-white font-bold mb-1">Your Public Page</h2>
          <p className="text-gray-400 text-sm mb-3">
            Share this link so fans can subscribe, back your projects, and unlock exclusive content.
          </p>
          <div className="flex gap-2 max-w-md">
            <input
              readOnly
              value={link}
              className="flex-1 bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-xs text-gray-300 outline-none"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black rounded-lg px-3 hover:brightness-110 transition-all"
            >
              <FiCopy size={16} />
            </button>
          </div>
        </div>
      )}

      <GrowthMissions />
    </div>
  );
}
