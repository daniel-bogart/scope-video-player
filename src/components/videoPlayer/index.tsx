import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  url: string;
}

const getFileType = (url: string): string => {
  const extension = url.split(".").pop();
  switch (extension) {
    case "mp4":
      return "video/mp4";
    case "webm":
      return "video/webm";
    case "ogg":
      return "video/ogg";
    default:
      return "video/mp4"; // Fallback to mp4 if unknown
  }
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  return (
    <div className="video-player bg-black p-2 rounded-lg">
      {url.startsWith("blob:") ? (
        <video ref={videoRef} className="w-full h-auto rounded-lg" controls>
          <source src={url} type={getFileType(url)} />
        </video>
      ) : (
        <ReactPlayer
          url={url}
          controls
          width="100%"
          height="100%"
          className="rounded-lg"
        />
      )}
      <div className="flex justify-between items-center mt-2">
        <button
          onClick={handlePlayPause}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {playing ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
