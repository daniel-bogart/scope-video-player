"use client";

import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { gsap } from "gsap";
import useModal from "../../lib/useModal";
import PlaySpeed from "./playSpeed";
import VolumeControl from "./volumeControl";

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  const playerRef = useRef<ReactPlayer>(null);
  const playIconRef = useRef<SVGPathElement>(null);
  const pauseIconRef = useRef<SVGPathElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(0.8); // Initialize volume to 80%
  const { openModal } = useModal();
  const videoContainerRef = useRef<HTMLDivElement>(null);
  console.log("isFullScreen", isFullScreen);

  useEffect(() => {
    if (playIconRef.current && pauseIconRef.current) {
      if (isPlaying) {
        gsap.to(playIconRef.current, {
          autoAlpha: 0,
          duration: 0.2,
          onComplete: () => {
            if (pauseIconRef.current)
              gsap.to(pauseIconRef.current, { autoAlpha: 1, duration: 0.2 });
          },
        });
      } else {
        gsap.to(pauseIconRef.current, {
          autoAlpha: 0,
          duration: 0.2,
          onComplete: () => {
            if (playIconRef.current)
              gsap.to(playIconRef.current, { autoAlpha: 1, duration: 0.2 });
          },
        });
      }
    }
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const rewindVideo = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(currentTime - 10);
    }
  };

  const ffVideo = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(currentTime + 10);
    }
  };

  const handleProgress = (state: { played: number }) => {
    setPlayed(state.played);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (playerRef.current) {
      playerRef.current.seekTo(parseFloat(e.target.value));
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    const rangeInput = document.querySelector(
      'input[type="range"].video-progress'
    ) as HTMLInputElement;
    if (rangeInput) {
      rangeInput.style.setProperty("--progress", `${played * 100}%`);
    }
  }, [played]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      setIsFullScreen(true);
      if (videoContainerRef.current) {
        const videoElement: any = videoContainerRef.current;
        if (videoElement.requestFullscreen) {
          videoElement.requestFullscreen();
        } else if (videoElement.webkitRequestFullscreen) {
          videoElement.webkitRequestFullscreen();
        } else if (videoElement.msRequestFullscreen) {
          videoElement.msRequestFullscreen();
        }
      }
    } else {
      setIsFullScreen(false);
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
  };

  return (
    <div
      ref={videoContainerRef}
      className={`video-player bg-black p-2 rounded-lg w-full max-w-video-vw h-video-vh box-border flex flex-col items-center ${
        isPlaying ? "is-playing" : ""
      }`}
    >
      <svg height="0" width="0" style={{ position: "absolute" }}>
        <defs>
          <symbol id="play-icon" viewBox="0 0 36 36">
            <path
              ref={playIconRef}
              d="M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z"
              fill="white"
            ></path>
          </symbol>
          <symbol id="pause-icon" viewBox="0 0 36 36">
            <path
              ref={pauseIconRef}
              d="M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z"
              fill="white"
              style={{ opacity: 0 }}
            ></path>
          </symbol>
        </defs>
      </svg>
      <div className="relative w-full h-full rounded-lg">
        <ReactPlayer
          ref={playerRef}
          url={url}
          playing={isPlaying}
          controls={false}
          playbackRate={playbackRate}
          volume={volume} // Set volume on the player
          width="100%"
          height="100%"
          className={`"w-full h-full pointer-events-none" ${
            isFullScreen ? "" : "iframe-rounded"
          }`}
          onProgress={handleProgress}
        />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/70 to-transparent pointer-events-none"></div>

        <div className="flex flex-col w-full px-4 absolute bottom-0 left-0">
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={played}
            onChange={handleSeek}
            className="w-full mt-2 custom-range video-progress"
          />
          <div
            className="absolute bg-white text-black text-xs p-1 rounded transform translate-y-[-18px] translate-x-[4px] bottom-[60px]"
            style={{
              left: `${played * 100}%`,
            }}
          >
            {formatTime(
              playerRef.current ? playerRef.current.getCurrentTime() : 0
            )}
          </div>
          <div className="flex justify-between justify-center items-center box-border w-full flex-row h-[60px] mt-2">
            <button
              onClick={togglePlayPause}
              className="bg-transparent text-white p-2 rounded"
            >
              <svg height="48px" width="48px">
                <use className="play-icon" xlinkHref="#play-icon"></use>
                <use className="pause-icon" xlinkHref="#pause-icon"></use>
              </svg>
            </button>
            <button
              onClick={rewindVideo}
              className="group bg-transparent text-white p-2 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                className="stroke-current text-neutral-300 group-hover:text-white transition-all duration-300 ease-out"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinejoin="round"
                    d="M14 4.5L12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-4.1 2.468-7.625 6-9.168"
                  />
                  <path strokeLinejoin="round" d="m7.5 10.5l2.5-2v7" />
                  <path d="M12.5 13.75v-3.5a1.75 1.75 0 1 1 3.5 0v3.5a1.75 1.75 0 1 1-3.5 0Z" />
                </g>
              </svg>
            </button>
            <button
              onClick={ffVideo}
              className="group bg-transparent text-white p-2 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                className="stroke-current text-neutral-300 group-hover:text-white transition-all duration-300 ease-out"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinejoin="round"
                    d="M10 4.5L12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10c0-4.1-2.468-7.625-6-9.168"
                  />
                  <path strokeLinejoin="round" d="m7.5 10.5l2.5-2v7" />
                  <path d="M12.5 13.75v-3.5a1.75 1.75 0 1 1 3.5 0v3.5a1.75 1.75 0 1 1-3.5 0Z" />
                </g>
              </svg>
            </button>
            <VolumeControl volume={volume} setVolume={setVolume} />
            <PlaySpeed
              playbackRate={playbackRate}
              setPlaybackRate={setPlaybackRate}
            />
            <button onClick={toggleFullScreen} className="group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                className="text-neutral-300 group-hover:text-white transition-all duration-300 ease-out"
              >
                <path
                  fill="currentColor"
                  d="M3 21v-5h2v3h3v2zm13 0v-2h3v-3h2v5zM3 8V3h5v2H5v3zm16 0V5h-3V3h5v5z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
