import { useRef } from "react";
import VideoPlayIcon from "../assets/icons/video-play.svg?react";
const VideoBanner2 = () => {
  const videoRef = useRef(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div>
      <section
        id="videos"
        className="w-full h-[400px] xs:h-[450px] sm:h-[500px] md:h-[600px] relative  flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Video */}
        <video
          ref={videoRef}
          src="/sample-video.mp4"
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="auto"
        />

        {/* Play Button */}
        <div className="absolute top-0 left-0 h-full w-full  z-0">
          <div className="container custom-banner h-full">
            <h1 className="custom-heading-seven text-center tracking-widest pt-4 sm:pt-6 md:pt-8 sm:mt-5 px-2 sm:px-4">
              EXPLORE OUR VIDEO
            </h1>
            <div className="flex flex-col h-full items-center justify-center">
              <button className="cursor-pointer max-w-40" onClick={handlePlay}>
                <VideoPlayIcon className="hover:scale-105 w-20 h-20 md:w-30 md:h-30 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VideoBanner2;
