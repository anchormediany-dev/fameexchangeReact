import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FaYoutube,
  FaTwitter,
  FaTiktok,
  FaFacebook,
  FaInstagram,
  FaSnapchatGhost,
} from "react-icons/fa";
import { useUpdateSocialProfilesMutation } from "../../app/authApi";

const fields = [
  { key: "social_youtube", label: "YouTube", Icon: FaYoutube, smKey: "youtube" },
  { key: "social_twitter", label: "Twitter / X", Icon: FaTwitter, smKey: "twitter" },
  { key: "social_tiktok", label: "TikTok", Icon: FaTiktok, smKey: "tiktok" },
  { key: "social_facebook", label: "Facebook", Icon: FaFacebook, smKey: "facebook" },
  { key: "social_insta", label: "Instagram", Icon: FaInstagram, smKey: "instagram" },
  { key: "social_snap", label: "Snapchat", Icon: FaSnapchatGhost, smKey: "snapchat" },
];

const initialFromUserData = (userData) => {
  const root = userData?.data ?? userData ?? {};
  const sm = root?.networth?.[0]?.socialMedia || root?.socialMedia || {};
  return fields.reduce((acc, f) => {
    acc[f.key] = root?.[f.key] || sm?.[f.smKey]?.url || "";
    return acc;
  }, {});
};

const SocialProfilesEditor = ({ userData }) => {
  const [updateSocialProfiles, { isLoading }] = useUpdateSocialProfilesMutation();
  const [values, setValues] = useState(() => initialFromUserData(userData));

  // Re-sync if upstream data refreshes (e.g. after recalc)
  useEffect(() => {
    setValues(initialFromUserData(userData));
  }, [userData]);

  const handleChange = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    // Send only non-empty values; backend treats empty as clearing optional too.
    const body = Object.fromEntries(
      Object.entries(values).map(([k, v]) => [k, String(v).trim()])
    );
    try {
      await updateSocialProfiles(body).unwrap();
      toast.success("Social profiles updated");
    } catch (err) {
      toast.error(
        err?.data?.message || err?.error || "Failed to update social profiles"
      );
    }
  };

  return (
    <form
      onSubmit={handleSave}
      className="bg-[#1f1f1f] rounded-xl p-5 space-y-4 border border-[#2a2a2a]"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-white text-base font-semibold">
          Manage Social Profiles
        </h3>
        <span className="text-[11px] text-gray-500">All fields optional</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {fields.map(({ key, label, Icon }) => (
          <label key={key} className="block">
            <span className="block text-[11px] uppercase tracking-wider text-gray-400 mb-1">
              {label}
            </span>
            <div className="flex items-center gap-2 bg-[#171717] border border-[#2a2a2a] rounded-lg px-3 py-2">
              <Icon className="text-gray-400 flex-shrink-0" />
              <input
                type="url"
                value={values[key]}
                onChange={handleChange(key)}
                placeholder={`https://...`}
                className="bg-transparent outline-none text-white text-sm w-full placeholder:text-gray-600"
              />
            </div>
          </label>
        ))}
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#a38b41] hover:bg-[#8a7738] text-white font-semibold text-sm px-5 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? "Saving…" : "Save Social Profiles"}
        </button>
      </div>
    </form>
  );
};

export default SocialProfilesEditor;
