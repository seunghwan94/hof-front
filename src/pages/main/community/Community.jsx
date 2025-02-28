import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import useAxios from "../../../hooks/useAxios";
import CommunityModal from "./CommunityModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import "../../../styles/community.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import PaginationComponent from "../../../components/layout/Paging";

const Community = () => {
  const { loading, error, req } = useAxios();
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  
  // ✅ 페이지네이션 관련 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // ✅ 목록 새로고침을 위한 상태
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  // ✅ 게시글 목록 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await req("GET", "main/notes");
      setPosts(response || []);
    };
    fetchPosts();
  }, [req, refreshTrigger]); // ✅ refreshTrigger 상태 변경 시 다시 호출

  // ✅ 페이지네이션 처리
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);

  // ✅ 게시글 추가 후 새로고침 감지 (useLocation 사용)
  useEffect(() => {
    if (location.state?.refresh) {
      setRefreshTrigger((prev) => !prev); // ✅ 상태 변경으로 재렌더링 트리거
      navigate("/community", { replace: true, state: {} }); // ✅ state 초기화
    }
  }, [location, navigate]);

  // ✅ 게시글 클릭 -> 모달 열기
  const handlePostClick = (nno) => {
    setSelectedPostId(nno);
  };

  // ✅ 게시글 작성 페이지 이동
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
          <div className="text-end mb-4">
            <button className="btn btn-outline-hof" onClick={handleCommunityAdd}>게시글 작성</button>
          </div>

          {currentItems.map((post) => (
            <Col key={post.nno} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="community-card" onClick={() => handlePostClick(post.nno)}>
                <div
                  className="community-image"
                  style={{
                    backgroundImage: `url(${post.imageUrls?.[0] || "https://via.placeholder.com/300"})`,
                  }}
                >
                  <Card.Body className="card-body" style={{ height: "300px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
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

          {/* ✅ 페이지네이션 추가 */}
          <PaginationComponent
            currentPage={currentPage}
            totalPages={Math.ceil((posts.length || 0) / itemsPerPage)}
            onPageChange={setCurrentPage}
          />
        </Row>
      )}

      <Outlet />

      {/* 게시글 모달 */}
      {selectedPostId && (
        <CommunityModal
          nno={selectedPostId}
          onHide={() => setSelectedPostId(null)}
        />
      )}
    </Container>
  );
};

export default Community;
