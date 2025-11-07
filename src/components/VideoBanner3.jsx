import React, { useRef, useState, useEffect } from "react";
import { GoMute, GoUnmute } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa6";
import { FaPlay, FaPause } from "react-icons/fa";

const VideoBanner = () => {
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true); // Default to playing
  const [isMuted, setIsMuted] = useState(true); // Start muted for autoplay
  const [showUnmuteButton, setShowUnmuteButton] = useState(false);
  const FRONTEND_BASE_URL = import.meta.env.VITE_FRONTEND_URL;

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      // Force play the video on component mount
      const playVideo = async () => {
        try {
          await video.play();
          setIsVideoPlaying(true);

          // Show unmute button after video starts playing
          setTimeout(() => {
            setShowUnmuteButton(true);
          }, 2000);
        } catch (error) {
          console.log("Auto-play was prevented:", error);
          setIsVideoPlaying(false);
        }
      };

      // Add event listeners
      video.addEventListener("loadeddata", playVideo);
      video.addEventListener("canplay", playVideo);

      return () => {
        video.removeEventListener("loadeddata", playVideo);
        video.removeEventListener("canplay", playVideo);
      };
    }
  }, []);

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

  return (
    <section
      className="relative w-full h-[80vh] min-h-[500px] mt-10 lg:mt-16 max-h-[700px] overflow-hidden"
      style={{ backgroundColor: "#171717" }}
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
      {showUnmuteButton && isMuted && (
        <button
          onClick={handleUnmute}
          className="absolute bottom-6 right-6 z-20 flex items-center gap-2 px-4 py-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-cyan-400/60 group"
          title="Unmute video"
        >
          <GoUnmute />
          <span className="text-sm font-medium">Unmute</span>
        </button>
      )}

      {showUnmuteButton && !isMuted && (
        <button
          onClick={handleMute}
          className="absolute bottom-6 right-6 z-20 flex items-center gap-2 px-4 py-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-cyan-400/60 group"
          title="Mute video"
        >
          <GoMute />
          <span className="text-sm font-medium">Mute</span>
        </button>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-white max-w-5xl mx-auto">
          {/* Modern Badge */}
          <div
            className="inline-flex items-center px-4 py-2 mb-6 bg-gray-800/40 backdrop-blur-md rounded-full border
           border-gray-600/30 animate-fade-in-up shadow-xl"
          >
            <span className="text-sm font-medium text-gray-200 tracking-wide">
              FAME EXCHANGE
            </span>
          </div>

          {/* Animated Main Title */}
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="block animate-text-reveal bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent drop-shadow-2xl mb-2">
                The Fame Exchange
              </span>
              <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-300 font-light animate-text-reveal-delayed tracking-wide">
                First-of-its-Kind Trading Platform
              </span>
              <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-400 font-light animate-text-reveal-delayed-2 mt-1">
                for Entertainment & Sports
              </span>
            </h1>
          </div>

          {/* Enhanced Subtitle with typing effect */}
          <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-typewriter font-light">
            Transform your passion into profit. Invest in celebrities, athletes,
            and creators like never before.
          </p>

          {/* Modern Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center animate-slide-up-stagger">
            {/* Primary CTA Button */}
            <button className="custom-button-two rounded-full">
              <span className="relative z-10 flex items-center justify-center">
                Start Trading Now
                <FaArrowRight />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl" />
              <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            {/* Play/Pause Video Button - In the main button group */}
            <button
              onClick={handlePlayPause}
              className="group px-8 py-4 border-2 cursor-pointer border-gray-600/50 hover:border-cyan-400/60 text-gray-200 hover:text-white font-medium rounded-full transform transition-all duration-500 hover:scale-105 hover:bg-gray-800/30 focus:outline-none focus:ring-4 focus:ring-gray-500/30 w-full sm:w-auto text-base min-w-[200px] backdrop-blur-sm"
            >
              <span className="flex items-center justify-center">
                {isVideoPlaying ? "Pause Video" : "Play Video"}
                {isVideoPlaying ? (
                  <FaPause className="ml-3" />
                ) : (
                  <FaPlay className="ml-3" />
                )}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Modern Corner Decorations */}
      <div className="absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 border-l-2 border-t-2 border-gray-600/40" />
      <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 border-r-2 border-t-2 border-gray-600/40" />
      <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 border-l-2 border-b-2 border-gray-600/40" />
      <div className="absolute bottom-0 right-0 w-12 h-12 sm:w-16 sm:h-16 border-r-2 border-b-2 border-gray-600/40" />

      {/* Video Status Indicator */}
      {isVideoPlaying && (
        <div className="absolute top-8 right-4 flex items-center px-4 py-2 bg-gray-800/60 backdrop-blur-md rounded-full border border-cyan-400/30 shadow-lg">
          <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse-glow" />
          <span className="text-sm text-cyan-300 font-medium tracking-wide">
            PLAYING
          </span>
        </div>
      )}

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
      `}</style>
    </section>
  );
};

export default VideoBanner;
