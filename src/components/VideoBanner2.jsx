import React, { useRef, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
// import VideoPlayIcon from "../assets/icons/video-play.svg?react";

// Pulsing animation for the button
const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.9;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.9;
  }
`;

// Custom Play Button Container with centered content
const PlayButtonWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 160px;
    height: 160px;
  }

  @media (max-width: 480px) {
    width: 130px;
    height: 130px;
  }
`;

// First outer circle with transparency
const OuterCircle = styled.div`
  position: absolute;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    width: 140px;
    height: 140px;
  }

  @media (max-width: 480px) {
    width: 120px;
    height: 120px;
  }
`;

// Second middle circle
const MiddleCircle = styled.div`
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
  }
`;

// Inner circle containing play/pause button
const InnerCircle = styled.div`
  position: absolute;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: rgba(50, 50, 50, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${pulse} 2.5s infinite ease-in-out;
  border: 2px solid rgba(255, 255, 255, 1);
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
  }
`;

// Play button that contains all circles
const VideoControlButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover ${InnerCircle} {
    transform: scale(1.05);
  }
`;

// Custom Play Icon (larger and white)
const PlayIcon = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 12px 0 12px 20px;
  border-color: transparent transparent transparent white;
  margin-left: 4px; /* Slight offset for visual balance */

  @media (max-width: 768px) {
    border-width: 10px 0 10px 16px;
  }

  @media (max-width: 480px) {
    border-width: 8px 0 8px 14px;
  }
`;

// Custom Pause Icon
const PauseIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  width: 20px;

  @media (max-width: 768px) {
    height: 20px;
    width: 16px;
  }

  @media (max-width: 480px) {
    height: 16px;
    width: 14px;
  }
`;

// Pause bar
const PauseBar = styled.div`
  height: 100%;
  width: 6px;
  background-color: white;
  margin: 0 2px;
  border-radius: 2px;

  @media (max-width: 768px) {
    width: 5px;
  }

  @media (max-width: 480px) {
    width: 4px;
    margin: 0 1px;
  }
`;

// Video Overlay that can be semi-transparent even when playing
const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  background-color: ${(props) =>
    props.isPlaying ? "transparent" : "rgba(0, 0, 0, 0.3)"};
  transition: background-color 0.5s ease;
`;

// Custom container for centering content
const Container = styled.div`
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
`;

// Heading styles
const Heading = styled.h1`
  font-size: 1.25rem;
  text-align: center;
  letter-spacing: 0.2em;
  padding-top: 1rem;
  margin-top: 1.25rem;
  color: white;
  font-weight: 600;
  opacity: ${(props) => (props.isPlaying ? 0 : 1)};
  transition: opacity 0.5s ease;

  @media (min-width: 640px) {
    padding-top: 1.5rem;
    margin-top: 1.25rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  @media (min-width: 768px) {
    padding-top: 2rem;
    font-size: 1.5rem;
  }
`;

// Content centered container
const CenteredContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const VideoBanner2 = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Toggle play/pause
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Error playing video:", error);
          });
      }
    }
  };

  // Add event listeners to video element for when it ends or is paused elsewhere
  useEffect(() => {
    const video = videoRef.current;

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (video) {
        video.currentTime = 0; // Reset video to beginning
      }
    };

    if (video) {
      video.addEventListener("pause", handlePause);
      video.addEventListener("play", handlePlay);
      video.addEventListener("ended", handleEnded);
    }

    return () => {
      if (video) {
        video.removeEventListener("pause", handlePause);
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("ended", handleEnded);
      }
    };
  }, []);

  return (
    <div>
      <section
        id="videos"
        className="w-full h-[400px] xs:h-[450px] sm:h-[500px] md:h-[600px] relative flex flex-col items-center justify-center overflow-hidden"
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

        {/* Overlay with Play/Pause Button */}
        <VideoOverlay isPlaying={isPlaying}>
          <Container>
            <Heading isPlaying={isPlaying}>EXPLORE OUR VIDEO</Heading>
            <CenteredContent>
              <PlayButtonWrapper>
                <VideoControlButton onClick={togglePlayPause}>
                  <OuterCircle />
                  <MiddleCircle />
                  <InnerCircle>
                    {isPlaying ? (
                      <PauseIcon>
                        <PauseBar />
                        <PauseBar />
                      </PauseIcon>
                    ) : (
                      <PlayIcon />
                    )}
                  </InnerCircle>
                </VideoControlButton>
              </PlayButtonWrapper>
            </CenteredContent>
          </Container>
        </VideoOverlay>
      </section>
    </div>
  );
};

export default VideoBanner2;
