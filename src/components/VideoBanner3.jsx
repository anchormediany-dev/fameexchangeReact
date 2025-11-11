import React, { useRef, useState, useEffect } from "react";
import { GoMute, GoUnmute } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa6";
import { FaPlay, FaPause, FaTimes } from "react-icons/fa";

const VideoBanner = () => {
  const videoRef = useRef(null);
  const popupVideoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showUnmuteButton, setShowUnmuteButton] = useState(false);
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const [isPopupVideoPlaying, setIsPopupVideoPlaying] = useState(false);
  const FRONTEND_BASE_URL = import.meta.env.VITE_FRONTEND_URL;

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const playVideo = async () => {
        try {
          await video.play();
          setIsVideoPlaying(true);
          setTimeout(() => {
            setShowUnmuteButton(true);
          }, 2000);
        } catch (error) {
          console.log("Auto-play was prevented:", error);
          setIsVideoPlaying(false);
        }
      };

      video.addEventListener("loadeddata", playVideo);
      video.addEventListener("canplay", playVideo);

      return () => {
        video.removeEventListener("loadeddata", playVideo);
        video.removeEventListener("canplay", playVideo);
      };
    }
  }, []);

  // Handle popup video
  useEffect(() => {
    const popupVideo = popupVideoRef.current;

    const handleVideoEnd = () => {
      // Automatically restart the video when it ends
      if (popupVideo) {
        popupVideo.currentTime = 0;
        popupVideo
          .play()
          .then(() => {
            setIsPopupVideoPlaying(true);
          })
          .catch((error) => {
            console.log("Video restart failed:", error);
          });
      }
    };

    if (popupVideo && showVideoPopup) {
      popupVideo.currentTime = 0;
      popupVideo.loop = false; // We handle loop manually

      const playPopupVideo = async () => {
        try {
          await popupVideo.play();
          setIsPopupVideoPlaying(true);
        } catch (error) {
          console.log("Popup video play failed:", error);
        }
      };

      // Add event listener for video end
      popupVideo.addEventListener("ended", handleVideoEnd);

      playPopupVideo();
    }

    // Cleanup event listener
    return () => {
      if (popupVideo) {
        popupVideo.removeEventListener("ended", handleVideoEnd);
      }
    };
  }, [showVideoPopup]);

  const handlePlayPause = async () => {
    const video = videoRef.current;
    if (video) {
      if (isVideoPlaying) {
        video.pause();
        setIsVideoPlaying(false);
      } else {
        try {
          await video.play();
          setIsVideoPlaying(true);
        } catch (error) {
          console.log("Play failed:", error);
        }
      }
    }
  };

  const handleUnmute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      setIsMuted(false);
      setShowUnmuteButton(true);
    }
  };

  const handleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      setIsMuted(true);
      setShowUnmuteButton(true);
    }
  };

  const handleWatchDemo = () => {
    setShowVideoPopup(true);
    setIsPopupVideoPlaying(true);
  };

  const handleClosePopup = () => {
    const popupVideo = popupVideoRef.current;
    if (popupVideo) {
      popupVideo.pause();
      setIsPopupVideoPlaying(false);
    }
    setShowVideoPopup(false);
  };

  const handlePopupPlayPause = async () => {
    const popupVideo = popupVideoRef.current;
    if (popupVideo) {
      if (isPopupVideoPlaying) {
        popupVideo.pause();
        setIsPopupVideoPlaying(false);
      } else {
        try {
          await popupVideo.play();
          setIsPopupVideoPlaying(true);
        } catch (error) {
          console.log("Popup play failed:", error);
        }
      }
    }
  };

  // Close popup when clicking outside the video
  const handlePopupBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClosePopup();
    }
  };

  return (
    <div>
      <section
        className="relative w-full h-[85vh] min-h-[600px] max-h-[900px] overflow-hidden"
        // style={{ backgroundColor: "#171717" }}
      >
        {/* Video Background with Audio */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          autoPlay
          muted={isMuted}
          loop
          playsInline
          preload="metadata"
          onPlay={() => setIsVideoPlaying(true)}
          onPause={() => setIsVideoPlaying(false)}
        >
          <source
            src={`${FRONTEND_BASE_URL}/FAME-VIDEO-2024.mp4`}
            type="video/mp4"
          />
        </video>

        {/* Mute/Unmute Button - Bottom Right */}
        {showUnmuteButton && !isMuted && (
          <button
            onClick={handleMute}
            className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-cyan-400/60 group"
            title="Mute video"
          >
            <GoMute className="text-sm sm:text-base" />
            <span className="text-xs sm:text-sm font-medium">Mute</span>
          </button>
        )}

        {/* Main Content */}
        <div className="relative z-10 flex items-center justify-center w-full h-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center text-white max-w-5xl mx-auto w-full">
            {/* Modern Badge */}
            <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6 bg-gray-800/40 backdrop-blur-md rounded-full border border-gray-600/30 animate-fade-in-up shadow-xl">
              <span className="text-xs sm:text-sm font-medium text-gray-200 tracking-wide">
                FAME EXCHANGE
              </span>
            </div>

            {/* Animated Main Title */}
            <div className="mb-4 sm:mb-6 md:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                <span className="block animate-text-reveal bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent drop-shadow-2xl mb-1 sm:mb-2">
                  The Fame Exchange
                </span>
                <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 font-light animate-text-reveal-delayed tracking-wide mt-2 sm:mt-3">
                  First-of-its-Kind Trading Platform
                </span>
                <span className="block text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 font-light animate-text-reveal-delayed-2 mt-1 sm:mt-2">
                  for Entertainment & Sports
                </span>
              </h1>
            </div>

            {/* Enhanced Subtitle with typing effect */}
            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 sm:mb-8 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed animate-typewriter font-light px-2">
              Transform your passion into profit. Invest in celebrities,
              athletes, and creators like never before.
            </p>

            {/* Modern Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center animate-slide-up-stagger px-2">
              {/* Primary CTA Button */}
              <button className="custom-button-two rounded-full w-full sm:w-auto min-w-[200px] px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Trading Now
                  <FaArrowRight className="text-xs sm:text-sm" />
                </span>
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl" />
                <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              {/* Watch Demo Button - Opens Video Popup */}
              <button
                onClick={handleWatchDemo}
                className="group px-6 py-3 sm:px-8 sm:py-4 border-2 cursor-pointer border-gray-600/50 text-gray-200 hover:text-white font-medium rounded-full transform transition-all duration-500 hover:scale-105 hover:bg-gray-800/30 focus:outline-none focus:ring-4 focus:ring-gray-500/30 w-full sm:w-auto text-sm sm:text-base min-w-[160px] sm:min-w-[200px] backdrop-blur-sm"
              >
                <span className="flex items-center justify-center gap-2">
                  Watch Demo
                  <FaPlay className="text-xs sm:text-sm" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Keep all the existing styles */}
        <style jsx>{`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes text-reveal {
            0% {
              opacity: 0;
              transform: translateY(40px) scale(0.9);
            }
            60% {
              opacity: 0.8;
              transform: translateY(10px) scale(1.02);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes typewriter {
            from {
              width: 0;
            }
            to {
              width: 100%;
            }
          }

          @keyframes pulse-glow {
            0%,
            100% {
              opacity: 1;
              box-shadow: 0 0 5px currentColor;
            }
            50% {
              opacity: 0.6;
              box-shadow: 0 0 15px currentColor;
            }
          }

          .animate-fade-in-up {
            animation: fade-in-up 1.2s ease-out;
          }

          .animate-text-reveal {
            animation: text-reveal 1.5s ease-out;
          }

          .animate-text-reveal-delayed {
            animation: text-reveal 1.5s ease-out 0.3s both;
          }

          .animate-text-reveal-delayed-2 {
            animation: text-reveal 1.5s ease-out 0.6s both;
          }

          .animate-typewriter {
            animation: text-reveal 2s ease-out 0.9s both;
          }

          .animate-slide-up-stagger {
            animation: text-reveal 1.8s ease-out 1.2s both;
          }

          .animate-pulse-glow {
            animation: pulse-glow 2s ease-in-out infinite;
          }

          /* Mobile-specific adjustments */
          @media (max-width: 640px) {
            .custom-button-two {
              padding: 12px 24px;
              font-size: 14px;
            }
          }

          @media (max-width: 480px) {
            .text-2xl {
              font-size: 1.5rem;
              line-height: 1.2;
            }

            .text-lg {
              font-size: 1rem;
            }

            .text-base {
              font-size: 0.875rem;
            }
          }
        `}</style>
      </section>

      {/* Video Popup Modal */}
      {showVideoPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md transition-all duration-300 p-4"
          onClick={handlePopupBackdropClick}
        >
          <div className="relative w-full max-w-4xl lg:max-w-6xl xl:max-w-[1580px] mx-auto aspect-video bg-black rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
            {/* Close Button */}
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-30 p-2 sm:p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 cursor-pointer group"
              title="Close video"
            >
              <FaTimes className="text-lg sm:text-xl group-hover:scale-110 transition-transform" />
            </button>

            {/* Popup Video */}
            <video
              ref={popupVideoRef}
              className="w-full h-full object-contain"
              controls={false}
              muted={false}
              loop={false}
              playsInline
            >
              <source
                src={`${FRONTEND_BASE_URL}/FAME-VIDEO-2024.mp4`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            {/* Popup Play/Pause Overlay Button - Shows when video is paused */}
            {!isPopupVideoPlaying && (
              <button
                onClick={handlePopupPlayPause}
                className="absolute inset-0 z-20 flex items-center justify-center w-full h-full bg-black/30 backdrop-blur-sm transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-md border border-white/30 transition-all duration-300 group">
                  <FaPlay className="text-white text-2xl sm:text-3xl ml-1 group-hover:scale-110 transition-transform" />
                </div>
              </button>
            )}

            {/* Popup Play/Pause Control */}
            <button
              onClick={handlePopupPlayPause}
              className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 z-30 flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 cursor-pointer group"
            >
              {isPopupVideoPlaying ? (
                <>
                  <FaPause className="text-sm sm:text-lg" />
                  <span className="text-xs sm:text-sm font-medium">Pause</span>
                </>
              ) : (
                <>
                  <FaPlay className="text-sm sm:text-lg" />
                  <span className="text-xs sm:text-sm font-medium">Play</span>
                </>
              )}
            </button>

            {/* Video Title */}
            <div className="absolute top-3 left-3 sm:top-6 sm:left-6 z-30">
              <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-black/50 backdrop-blur-md rounded-full border border-primary">
                <span className="text-xs sm:text-sm font-medium text-primary tracking-wide">
                  FAME EXCHANGE
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoBanner;
