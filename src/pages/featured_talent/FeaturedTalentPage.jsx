import { useRef, useState } from "react";
import { FaPlay, FaShareAlt } from "react-icons/fa";
import { FaXTwitter, FaFacebookF } from "react-icons/fa6";
import { FiLink } from "react-icons/fi";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MotionPageWrapper from "../../components/MotionPageWrapper";
import TalentLinks from "../../components/talent_profile/TalentLinks";
import { useGetFeaturedTalentQuery } from "../../app/authApi";
import { imgSrc } from "../../utils/imgSrc";
import { handleImageError } from "../../utils/imagePlaceholder";
import { openExternal } from "../../utils/nativeLinks";

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
    <div className="relative w-full aspect-square sm:aspect-[4/5] bg-black rounded-2xl overflow-hidden border border-[#2a2a2a]">
      <video
        ref={videoRef}
        className="w-full h-full object-cover bg-black"
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

function OnBlastShare({ talentName }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Check out ${talentName || "this talent"} on The Fame Exchange`;

  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: shareText, url: shareUrl });
      } catch {
        // user canceled the native share sheet — not an error
      }
      return;
    }
    setMenuOpen((v) => !v);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied!");
    } catch {
      toast.error("Couldn't copy the link — please copy it manually.");
    }
    setMenuOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={handleShareClick}
        className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#F3BA18]/40 text-[#F3BA18] font-semibold text-sm hover:bg-[#F3BA18]/10 transition-colors cursor-pointer"
      >
        <FaShareAlt />
        On Blast
      </button>

      {menuOpen && (
        <div className="absolute z-20 mt-2 bg-[#1f1f1f] border border-[#333] rounded-xl p-2 flex flex-col gap-1 min-w-[180px] shadow-xl">
          <button
            type="button"
            onClick={() => {
              openExternal(
                `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  shareText
                )}&url=${encodeURIComponent(shareUrl)}`
              );
              setMenuOpen(false);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white hover:bg-white/10 text-left cursor-pointer"
          >
            <FaXTwitter /> Share on X
          </button>
          <button
            type="button"
            onClick={() => {
              openExternal(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
              );
              setMenuOpen(false);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white hover:bg-white/10 text-left cursor-pointer"
          >
            <FaFacebookF /> Share on Facebook
          </button>
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white hover:bg-white/10 text-left cursor-pointer"
          >
            <FiLink /> Copy Link
          </button>
        </div>
      )}
    </div>
  );
}

export default function FeaturedTalentPage() {
  const { data, isLoading } = useGetFeaturedTalentQuery();
  const talent = data?.data;

  const displayName = talent?.profile?.name || talent?.profile?.full_name || talent?.name;
  const isTradeable = talent?.tier === "tradeable";

  // Highlight reel > their real social avatar (YouTube-only today) >
  // their uploaded profile image > imgSrc's own generic placeholder.
  const fallbackImage = imgSrc(talent?.social_avatar_url || talent?.image);

  return (
    <MotionPageWrapper>
      <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-white">
        <Navbar />

        <main className="flex-grow pt-32 lg:pt-36 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
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
              <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
                {/* Media column */}
                <div className="lg:col-span-2">
                  {talent.highlight_reel_url ? (
                    <HighlightReelPlayer
                      videoUrl={talent.highlight_reel_url}
                      posterUrl={talent.highlight_reel_thumbnail_url || fallbackImage}
                    />
                  ) : (
                    <div className="rounded-2xl overflow-hidden aspect-square sm:aspect-[4/5] bg-[#111111] border border-[#2a2a2a]">
                      <img
                        src={fallbackImage}
                        alt={displayName}
                        onError={handleImageError}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Bio column — gets the majority of the visual room */}
                <div className="lg:col-span-3 space-y-6">
                  <div>
                    <p className="custom-heading-four text-[#a38b41] text-lg mb-2">
                      Featured Talent
                    </p>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
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

                  {talent.description && (
                    <div className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-6">
                      <h2 className="text-white font-semibold mb-3">About</h2>
                      <p className="text-gray-300 leading-relaxed whitespace-pre-line text-base">
                        {talent.description}
                      </p>
                    </div>
                  )}

                  <OnBlastShare talentName={displayName} />

                  <TalentLinks userData={{ data: talent }} />
                </div>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </MotionPageWrapper>
  );
}
