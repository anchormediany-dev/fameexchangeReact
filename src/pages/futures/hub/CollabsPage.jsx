import { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { FiUserPlus } from "react-icons/fi";
import {
  useGetCollabRequestsQuery,
  useCreateCollabRequestMutation,
  useGetMyFuturesTalentProfileQuery,
} from "../../../app/futuresHubApi";

const NICHES = ["All", "Musician", "Comedian", "Actor", "Content Creator", "Dancer", "Podcaster", "Model", "Athlete", "Other"];

export default function CollabsPage() {
  const { data: reqsRes, isLoading } = useGetCollabRequestsQuery();
  const { data: talentProfileRes } = useGetMyFuturesTalentProfileQuery();
  const [createRequest, { isLoading: creating }] = useCreateCollabRequestMutation();
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", looking_for: "" });

  const requests = reqsRes?.data || [];
  const filtered = useMemo(
    () => (filter === "All" ? requests : requests.filter((r) => r.niche === filter)),
    [requests, filter]
  );

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("Give your post a title.");
      return;
    }
    try {
      await createRequest({
        talent_name: talentProfileRes?.data?.stage_name || "Talent",
        niche: talentProfileRes?.data?.niche || "",
        title: form.title.trim(),
        description: form.description.trim(),
        looking_for: form.looking_for.trim(),
      }).unwrap();
      setForm({ title: "", description: "", looking_for: "" });
      setShowForm(false);
      toast.success("Collab request posted.");
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't post request.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
        <h1 className="text-3xl font-black text-white flex items-center gap-2">
          <FiUserPlus className="text-[#a38b41]" /> Collaboration Board
        </h1>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black text-sm font-semibold px-4 py-2.5 rounded-lg hover:brightness-110 transition-all"
        >
          {showForm ? "Cancel" : "+ Post Collab Request"}
        </button>
      </div>
      <p className="text-gray-400 text-sm mb-6">Find creators to collab with and grow together.</p>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5 mb-6 space-y-3">
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="Title (e.g. Looking for a vocalist for upcoming EP)"
            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41]"
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Describe what you're working on"
            rows={2}
            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41] resize-none"
          />
          <input
            type="text"
            value={form.looking_for}
            onChange={(e) => setForm((f) => ({ ...f, looking_for: e.target.value }))}
            placeholder="Looking for (e.g. Vocalist / Singer)"
            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41]"
          />
          <button
            type="submit"
            disabled={creating}
            className="w-full bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black font-semibold py-2.5 rounded-lg hover:brightness-110 transition-all disabled:opacity-60"
          >
            {creating ? "Posting…" : "Post Request"}
          </button>
        </form>
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        {NICHES.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setFilter(n)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              filter === n
                ? "bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black"
                : "border border-[#2a2a2a] text-gray-400 hover:text-white"
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center text-gray-400 py-24">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-[#191919] border border-[#2a2a2a] rounded-2xl">
          <p className="text-white font-semibold mb-1">No collab requests yet</p>
          <p className="text-gray-500 text-sm">Post one to find your next collaborator.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((r) => (
            <div key={r._id} className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5">
              <p className="text-white font-bold">{r.title}</p>
              <p className="text-[#a38b41] text-xs font-semibold mt-1">
                {r.talent_name} {r.niche && `· ${r.niche}`}
              </p>
              {r.description && <p className="text-gray-400 text-sm mt-2">{r.description}</p>}
              {r.looking_for && (
                <div className="mt-3">
                  <p className="text-gray-500 text-[10px] uppercase tracking-wide font-semibold">Looking For</p>
                  <p className="text-white text-sm font-semibold">{r.looking_for}</p>
                </div>
              )}
              <p className="text-gray-600 text-xs mt-3">
                Posted {new Date(r.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
