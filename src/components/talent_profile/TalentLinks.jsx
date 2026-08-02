import {
  FaYoutube,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaSnapchatGhost,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const TalentLinks = ({ userData: user }) => {
  const root = user?.data ?? user ?? {};
  const profile = root?.profile || {};
  const sm = root?.networth?.[0]?.socialMedia || root?.socialMedia || {};

  // Prefer signup-saved profile.social_* values, fall back to networth
  // socialMedia URLs and finally any top-level social_* fields.
  const pick = (smKey, profKey) =>
    profile?.[profKey] || root?.[profKey] || sm?.[smKey]?.url || "";

  const youtube = pick("youtube", "social_youtube");
  const facebook = pick("facebook", "social_facebook");
  const instagram = pick("instagram", "social_insta");
  const snapchat = pick("snapchat", "social_snap");
  const tiktok = pick("tiktok", "social_tiktok");
  const x = pick("twitter", "social_twitter");

  const socialLinks = [
    youtube && {
      name: "YouTube",
      icon: <FaYoutube />,
      url: youtube,
    },
    facebook && {
      name: "Facebook",
      icon: <FaFacebook />,
      url: facebook,
    },
    instagram && {
      name: "Instagram",
      icon: <FaInstagram />,
      url: instagram,
    },
    tiktok && {
      name: "TikTok",
      icon: <FaTiktok />,
      url: tiktok,
    },
    snapchat && {
      name: "Snapchat",
      icon: <FaSnapchatGhost />,
      url: snapchat,
    },
    x && {
      name: "X",
      icon: <FaXTwitter />,
      url: x,
    },
  ].filter(Boolean);

  return (
    <div className="bg-[#1f1f1f] rounded-xl p-6">
      <div className="flex items-center mb-6">
        <FaExternalLinkAlt className="text-yellow-400 text-2xl mr-2" />
        <h2 className="text-lg font-semibold text-white uppercase">
          Talent Links
        </h2>
      </div>
      <div className="space-y-4">
        {socialLinks?.length > 0 ? (
          socialLinks?.map((link, index) => (
            <div
              key={index}
              className="flex justify-between items-center space-x-3 bg-[#2a2a2a] text-sm text-gray-300 p-4 rounded-md border border-gray-600 hover:bg-[#333] transition duration-200"
            >
              <div className="flex items-center space-x-4">
                <span className="text-yellow-400">{link?.icon}</span>
                <span>{link?.name}:</span>
                <a
                  href={link?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition duration-200 whitespace-nowrap"
                >
                  {link?.url}
                </a>
              </div>
              <a
                href={link?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition duration-200 whitespace-nowrap"
              >
                Visit
              </a>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center py-4">
            No social links added yet
          </p>
        )}
      </div>
    </div>
  );
};

export default TalentLinks;
