// @ts-nocheck
// was having a weird error with the typescript types for the Comment type. Something related to redux. On the todo list to fix.
import React, { useEffect } from "react";
import { Comment } from "../../../types/Comment";

// Define the props for the CommentList component
interface CommentListProps {
  comments: Comment[];
  loading: boolean;
}

const CommentList: React.FC<CommentListProps> = ({ comments, loading }) => {
  // Effect to log the comments whenever the prop updates
  useEffect(() => {
    console.log("Comments prop updated:", comments);
  }, [comments]);

  // Function to format userId by replacing underscores and hyphens with spaces
  const formatUserId = (userId: string) => {
    return userId.replace(/_/g, " ").replace(/-/g, " ");
  };

  // Display loading message while comments are being fetched
  if (loading) {
    return <div className="text-white">Loading comments...</div>;
  }

  // Display message if there are no comments
  if (!comments.length) {
    return (
      <div className="p-4">
        <p className="text-white">No comments yet</p>
      </div>
    );
  }

  // Render the list of comments
  return (
    <div className="flex flex-col p-2 gap-4 rounded">
      {comments.map((comment) => {
        return (
          <div key={comment.id} className="mb-2">
            <small className="font-bold text-gray-400">
              @{formatUserId(comment.user_id)}
            </small>
            <p className="text-white">{comment.content}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
