import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FiSettings, FiTrash2, FiPlus } from "react-icons/fi";
import { useGetMyFuturesTalentProfileQuery, useUpdateMyFuturesTalentProfileMutation } from "../../../app/futuresHubApi";

const NICHES = ["Musician", "Comedian", "Actor", "Content Creator", "Dancer", "Podcaster", "Model", "Athlete", "Other"];

export default function SettingsPage() {
  const { data, isLoading } = useGetMyFuturesTalentProfileQuery();
  const [updateProfile, { isLoading: saving }] = useUpdateMyFuturesTalentProfileMutation();

  const profile = data?.data;
  const [stageName, setStageName] = useState("");
  const [niche, setNiche] = useState("");
  const [bio, setBio] = useState("");
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    if (!profile) return;
    setStageName(profile.stage_name || "");
    setNiche(profile.niche || "");
    setBio(profile.bio || "");
    setPlatforms(profile.platforms?.length ? profile.platforms : [{ platform: "", handle: "", followers: 0 }]);
  }, [profile]);

  const updatePlatform = (i, field, value) => {
    setPlatforms((prev) => prev.map((p, idx) => (idx === i ? { ...p, [field]: value } : p)));
  };

  const addPlatform = () => setPlatforms((prev) => [...prev, { platform: "", handle: "", followers: 0 }]);
  const removePlatform = (i) => setPlatforms((prev) => prev.filter((_, idx) => idx !== i));

  const handleSave = async (e) => {
    e.preventDefault();
    if (!stageName.trim()) {
      toast.error("Stage name can't be empty.");
      return;
    }
    const cleanPlatforms = platforms
      .filter((p) => p.handle.trim())
      .map((p) => ({ platform: p.platform.trim() || "Other", handle: p.handle.trim(), followers: Number(p.followers) || 0 }));
    const total_followers = cleanPlatforms.reduce((sum, p) => sum + p.followers, 0);

    try {
      await updateProfile({
        stage_name: stageName.trim(),
        niche,
        bio: bio.trim(),
        platforms: cleanPlatforms,
        total_followers,
      }).unwrap();
      toast.success("Settings saved.");
    } catch (err) {
      toast.error(err?.data?.message || "Couldn't save settings.");
    }
  };

  if (isLoading) return <div className="text-center text-gray-400 py-24">Loading…</div>;

  return (
    <div>
      <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-2">
        <FiSettings className="text-[#a38b41]" /> Settings
      </h1>
      <p className="text-gray-400 text-sm mb-6">Manage your profile.</p>

      <form onSubmit={handleSave} className="bg-[#191919] border border-[#2a2a2a] rounded-2xl p-6 max-w-2xl space-y-6">
        <div>
          <label className="block text-white font-semibold text-sm mb-2">Stage Name</label>
          <input
            type="text"
            value={stageName}
            onChange={(e) => setStageName(e.target.value)}
            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-[#a38b41]"
          />
        </div>

        <div>
          <label className="block text-white font-semibold text-sm mb-2">Niche</label>
          <div className="flex flex-wrap gap-2">
            {NICHES.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setNiche(n)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  niche === n
                    ? "bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black"
                    : "border border-[#2a2a2a] text-gray-400 hover:text-white"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-white font-semibold text-sm mb-2">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-[#a38b41] resize-none"
          />
        </div>

        <div>
          <label className="block text-white font-semibold text-sm mb-1">Social Platforms</label>
          <p className="text-gray-500 text-xs mb-3">Update your handles and follower counts — your total updates automatically.</p>
          <div className="space-y-2">
            {platforms.map((p, i) => (
              <div key={i} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2">
                <input
                  type="text"
                  value={p.platform}
                  onChange={(e) => updatePlatform(i, "platform", e.target.value)}
                  placeholder="Platform (e.g. Instagram)"
                  className="bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41]"
                />
                <input
                  type="text"
                  value={p.handle}
                  onChange={(e) => updatePlatform(i, "handle", e.target.value)}
                  placeholder="@handle"
                  className="bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41]"
                />
                <input
                  type="number"
                  min="0"
                  value={p.followers}
                  onChange={(e) => updatePlatform(i, "followers", e.target.value)}
                  placeholder="Followers"
                  className="bg-[#111111] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#a38b41]"
                />
                <button type="button" onClick={() => removePlatform(i)} className="text-gray-500 hover:text-red-400 transition px-2">
                  <FiTrash2 size={15} />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addPlatform}
            className="mt-2 inline-flex items-center gap-1.5 text-[#a38b41] text-sm font-semibold hover:underline"
          >
            <FiPlus size={14} /> Add platform
          </button>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black font-semibold py-2.5 rounded-lg hover:brightness-110 transition-all disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
