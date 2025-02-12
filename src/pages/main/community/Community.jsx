import React, { useState } from "react";
import { Container, Row, Col, Card, Modal, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import "../../../styles/community.scss";

// 더미 데이터
const communityPosts = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  image: `https://via.placeholder.com/300?text=Post+${index + 1}`,
  profileImage: "https://via.placeholder.com/40",
  username: `User_${index + 1}`,
  likes: Math.floor(Math.random() * 500),
  comments: Math.floor(Math.random() * 50),
  content: `이것은 샘플 게시물 내용입니다. #${index + 1}`,
  date: "2024/02/10",
  replies: [
    { id: 1, user: "프로필이름", text: "좋아요!", time: "1시간 전" },
    { id: 2, user: "LO", text: "너무 이뻐요!", time: "방금" }
  ]
}));

const Community = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [comment, setComment] = useState("");

  return (
    <Container className="mt-5">
      {/* 게시물 리스트 */}
      <Row className="mt-4">
        {communityPosts.map((post) => (
          <Col key={post.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="community-card" onClick={() => setSelectedPost(post)}>
              <Card.Img variant="top" src={post.image} className="community-image" />
              <Card.Body>
                <div className="d-flex align-items-center">
                  <img src={post.profileImage} alt="Profile" className="profile-icon me-2" />
                  <span className="fw-bold">{post.username}</span>
                </div>
                <div className="d-flex justify-content-between mt-2 text-muted">
                  <span>
                    <FontAwesomeIcon icon={faHeart} className="me-1" /> {post.likes}
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faComment} className="me-1" /> {post.comments}
                  </span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 모달 창 */}
      <Modal show={selectedPost !== null} onHide={() => setSelectedPost(null)} size="lg" centered>
        {selectedPost && (
          <Modal.Body className="d-flex">
            {/* 왼쪽: 게시물 이미지 */}
            <div className="modal-image-container">
              <img src={selectedPost.image} alt="Post" className="modal-image" />
            </div>

            {/* 오른쪽: 게시물 정보 */}
            <div className="modal-info-container p-3">
              {/* 프로필 & 제목 */}
              <div className="d-flex align-items-center border-bottom pb-2 mb-2">
                <img src={selectedPost.profileImage} alt="Profile" className="profile-icon me-2" />
                <div>
                  <strong>{selectedPost.username}</strong>
                  <div className="text-muted small">{selectedPost.date}</div>
                </div>
              </div>

              {/* 게시물 내용 */}
              <p className="mb-3">{selectedPost.content}</p>

              {/* 댓글 리스트 */}
              <div className="comments-section">
                {selectedPost.replies.map((reply) => (
                  <div key={reply.id} className="border-bottom py-2">
                    <strong>{reply.user}</strong>
                    <div className="text-muted small">{reply.time}</div>
                    <p>{reply.text}</p>
                  </div>
                ))}
              </div>

              {/* 댓글 입력 */}
              <Form className="d-flex mt-3">
                <Form.Control
                  type="text"
                  placeholder="댓글을 입력하세요..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button variant="primary" className="ms-2">
                  등록
                </Button>
              </Form>
            </div>
          </Modal.Body>
        )}
      </Modal>
    </Container>
  );
};

export default Community;
