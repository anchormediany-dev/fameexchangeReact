import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { FiShield, FiUploadCloud, FiCheckCircle, FiAlertTriangle, FiAlertOctagon } from "react-icons/fi";
import { useGetMyContractReviewsQuery, useReviewContractMutation } from "../../../app/futuresHubApi";

const CHECK_ITEMS = [
  "Ownership terms",
  "Exclusivity clauses",
  "Payment structure",
  "Content rights",
  "Termination conditions",
  "Liability & indemnification",
];

const RISK_STYLES = {
  low: { icon: FiCheckCircle, color: "text-emerald-400", label: "Low risk" },
  medium: { icon: FiAlertTriangle, color: "text-[#e6ca7c]", label: "Medium risk" },
  high: { icon: FiAlertOctagon, color: "text-red-400", label: "High risk" },
};

export default function BrandProtectionPage() {
  const { data, isLoading } = useGetMyContractReviewsQuery();
  const [reviewContract, { isLoading: reviewing }] = useReviewContractMutation();
  const fileInputRef = useRef(null);
  const [latest, setLatest] = useState(null);

  const reviews = data?.data || [];

  const handleFile = async (file) => {
    if (!file) return;
    const fd = new FormData();
    fd.append("contract", file);
    try {
      const res = await reviewContract(fd).unwrap();
      setLatest(res.data);
      toast.success("Contract reviewed.");
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't review that file.");
    }
  };

  const displayed = latest || reviews[0];

  return (
    <div>
      <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-2">
        <FiShield className="text-[#a38b41]" /> Brand Protection
      </h1>
      <p className="text-gray-400 text-sm mb-6">AI-powered contract review and risk detection.</p>

      <div className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5 mb-6">
        <p className="text-white font-semibold flex items-center gap-1.5 mb-3">
          <FiUploadCloud className="text-[#a38b41]" /> Upload a Contract for Review
        </p>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={reviewing}
          className="w-full border-2 border-dashed border-[#2a2a2a] rounded-xl py-10 flex flex-col items-center gap-2 hover:border-[#a38b41] transition disabled:opacity-60"
        >
          <FiUploadCloud className="text-[#a38b41]" size={28} />
          <p className="text-white text-sm font-semibold">{reviewing ? "Reviewing…" : "Click to upload a contract"}</p>
          <p className="text-gray-500 text-xs">PDF or image file</p>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf,image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>

      <div className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5 mb-6">
        <p className="text-white font-semibold mb-3">What We Check</p>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
          {CHECK_ITEMS.map((item) => (
            <p key={item} className="text-gray-300 text-sm flex items-center gap-2">
              <FiCheckCircle className="text-[#a38b41]" size={14} /> {item}
            </p>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-400 py-10">Loading…</div>
      ) : displayed ? (
        <div className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5">
          <p className="text-white font-semibold mb-1">{displayed.filename || "Latest Review"}</p>
          {displayed.summary && <p className="text-gray-400 text-sm mb-4">{displayed.summary}</p>}
          <div className="space-y-3">
            {displayed.findings.map((f, i) => {
              const style = RISK_STYLES[f.risk_level] || RISK_STYLES.low;
              const Icon = style.icon;
              return (
                <div key={i} className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-white text-sm font-semibold">{f.category}</p>
                    <span className={`flex items-center gap-1 text-xs font-semibold ${style.color}`}>
                      <Icon size={13} /> {style.label}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{f.notes}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
