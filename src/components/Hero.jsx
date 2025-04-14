import { useState } from "react";

const Hero = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/sample-video.mp4" // Replace with your actual video path
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8">
          WELCOME TO THE TALENT, ATHLETE & INFLUENCER BASED PLATFORM FOR FANS!
        </h1>

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
