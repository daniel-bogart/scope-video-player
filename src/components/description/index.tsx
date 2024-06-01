import React, { useState } from "react";
import classNames from "classnames";

interface DescriptionProps {
  description: string;
  charLimit?: number;
}

const Description: React.FC<DescriptionProps> = ({
  description,
  charLimit = 300,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [flash, setFlash] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={classNames(
        "w-full rounded-lg p-4 border border-white transform transition-all duration-300 ease-out", {
          "bg-flash": flash
        }
      )}
    >
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isExpanded ? "max-h-40 opacity-100" : "max-h-20 opacity-80"
        }`}
      >
        <p className="text-white mb-4">
          {isExpanded ? description : `${description.slice(0, charLimit)}...`}
        </p>
      </div>
      <button
        onClick={toggleReadMore}
        className="text-white hover:underline focus:outline-none"
        onMouseDown={() => setFlash(true)}
        onMouseLeave={() => setFlash(false)}
      >
        {isExpanded ? "Read Less" : "Read More"}
      </button>
    </div>
  );
};

export default Description;
