import React, { useState } from "react";
import CommentForm from "./CommentForm";

const Comment = ({ reply, onReply }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const handleReplySubmit = () => {
    onReply(replyContent, reply.replyId); // 대댓글 추가
    setReplyContent("");
    setShowReplyForm(false);
  };

  return (
    <div className="border-bottom py-2" style={{ marginLeft: `${reply.depth * 20}px` }}>
      <strong>{reply.memberName || "익명"}</strong>
      <div className="text-muted small">{reply.createdAt || "방금 전"}</div>
      <p>{reply.content}</p>
      <button className="btn btn-link p-0" onClick={() => setShowReplyForm(!showReplyForm)}>
        답글
      </button>

      {showReplyForm && (
        <CommentForm
          comment={replyContent}
          setComment={setReplyContent}
          onSubmit={handleReplySubmit}
        />
      )}
    </div>
  );
};

export default Comment;
