import React from "react";

// Define the props for the PlaySpeed component
interface PlaySpeedProps {
  playbackRate: number; // Current playback rate
  setPlaybackRate: (rate: number) => void; // Function to update the playback rate
}

const PlaySpeed: React.FC<PlaySpeedProps> = ({
  playbackRate,
  setPlaybackRate,
}) => {
  return (
    <div className="group flex space-x-2">
      {/* Button to show playback speed options */}
      <button className="bg-transparent text-white p-2 rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          className="text-neutral-300 group-hover:text-white transition-all duration-300 ease-out"
        >
          <path
            fill="currentColor"
            d="M9.608 1.517c.77-.175 1.57-.267 2.392-.267c5.937 0 10.75 4.813 10.75 10.75S17.937 22.75 12 22.75c-.822 0-1.622-.092-2.392-.267a.75.75 0 1 1 .332-1.463a9.25 9.25 0 1 0 0-18.04a.75.75 0 1 1-.332-1.463M7.314 3.132a.75.75 0 0 1-.235 1.034A9.303 9.303 0 0 0 4.166 7.08a.75.75 0 0 1-1.27-.8A10.803 10.803 0 0 1 6.28 2.897a.75.75 0 0 1 1.035.235M2.98 9.94a.75.75 0 1 0-1.463-.332c-.175.77-.267 1.57-.267 2.392c0 .822.092 1.622.267 2.393a.75.75 0 0 0 1.463-.333A9.283 9.283 0 0 1 2.75 12c0-.709.08-1.398.23-2.06m.152 6.746a.75.75 0 0 1 1.034.235a9.302 9.302 0 0 0 2.913 2.913a.75.75 0 0 1-.8 1.27a10.804 10.804 0 0 1-3.382-3.383a.75.75 0 0 1 .235-1.035"
          />
          <path
            fill="currentColor"
            d="M15.414 10.941c.781.462.781 1.656 0 2.118l-4.72 2.787C9.934 16.294 9 15.71 9 14.786V9.214c0-.924.934-1.507 1.694-1.059z"
          />
        </svg>
      </button>
      {/* Container for playback speed options */}
      <div className="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto flex justify-center items-center bg-neutral-800 bg-opacity-60 rounded-lg transition duration-300 ease-out">
        {/* Button for normal speed (1x) */}
        <button
          onClick={() => setPlaybackRate(1)}
          className={`transition-all duration-300 ease-out text-white p-2 rounded ${
            playbackRate === 1 ? "opacity-100" : "opacity-50 hover:opacity-100"
          }`}
        >
          1x
        </button>
        {/* Button for 1.5x speed */}
        <button
          onClick={() => setPlaybackRate(1.5)}
          className={`transition-all duration-300 ease-out text-white p-2 rounded ${
            playbackRate === 1.5
              ? "opacity-100"
              : "opacity-50 hover:opacity-100"
          }`}
        >
          1.5x
        </button>
        {/* Button for 2x speed */}
        <button
          onClick={() => setPlaybackRate(2)}
          className={`transition-all duration-300 ease-out text-white p-2 rounded ${
            playbackRate === 2 ? "opacity-100" : "opacity-50 hover:opacity-100"
          }`}
        >
          2x
        </button>
      </div>
    </div>
  );
};

export default PlaySpeed;
