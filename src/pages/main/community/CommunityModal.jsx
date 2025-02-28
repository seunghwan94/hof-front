import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import useAxios from "../../../hooks/useAxios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import CommentSection from "./CommentSection";
import CommunityLikes from "./CommunityLikes";
import "../../../styles/communityModal.scss"; // ✅ 반응형 스타일 추가

const CommunityModal = ({ nno, onHide }) => {
  const { data: post, loading, error, req } = useAxios();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // 반응형 감지
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <Modal
      show={true}
      onHide={onHide}
      size={isMobile ? "sm" : "xl"} // ✅ 모바일에서는 작은 모달 사용
      centered
      className="community-modal"
    >
      <Modal.Body className={`d-flex ${isMobile ? "flex-column" : ""}`}>
        {/* 왼쪽: 이미지 (모바일에서는 숨김 처리) */}
        {!isMobile && (
          <div className="modal-image-container">
            <img src={post.imageUrls?.[0] || "/default-image.jpg"} alt="Post" className="modal-image" />
          </div>
        )}

        {/* 오른쪽: 게시물 정보 */}
        <div className={`modal-info-container p-3 ${isMobile ? "full-width" : ""}`} style={{ height: "85vh", overflowY: "auto" }}>
          <div className="d-flex align-items-center border-bottom pb-2 mb-2">
            <div>
              <strong>{post.memberName || "익명"}</strong>
              <div className="text-muted small">{post.createdAt || ""}</div>
            </div>
          </div>

          {/* 모바일에서는 이미지 상단에 표시 */}
          {isMobile && (
            <div className="mobile-image-container">
              <img src={post.imageUrls?.[0] || "/default-image.jpg"} alt="Post" className="mobile-modal-image" />
            </div>
          )}

          <p className="mb-3" dangerouslySetInnerHTML={{ __html: post.content }}></p>

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
