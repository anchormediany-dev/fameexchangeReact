import { useState } from "react";
import { FaYoutube } from "react-icons/fa";
import { FiExternalLink, FiPlayCircle } from "react-icons/fi";
import { useGetPodcastEpisodesQuery } from "../../app/podcastApi";
import { openExternal } from "../../utils/nativeLinks";

const FALLBACK_NAME = "FameX Podcast";
const FALLBACK_DESCRIPTION =
  "Stories from the talent, athletes, and influencers redefining what it means to be discovered.";
const INTERVIEW_URL = "https://www.famexpodcast.com";

const PodcastPage = () => {
  const { data, isLoading } = useGetPodcastEpisodesQuery();
  const channel = data?.channel;
  const episodes = data?.episodes || [];
  const channelUrl = data?.channelUrl || "https://www.youtube.com/@Famexpodcast";

  const [activeVideoId, setActiveVideoId] = useState(null);
  const featured = episodes.find((e) => e.videoId === activeVideoId) || episodes[0] || null;

  if (isLoading) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center text-gray-500 pt-20">
        Loading…
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-12 text-center sm:text-left">
          {channel?.avatar && (
            <img
              src={channel.avatar}
              alt={channel?.name || FALLBACK_NAME}
              className="w-24 h-24 rounded-full object-cover border-2 border-[#a38b41]/40 shrink-0"
            />
          )}
          <div>
            <h1 className="text-3xl sm:text-4xl font-black">{channel?.name || FALLBACK_NAME}</h1>
            <p className="text-gray-400 mt-2 max-w-2xl">
              {channel?.description || FALLBACK_DESCRIPTION}
            </p>
            <div className="flex flex-wrap gap-3 mt-4 justify-center sm:justify-start">
              <button
                type="button"
                onClick={() => openExternal(channelUrl)}
                className="custom-button-two inline-flex items-center gap-2"
              >
                <FaYoutube size={16} /> Subscribe on YouTube
              </button>
              <button
                type="button"
                onClick={() => openExternal(INTERVIEW_URL)}
                className="border border-[#a38b41]/40 text-[#a38b41] px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#a38b41]/10 transition-colors inline-flex items-center gap-2"
              >
                Be Interviewed <FiExternalLink size={14} />
              </button>
            </div>
          </div>
        </div>

        {episodes.length === 0 ? (
          <div className="border border-white/10 rounded-2xl bg-gradient-to-b from-[#161616] to-[#0f0f0f] py-20 px-6 text-center">
            <FiPlayCircle className="mx-auto text-[#a38b41] mb-4" size={40} />
            <h2 className="text-xl font-bold">No episodes yet — check back soon</h2>
            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              We're just getting started. Subscribe on YouTube to be the first to know the moment a
              new episode drops.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Featured player */}
            <div className="lg:col-span-2">
              <div className="aspect-video rounded-2xl overflow-hidden bg-black border border-white/10">
                {featured && (
                  <iframe
                    key={featured.videoId}
                    src={`https://www.youtube.com/embed/${featured.videoId}`}
                    title={featured.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
              {featured && <h2 className="text-xl font-bold mt-4">{featured.title}</h2>}
              {featured && (featured.views || featured.published) && (
                <p className="text-gray-500 text-sm mt-1">
                  {[featured.views, featured.published].filter(Boolean).join(" · ")}
                </p>
              )}
            </div>

            {/* Episode list */}
            <div className="space-y-3 lg:max-h-[600px] lg:overflow-y-auto pr-1">
              {episodes.map((ep) => (
                <button
                  key={ep.videoId}
                  type="button"
                  onClick={() => setActiveVideoId(ep.videoId)}
                  className={`w-full flex gap-3 text-left rounded-xl p-2 transition-colors ${
                    featured?.videoId === ep.videoId
                      ? "bg-[#a38b41]/15 border border-[#a38b41]/40"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <img
                    src={ep.thumbnail}
                    alt=""
                    className="w-28 aspect-video object-cover rounded-lg shrink-0 bg-[#161616]"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white line-clamp-2">{ep.title}</p>
                    {ep.published && <p className="text-xs text-gray-500 mt-1">{ep.published}</p>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PodcastPage;
