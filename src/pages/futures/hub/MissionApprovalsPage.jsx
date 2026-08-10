import { useState } from "react";
import { toast } from "react-toastify";
import { FiClock, FiCheck, FiX, FiInbox } from "react-icons/fi";
import { useGetMissionSubmissionsQuery, useReviewMissionSubmissionMutation } from "../../../app/futuresHubApi";

const TABS = [
  { key: "pending", label: "Pending", icon: FiClock },
  { key: "approved", label: "Approved", icon: FiCheck },
  { key: "rejected", label: "Rejected", icon: FiX },
];

export default function MissionApprovalsPage() {
  const [tab, setTab] = useState("pending");
  const { data: subsRes, isLoading } = useGetMissionSubmissionsQuery(tab);
  const [review, { isLoading: reviewing }] = useReviewMissionSubmissionMutation();

  const submissions = subsRes?.data || [];

  const handleReview = async (id, decision) => {
    try {
      await review({ id, decision }).unwrap();
      toast.success(decision === "approved" ? "Approved — XP awarded." : "Rejected.");
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't review submission.");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-black text-white mb-1">Mission Approvals</h1>
      <p className="text-gray-400 text-sm mb-6">Review fan mission submissions before XP is awarded.</p>

      <div className="flex gap-2 mb-6">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition ${
              tab === t.key
                ? "bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black"
                : "border border-[#2a2a2a] text-gray-400 hover:text-white"
            }`}
          >
            <t.icon size={14} /> {t.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center text-gray-400 py-24">Loading…</div>
      ) : submissions.length === 0 ? (
        <div className="text-center py-16 bg-[#191919] border border-[#2a2a2a] rounded-2xl">
          <FiInbox className="text-gray-600 mx-auto mb-3" size={28} />
          <p className="text-white font-semibold">No {tab} submissions</p>
        </div>
      ) : (
        <div className="space-y-3">
          {submissions.map((s) => (
            <div key={s._id} className="bg-[#191919] border border-[#2a2a2a] rounded-xl p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-white text-sm font-semibold">{s.missionId?.title || "Mission"}</p>
                <p className="text-gray-500 text-xs mt-0.5">
                  {s.fanId?.name || "Fan"} · {s.missionId?.xp_reward || 0} XP
                </p>
                {s.proof_note && <p className="text-gray-400 text-xs mt-1 italic">"{s.proof_note}"</p>}
              </div>
              {tab === "pending" && (
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => handleReview(s._id, "approved")}
                    disabled={reviewing}
                    className="text-xs font-semibold text-black bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] px-3 py-1.5 rounded-lg hover:brightness-110 transition disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReview(s._id, "rejected")}
                    disabled={reviewing}
                    className="text-xs font-semibold text-gray-400 border border-[#444] px-3 py-1.5 rounded-lg hover:text-red-400 hover:border-red-400 transition disabled:opacity-50"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
