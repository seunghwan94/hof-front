import React, { useRef, useEffect, useState } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import ProductCard from "./shop/ProductCard"; // ProductCard 가져오기
import { Card } from "react-bootstrap";
import { faStar } from "@fortawesome/free-solid-svg-icons/faStar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";

const Intro = () => {
  const videoRef = useRef(null);
  const [isFooterVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    videoRef.current?.play();
  }, []);

  // 섹션 변경 시 Footer 표시 여부 제어
  const handleSectionChange = (origin, destination) => {
    if (destination.index === 3) { // 세 번째 섹션에 도달했을 때
      setFooterVisible(true);
    } else {
      setFooterVisible(false);
    }
  };


  return (
    <div>
      <ReactFullpage
        scrollOverflow
        navigation
        afterLoad={() => videoRef.current?.play()}
        onLeave={handleSectionChange}
        render={() => (
          <div>
            {/* 첫 번째 섹션 - 비디오 */}
            <div className="section">
              <div className="video-container">
                <video
                  ref={videoRef}
                  src="/test.mp4"
                  className="video"
                  controls={false}
                  muted
                  onEnded={() => videoRef.current?.play()}
                />
                <div className="text-overlay">
                  <h1 style={{ marginRight: "2rem", fontSize: "10rem", fontWeight: "bold" }}>House of Furniture</h1>
                </div>
              </div>
            </div>

            {/* 두 번째 섹션 - 쇼핑 + ProductCard 하나 */}
            <div className="section">
              <div className="container d-flex justify-content-start align-items-center">
                <h2 className="m-4 p-5" style={{ marginRight: "2rem", fontSize: "10rem", fontWeight: "bold" }}>
                  쇼핑
                </h2>
                <div  className="m-4 p-5">
                <Card className="product-card" style={{ width: "400px", height: "500px" }}>
                  <Card.Img variant="top" src="/test.png" style={{height: "265px" }} className="product-image" />
                  {/* 상품 정보 */}
                  <Card.Body>
                    <Card.Title className="product-name" style={{ fontSize: "2.5rem" }} >House of Furniture <span style={{ fontSize: "1.5rem" }}>(우아한 3형제)</span></Card.Title>
                    {/* 가격 및 할인 */}
                    <div className="price-section mt-2">
                      <span className="discount" style={{ fontSize: "1.5rem" }}>20%</span>
                      <span className="price" style={{ fontSize: "2rem" }}>10,000 원</span>
                    </div>
                    {/* 별점 및 리뷰 수 */}
                    <div className="d-flex align-items-center" style={{ fontSize: "1.5rem" }}>
                      <FontAwesomeIcon icon={faStar} className="star-icon" />
                      <span className="rating" style={{ fontSize: "1.5rem" }}>5.0</span>
                      <span className="reviews" style={{ fontSize: "1.5rem" }}>(30)</span>
                    </div>
                  </Card.Body>
                </Card>
                </div>
              </div>
            </div>

            {/* 세 번째 섹션 */}
            <div className="section">
              <div className="container d-flex justify-content-start align-items-center">
                <div className="m-4 p-5">
                  <Card className="community-card" style={{ width: "400px", height: "500px", borderRadius: "12px", overflow: "hidden" }}>
                    <Card.Img variant="top" src="/test.png" className="community-image h-100" />
                  </Card>
                  <div className="d-flex justify-content-between align-items-start mt-2">
                    <div className="d-flex align-items-center mb-2">
                      <img src="/test.png" alt="Profile" className="profile-icon" />
                      <span className="ms-2 fw-bold" style={{color: "#222"}}>Home Design</span>
                    </div>
                    <div className="d-flex align-items-center text-muted">
                      <FontAwesomeIcon icon={faHeart} className="me-1" />
                      <span className="me-3">389</span>
                      <FontAwesomeIcon icon={faComment} className="me-1" />
                      <span>178</span>
                    </div>
                  </div>
                </div>

                <h2 className="m-4 p-5" style={{ marginRight: "2rem", fontSize: "9rem", fontWeight: "bold" }}>
                  커뮤니티 / 인테리어
                </h2>
              </div>
            </div>

            {/* 네 번째 섹션 */}
            <div className="section">
              <div className="container d-flex justify-content-start align-items-center">
                <h2 className="m-4 p-5" style={{ marginRight: "2rem", fontSize: "9rem", fontWeight: "bold", color:"#222"}}>
                  앱 다운로드
                </h2>
                <div className="m-4 p-5">
                  <img src="/hoffviicon_fff.svg" alt="앱 다운로드 아이콘" style={{width: "150px", height: "auto"}} />
                </div>
              </div>
            </div>

          </div>
        )}
      />
      <div className={`footer ${isFooterVisible ? "show" : ""}`}>
        <div className="d-flex container justify-content-around align-items-center">
          <div>
            <div className="mt-3 mb-4">
              정의서 / WBS / ERD / 프로토타입 / PPT<br/>
              Swagger / Jacoco / <br/>
            </div>
            <small style={{color:"999"}}>
              서울 구로구 디지털로 306 대륭포스트타워 2차 203호<br/>
              대표번호: 010-xxxx-xxxx<br/>
              Copyright ⓒ 2024 - 2024 dcinside. All rights reserved.<br/>
            </small>
          </div>
          <div>
            <img src="/hoffviicon_fff.svg" alt="앱 다운로드 아이콘" style={{width: "50px", height: "auto"}} className="m-4" />
            <img src="/hoffviicon_fff.svg" alt="앱 다운로드 아이콘" style={{width: "50px", height: "auto"}} className="m-4" />
            <img src="/hoffviicon_fff.svg" alt="앱 다운로드 아이콘" style={{width: "50px", height: "auto"}} className="m-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
