import React, { useMemo, useState, useEffect } from "react";
import { useCreateTeamMutation } from "../../../app/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddAdminTeam = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    title: "",
    // bio: "",
    isVisible: true,
    order: 0,
  });

  const [file, setFile] = useState(null);
  const [createTeam, { isLoading }] = useCreateTeamMutation();
  const [errorMsg, setErrorMsg] = useState("");

  // preview
  const previewUrl = useMemo(
    () => (file ? URL.createObjectURL(file) : ""),
    [file]
  );
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleBoolean = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.checked }));
  };

  const validate = () => {
    if (!form.name?.trim()) return "Name is required.";
    if (!form.title?.trim()) return "Title is required.";
    // if (!form.bio?.trim()) return "Bio is required.";
    return "";
  };

  const buildFormData = () => {
    const fd = new FormData();
    fd.append("name", form.name.trim());
    fd.append("title", form.title.trim());
    // fd.append("bio", form.bio.trim());
    fd.append("isVisible", String(form.isVisible));
    fd.append("order", String(Number(form.order) || 0));
    if (file) fd.append("imageUrl", file);
    return fd;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const err = validate();
    if (err) {
      setErrorMsg(err);
      return;
    }

    try {
      const formData = buildFormData();
      await createTeam(formData).unwrap();
      toast.success("Team member added!");
      // reset
      setForm({
        name: "",
        title: "",
        //  bio: "",
        isVisible: true,
        order: 0,
      });
      setFile(null);
      navigate("/admin/teams");
    } catch (err) {
      setErrorMsg(
        err?.data?.message || err?.error || "Failed to add team member"
      );
    }
  };

  const sectionTitleCls =
    "text-lg font-semibold mb-4 col-span-full gredient-text";

  return (
    <div className="bg-[#222222] p-6 rounded-2xl border border-[#333333]">
      <h2
        className="text-xl font-bold mb-6"
        style={{
          background: "linear-gradient(to right, #a38b41, #d4c374)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Add Team Member
      </h2>

      {errorMsg && (
        <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-200 rounded-xl p-3">
          {errorMsg}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Name*
            </label>
            <div className="flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d]">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Christopher Sherillo"
                className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                required
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Title*
            </label>
            <div className="flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d]">
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Lead Entertainment Counsel"
                className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                required
              />
            </div>
          </div>

          {/* Visible toggle */}
          <div className="flex items-center gap-3">
            <input
              id="isVisible"
              type="checkbox"
              name="isVisible"
              checked={form.isVisible}
              onChange={handleBoolean}
              className="rounded h-5 w-5"
            />
            <label
              htmlFor="isVisible"
              className={`text-sm ${
                form.isVisible ? "gredient-text" : "text-gray-400"
              }`}
            >
              Visible on site
            </label>
          </div>

          {/* Order */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Display Order
            </label>
            <div className="flex items-center border rounded-lg px-4 py-3 bg-[#2d2d2d]">
              <input
                type="number"
                name="order"
                value={form.order}
                onChange={handleChange}
                placeholder="0"
                className="bg-transparent outline-none w-full text-white placeholder-gray-400"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Lower numbers appear first on the public site.
            </p>
          </div>
        </div>

        {/* Bio */}
        {/* <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Biography*
            </label>
            <div className="border rounded-lg px-4 py-3 bg-[#2d2d2d]">
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows={6}
                placeholder="Write a short bio…"
                className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                required
              />
            </div>
          </div>
        </div> */}

        {/* Image */}
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Headshot (imageUrl)
            </label>
            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-[#a38b41] transition-all duration-300 group">
              <span className="text-xs text-gray-400 group-hover:text-[#a38b41] transition-colors text-center">
                Click to upload (PNG/JPG)
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>

            {previewUrl && (
              <div className="mt-3 flex items-center gap-3">
                <img
                  src={previewUrl}
                  alt="preview"
                  className="h-16 w-16 rounded-xl object-cover border border-white/10"
                />
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-red-400 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 custom-button-two text-black rounded-md font-medium hover:opacity-90 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Submitting..." : "Add Member"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAdminTeam;
