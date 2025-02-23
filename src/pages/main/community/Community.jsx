import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import useAxios from "../../../hooks/useAxios";
import CommunityModal from "./CommunityModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import "../../../styles/community.scss";

const Community = () => {
  const { data, loading, error, req } = useAxios();
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);

  // 게시글 목록 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await req("GET", "main/notes");
      setPosts(response || []); // 데이터가 없을 때 빈 배열로 초기화
    };
    fetchPosts();
  }, [req]);

  // 게시글 클릭 -> 모달 열기
  const handlePostClick = async (nno) => {
    const post = await req("GET", `main/notes/${nno}`);
    setSelectedPost(post);
  };

  return (
    <Container className="mt-5">
      {loading && <Spinner animation="border" />}
      {error && <p>에러 발생: {error.message}</p>}

      {/* 게시글 목록 */}
      <Row className="mt-4">
        {posts.map((post) => (
          <Col key={post.nno} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="community-card" onClick={() => handlePostClick(post.nno)}>
              <Card.Img
                variant="top"
                src={post.imageUrls?.[0] || "https://via.placeholder.com/300"}
                className="community-image"
              />
              <Card.Body>
                <div className="d-flex align-items-center">
                  <img src="https://via.placeholder.com/40" alt="Profile" className="profile-icon me-2" />
                  <span className="fw-bold">{post.memberName || "익명"}</span>
                </div>
                <div className="d-flex justify-content-between mt-2 text-muted">
                  <span><FontAwesomeIcon icon={faHeart} className="me-1" /> {post.likeCount || 0}</span>
                  <span><FontAwesomeIcon icon={faComment} className="me-1" /> {post.commentCount || 0}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 게시글 모달 */}
      {selectedPost && (
        <CommunityModal
          post={selectedPost}
          onHide={() => setSelectedPost(null)}
          req={req} // 댓글/좋아요 업데이트용
        />
      )}
    </Container>
  );
};

export default Community;
