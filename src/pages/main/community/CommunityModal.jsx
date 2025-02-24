import React, { useEffect } from "react";
import { Modal, Spinner } from "react-bootstrap";
import useAxios from "../../../hooks/useAxios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import CommentSection from "./CommentSection";
import CommunityLikes from "./CommunityLikes";

const CommunityModal = ({ nno, onHide }) => {
  const { data: post, loading, error, req } = useAxios();

  // 게시글 상세 정보 가져오기
  useEffect(() => {
    const fetchPost = async () => {
      await req("GET", `main/notes/${nno}`);
    };
    if (nno) fetchPost();
  }, [nno, req]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <p>에러 발생: {error.message}</p>;
  if (!post) return null;

  return (
    <Modal show={true} onHide={onHide} size="lg" centered>
      <Modal.Body className="d-flex">
        {/* 왼쪽: 이미지 */}
        <div className="modal-image-container">
          <img src={post.imageUrls?.[0]} alt="Post" className="modal-image" />
        </div>

        {/* 오른쪽: 게시물 정보 */}
        <div className="modal-info-container p-3" style={{ height: "85vh", overflowY: "auto" }}>
          <div className="d-flex align-items-center border-bottom pb-2 mb-2">
            <img src="https://via.placeholder.com/40" alt="Profile" className="profile-icon me-2" />
            <div>
              <strong>{post.memberName || "익명"}</strong>
              <div className="text-muted small">{post.createdAt || "날짜 없음"}</div>
            </div>
          </div>

          <p className="mb-3">{post.content}</p>

          {/* 좋아요 및 댓글 수 */}
          <div className="d-flex justify-content-between mt-2 text-muted">
            <CommunityLikes targetNo={nno} targetType="NOTE" userMno={24} />
            <span>
              <FontAwesomeIcon icon={faComment} className="me-1" /> {post.commentCount || 0}
            </span>
          </div>

          <hr />

          {/* 댓글 섹션 */}
          <h5>댓글</h5>
          <CommentSection nno={nno} />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CommunityModal;
