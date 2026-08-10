import { useState } from "react";
import { toast } from "react-toastify";
import { FiTarget, FiUsers } from "react-icons/fi";
import { useGetActiveFanMissionsQuery, useSubmitFanMissionMutation } from "../../../app/futuresHubApi";

function MissionCard({ mission, onSubmit, submitting }) {
  const [note, setNote] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async () => {
    try {
      await onSubmit({ missionId: mission._id, proof_note: note.trim() });
      setShowForm(false);
      setNote("");
    } catch {
      // toast handled by caller
    }
  };

  return (
    <div className="bg-[#191919] border border-[#2a2a2a] rounded-xl p-4">
      <div className="flex items-center justify-between">
        <p className="text-white text-sm font-semibold">{mission.title}</p>
        <p className="text-[#a38b41] text-xs font-semibold">+{mission.xp_reward} XP</p>
      </div>
      {mission.description && <p className="text-gray-500 text-xs mt-1">{mission.description}</p>}

      {showForm ? (
        <div className="mt-3 space-y-2">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Tell your creator how you completed this (optional)"
            rows={2}
            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41] resize-none"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="text-xs font-semibold text-black bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] px-3 py-1.5 rounded-lg hover:brightness-110 transition disabled:opacity-50"
            >
              {submitting ? "Submitting…" : "Submit for Review"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-xs font-semibold text-gray-400 px-3 py-1.5 hover:text-white transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="mt-3 text-xs font-semibold text-black bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] px-3 py-1.5 rounded-lg hover:brightness-110 transition"
        >
          I completed this
        </button>
      )}
    </div>
  );
}

export default function FanMissionsListPage() {
  const { data: missionsRes, isLoading } = useGetActiveFanMissionsQuery();
  const [submitMission, { isLoading: submitting }] = useSubmitFanMissionMutation();

  const missions = missionsRes?.data || [];

  const handleSubmit = async (args) => {
    try {
      await submitMission(args).unwrap();
      toast.success("Submitted — your creator will review it soon.");
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't submit mission.");
      throw err;
    }
  };

  if (isLoading) return <div className="text-center text-gray-400 py-24">Loading…</div>;

  return (
    <div>
      <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-2">
        <FiTarget className="text-[#a38b41]" /> Missions
      </h1>
      <p className="text-gray-400 text-sm mb-6">Complete missions to earn XP.</p>

      {missions.length === 0 ? (
        <div className="text-center py-16 bg-[#191919] border border-[#2a2a2a] rounded-2xl px-4">
          <FiUsers className="text-gray-600 mx-auto mb-3" size={28} />
          <p className="text-white font-semibold mb-1">No active missions</p>
          <p className="text-gray-500 text-sm">
            Support a creator to see missions from them, or check back soon.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {missions.map((m) => (
            <MissionCard key={m._id} mission={m} onSubmit={handleSubmit} submitting={submitting} />
          ))}
        </div>
      )}
    </div>
  );
}
