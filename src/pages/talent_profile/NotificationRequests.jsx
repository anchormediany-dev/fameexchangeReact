import {
  FaYoutube,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaSnapchatGhost,
  FaDiscord,
  FaReddit,
  FaBell,
  FaExternalLinkAlt,
} from "react-icons/fa";

const notifications = [
  "John Doe sent you a collaboration request.",
  "You have a new follower: @beauty_by_ana",
  "Brand XYZ mentioned you in their story.",
  "Reminder: Zoom meeting with GlowUp Agency at 3 PM",
  "New comment on your latest reel.",
  "Your performance report for May is ready.",
  "New message from Talent Scout Agency.",
  "Congratulations! You've reached 1M followers!",
];

const socialLinks = [
  { name: "YouTube", icon: <FaYoutube />, url: "#" },
  { name: "Facebook", icon: <FaFacebook />, url: "#" },
  { name: "Instagram", icon: <FaInstagram />, url: "#" },
  { name: "LinkedIn", icon: <FaLinkedin />, url: "#" },
  { name: "TikTok", icon: <FaTiktok />, url: "#" },
  { name: "Snapchat", icon: <FaSnapchatGhost />, url: "#" },
  { name: "Discord", icon: <FaDiscord />, url: "#" },
  { name: "Reddit", icon: <FaReddit />, url: "#" },
];

export default function NotificationTalentLayout() {
  return (
    <div className="bg-[#171717] 2xl:py-16 py-12 px-4 md:px-8 container text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications Column */}
        <div className="bg-[#1f1f1f] border border-gray-700 rounded-xl p-6 shadow-xl">
          <div className="flex items-center justify-center mb-6">
            <FaBell className="text-yellow-400 text-2xl mr-2" />
            <h2 className="text-lg font-semibold text-white uppercase">
              Notification Requests
            </h2>
          </div>

          <ul className="space-y-4">
            {notifications.map((note, index) => (
              <li
                key={index}
                className="flex items-start space-x-3 bg-[#2a2a2a] text-sm text-gray-300 p-4 rounded-md border border-gray-600 hover:bg-[#333] transition duration-200 shadow-sm"
              >
                <FaBell className="text-yellow-400 mt-1" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Talent Links Column */}
        <div className="bg-[#1f1f1f] border border-gray-700 rounded-xl p-6 shadow-xl">
          <div className="flex items-center justify-center mb-6">
            <FaExternalLinkAlt className="text-yellow-400 text-2xl mr-2" />
            <h2 className="text-lg font-semibold text-white uppercase">
              Talent Links
            </h2>
          </div>
          <div className="space-y-4">
            {socialLinks.map((link, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-[#2a2a2a] rounded-md border border-gray-600 hover:bg-[#333] transition duration-200 shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-2xl text-yellow-400">{link.icon}</span>
                  <span className="text-sm font-medium text-gray-200">
                    {link.name}
                  </span>
                </div>
                <a
                  href={link.url}
                  className="text-sm text-blue-400 hover:text-blue-300 transition duration-200"
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
