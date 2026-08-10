import { useState } from "react";
import { toast } from "react-toastify";
import { FiBriefcase, FiImage, FiMusic, FiVideo } from "react-icons/fi";
import {
  useGetMyFuturesTalentProfileQuery,
  useGetMyProjectsQuery,
  useCreateProjectMutation,
} from "../../../app/futuresHubApi";

function FilePicker({ label, icon: Icon, accept, file, onChange }) {
  return (
    <label className="flex items-center gap-3 bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-sm text-gray-300 cursor-pointer hover:border-[#a38b41] transition">
      <Icon className="text-[#a38b41] flex-shrink-0" size={16} />
      <span className="flex-1 truncate">{file ? file.name : label}</span>
      <input type="file" accept={accept} className="hidden" onChange={(e) => onChange(e.target.files?.[0] || null)} />
    </label>
  );
}

export default function ProjectsPage() {
  const { data: talentProfileRes } = useGetMyFuturesTalentProfileQuery();
  const talentUserId = talentProfileRes?.data?.userId;
  const { data: projectsRes, isLoading } = useGetMyProjectsQuery(talentUserId);
  const [createProject, { isLoading: creating }] = useCreateProjectMutation();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", funding_goal: "" });
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [video, setVideo] = useState(null);

  const projects = projectsRes?.data || [];

  const resetForm = () => {
    setForm({ title: "", description: "", funding_goal: "" });
    setImage(null);
    setAudio(null);
    setVideo(null);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("Give your project a title.");
      return;
    }
    const fd = new FormData();
    fd.append("title", form.title.trim());
    fd.append("description", form.description.trim());
    fd.append("funding_goal", Number(form.funding_goal) || 0);
    fd.append("status", "active");
    if (image) fd.append("image", image);
    if (audio) fd.append("audio", audio);
    if (video) fd.append("video", video);

    try {
      await createProject(fd).unwrap();
      resetForm();
      setShowForm(false);
      toast.success("Project created.");
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't create project.");
    }
  };

  if (isLoading) return <div className="text-center text-gray-400 py-24">Loading…</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-3xl font-black text-white flex items-center gap-2">
          <FiBriefcase className="text-[#a38b41]" /> Projects
        </h1>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black text-sm font-semibold px-4 py-2.5 rounded-lg hover:brightness-110 transition-all"
        >
          {showForm ? "Cancel" : "+ New Project"}
        </button>
      </div>
      <p className="text-gray-400 text-sm mb-6">
        Showcase what you're working on and let fans crowdfund your vision.
      </p>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-5 mb-6 space-y-3">
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="Project title (e.g. Debut EP Recording)"
            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41]"
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="What are you building?"
            rows={3}
            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41] resize-none"
          />
          <input
            type="number"
            min="1"
            value={form.funding_goal}
            onChange={(e) => setForm((f) => ({ ...f, funding_goal: e.target.value }))}
            placeholder="Funding goal ($)"
            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41]"
          />

          <div className="grid sm:grid-cols-3 gap-3 pt-1">
            <FilePicker label="Add a photo" icon={FiImage} accept="image/png,image/jpeg,image/webp" file={image} onChange={setImage} />
            <FilePicker label="Add a track" icon={FiMusic} accept="audio/mpeg,audio/wav,audio/mp4,audio/x-wav" file={audio} onChange={setAudio} />
            <FilePicker label="Add a video" icon={FiVideo} accept="video/mp4,video/quicktime,video/webm" file={video} onChange={setVideo} />
          </div>

          <button
            type="submit"
            disabled={creating}
            className="w-full bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black font-semibold py-2.5 rounded-lg hover:brightness-110 transition-all disabled:opacity-60"
          >
            {creating ? "Creating…" : "Create Project"}
          </button>
        </form>
      )}

      {projects.length === 0 ? (
        <div className="text-center py-16 bg-[#191919] border border-[#2a2a2a] rounded-2xl">
          <FiBriefcase className="text-gray-600 mx-auto mb-3" size={28} />
          <p className="text-white font-semibold mb-1">No projects yet</p>
          <p className="text-gray-500 text-sm">Create your first one to start crowdfunding.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {projects.map((p) => {
            const progress = p.funding_goal > 0 ? Math.min(100, ((p.total_raised || 0) / p.funding_goal) * 100) : 0;
            return (
              <div key={p._id} className="bg-[#191919] border border-[#2a2a2a] rounded-2xl overflow-hidden">
                {p.image_url && <img src={p.image_url} alt={p.title} className="w-full aspect-video object-cover" />}
                <div className="p-4">
                  <p className="text-white font-semibold text-sm">{p.title}</p>
                  {p.description && <p className="text-gray-500 text-xs mt-1">{p.description}</p>}
                  <div className="mt-3 mb-1 flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#a38b41]">${(p.total_raised || 0).toLocaleString()}</span>
                    <span className="text-gray-500">of ${(p.funding_goal || 0).toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#2a2a2a] overflow-hidden">
                    <div className="h-full bg-[#a38b41] rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
