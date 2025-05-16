import { useRef } from "react";
import VideoPlayIcon from "../assets/icons/video-play.svg?react";
const VideoBanner = () => {
  const videoRef = useRef(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
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
          <div className="flex flex-col h-full justify-between items-center py-6 sm:py-8 md:py-10">
            <h1 className="font-heading-lg   leading-snug  pt-4 sm:pt-6 md:pt-8 sm:mt-5 px-2 sm:px-4">
              WELCOME TO THE TALENT, ATHLETE & INFLUENCER BASED PLATFORM FOR
              FANS!
            </h1>
            <button className="cursor-pointer max-w-40" onClick={handlePlay}>
              <VideoPlayIcon className="hover:scale-105 w-20 h-20 md:w-30 md:h-30 transition-transform duration-300" />
            </button>
            <button
              onClick={handlePlay}
              className="play-video-button  cursor-pointer hover:scale-105 text-black font-semibold text-lg px-8 transition duration-300"
            >
              <div className="leading-tight  text-center">
                <div className="font-button-xl">Play Video</div>
                <div className="text-black  transition-all duration-300 font-button-md">
                  Click Here
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoBanner;
