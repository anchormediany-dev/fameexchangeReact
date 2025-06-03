import React, { useRef, useState, useEffect } from "react";

const VideoBanner = () => {
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      // Force play the video
      const playVideo = async () => {
        try {
          await video.play();
          setIsVideoPlaying(true);
        } catch (error) {
          console.log("Auto-play was prevented:", error);
          // If auto-play fails, we'll still show the content
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

  return (
    <section
      className="relative w-full h-[80vh] min-h-[500px] mt-10 lg:mt-16 2xl:mt-20  max-h-[700px] overflow-hidden"
      style={{ backgroundColor: "#171717" }}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onPlay={() => setIsVideoPlaying(true)}
        onPause={() => setIsVideoPlaying(false)}
      >
        {/* Multiple video sources for better compatibility */}
        <source
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          type="video/mp4"
        />
        <source
          src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
          type="video/mp4"
        />
      </video>

      {/* Modern gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/90" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {/* Animated background elements with modern colors */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-cyan-400/8 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse-slow" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/40 rounded-full animate-float-particle" />
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-cyan-300/50 rounded-full animate-float-particle-2" />
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-white/30 rounded-full animate-float-particle-3" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-white max-w-5xl mx-auto">
          {/* Modern Badge */}
          <div className="inline-flex items-center px-4 py-2 mb-6 bg-gray-800/40 backdrop-blur-md rounded-full border border-gray-600/30 animate-fade-in-up shadow-xl">
            <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse-glow" />
            <span className="text-sm font-medium text-gray-200 tracking-wide">
              NOW LIVE • FAME EXCHANGE
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
                <svg
                  className="w-5 h-5 ml-3 transform group-hover:translate-x-2 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl" />
              <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            {/* Secondary Button */}
            <button className="group px-8 py-4 border-2 border-gray-600/50 hover:border-cyan-400/60 text-gray-200 hover:text-white font-medium rounded-full transform transition-all duration-500 hover:scale-105 hover:bg-gray-800/30 focus:outline-none focus:ring-4 focus:ring-gray-500/30 w-full sm:w-auto text-base min-w-[200px] backdrop-blur-sm">
              <span className="flex items-center justify-center">
                Watch Demo
                <svg
                  className="w-5 h-5 ml-3 group-hover:scale-110 transition-transform duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
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

      {/* Enhanced Video Status Indicator */}
      {isVideoPlaying && (
        <div className="absolute top-4 right-4 flex items-center px-4 py-2 bg-gray-800/60 backdrop-blur-md rounded-full border border-cyan-400/30 shadow-lg">
          <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse-glow" />
          <span className="text-sm text-cyan-300 font-medium tracking-wide">
            LIVE
          </span>
        </div>
      )}

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

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(-180deg);
          }
        }

        @keyframes float-particle {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-15px) translateX(10px);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-10px) translateX(-5px);
            opacity: 0.6;
          }
        }

        @keyframes float-particle-2 {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-25px) translateX(-15px);
            opacity: 0.9;
          }
        }

        @keyframes float-particle-3 {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.2;
          }
          33% {
            transform: translateY(-20px) translateX(8px);
            opacity: 0.7;
          }
          66% {
            transform: translateY(-5px) translateX(-12px);
            opacity: 0.5;
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

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.1);
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

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite 2s;
        }

        .animate-float-particle {
          animation: float-particle 6s ease-in-out infinite;
        }

        .animate-float-particle-2 {
          animation: float-particle-2 8s ease-in-out infinite 1s;
        }

        .animate-float-particle-3 {
          animation: float-particle-3 7s ease-in-out infinite 2s;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        /* Custom responsive improvements */
        @media (max-width: 480px) {
          .leading-tight {
            line-height: 1.1;
          }
        }

        @media (max-width: 320px) {
          .min-w-\[200px\] {
            min-width: 180px;
          }
        }
      `}</style>
    </section>
  );
};

export default VideoBanner;
