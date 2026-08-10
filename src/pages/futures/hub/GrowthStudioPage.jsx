import { useState } from "react";
import { toast } from "react-toastify";
import { FiZap, FiTrash2 } from "react-icons/fi";
import {
  useGetMyContentIdeasQuery,
  useGenerateContentIdeasMutation,
  useDeleteContentIdeaMutation,
} from "../../../app/futuresHubApi";

const TABS = [
  { key: "idea", label: "Ideas" },
  { key: "hook", label: "Hooks" },
  { key: "caption", label: "Captions" },
  { key: "script", label: "Scripts" },
];

export default function GrowthStudioPage() {
  const [tab, setTab] = useState("idea");
  const { data, isLoading } = useGetMyContentIdeasQuery(tab);
  const [generate, { isLoading: generating }] = useGenerateContentIdeasMutation();
  const [deleteIdea] = useDeleteContentIdeaMutation();

  const items = data?.data || [];

  const handleGenerate = async () => {
    try {
      await generate(tab).unwrap();
      toast.success("New content generated!");
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't generate content.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
        <h1 className="text-3xl font-black text-white">Growth Studio</h1>
        <button
          type="button"
          onClick={handleGenerate}
          disabled={generating}
          className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black text-sm font-semibold px-4 py-2.5 rounded-lg hover:brightness-110 transition-all disabled:opacity-60"
        >
          <FiZap size={14} /> {generating ? "Generating…" : "Generate New Content"}
        </button>
      </div>
      <p className="text-gray-400 text-sm mb-6">AI-powered content ideas, hooks, captions & scripts.</p>

      <div className="flex gap-1 border-b border-[#2a2a2a] mb-6">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition ${
              tab === t.key ? "border-[#a38b41] text-[#e6ca7c]" : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center text-gray-400 py-24">Loading…</div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 bg-[#191919] border border-[#2a2a2a] rounded-2xl">
          <FiZap className="text-gray-600 mx-auto mb-3" size={28} />
          <p className="text-white font-semibold mb-1">No content yet</p>
          <p className="text-gray-500 text-sm">Click "Generate New Content" to get AI-powered ideas.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item._id} className="flex items-start justify-between gap-3 bg-[#191919] border border-[#2a2a2a] rounded-xl p-4">
              <p className="text-gray-200 text-sm whitespace-pre-wrap">{item.content}</p>
              <button
                type="button"
                onClick={() => deleteIdea(item._id)}
                className="flex-shrink-0 text-gray-500 hover:text-red-400 transition p-1"
              >
                <FiTrash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
