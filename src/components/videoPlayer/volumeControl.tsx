import React, { useState } from "react";

// Define the props for the VolumeControl component
interface VolumeControlProps {
  volume: number; // Current volume level
  setVolume: (volume: number) => void; // Function to update the volume level
}

const VolumeControl: React.FC<VolumeControlProps> = ({ volume, setVolume }) => {
  const [isMuted, setIsMuted] = useState(false); // State to track if the volume is muted

  // Handle the change in volume input
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value)); // Update the volume
    setIsMuted(e.target.value === "0"); // Set the muted state based on the volume
  };

  // Toggle mute/unmute
  const toggleMute = () => {
    setIsMuted(!isMuted); // Toggle the muted state
    setVolume(isMuted ? 0.8 : 0); // Set volume to 0.8 when unmuting, or 0 when muting
  };

  return (
    <div className="group flex items-center space-x-2 group relative max-w-[160px] w-full">
      {/* Button to toggle mute/unmute */}
      <button
        onClick={toggleMute}
        className="text-white p-2 rounded focus:outline-none"
      >
        {/* Render the appropriate icon based on the muted state */}
        {isMuted ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            className="text-neutral-300 group-hover:text-white transition-all duration-300 ease-out"
          >
            <g fill="none" stroke="currentColor" strokeWidth="1.5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m18 14l2-2m2-2l-2 2m0 0l-2-2m2 2l2 2"
              />
              <path d="M2 13.857v-3.714a2 2 0 0 1 2-2h2.9a1 1 0 0 0 .55-.165l6-3.956a1 1 0 0 1 1.55.835v14.286a1 1 0 0 1-1.55.835l-6-3.956a1 1 0 0 0-.55-.165H4a2 2 0 0 1-2-2Z" />
            </g>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            className="text-neutral-300 group-hover:text-white transition-all duration-300 ease-out"
          >
            <g fill="none" stroke="currentColor" strokeWidth="1.5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 7.5S21 9 21 11.5s-1.5 4-1.5 4"
              />
              <path d="M2 13.857v-3.714a2 2 0 0 1 2-2h2.9a1 1 0 0 0 .55-.165l6-3.956a1 1 0 0 1 1.55.835v14.286a1 1 0 0 1-1.55.835l-6-3.956a1 1 0 0 0-.55-.165H4a2 2 0 0 1-2-2Z" />
            </g>
          </svg>
        )}
      </button>
      {/* Input range to control the volume */}
      <input
        id="volume"
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={isMuted ? 0 : volume} // Show volume as 0 when muted
        onChange={handleVolumeChange} // Handle volume change
        className="volume-input h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 w-0 group-hover:w-24 transition-all duration-300 ease-out opacity-0 group-hover:opacity-100"
      />
    </div>
  );
};

export default VolumeControl;
