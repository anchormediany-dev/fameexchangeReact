import { useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MotionPageWrapper from "../../components/MotionPageWrapper";
import TalentLinks from "../../components/talent_profile/TalentLinks";
import { useGetFeaturedTalentQuery } from "../../app/authApi";
import { imgSrc } from "../../utils/imgSrc";
import { handleImageError } from "../../utils/imagePlaceholder";

function HighlightReelPlayer({ videoUrl, posterUrl }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-[#2a2a2a]">
      <video
        ref={videoRef}
        className="w-full h-full object-contain bg-black"
        controls={isPlaying}
        poster={posterUrl}
        playsInline
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onEnded={() => setIsPlaying(false)}
      >
        <source src={videoUrl} />
        Your browser does not support the video tag.
      </video>

      {!isPlaying && (
        <button
          type="button"
          onClick={togglePlay}
          className="absolute inset-0 z-10 flex items-center justify-center w-full h-full bg-black/30 hover:bg-black/40 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-md border border-white/30 transition-all group">
            <FaPlay className="text-white text-2xl sm:text-3xl ml-1 group-hover:scale-110 transition-transform" />
          </div>
        </button>
      )}
    </div>
  );
}

export default function FeaturedTalentPage() {
  const { data, isLoading } = useGetFeaturedTalentQuery();
  const talent = data?.data;

  const displayName = talent?.profile?.name || talent?.profile?.full_name || talent?.name;
  const isTradeable = talent?.tier === "tradeable";

  return (
    <MotionPageWrapper>
      <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-white">
        <Navbar />

        <main className="flex-grow pt-32 lg:pt-36 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            {isLoading ? (
              <div className="text-center text-gray-400 py-20">Loading…</div>
            ) : !talent ? (
              <div className="text-center py-20">
                <h1 className="text-2xl font-bold text-white mb-2">
                  No Featured Talent Right Now
                </h1>
                <p className="text-gray-400">Check back soon for our next spotlight.</p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="text-center">
                  <p className="custom-heading-four text-[#a38b41] text-lg mb-2">
                    Featured Talent
                  </p>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {displayName}
                  </h1>
                  {isTradeable ? (
                    talent.fame_score != null && (
                      <p className="text-gray-400">
                        FameScore{" "}
                        <span className="text-[#F3BA18] font-semibold">
                          {talent.fame_score}
                        </span>
                      </p>
                    )
                  ) : (
                    <span className="inline-block bg-gradient-to-r from-[#a18a3f] to-[#e6ca7c] text-black text-xs font-bold px-3 py-1.5 rounded-full">
                      🎓 Graduating Soon
                    </span>
                  )}
                </div>

                {talent.highlight_reel_url ? (
                  <HighlightReelPlayer
                    videoUrl={talent.highlight_reel_url}
                    posterUrl={
                      talent.highlight_reel_thumbnail_url || imgSrc(talent.image)
                    }
                  />
                ) : (
                  <div className="rounded-2xl overflow-hidden aspect-video bg-[#111111] border border-[#2a2a2a] flex items-center justify-center">
                    <img
                      src={imgSrc(talent.image)}
                      alt={displayName}
                      onError={handleImageError}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {talent.description && (
                  <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6">
                    <h2 className="text-white font-semibold mb-3">About</h2>
                    <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                      {talent.description}
                    </p>
                  </div>
                )}

                <TalentLinks userData={{ data: talent }} />
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </MotionPageWrapper>
  );
}
