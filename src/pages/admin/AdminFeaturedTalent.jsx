import { useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetSpotlightCandidatesQuery,
  useGetFuturesQualificationProgressQuery,
  useSetTalentSpotlightMutation,
  useClearTalentSpotlightMutation,
  useUploadHighlightReelMutation,
} from "../../app/authApi";
import { imgSrc } from "../../utils/imgSrc";

// Admin: pick the single talent spotlighted in the home page's Featured
// Talent section + full bio page, and upload their highlight reel video.
// Distinct from AdminInverseFeatured.jsx (Talent.featured_in_inverse) —
// this drives Talent.is_featured_spotlight, a single pick, not a list.
const AdminFeaturedTalent = () => {
  const [search, setSearch] = useState("");
  const { data: candidatesResp, isLoading, refetch } =
    useGetSpotlightCandidatesQuery(search);
  const { data: progressResp } = useGetFuturesQualificationProgressQuery();
  const [setSpotlight, { isLoading: isSetting }] = useSetTalentSpotlightMutation();
  const [clearSpotlight] = useClearTalentSpotlightMutation();
  const [uploadReel, { isLoading: isUploadingReel }] = useUploadHighlightReelMutation();

  const [uploadingId, setUploadingId] = useState(null);
  const fileInputRefs = useRef({});

  const candidates = candidatesResp?.data || [];
  const progressByTalentId = useMemo(() => {
    const map = new Map();
    (progressResp?.data || []).forEach((p) => map.set(String(p.talent_id), p));
    return map;
  }, [progressResp]);

  const featured = candidates.find((t) => t.is_featured_spotlight);

  const handleSetFeatured = async (talent) => {
    try {
      await setSpotlight(talent._id).unwrap();
      toast.success(`${talent.name} is now the featured talent`);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to set featured talent");
    }
  };

  const handleClearFeatured = async (talent) => {
    try {
      await clearSpotlight(talent._id).unwrap();
      toast.success("Featured talent cleared");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to clear featured talent");
    }
  };

  const handlePickVideo = (id) => fileInputRefs.current[id]?.click();

  const handleVideoChange = async (talent, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingId(talent._id);
      const formData = new FormData();
      formData.append("video", file);
      await uploadReel({ id: talent._id, formData }).unwrap();
      toast.success("Highlight reel uploaded");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Upload failed");
    } finally {
      setUploadingId(null);
      e.target.value = "";
    }
  };

  return (
    <div className="text-white space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Featured Talent Spotlight</h1>
        <p className="text-gray-400 text-sm">
          Pick one talent to spotlight on the home page and its full bio
          page — either the highest-performing tradeable Branded Talent
          Share, or a futures-tier talent close to graduating. Futures
          talents show a rough "qualification progress" estimate to help
          you spot who's closest.
        </p>
      </div>

      {featured && (
        <div className="bg-white/5 border border-[#a38b41]/30 rounded-xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={imgSrc(featured.image)}
              alt={featured.name}
              className="w-12 h-12 rounded-full object-cover border border-white/10"
            />
            <div>
              <div className="text-sm text-gray-400">Currently Featured</div>
              <div className="font-medium">{featured.name}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="file"
              accept="video/mp4,video/quicktime,video/webm"
              className="hidden"
              ref={(el) => (fileInputRefs.current[featured._id] = el)}
              onChange={(e) => handleVideoChange(featured, e)}
            />
            <button
              type="button"
              onClick={() => handlePickVideo(featured._id)}
              disabled={isUploadingReel && uploadingId === featured._id}
              className="border border-white/20 text-white py-2 px-4 rounded-md hover:bg-white/10 transition-all cursor-pointer text-sm disabled:opacity-60"
            >
              {isUploadingReel && uploadingId === featured._id
                ? "Uploading..."
                : featured.highlight_reel_url
                ? "Replace Highlight Reel"
                : "Upload Highlight Reel"}
            </button>
            <button
              type="button"
              onClick={() => handleClearFeatured(featured)}
              className="border border-red-700/50 text-red-300 py-2 px-4 rounded-md hover:bg-red-900/20 transition-all cursor-pointer text-sm"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-3 items-center">
        <input
          type="text"
          placeholder="Search talents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white/5 border border-white/10 rounded px-3 py-2 text-white w-full max-w-md"
        />
      </div>

      <div className="overflow-x-auto bg-white/5 border border-white/10 rounded-xl">
        <table className="w-full text-sm">
          <thead className="text-gray-400">
            <tr>
              <th className="text-left px-4 py-3">Image</th>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Tier</th>
              <th className="text-left px-4 py-3">FameScore</th>
              <th className="text-left px-4 py-3">Graduation Progress</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : candidates.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400">
                  No talents found
                </td>
              </tr>
            ) : (
              candidates.map((t) => {
                const progress = progressByTalentId.get(String(t._id));
                return (
                  <tr key={t._id}>
                    <td className="px-4 py-3">
                      <img
                        src={imgSrc(t.image)}
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover border border-white/10"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium">{t.name}</td>
                    <td className="px-4 py-3 capitalize">{t.tier}</td>
                    <td className="px-4 py-3">{t.fame_score ?? "—"}</td>
                    <td className="px-4 py-3">
                      {t.tier === "futures" ? (
                        progress?.progress_percent != null ? (
                          <span
                            className={
                              progress.progress_percent >= 80
                                ? "text-emerald-400 font-semibold"
                                : "text-gray-300"
                            }
                          >
                            {progress.progress_percent}%
                          </span>
                        ) : (
                          "—"
                        )
                      ) : (
                        <span className="text-gray-500">n/a</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {t.is_featured_spotlight ? (
                        <span className="text-[#a38b41] text-xs font-semibold uppercase">
                          Featured
                        </span>
                      ) : (
                        <button
                          type="button"
                          disabled={isSetting}
                          onClick={() => handleSetFeatured(t)}
                          className="bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black font-medium py-1.5 px-4 rounded-md cursor-pointer hover:brightness-110 disabled:opacity-60 text-xs"
                        >
                          Set as Featured
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminFeaturedTalent;
