import {
  FaYoutube,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaSnapchatGhost,
  FaDiscord,
  FaTwitter,
  FaReddit,
  FaExternalLinkAlt,
} from "react-icons/fa";

const TalentLinksFan = ({ userData: user }) => {
  const socialLinks = [
    user?.user?.social_youtube && {
      name: "YouTube",
      icon: <FaYoutube />,
      url: user?.user?.social_youtube,
    },
    user?.user?.social_facebook && {
      name: "Facebook",
      icon: <FaFacebook />,
      url: user?.user?.social_facebook,
    },
    user?.user?.social_insta && {
      name: "Instagram",
      icon: <FaInstagram />,
      url: user?.user?.social_insta,
    },
    user?.user?.social_tiktok && {
      name: "TikTok",
      icon: <FaTiktok />,
      url: user?.user?.social_tiktok,
    },
    user?.user?.social_snap && {
      name: "Snapchat",
      icon: <FaSnapchatGhost />,
      url: user?.user?.social_snap,
    },
    user?.user?.social_twitter && {
      name: "Twitter",
      icon: <FaTwitter />,
      url: user?.user?.social_twitter,
    },
  ].filter(Boolean);

  return (
    <section className="flex flex-col w-full justify-center">
      {" "}
      <div className="bg-[#1f1f1f] rounded-xl p-6 ">
        <div className="flex items-center mb-6">
          <FaExternalLinkAlt className="text-yellow-400 text-2xl mr-2" />
          <h2 className="text-lg font-semibold text-white uppercase">
            Talent Links
          </h2>
        </div>
        <div className="space-y-4">
          {socialLinks.length > 0 ? (
            socialLinks.map((link, index) => (
              <div
                key={index}
                className="flex justify-between items-center space-x-3 bg-[#2a2a2a] text-sm text-gray-300 p-4 rounded-md border border-gray-600 hover:bg-[#333] transition duration-200"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-yellow-400">{link.icon}</span>
                  <span>{link.name}</span>
                </div>
                <a
                  href={link.url}
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
    </section>
  );
};

export default TalentLinksFan;
