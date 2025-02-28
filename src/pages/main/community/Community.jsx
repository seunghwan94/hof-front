import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import useAxios from "../../../hooks/useAxios";
import CommunityModal from "./CommunityModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import "../../../styles/community.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Community = () => {
  const { loading, error, req } = useAxios();
  const [selectedPostId, setSelectedPostId] = useState(null); // 게시글 ID만 저장
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // 게시글 목록 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await req("GET", "main/notes");
      setPosts(response || []); // 데이터가 없을 때 빈 배열로 초기화
    };
    fetchPosts();
  }, [req]);

  // 게시글 클릭 -> 모달 열기
  const handlePostClick = (nno) => {
    setSelectedPostId(nno); // 게시글 ID만 저장
  };

  // 게시글 클릭 -> 모달 열기
  const handleCommunityAdd = () => {
    navigate("/community/add");
  };

  return (
    <Container className="mt-5">
      {loading && <Spinner animation="border" />}
      {error && <p>에러 발생: {error.message}</p>}

      {/* 게시글 목록 */}
      {location.pathname === "/community" && (
        
        <Row className="mt-4">
          <div className="text-end">
            <button className="btn btn-outline-hof" onClick={() => handleCommunityAdd()} >게시글 작성</button>
          </div>
          {posts.map((post) => (
            <Col key={post.nno} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card
                  className="community-card"
                  onClick={() => handlePostClick(post.nno)}
                >
                  <div
                    className="community-image"
                    style={{
                      backgroundImage: `url(${post.imageUrls?.[0] || "https://via.placeholder.com/300"})`,
                    }}
                  >
                    <Card.Body className="card-body" style={{height:"300px", display:"flex", flexDirection:"column", justifyContent:"flex-end"}}>
                      <div className="d-flex align-items-center">
                        <span className="fw-bold text-white">{post.memberName || "익명"}</span>
                      </div>
                      <div className="d-flex justify-content-between text-white mt-2">
                        <span><FontAwesomeIcon icon={faHeart} className="me-1" /> {post.likeCount || 0}</span>
                        <span><FontAwesomeIcon icon={faComment} className="me-1" /> {post.commentCount || 0}</span>
                      </div>
                    </Card.Body>
                  </div>
                </Card>

            </Col>
          ))}
        </Row>
      )}
      <Outlet />
      {/* 게시글 모달 */}
      {selectedPostId && (
        <CommunityModal
          nno={selectedPostId} // 게시글 ID만 전달
          onHide={() => setSelectedPostId(null)} // 모달 닫기
        />
      )}
    </Container>
  );
};

export default Community;
