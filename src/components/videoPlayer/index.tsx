"use client";

import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  console.log("VideoPlayer url:", url)

  const playVideo = () => {
    if (playerRef.current) {
      playerRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseVideo = () => {
    if (playerRef.current) {
      playerRef.current.pause();
      setIsPlaying(false);
    }
  };

  const rewindVideo = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(currentTime - 10);
    }
  };

  const changePlaybackRate = (rate: number) => {
    if (playerRef.current) {
      playerRef.current.setPlaybackRate(rate);
      setPlaybackRate(rate);
    }
  };

  return (
    <div className="video-player bg-black p-2 rounded-lg">
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={isPlaying}
        controls={true}
        playbackRate={playbackRate}
        width="100%"
        height="100%"
        className="rounded-lg"
      />
      <div className="flex justify-between items-center mt-2">
        <button
          onClick={isPlaying ? pauseVideo : playVideo}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          onClick={rewindVideo}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Rewind 10s
        </button>
        <button
          onClick={() => changePlaybackRate(1)}
          className="bg-blue-500 text-white p-2 rounded"
        >
          1x
        </button>
        <button
          onClick={() => changePlaybackRate(1.5)}
          className="bg-blue-500 text-white p-2 rounded"
        >
          1.5x
        </button>
        <button
          onClick={() => changePlaybackRate(2)}
          className="bg-blue-500 text-white p-2 rounded"
        >
          2x
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
