import { toast } from "react-toastify";
import { FiDollarSign } from "react-icons/fi";
import { useGetMyMonetizationStrategyQuery, useGenerateMonetizationStrategyMutation } from "../../../app/futuresHubApi";

export default function MonetizationLabPage() {
  const { data, isLoading } = useGetMyMonetizationStrategyQuery();
  const [generate, { isLoading: generating }] = useGenerateMonetizationStrategyMutation();

  const strategy = data?.data;

  const handleGenerate = async () => {
    try {
      await generate().unwrap();
      toast.success("Strategy ready!");
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't generate a strategy.");
    }
  };

  if (isLoading) return <div className="text-center text-gray-400 py-24">Loading…</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-3xl font-black text-white flex items-center gap-2">
          <FiDollarSign className="text-[#a38b41]" /> Monetization Lab
        </h1>
        <button
          type="button"
          onClick={handleGenerate}
          disabled={generating}
          className="bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black text-sm font-semibold px-4 py-2.5 rounded-lg hover:brightness-110 transition-all disabled:opacity-60"
        >
          {generating ? "Thinking…" : strategy ? "New Strategy" : "Generate Strategy"}
        </button>
      </div>
      <p className="text-gray-400 text-sm mb-6">Turn your audience into income.</p>

      {!strategy?.strategies?.length ? (
        <div className="text-center py-16 bg-[#191919] border border-[#2a2a2a] rounded-2xl">
          <FiDollarSign className="text-gray-600 mx-auto mb-3" size={28} />
          <p className="text-white font-semibold mb-1">No strategy yet</p>
          <p className="text-gray-500 text-sm">Let your Monetization Strategist find your first income stream.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {strategy.strategies.map((s, i) => (
            <div key={i} className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5">
              <p className="text-white font-bold mb-1">{s.title}</p>
              <p className="text-gray-400 text-sm">{s.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
