import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const CommunityModal = ({ post, onHide, req }) => {
  const [comments, setComments] = useState(post.replies || []);
  const [comment, setComment] = useState("");

  // 댓글 추가 핸들러
  const handleCommentSubmit = async (content, parentReplyId = null) => {
    await req("POST", "main/reply", {
      nno: post.nno,
      mno: 24, // 임시 사용자 ID
      content,
      parentReplyId,
    });

    // 댓글 갱신
    const updatedPost = await req("GET", `main/notes/${post.nno}`);
    setComments(updatedPost.replies || []);
  };
  return (
    <Modal show={true} onHide={onHide} size="lg" centered>
      <Modal.Body className="d-flex">
        {/* 왼쪽: 이미지 */}
        <div className="modal-image-container">
          <img src={post.imageUrls?.[0]} alt="Post" className="modal-image" />
        </div>

        {/* 오른쪽: 게시글 정보 */}
        <div className="modal-info-container p-3">
          <div className="d-flex align-items-center border-bottom pb-2 mb-2">
            <img src="https://via.placeholder.com/40" alt="Profile" className="profile-icon me-2" />
            <div>
              <strong>{post.memberName || "익명"}</strong>
              <div className="text-muted small">{post.createdAt || "날짜 없음"}</div>
            </div>
          </div>

          <p className="mb-3">{post.content}</p>

          <div className="d-flex justify-content-between mt-2 text-muted">
            <span><FontAwesomeIcon icon={faHeart} className="me-1" /> {post.likeCount || 0}</span>
            <span><FontAwesomeIcon icon={faComment} className="me-1" /> {comments.length}</span>
          </div>

          {/* 댓글 목록 */}
          <div className="comments-section mt-3">
            {comments.map((reply) => (
              <Comment key={reply.replyId} reply={reply} onReply={handleCommentSubmit} />
            ))}
          </div>

          {/* 댓글 입력 */}
          <CommentForm
            comment={comment}
            setComment={setComment}
            onSubmit={() => handleCommentSubmit(comment)}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CommunityModal;
