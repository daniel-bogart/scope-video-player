import React, { useState } from "react";

interface CommentFormProps {
  onAddComment: (content: string, userId: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onAddComment }) => {
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddComment(content, userId);
    setContent("");
    setUserId("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mb-4">
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="w-full p-2 rounded text-black mb-2"
        placeholder="Your user ID"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="relative w-full bg-white p-2 rounded text-black outline-none border-none after:content-[''] after:bg-white after:h-[2px] after:absolute after:left-0 after:opacity-1 after:w-full after:transition-all after:duration-300 after:ease-out after:bottom-[-4px] after:bottom-[-2px] after:w-0"
        placeholder="Add a comment..."
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">
        Add Comment
      </button>
    </form>
  );
};

export default CommentForm;
