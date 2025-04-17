import { useRef } from "react";
import VideoPlayIcon from "../assets/icons/video-play.svg?react";
const Hero = () => {
  const videoRef = useRef(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <section
      id="videos"
      className="w-full max-h-[600px] relative bg-black flex flex-col items-center justify-center"
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
      <div className="absolute h-full top-0 left-0">
        <div className="container h-full py-16">
          <div className="flex flex-col h-full justify-between items-center">
            <h1 className="font-semibold text-p4 lg:text-p3 xl:text-p1 2xl:text-h5 leading-snug">
              WELCOME TO THE TALENT, ATHLETE & INFLUENCER BASED PLATFORM FOR
              FANS!
            </h1>
            <button className="cursor-pointer" onClick={handlePlay}>
              <VideoPlayIcon className="hover:scale-105 " />
            </button>
            <button
              onClick={handlePlay}
              className="play-video-button cursor-pointer hover:scale-105 text-black font-semibold text-lg px-8 transition duration-300"
            >
              <div className="leading-tight  text-center">
                <div className="2xl:text-p1 md:text-p3 text-p4 font-medium">
                  Play Video
                </div>
                <div className="text-black font-medium transition-all duration-300  text-p5  2xl:text-p1">
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

export default Hero;
