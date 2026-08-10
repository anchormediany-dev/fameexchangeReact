import { useState } from "react";
import { toast } from "react-toastify";
import { FiTarget, FiZap, FiCheck, FiClock, FiX } from "react-icons/fi";
import {
  useGetMyFanMissionsQuery,
  useCreateFanMissionMutation,
  useGenerateFanMissionIdeasMutation,
} from "../../../app/futuresHubApi";

function IdeaCard({ idea, onUse }) {
  return (
    <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-4 flex items-start justify-between gap-3">
      <div>
        <p className="text-white text-sm font-semibold">{idea.title}</p>
        <p className="text-gray-500 text-xs mt-0.5">{idea.description}</p>
        <p className="text-[#a38b41] text-xs font-semibold mt-1">{idea.xp_reward} XP</p>
      </div>
      <button
        type="button"
        onClick={() => onUse(idea)}
        className="flex-shrink-0 text-xs font-semibold text-black bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] px-3 py-1.5 rounded-lg hover:brightness-110 transition"
      >
        Use this
      </button>
    </div>
  );
}

export default function FanMissionsPage() {
  const { data: missionsRes, isLoading } = useGetMyFanMissionsQuery();
  const [createMission, { isLoading: creating }] = useCreateFanMissionMutation();
  const [generateIdeas, { isLoading: generating }] = useGenerateFanMissionIdeasMutation();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", xp_reward: "" });
  const [ideas, setIdeas] = useState([]);

  const missions = missionsRes?.data || [];

  const handleGenerate = async () => {
    try {
      const res = await generateIdeas().unwrap();
      setIdeas(res.data || []);
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't generate ideas.");
    }
  };

  const useIdea = (idea) => {
    setForm({ title: idea.title, description: idea.description, xp_reward: String(idea.xp_reward) });
    setShowForm(true);
    setIdeas([]);
  };

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
      toast.success("Mission published — your fans can complete it now.");
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't create mission.");
    }
  };

  if (isLoading) return <div className="text-center text-gray-400 py-24">Loading…</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
        <h1 className="text-3xl font-black text-white flex items-center gap-2">
          <FiTarget className="text-[#a38b41]" /> Fan Missions
        </h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={generating}
            className="inline-flex items-center gap-1.5 border border-[#a38b41] text-[#a38b41] text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-[#a38b41]/10 transition disabled:opacity-50"
          >
            <FiZap size={14} /> {generating ? "Thinking…" : "Generate with AI"}
          </button>
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black text-sm font-semibold px-4 py-2.5 rounded-lg hover:brightness-110 transition-all"
          >
            {showForm ? "Cancel" : "+ Create Mission"}
          </button>
        </div>
      </div>
      <p className="text-gray-400 text-sm mb-6">Create missions for your fans to complete and earn XP.</p>

      {ideas.length > 0 && (
        <div className="bg-[#191919] border border-[#a38b41]/30 rounded-2xl p-5 mb-6">
          <p className="text-white font-semibold text-sm mb-3">Recommended for You</p>
          <div className="space-y-2">
            {ideas.map((idea, i) => (
              <IdeaCard key={i} idea={idea} onUse={useIdea} />
            ))}
          </div>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleCreate} className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5 mb-6 space-y-3">
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="Mission title (e.g. Share my latest post)"
            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41]"
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="What should fans do?"
            rows={2}
            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41] resize-none"
          />
          <input
            type="number"
            min="0"
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
            {creating ? "Publishing…" : "Publish Mission"}
          </button>
        </form>
      )}

      {missions.length === 0 ? (
        <div className="text-center py-16 bg-[#191919] border border-[#2a2a2a] rounded-2xl">
          <FiTarget className="text-gray-600 mx-auto mb-3" size={28} />
          <p className="text-white font-semibold mb-1">No missions yet</p>
          <p className="text-gray-500 text-sm">Create a mission or generate some with AI.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {missions.map((m) => (
            <div key={m._id} className="bg-[#191919] border border-[#2a2a2a] rounded-xl p-4">
              <div className="flex items-center justify-between">
                <p className="text-white text-sm font-semibold">{m.title}</p>
                <p className="text-[#a38b41] text-xs font-semibold">{m.xp_reward} XP</p>
              </div>
              {m.description && <p className="text-gray-500 text-xs mt-1">{m.description}</p>}
              <div className="flex gap-4 mt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1"><FiClock size={12} /> {m.submissionCounts?.pending || 0} pending</span>
                <span className="flex items-center gap-1"><FiCheck size={12} className="text-emerald-400" /> {m.submissionCounts?.approved || 0} approved</span>
                <span className="flex items-center gap-1"><FiX size={12} /> {m.submissionCounts?.rejected || 0} rejected</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
