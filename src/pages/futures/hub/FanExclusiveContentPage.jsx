import { FiImage, FiLock, FiHeart } from "react-icons/fi";
import { useGetMyFuturesFanProfileQuery, useGetTalentExclusiveContentQuery } from "../../../app/futuresHubApi";

export default function FanExclusiveContentPage() {
  const { data: fanProfileRes } = useGetMyFuturesFanProfileQuery();
  const talentId = fanProfileRes?.data?.talentId;
  const { data: contentRes, isLoading } = useGetTalentExclusiveContentQuery(talentId, { skip: !talentId });
  const content = contentRes?.data || [];

  return (
    <div>
      <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-2">
        <FiImage className="text-[#a38b41]" /> Exclusive Content
      </h1>
      <p className="text-gray-400 text-sm mb-6">Content your creator shares just with subscribers.</p>

      {!talentId ? (
        <div className="text-center py-16 bg-[#191919] border border-[#2a2a2a] rounded-2xl">
          <FiHeart className="text-gray-600 mx-auto mb-3" size={28} />
          <p className="text-white font-semibold mb-1">Subscribe to a creator first</p>
          <p className="text-gray-500 text-sm">Once you're supporting a creator, their exclusive content shows up here.</p>
        </div>
      ) : isLoading ? (
        <div className="text-center text-gray-400 py-24">Loading…</div>
      ) : content.length === 0 ? (
        <div className="text-center py-16 bg-[#191919] border border-[#2a2a2a] rounded-2xl">
          <FiImage className="text-gray-600 mx-auto mb-3" size={28} />
          <p className="text-white font-semibold mb-1">Nothing posted yet</p>
          <p className="text-gray-500 text-sm">Check back soon.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {content.map((c) => (
            <div key={c._id} className="bg-[#191919] border border-[#2a2a2a] rounded-xl p-4">
              <p className="text-white font-semibold text-sm">{c.title}</p>
              <p className="text-gray-500 text-xs mt-0.5 capitalize">{c.type}</p>
              {c.locked ? (
                <div className="mt-3 flex items-center gap-1.5 text-gray-500 text-xs">
                  <FiLock size={12} /> Subscribe to unlock
                </div>
              ) : (
                <a
                  href={c.content_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-[#a38b41] text-xs font-semibold hover:underline"
                >
                  View →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
