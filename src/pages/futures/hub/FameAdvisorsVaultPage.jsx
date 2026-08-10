import { useState, useMemo } from "react";
import { FiBookOpen, FiLock, FiPlayCircle, FiAward } from "react-icons/fi";
import { useGetVideoLessonsQuery, useGetAdvisorsQuery, useGetMyMembershipQuery } from "../../../app/futuresHubApi";

export default function FameAdvisorsVaultPage() {
  const { data: lessonsRes, isLoading } = useGetVideoLessonsQuery();
  const { data: advisorsRes } = useGetAdvisorsQuery();
  const { data: membershipRes } = useGetMyMembershipQuery();
  const [section, setSection] = useState("All Sections");

  const lessons = lessonsRes?.data || [];
  const advisors = advisorsRes?.data || [];
  const isMember = membershipRes?.data?.status === "active";

  const sections = useMemo(() => ["All Sections", ...advisors.map((a) => a.title)], [advisors]);
  const titleByKey = useMemo(() => Object.fromEntries(advisors.map((a) => [a.key, a.title])), [advisors]);

  const filtered = useMemo(() => {
    if (section === "All Sections") return lessons;
    return lessons.filter((l) => titleByKey[l.advisor_key] === section);
  }, [lessons, section, titleByKey]);

  return (
    <div>
      <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-2">
        <FiBookOpen className="text-[#a38b41]" /> Fame Advisors Vault
      </h1>
      <p className="text-gray-400 text-sm mb-6">On-demand lessons from professional industry experts. Unlock with a membership to watch.</p>

      {!isMember && (
        <div className="bg-[#191919] border border-[#a38b41]/30 rounded-2xl p-5 mb-6 flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-white font-semibold flex items-center gap-1.5"><FiAward className="text-[#a38b41]" /> Unlock the full library</p>
            <p className="text-gray-400 text-sm mt-0.5">Become a member to watch expert video lessons</p>
          </div>
          <a
            href="/futures/dashboard/membership"
            className="bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black font-semibold px-4 py-2.5 rounded-lg hover:brightness-110 transition-all"
          >
            View Plans
          </a>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        {sections.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSection(s)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition whitespace-nowrap ${
              section === s
                ? "bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black"
                : "border border-[#2a2a2a] text-gray-400 hover:text-white"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center text-gray-400 py-24">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-[#191919] border border-[#2a2a2a] rounded-2xl">
          <FiBookOpen className="text-gray-600 mx-auto mb-3" size={28} />
          <p className="text-white font-semibold mb-1">No lessons available yet</p>
          <p className="text-gray-500 text-sm">Check back soon.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((l) => (
            <div key={l._id} className="bg-[#191919] border border-[#2a2a2a] rounded-2xl overflow-hidden">
              <div className="aspect-video bg-[#111111] flex items-center justify-center relative">
                {l.thumbnail_url ? (
                  <img src={l.thumbnail_url} alt={l.title} className="w-full h-full object-cover" />
                ) : (
                  <FiPlayCircle className="text-gray-700" size={32} />
                )}
                {l.locked && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <FiLock className="text-[#a38b41]" size={22} />
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="text-white font-semibold text-sm">{l.title}</p>
                <p className="text-gray-500 text-xs mt-0.5">
                  {l.expert_name}{l.expert_title ? ` · ${l.expert_title}` : ""}
                </p>
                {l.duration_minutes > 0 && <p className="text-gray-600 text-xs mt-1">{l.duration_minutes} min</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
