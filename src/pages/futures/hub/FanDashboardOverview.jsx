import { Link } from "react-router-dom";
import { FiUsers, FiGift, FiShare2, FiArrowRight, FiTarget, FiMessageSquare } from "react-icons/fi";
import { useGetMyFuturesFanProfileQuery, useGetMyFanSubscriptionsQuery } from "../../../app/futuresHubApi";

export default function FanDashboardOverview() {
  const { data: fanProfileRes } = useGetMyFuturesFanProfileQuery();
  const { data: subsRes } = useGetMyFanSubscriptionsQuery();

  const profile = fanProfileRes?.data;
  const activeSubs = (subsRes?.data || []).filter((s) => s.status === "active");

  return (
    <div>
      <div className="mb-8">
        <p className="text-[#a38b41] text-xs uppercase tracking-widest font-semibold mb-1">Fame Futures</p>
        <h1 className="text-3xl font-black text-white">
          Hey <span className="text-[#a38b41]">{profile?.display_name || "there"}</span>
        </h1>
        <p className="text-gray-400 mt-1">Keep grinding!</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5 text-center">
          <p className="text-2xl font-black text-white">{(profile?.xp || 0).toLocaleString()}</p>
          <p className="text-gray-500 text-xs uppercase tracking-wide font-semibold mt-1">XP</p>
        </div>
        <div className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5 text-center">
          <p className="text-2xl font-black text-white">{activeSubs.length}</p>
          <p className="text-gray-500 text-xs uppercase tracking-wide font-semibold mt-1">Supporting</p>
        </div>
        <div className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5 text-center">
          <p className="text-2xl font-black text-white capitalize">{profile?.badge || "Newcomer"}</p>
          <p className="text-gray-500 text-xs uppercase tracking-wide font-semibold mt-1">Badge</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <Link to="supporting" className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5 hover:border-[#a38b41]/40 transition">
          <FiUsers className="text-[#a38b41] mb-2" size={20} />
          <p className="text-white font-semibold text-sm flex items-center gap-1">
            Creators You Support <FiArrowRight size={12} />
          </p>
        </Link>
        <Link to="missions" className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5 hover:border-[#a38b41]/40 transition">
          <FiTarget className="text-[#a38b41] mb-2" size={20} />
          <p className="text-white font-semibold text-sm flex items-center gap-1">
            Missions <FiArrowRight size={12} />
          </p>
        </Link>
        <Link to="messages" className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5 hover:border-[#a38b41]/40 transition">
          <FiMessageSquare className="text-[#a38b41] mb-2" size={20} />
          <p className="text-white font-semibold text-sm flex items-center gap-1">
            Messages <FiArrowRight size={12} />
          </p>
        </Link>
        <Link to="rewards" className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5 hover:border-[#a38b41]/40 transition">
          <FiGift className="text-[#a38b41] mb-2" size={20} />
          <p className="text-white font-semibold text-sm flex items-center gap-1">
            XP Rewards <FiArrowRight size={12} />
          </p>
        </Link>
        <Link to="referrals" className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5 hover:border-[#a38b41]/40 transition">
          <FiShare2 className="text-[#a38b41] mb-2" size={20} />
          <p className="text-white font-semibold text-sm flex items-center gap-1">
            Invite Friends <FiArrowRight size={12} />
          </p>
        </Link>
      </div>
    </div>
  );
}
