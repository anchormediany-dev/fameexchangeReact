import { toast } from "react-toastify";
import { FiShare2, FiCopy } from "react-icons/fi";
import { useGetMyReferralInfoQuery } from "../../../app/futuresHubApi";

export default function FanReferralsPage() {
  const { data: referralRes, isLoading } = useGetMyReferralInfoQuery();
  const info = referralRes?.data;

  if (isLoading || !info) return <div className="text-center text-gray-400 py-24">Loading…</div>;

  const link = `${window.location.origin}/futures/dashboard?ref=${info.referralCode}`;

  const handleCopy = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => toast.success("Referral link copied!"))
      .catch(() => toast.error("Couldn't copy — long-press or select the link to copy it manually."));
  };

  return (
    <div className="max-w-md">
      <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-2">
        <FiShare2 className="text-[#a38b41]" /> Invite Friends
      </h1>
      <p className="text-gray-400 text-sm mb-6">Earn XP for every friend who joins with your link.</p>
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
      <div className="flex gap-8 mt-6">
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
