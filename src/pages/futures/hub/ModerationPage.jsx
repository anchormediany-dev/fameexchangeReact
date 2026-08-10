import { toast } from "react-toastify";
import { FiShield, FiCheckCircle } from "react-icons/fi";
import { useGetFlaggedFansQuery, useClearFanFlagMutation } from "../../../app/futuresHubApi";

export default function ModerationPage() {
  const { data, isLoading } = useGetFlaggedFansQuery();
  const [clearFlag, { isLoading: clearing }] = useClearFanFlagMutation();

  const flagged = data?.data || [];

  const handleClear = async (userId) => {
    try {
      await clearFlag(userId).unwrap();
      toast.success("Flag cleared.");
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't clear flag.");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-2">
        <FiShield className="text-[#a38b41]" /> Moderation
      </h1>
      <p className="text-gray-400 text-sm mb-6">Review and remove flagged content to keep your community safe.</p>

      {isLoading ? (
        <div className="text-center text-gray-400 py-24">Loading…</div>
      ) : flagged.length === 0 ? (
        <div className="text-center py-16 bg-[#191919] border border-[#2a2a2a] rounded-2xl">
          <FiCheckCircle className="text-emerald-500 mx-auto mb-3" size={28} />
          <p className="text-white font-semibold mb-1">All Clear</p>
          <p className="text-gray-500 text-sm">No flagged content to review. Your community is safe.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {flagged.map((f) => (
            <div key={f.userId} className="flex items-center justify-between bg-[#191919] border border-[#2a2a2a] rounded-xl p-4">
              <div>
                <p className="text-white text-sm font-semibold">{f.display_name}</p>
                {f.flag_reason && <p className="text-gray-500 text-xs mt-0.5">{f.flag_reason}</p>}
              </div>
              <button
                type="button"
                onClick={() => handleClear(f.userId)}
                disabled={clearing}
                className="text-xs font-semibold text-black bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] px-3 py-1.5 rounded-lg hover:brightness-110 transition disabled:opacity-50"
              >
                Clear Flag
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
