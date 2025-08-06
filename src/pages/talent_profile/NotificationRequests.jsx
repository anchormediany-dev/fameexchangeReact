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
  FaBell,
  FaExternalLinkAlt,
} from "react-icons/fa";

const notifications = [
  {
    message:
      "John Doe sent you a collaboration request for an upcoming brand campaign. Please review the details and respond by tomorrow.",
    time: "2 min ago",
    date: "2025-05-28",
    fullTime: "14:28",
  },
  {
    message:
      "Your performance report for May is ready. Download it from your dashboard to see detailed analytics and insights.",
    time: "2 hrs ago",
    date: "2025-05-28",
    fullTime: "12:30",
  },
  {
    message:
      "Brand XYZ mentioned you in their story and tagged you in a promotional post. Check it out to engage with your audience.",
    time: "15 min ago",
    date: "2025-05-28",
    fullTime: "14:15",
  },
  {
    message:
      "Reminder: Zoom meeting with GlowUp Agency at 3 PM today to discuss partnership opportunities and campaign strategies.",
    time: "30 min ago",
    date: "2025-05-28",
    fullTime: "14:00",
  },
  {
    message:
      "Congratulations! You've reached 1M followers! This is a huge milestone. Keep creating amazing content.",
    time: "1 day ago",
    date: "2025-05-27",
    fullTime: "14:30",
  },
  {
    message:
      "New comment on your latest reel: 'Amazing content! Love your style and energy. Keep it up!'",
    time: "1 week ago",
    date: "2025-05-28",
    fullTime: "13:30",
  },
];

// const socialLinks = [
//   { name: "YouTube", icon: <FaYoutube />, url: "#" },
//   { name: "Facebook", icon: <FaFacebook />, url: "#" },
//   { name: "Instagram", icon: <FaInstagram />, url: "#" },
//   { name: "LinkedIn", icon: <FaLinkedin />, url: "#" },
//   { name: "TikTok", icon: <FaTiktok />, url: "#" },
//   { name: "Snapchat", icon: <FaSnapchatGhost />, url: "#" },
//   { name: "Discord", icon: <FaDiscord />, url: "#" },
//   { name: "Reddit", icon: <FaReddit />, url: "#" },
// ];

export default function NotificationTalentLayout({ userData }) {
  const user = userData?.user || {};

  const socialLinks = [
    user.social_youtube && {
      name: "YouTube",
      icon: <FaYoutube />,
      url: user.social_youtube,
    },
    user.social_facebook && {
      name: "Facebook",
      icon: <FaFacebook />,
      url: user.social_facebook,
    },
    user.social_insta && {
      name: "Instagram",
      icon: <FaInstagram />,
      url: user.social_insta,
    },
    user.social_tiktok && {
      name: "TikTok",
      icon: <FaTiktok />,
      url: user.social_tiktok,
    },
    user.social_snap && {
      name: "Snapchat",
      icon: <FaSnapchatGhost />,
      url: user.social_snap,
    },
    user.social_twitter && {
      name: "Twitter",
      icon: <FaTwitter />,
      url: user.social_twitter,
    },
  ].filter(Boolean);
  return (
    <div className="bg-[#171717] px-4 md:px-8 container text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications Column */}
        <div className="bg-[#1f1f1f] rounded-xl p-6">
          <div className="flex items-center mb-6">
            <FaBell className="text-yellow-400 text-2xl mr-2" />
            <h2 className="text-lg font-semibold text-white uppercase">
              Notification
            </h2>
          </div>

          <ul className="space-y-4">
            {notifications.map((notification, index) => (
              <li
                key={index}
                className="bg-[#2a2a2a] p-4 rounded-md border border-gray-600 hover:bg-[#333] transition duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left side: Icon and message */}
                  <div className="flex items-start space-x-3 flex-1 min-w-0">
                    <FaBell className="text-yellow-400 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-300 leading-relaxed">
                      {notification.message}
                    </span>
                  </div>

                  <div>
                    {" "}
                    <div className="flex-shrink-0">
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {notification.time}
                      </span>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {notification.date}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Talent Links Column */}
        <div className="bg-[#1f1f1f] rounded-xl p-6">
          <div className="flex items-center mb-6">
            <FaExternalLinkAlt className="text-yellow-400 text-2xl mr-2" />
            <h2 className="text-lg font-semibold text-white uppercase">
              Talent Links
            </h2>
          </div>
          <div className="space-y-4">
            {socialLinks.map((link, index) => (
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
                  className="text-blue-400 hover:text-blue-300 transition duration-200 whitespace-nowrap"
                >
                  Visit
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
