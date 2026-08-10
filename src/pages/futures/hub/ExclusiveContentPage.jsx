import { useState } from "react";
import { toast } from "react-toastify";
import { FiImage, FiTrash2 } from "react-icons/fi";
import {
  useGetMyExclusiveContentQuery,
  useGetMyFanTiersQuery,
  useCreateExclusiveContentMutation,
  useDeleteExclusiveContentMutation,
} from "../../../app/futuresHubApi";

export default function ExclusiveContentPage() {
  const { data: contentRes, isLoading } = useGetMyExclusiveContentQuery();
  const { data: tiersRes } = useGetMyFanTiersQuery();
  const [createContent, { isLoading: creating }] = useCreateExclusiveContentMutation();
  const [deleteContent] = useDeleteExclusiveContentMutation();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", type: "photo", content_url: "", tierId: "" });

  const content = contentRes?.data || [];
  const tiers = tiersRes?.data || [];

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content_url.trim()) {
      toast.error("Title and content URL are required.");
      return;
    }
    try {
      await createContent({
        title: form.title.trim(),
        type: form.type,
        content_url: form.content_url.trim(),
        tierId: form.tierId || null,
        status: "published",
      }).unwrap();
      setForm({ title: "", type: "photo", content_url: "", tierId: "" });
      setShowForm(false);
      toast.success("Content published.");
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't publish content.");
    }
  };

  if (isLoading) return <div className="text-center text-gray-400 py-24">Loading…</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-3xl font-black text-white flex items-center gap-2">
          <FiImage className="text-[#a38b41]" /> Exclusive Content
        </h1>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black text-sm font-semibold px-4 py-2.5 rounded-lg hover:brightness-110 transition-all"
        >
          {showForm ? "Cancel" : "+ New Post"}
        </button>
      </div>
      <p className="text-gray-400 text-sm mb-6">Post content for your subscribers — gate it by tier or leave open to all.</p>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5 mb-6 space-y-3">
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="Title"
            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41]"
          />
          <select
            value={form.type}
            onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#a38b41]"
          >
            <option value="photo">Photo</option>
            <option value="video">Video</option>
            <option value="audio">Audio</option>
            <option value="lesson">Lesson</option>
          </select>
          <input
            type="url"
            value={form.content_url}
            onChange={(e) => setForm((f) => ({ ...f, content_url: e.target.value }))}
            placeholder="Content URL"
            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41]"
          />
          <select
            value={form.tierId}
            onChange={(e) => setForm((f) => ({ ...f, tierId: e.target.value }))}
            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#a38b41]"
          >
            <option value="">Open to all subscribers</option>
            {tiers.map((t) => (
              <option key={t._id} value={t._id}>
                Requires: {t.name} (${t.price}/mo)
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={creating}
            className="w-full bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black font-semibold py-2.5 rounded-lg hover:brightness-110 transition-all disabled:opacity-60"
          >
            {creating ? "Publishing…" : "Publish"}
          </button>
        </form>
      )}

      {content.length === 0 ? (
        <p className="text-gray-500 text-sm">No content yet — post something for your subscribers.</p>
      ) : (
        <div className="space-y-2">
          {content.map((c) => (
            <div key={c._id} className="flex items-center justify-between bg-[#191919] border border-[#2a2a2a] rounded-xl p-4">
              <div>
                <p className="text-white text-sm font-semibold">{c.title}</p>
                <p className="text-gray-500 text-xs mt-0.5 capitalize">{c.type}</p>
              </div>
              <button
                type="button"
                onClick={() => deleteContent(c._id)}
                className="text-gray-500 hover:text-red-400 transition p-1.5"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
