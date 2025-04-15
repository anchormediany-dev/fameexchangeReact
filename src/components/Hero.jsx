import { useState } from "react";
import VideoPlayIcon from "../assets/icons/video-play.svg?react";
const Hero = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="relative w-full   min-h-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/sample-video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-black bg-opacity-50 hero-bg w-full  text-white">
        <div className="container h-full py-16">
          <div className="flex flex-col h-full justify-between items-center">
            <h1 className="font-semibold text-p4 lg:text-p3 xl:text-p1 2xl:text-h5 leading-snug">
              WELCOME TO THE TALENT, ATHLETE & INFLUENCER BASED PLATFORM FOR
              FANS!
            </h1>
            <button>
              <VideoPlayIcon className="hover:scale-105" />
            </button>
            {/* <button
              onClick={() => setPlaying(!playing)}
              className="bg-lightYellow hover:scale-105 text-dark font-semibold text-base px-6 py-3 rounded-lg shadow-md transition"
            >
              Play Video
              <div className="text-xs font-normal">Click Here</div>
            </button> */}
            <button className="play-video-button text-black font-semibold text-lg px-8 transition duration-300">
              <div className="leading-tight text-center">
                <div className="2xl:text-p1 md:text-p2 text-p3 font-medium">
                  Play Video
                </div>
                <div className="2xl:text-p3 md:text-p4 text-p5 font-medium">
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
