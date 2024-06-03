import React, { useState } from "react";
import CTA from "../../button";

interface CommentFormProps {
  onAddComment: (content: string, userId: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onAddComment }) => {
  const [content, setContent] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const namePattern = /^[a-zA-Z\s]+$/;
    if (!namePattern.test(firstName) || !namePattern.test(lastName)) {
      setError(
        "First name and last name must contain only letters and spaces."
      );
      return;
    }

    setError("");

    const formattedFirstName = firstName.replace(/\s+/g, "-");
    const formattedLastName = lastName.replace(/\s+/g, "-");
    const userId = `${formattedFirstName}_${formattedLastName}`;

    onAddComment(content, userId);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex flex-col">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex w-full flex-col relative">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="peer w-full p-2 rounded text-white mb-2 border-none outline-none bg-transparent"
              placeholder="Your first name"
            />
            <span className="bottom-0 absolute left-0 block h-[2px] w-0 bg-white transform transition-all duration-300 ease-out peer-focus:w-full"></span>
            <span className="bottom-0 w-full h-[1px] brightness-50 absolute bg-white" />
          </div>
          <div className="flex w-full flex-col relative">
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="peer w-full p-2 rounded text-white mb-2 border-none outline-none bg-transparent"
              placeholder="Your last name"
            />

            <span className="bottom-0 absolute left-0 block h-[2px] w-0 bg-white transform transition-all duration-300 ease-out peer-focus:w-full"></span>
            <span className="bottom-0 w-full h-[1px] brightness-50 absolute bg-white" />
          </div>
        </div>
        <div className="relative flex w-full flex-col">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="peer w-full p-2 rounded text-white mb-2 border-none outline-none bg-transparent"
            placeholder="Add a comment..."
          />
          <span className="bottom-0 absolute left-0 block h-[2px] w-0 bg-white transform transition-all duration-300 ease-out peer-focus:w-full"></span>
          <span className="bottom-0 w-full h-[1px] brightness-50 absolute bg-white" />
        </div>
      </div>
      <div className="self-end">
        <CTA type="submit">Add Comment</CTA>
      </div>
    </form>
  );
};

export default CommentForm;
