import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetSiteSettingsQuery,
  useUpdateSiteSettingsMutation,
  useUpdateTalentFeaturedMutation,
  useUploadTalentImageMutation,
} from "../../app/authApi";
import { useGetMarketTalentsQuery } from "../../app/tradingApi";
import { imgSrc } from "../../utils/imgSrc";

// Admin: configure which talents appear in the home Inverse section,
// in what order, and how many in total.
const AdminInverseFeatured = () => {
  const [search, setSearch] = useState("");
  const { data: talentResp, isLoading, refetch: refetchTalents } =
    useGetMarketTalentsQuery({ page: 1, limit: 500, search });
  const { data: settingsResp, refetch: refetchSettings } =
    useGetSiteSettingsQuery();
  const [updateSettings, { isLoading: isSavingSettings }] =
    useUpdateSiteSettingsMutation();
  const [updateFeatured, { isLoading: isSavingFeatured }] =
    useUpdateTalentFeaturedMutation();
  const [uploadImage, { isLoading: isUploading }] =
    useUploadTalentImageMutation();

  const [inverseDisplayCount, setInverseDisplayCount] = useState(8);
  const [editingId, setEditingId] = useState(null);
  const fileInputRefs = useRef({});

  useEffect(() => {
    if (settingsResp?.data) {
      setInverseDisplayCount(settingsResp.data.inverseDisplayCount ?? 8);
    }
  }, [settingsResp]);

  const talents = talentResp?.items || talentResp?.data || [];

  const sortedTalents = useMemo(() => {
    return [...talents].sort((a, b) => {
      if (a.featured_in_inverse && !b.featured_in_inverse) return -1;
      if (!a.featured_in_inverse && b.featured_in_inverse) return 1;
      return (a.inverse_order ?? 0) - (b.inverse_order ?? 0);
    });
  }, [talents]);

  const handleToggleFeatured = async (talent) => {
    try {
      await updateFeatured({
        id: talent._id,
        featured_in_inverse: !talent.featured_in_inverse,
      }).unwrap();
      toast.success("Updated");
      refetchTalents();
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  const handleOrderChange = async (talent, value) => {
    try {
      await updateFeatured({
        id: talent._id,
        inverse_order: Number(value) || 0,
      }).unwrap();
      refetchTalents();
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  const handlePickImage = (id) => {
    fileInputRefs.current[id]?.click();
  };

  const handleImageChange = async (talent, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setEditingId(talent._id);
      const formData = new FormData();
      formData.append("image", file);
      await uploadImage({ id: talent._id, formData }).unwrap();
      toast.success("Image updated");
      refetchTalents();
    } catch (err) {
      toast.error(err?.data?.message || "Upload failed");
    } finally {
      setEditingId(null);
    }
  };

  const handleSaveCount = async () => {
    try {
      await updateSettings({
        inverseDisplayCount: Number(inverseDisplayCount) || 0,
      }).unwrap();
      toast.success("Display count updated");
      refetchSettings();
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  return (
    <div className="text-white space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Inverse Featured Talents</h1>
        <p className="text-gray-400 text-sm">
          Pick which talents appear in the home Inverse section, set their
          display order, update their images and limit the total shown.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-end justify-between bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="flex-1">
          <label className="block text-sm text-gray-400 mb-1">
            Total to display
          </label>
          <input
            type="number"
            min={0}
            max={100}
            value={inverseDisplayCount}
            onChange={(e) => setInverseDisplayCount(e.target.value)}
            className="bg-white/5 border border-white/10 rounded px-3 py-2 text-white w-32"
          />
        </div>
        <button
          type="button"
          disabled={isSavingSettings}
          onClick={handleSaveCount}
          className="bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black font-medium py-2 px-5 rounded-md cursor-pointer hover:brightness-110 disabled:opacity-60"
        >
          {isSavingSettings ? "Saving..." : "Save Count"}
        </button>
      </div>

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
              <th className="text-left px-4 py-3">Symbol</th>
              <th className="text-left px-4 py-3">Featured</th>
              <th className="text-left px-4 py-3 w-24">Order</th>
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
            ) : sortedTalents.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400">
                  No talents found
                </td>
              </tr>
            ) : (
              sortedTalents.map((t) => (
                <tr key={t._id}>
                  <td className="px-4 py-3">
                    {t.image ? (
                      <img
                        src={imgSrc(t.image)}
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover border border-white/10"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xs text-gray-400">
                        N/A
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium">{t.name}</td>
                  <td className="px-4 py-3 text-gray-400">{t.symbol}</td>
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={!!t.featured_in_inverse}
                      disabled={isSavingFeatured}
                      onChange={() => handleToggleFeatured(t)}
                      className="w-4 h-4 accent-[#a18a3f]"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      defaultValue={t.inverse_order ?? 0}
                      onBlur={(e) => handleOrderChange(t, e.target.value)}
                      className="bg-white/5 border border-white/10 rounded px-2 py-1 text-white w-20"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      ref={(el) => (fileInputRefs.current[t._id] = el)}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(t, e)}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => handlePickImage(t._id)}
                      disabled={isUploading && editingId === t._id}
                      className="text-xs px-3 py-1.5 bg-white/10 hover:bg-white/15 rounded cursor-pointer disabled:opacity-60"
                    >
                      {isUploading && editingId === t._id
                        ? "Uploading..."
                        : "Change Image"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminInverseFeatured;
