import {
  FaYoutube,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaSnapchatGhost,
  FaDiscord,
  FaReddit,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const TalentLinksFan = ({ userData }) => {
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
          {userData?.data?.profile?.social_facebook ||
          userData?.data?.profile?.social_insta ||
          userData?.data?.profile?.social_snap ||
          userData?.data?.profile?.social_tiktok ||
          userData?.data?.profile?.social_twitter ||
          userData?.data?.profile?.social_youtube ? (
            <>
              {/* Youtube */}
              <div className="flex justify-between items-center space-x-3 bg-[#2a2a2a] text-sm text-gray-300 p-4 rounded-md border border-gray-600 hover:bg-[#333] transition duration-200">
                <div className="flex items-center space-x-4">
                  <span className="text-yellow-400">
                    <FaYoutube />
                  </span>
                  <span>Youtube:</span>
                  <a
                    href={userData?.data?.profile?.social_youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition duration-200 whitespace-nowrap"
                  >
                    {userData?.data?.profile?.social_youtube}
                  </a>
                </div>
                <a
                  href={userData?.data?.profile?.social_youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition duration-200 whitespace-nowrap"
                >
                  Visit
                </a>
              </div>
              {/* Facebook */}
              <div className="flex justify-between items-center space-x-3 bg-[#2a2a2a] text-sm text-gray-300 p-4 rounded-md border border-gray-600 hover:bg-[#333] transition duration-200">
                <div className="flex items-center space-x-4">
                  <span className="text-yellow-400">
                    <FaFacebook />
                  </span>
                  <span>Facebook</span>
                  <a
                    href={userData?.data?.profile?.social_facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition duration-200 whitespace-nowrap"
                  >
                    {userData?.data?.profile?.social_facebook}
                  </a>
                </div>
                <a
                  href={userData?.data?.profile?.social_facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition duration-200 whitespace-nowrap"
                >
                  Visit
                </a>
              </div>
              {/* Instagram */}
              <div className="flex justify-between items-center space-x-3 bg-[#2a2a2a] text-sm text-gray-300 p-4 rounded-md border border-gray-600 hover:bg-[#333] transition duration-200">
                <div className="flex items-center space-x-4">
                  <span className="text-yellow-400">
                    <FaInstagram />
                  </span>
                  <span>Instagram</span>{" "}
                  <a
                    href={userData?.data?.profile?.social_insta}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition duration-200 whitespace-nowrap"
                  >
                    {userData?.data?.profile?.social_insta}
                  </a>
                </div>
                <a
                  href={userData?.data?.profile?.social_insta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition duration-200 whitespace-nowrap"
                >
                  Visit
                </a>
              </div>
              {/* Tiktok */}
              <div className="flex justify-between items-center space-x-3 bg-[#2a2a2a] text-sm text-gray-300 p-4 rounded-md border border-gray-600 hover:bg-[#333] transition duration-200">
                <div className="flex items-center space-x-4">
                  <span className="text-yellow-400">
                    <FaTiktok />
                  </span>
                  <span>Tiktok</span>{" "}
                  <a
                    href={userData?.data?.profile?.social_tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition duration-200 whitespace-nowrap"
                  >
                    {userData?.data?.profile?.social_tiktok}
                  </a>
                </div>
                <a
                  href={userData?.data?.profile?.social_tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition duration-200 whitespace-nowrap"
                >
                  Visit
                </a>
              </div>
              {/* Youtube */}
              <div className="flex justify-between items-center space-x-3 bg-[#2a2a2a] text-sm text-gray-300 p-4 rounded-md border border-gray-600 hover:bg-[#333] transition duration-200">
                <div className="flex items-center space-x-4">
                  <span className="text-yellow-400">
                    <FaSnapchatGhost />
                  </span>
                  <span>Snapchat</span>{" "}
                  <a
                    href={userData?.data?.profile?.social_snap}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition duration-200 whitespace-nowrap"
                  >
                    {userData?.data?.profile?.social_snap}
                  </a>
                </div>
                <a
                  href={userData?.data?.profile?.social_snap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition duration-200 whitespace-nowrap"
                >
                  Visit
                </a>
              </div>
              {/* X */}
              <div className="flex justify-between items-center space-x-3 bg-[#2a2a2a] text-sm text-gray-300 p-4 rounded-md border border-gray-600 hover:bg-[#333] transition duration-200">
                <div className="flex items-center space-x-4">
                  <span className="text-yellow-400">
                    <FaXTwitter />
                  </span>
                  <span>X</span>
                  <a
                    href={userData?.data?.profile?.social_twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition duration-200 whitespace-nowrap"
                  >
                    {userData?.data?.profile?.social_twitter}
                  </a>
                </div>
                <a
                  href={userData?.data?.profile?.social_twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition duration-200 whitespace-nowrap"
                >
                  Visit
                </a>
              </div>
            </>
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
