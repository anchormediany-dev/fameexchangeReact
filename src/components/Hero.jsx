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

      <div className="absolute inset-0 bg-black bg-opacity-50 hero-bg flex flex-col justify-between items-center text-white text-center px-4 py-16">
        <h1 className="font-bold mb-8">
          WELCOME TO THE TALENT, ATHLETE & INFLUENCER BASED PLATFORM FOR FANS!
        </h1>
<button><VideoPlayIcon /></button>
        <button
          onClick={() => setPlaying(!playing)}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-base px-6 py-3 rounded-lg shadow-md transition"
        >
          Play Video
          <div className="text-xs font-normal">Click Here</div>
        </button>
      </div>
    </section>
  );
};

export default Hero;
