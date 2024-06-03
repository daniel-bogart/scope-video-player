// @ts-nocheck

import React, { useEffect } from "react";
import { Comment } from "../../../types/Comment";

interface CommentListProps {
  comments: Comment[];
  loading: boolean;
}

const CommentList: React.FC<CommentListProps> = ({ comments, loading }) => {
  useEffect(() => {
    console.log("Comments prop updated:", comments);
  }, [comments]);

  const formatUserId = (userId: string) => {
    return userId.replace(/_/g, " ").replace(/-/g, " ");
  };

  if (loading) {
    return <div className="text-white">Loading comments...</div>;
  }

  if (!comments.comments.length) {
    return (
      <div className="p-4">
        <p className="text-white">No comments yet</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-2 gap-4 rounded">
      {comments.comments.map((comment) => {
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
