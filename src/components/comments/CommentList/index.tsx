import React, { useEffect } from "react";
import { Comment } from "../../../types/Comment";

interface CommentListProps {
  comments: {
    comments: Comment[];
  };
  loading: boolean;
}


const CommentList: React.FC<CommentListProps> = React.memo(
  ({ comments, loading }) => {
    useEffect(() => {
      console.log("Comments prop updated:", comments.comments);
    }, [comments.comments]); // Depend on the nested comments array

    if (loading || comments.comments === undefined) {
      return <div className="text-white">Loading comments...</div>;
    }

    if (!comments.comments.length) {
      return <div className="text-white">No comments yet</div>;
    }

    return (
      <div>
        {comments.comments.map((comment) => (
          <div key={comment.id} className="mb-2">
            <p className="text-white">{comment.content}</p>
            <small className="text-gray-400">By: {comment.user_id}</small>
          </div>
        ))}
      </div>
    );
  }
);

export default CommentList;
