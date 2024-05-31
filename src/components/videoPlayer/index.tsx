import React, { useRef, useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const onReady: YouTubeProps["onReady"] = (event) => {
    playerRef.current = event.target;
  };

  const playVideo = () => {
    if (playerRef.current) {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const pauseVideo = () => {
    if (playerRef.current) {
      playerRef.current.pauseVideo();
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

  const youTubeID = getYouTubeID(url);
  const isYouTube = youTubeID !== null;

  return (
    <div>
      {isYouTube ? (
        <YouTube
          videoId={youTubeID ?? ""}
          onReady={onReady}
          opts={{ playerVars: { controls: 0 } }}
        />
      ) : (
        <ReactPlayer
          url={url}
          ref={playerRef}
          controls={false}
          playing={isPlaying}
          playbackRate={playbackRate}
        />
      )}
      <div>
        <button onClick={isPlaying ? pauseVideo : playVideo}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={rewindVideo}>Rewind 10s</button>
        <button onClick={() => changePlaybackRate(1)}>1x</button>
        <button onClick={() => changePlaybackRate(1.5)}>1.5x</button>
        <button onClick={() => changePlaybackRate(2)}>2x</button>
      </div>
    </div>
  );
};

const getYouTubeID = (url: string): string | null => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export default VideoPlayer;
