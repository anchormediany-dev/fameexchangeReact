import { FiPlayCircle } from "react-icons/fi";
import { FAME_TEAM_VIDEO_URL } from "../../../config/futuresConfig";

const DIRECT_VIDEO_EXT = /\.(mp4|mov|webm|m4v)(\?.*)?$/i;

export default function TeamIntroVideo() {
  if (!FAME_TEAM_VIDEO_URL) {
    return (
      <div className="rounded-2xl border border-[#2a2a2a] bg-[#191919] aspect-video flex flex-col items-center justify-center mb-6 text-center px-4">
        <FiPlayCircle className="text-[#a38b41] mb-2" size={32} />
        <p className="text-white font-semibold text-sm">Video coming soon</p>
        <p className="text-gray-500 text-xs mt-1">
          Once you share the explainer video URL, it'll play right here.
        </p>
      </div>
    );
  }

  const isDirect = DIRECT_VIDEO_EXT.test(FAME_TEAM_VIDEO_URL);

  return (
    <div className="rounded-2xl border border-[#2a2a2a] bg-black overflow-hidden mb-6 aspect-video">
      {isDirect ? (
        <video src={FAME_TEAM_VIDEO_URL} controls className="w-full h-full object-cover" />
      ) : (
        <iframe
          src={FAME_TEAM_VIDEO_URL}
          title="Meet Your Fame Team"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
}
