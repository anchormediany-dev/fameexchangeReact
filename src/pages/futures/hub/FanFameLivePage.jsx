import { FiVideo, FiCalendar, FiHeart } from "react-icons/fi";
import { useGetMyFuturesFanProfileQuery, useGetWebinarsQuery } from "../../../app/futuresHubApi";

export default function FanFameLivePage() {
  const { data: fanProfileRes } = useGetMyFuturesFanProfileQuery();
  const talentId = fanProfileRes?.data?.talentId;
  const { data: webinarsRes, isLoading } = useGetWebinarsQuery(talentId, { skip: !talentId });
  const webinars = webinarsRes?.data || [];

  return (
    <div>
      <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-2">
        <FiVideo className="text-[#a38b41]" /> Fame Live
      </h1>
      <p className="text-gray-400 text-sm mb-6">Live sessions scheduled by your creator.</p>

      {!talentId ? (
        <div className="text-center py-16 bg-[#191919] border border-[#2a2a2a] rounded-2xl">
          <FiHeart className="text-gray-600 mx-auto mb-3" size={28} />
          <p className="text-white font-semibold mb-1">Subscribe to a creator first</p>
          <p className="text-gray-500 text-sm">Their scheduled live sessions will show up here.</p>
        </div>
      ) : isLoading ? (
        <div className="text-center text-gray-400 py-24">Loading…</div>
      ) : webinars.length === 0 ? (
        <div className="text-center py-16 bg-[#191919] border border-[#2a2a2a] rounded-2xl">
          <FiCalendar className="text-gray-600 mx-auto mb-3" size={28} />
          <p className="text-white font-semibold mb-1">Nothing scheduled right now</p>
          <p className="text-gray-500 text-sm">Check back soon.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {webinars.map((w) => (
            <div key={w._id} className="flex items-center justify-between bg-[#191919] border border-[#2a2a2a] rounded-xl p-4">
              <div>
                <p className="text-white text-sm font-semibold">{w.title}</p>
                <p className="text-gray-500 text-xs mt-0.5">
                  {new Date(w.scheduled_at).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                </p>
              </div>
              <p className="text-xs font-semibold text-[#a38b41] capitalize">{w.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
