import { toast } from "react-toastify";
import { FiCompass } from "react-icons/fi";
import { useGetMyCareerRoadmapQuery, useGenerateCareerRoadmapMutation } from "../../../app/futuresHubApi";

export default function CareerRoadmapPage() {
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

  if (isLoading) return <div className="text-center text-gray-400 py-24">Loading…</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-3xl font-black text-white flex items-center gap-2">
          <FiCompass className="text-[#a38b41]" /> Career Roadmap
        </h1>
        <button
          type="button"
          onClick={handleGenerate}
          disabled={generating}
          className="bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black text-sm font-semibold px-4 py-2.5 rounded-lg hover:brightness-110 transition-all disabled:opacity-60"
        >
          {generating ? "Generating…" : roadmap ? "Update Plan" : "Generate Roadmap"}
        </button>
      </div>
      <p className="text-gray-400 text-sm mb-6">Your AI-managed path to the top.</p>

      {!roadmap ? (
        <div className="text-center py-16 bg-[#191919] border border-[#2a2a2a] rounded-2xl">
          <p className="text-white font-semibold mb-1">No roadmap yet</p>
          <p className="text-gray-500 text-sm">Let your Career Manager build your personalized roadmap.</p>
        </div>
      ) : (
        <div className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5 space-y-5">
          <div>
            <p className="text-[#a38b41] text-xs uppercase tracking-wider font-semibold mb-1">Current Position</p>
            <p className="text-gray-300 text-sm">{roadmap.current_position}</p>
          </div>
          <div>
            <p className="text-[#a38b41] text-xs uppercase tracking-wider font-semibold mb-1">Next Milestone</p>
            <p className="text-gray-300 text-sm">{roadmap.next_milestone}</p>
          </div>
          <div>
            <p className="text-[#a38b41] text-xs uppercase tracking-wider font-semibold mb-2">30-Day Plan</p>
            <ul className="space-y-1.5">
              {roadmap.thirty_day_plan?.map((item, i) => (
                <li key={i} className="text-gray-300 text-sm flex gap-2">
                  <span className="text-[#a38b41]">•</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[#a38b41] text-xs uppercase tracking-wider font-semibold mb-2">90-Day Vision</p>
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
