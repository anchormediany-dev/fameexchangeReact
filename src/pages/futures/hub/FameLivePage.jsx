import { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { FiVideo, FiCalendar, FiUserPlus } from "react-icons/fi";
import {
  useGetMyFuturesTalentProfileQuery,
  useGetWebinarsQuery,
  useCreateWebinarMutation,
  useGetAdvisorsQuery,
  useGetMyExpertInvitesQuery,
  useCreateExpertInviteMutation,
} from "../../../app/futuresHubApi";

function ExpertInvites() {
  const { data: invitesRes, isLoading } = useGetMyExpertInvitesQuery();
  const [createInvite, { isLoading: creating }] = useCreateExpertInviteMutation();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ expert_name: "", expert_title: "", message: "" });

  const invites = invitesRes?.data || [];

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.expert_name.trim()) {
      toast.error("Give the expert's name.");
      return;
    }
    try {
      const res = await createInvite({
        expert_name: form.expert_name.trim(),
        expert_title: form.expert_title.trim(),
        message: form.message.trim(),
      }).unwrap();
      const link = `${window.location.origin}/futures/expert-invite/${res.data.token}`;
      try {
        await navigator.clipboard.writeText(link);
        toast.success("Invite created — link copied to clipboard!");
      } catch {
        toast.success(`Invite created! Link: ${link}`);
      }
      setForm({ expert_name: "", expert_title: "", message: "" });
      setShowForm(false);
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't create invite.");
    }
  };

  if (isLoading) return null;

  return (
    <div className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5">
      <div className="flex items-center justify-between mb-1">
        <p className="text-white font-bold flex items-center gap-2">
          <FiUserPlus className="text-[#a38b41]" /> Expert Invites
        </p>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="text-[#a38b41] text-sm font-semibold hover:underline"
        >
          {showForm ? "Cancel" : "+ Invite Expert"}
        </button>
      </div>
      <p className="text-gray-400 text-sm mb-4">
        Unique access links you've generated for industry experts to record a lesson — no FameExchange account needed.
      </p>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-4 mb-4 space-y-3">
          <input
            type="text"
            value={form.expert_name}
            onChange={(e) => setForm((f) => ({ ...f, expert_name: e.target.value }))}
            placeholder="Expert's name"
            className="w-full bg-[#191919] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41]"
          />
          <input
            type="text"
            value={form.expert_title}
            onChange={(e) => setForm((f) => ({ ...f, expert_title: e.target.value }))}
            placeholder="Their title (optional)"
            className="w-full bg-[#191919] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41]"
          />
          <textarea
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            placeholder="Personal message (optional)"
            rows={2}
            className="w-full bg-[#191919] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41] resize-none"
          />
          <button
            type="submit"
            disabled={creating}
            className="w-full bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black font-semibold py-2.5 rounded-lg hover:brightness-110 transition-all disabled:opacity-60"
          >
            {creating ? "Creating…" : "Create Invite Link"}
          </button>
        </form>
      )}

      {invites.length === 0 ? (
        <p className="text-gray-500 text-sm">No invites sent yet. Use "Invite Expert" on a webinar to generate one.</p>
      ) : (
        <div className="space-y-2">
          {invites.map((inv) => (
            <div key={inv._id} className="flex items-center justify-between bg-[#111111] border border-[#2a2a2a] rounded-xl p-4">
              <div>
                <p className="text-white text-sm font-semibold">{inv.expert_name}</p>
                <p className="text-gray-500 text-xs mt-0.5">{inv.expert_title}</p>
              </div>
              <p className={`text-xs font-semibold capitalize ${inv.status === "accepted" ? "text-emerald-400" : "text-gray-500"}`}>
                {inv.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FameLivePage() {
  const { data: talentProfileRes } = useGetMyFuturesTalentProfileQuery();
  const talentUserId = talentProfileRes?.data?.userId;
  const { data: webinarsRes, isLoading } = useGetWebinarsQuery(talentUserId);
  const [createWebinar, { isLoading: creating }] = useCreateWebinarMutation();
  const { data: advisorsRes } = useGetAdvisorsQuery();
  const [section, setSection] = useState("All Sections");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", scheduled_at: "", advisor_key: "" });

  const advisors = advisorsRes?.data || [];
  const webinars = webinarsRes?.data || [];
  const sections = useMemo(() => ["All Sections", ...advisors.map((a) => a.title)], [advisors]);
  const titleByKey = useMemo(() => Object.fromEntries(advisors.map((a) => [a.key, a.title])), [advisors]);

  const filtered = useMemo(() => {
    if (section === "All Sections") return webinars;
    return webinars.filter((w) => titleByKey[w.advisor_key] === section);
  }, [webinars, section, titleByKey]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.scheduled_at) {
      toast.error("Give it a title and a date/time.");
      return;
    }
    try {
      await createWebinar({
        title: form.title.trim(),
        scheduled_at: new Date(form.scheduled_at).toISOString(),
        advisor_key: form.advisor_key || null,
        status: "scheduled",
      }).unwrap();
      setForm({ title: "", scheduled_at: "", advisor_key: "" });
      setShowForm(false);
      toast.success("Webinar scheduled.");
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't schedule webinar.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
        <h1 className="text-3xl font-black text-white flex items-center gap-2">
          <FiVideo className="text-[#a38b41]" /> Fame Live
        </h1>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black text-sm font-semibold px-4 py-2.5 rounded-lg hover:brightness-110 transition-all"
        >
          <FiCalendar size={14} /> {showForm ? "Cancel" : "Schedule Webinar"}
        </button>
      </div>
      <p className="text-gray-400 text-sm mb-6">Join real industry advisors for live sessions across every section of your Fame Team.</p>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5 mb-6 space-y-3">
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="Webinar title"
            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41]"
          />
          <input
            type="datetime-local"
            value={form.scheduled_at}
            onChange={(e) => setForm((f) => ({ ...f, scheduled_at: e.target.value }))}
            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#a38b41]"
          />
          <select
            value={form.advisor_key}
            onChange={(e) => setForm((f) => ({ ...f, advisor_key: e.target.value }))}
            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#a38b41]"
          >
            <option value="">No specific section</option>
            {advisors.map((a) => (
              <option key={a.key} value={a.key}>{a.title}</option>
            ))}
          </select>
          <button
            type="submit"
            disabled={creating}
            className="w-full bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black font-semibold py-2.5 rounded-lg hover:brightness-110 transition-all disabled:opacity-60"
          >
            {creating ? "Scheduling…" : "Schedule"}
          </button>
        </form>
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

      <div className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5 mb-6">
        {isLoading ? (
          <p className="text-gray-400 text-sm text-center py-6">Loading…</p>
        ) : filtered.length === 0 ? (
          <div className="text-center py-10">
            <FiCalendar className="text-gray-600 mx-auto mb-3" size={26} />
            <p className="text-gray-400 text-sm">No webinars scheduled right now. Check back soon.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((w) => (
              <div key={w._id} className="flex items-center justify-between bg-[#111111] border border-[#2a2a2a] rounded-xl p-4">
                <div>
                  <p className="text-white text-sm font-semibold">{w.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {new Date(w.scheduled_at).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                    {w.advisor_key && titleByKey[w.advisor_key] ? ` · ${titleByKey[w.advisor_key]}` : ""}
                  </p>
                </div>
                <p className="text-xs font-semibold text-[#a38b41] capitalize">{w.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <ExpertInvites />
    </div>
  );
}
