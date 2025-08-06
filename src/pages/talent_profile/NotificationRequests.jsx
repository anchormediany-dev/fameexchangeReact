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
import { getTimeAgo } from "../../utils/getTimeAgo";
import { useGetNotificationsQuery } from "../../app/authApi";
export default function NotificationTalentLayout({ userData }) {
  const user = userData?.user || {};
  const userId = user?._id;
  const {
    data: notificationData,
    isLoading,
    isError,
    error,
  } = useGetNotificationsQuery(userId, {
    skip: !userId,
  });
  const notifications = notificationData?.data || [];
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
                      {notification.description}
                    </span>
                  </div>

                  <div>
                    {" "}
                    <div className="flex-shrink-0">
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {getTimeAgo(notification.datetime)}
                      </span>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {new Date(notification.datetime).toLocaleDateString()}
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
