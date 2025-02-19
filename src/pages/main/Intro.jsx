import React, { useRef, useEffect, useState } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
// import ProductCard from "./shop/ProductCard"; // ProductCard 가져오기
import { Card } from "react-bootstrap";
import { faStar } from "@fortawesome/free-solid-svg-icons/faStar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import PageLoader from "../../components/layout/PageLoader";

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
    <PageLoader>
      <div className="video-container">
        <video
          ref={videoRef}
          src="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/intro.mp4"
          className="video"
          controls={false}
          muted
          onEnded={() => videoRef.current?.play()}
          preload="auto"
          poster="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/intro.png"
        />
      </div>
      <ReactFullpage
        scrollOverflow
        navigation
        afterLoad={() => videoRef.current?.play()}
        onLeave={handleSectionChange}
        render={() => (
          <div>
            {/* 첫 번째 섹션 - 비디오 */}
            <div className="section">

                <div className="text-overlay">
                  House of Furniture
                </div>
            </div>
            {/* 두 번째 섹션 - 쇼핑 */}
            <div className="section">
              <div className="container shopping-section d-flex flex-column flex-md-row align-items-center">
                
                {/* 쇼핑 제목 */}
                <h2 className="shopping-title p-3 mx-5">
                  쇼핑
                </h2>

                {/* 쇼핑 카드 */}
                <div className="p-3">
                  <Card className="product-card">
                    <Card.Img
                      variant="top"
                      src="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/intro.png"
                      className="product-image"
                      loading="lazy"
                    />
                    <Card.Body className="d-flex flex-column justify-content-between">
                      {/* 상품명 */}
                      <Card.Title className="product-name text-center">
                        House of Furniture
                        <br />
                        <span className="product-subtitle">(우아한 3형제)</span>
                      </Card.Title>

                      {/* 가격 및 할인 */}
                      <div className="price-section d-flex justify-content-center align-items-center">
                        <span className="discount">20%</span>
                        <span className="price">10,000 원</span>
                      </div>

                      {/* 별점 및 리뷰 수 */}
                      <div className="d-flex justify-content-center align-items-center rating-section mt-2">
                        <FontAwesomeIcon icon={faStar} className="star-icon" />
                        <span className="rating">5.0</span>
                        <span className="reviews">(30)</span>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>

            {/* 세 번째 섹션 - 커뮤니티 / 인테리어 */}
            <div className="section">
              <div className="container community-section d-flex flex-column flex-md-row align-items-center gap-5">
                {/* 커뮤니티 카드 */}
                <div className="p-4">
                  <Card className="community-card">
                    <Card.Img 
                      variant="top" 
                      src="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/intro.png"
                      className="community-image"
                      loading="lazy"
                    />
                  </Card>
                  <div className="d-flex justify-content-between align-items-start mt-3">
                    <div className="d-flex align-items-center mb-2">
                      <img src="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/intro.png" alt="Profile" className="profile-icon" loading="lazy"/>
                      <span className="ms-2 fw-bold text-dark">Home Design</span>
                    </div>
                    <div className="d-flex align-items-center text-muted">
                      <FontAwesomeIcon icon={faHeart} className="me-1" />
                      <span className="me-3">389</span>
                      <FontAwesomeIcon icon={faComment} className="me-1" />
                      <span>178</span>
                    </div>
                  </div>
                </div>
                {/* 커뮤니티 텍스트 */}
                <h2 className="community-title text-center text-md-start">
                  커뮤니티 /<br/> 인테리어
                </h2>
              </div>
            </div>

            {/* 네 번째 섹션 - 앱 다운로드 */}
            <div className="section app-download-section">
              <div className="container d-flex flex-column flex-md-row align-items-center gap-5">
                {/* 앱 다운로드 텍스트 */}
                <h2 className="app-download-title text-center text-md-start">
                  앱 다운로드
                </h2>
                {/* 앱 다운로드 아이콘 */}
                <div className="p-3 p-md-5">
                  <img 
                    src="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/AppLogo.svg" 
                    alt="앱 다운로드 아이콘" 
                    className="app-download-icon"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      />
      {/* Footer */}
      <div className={`footer-intro ${isFooterVisible ? "show" : ""}`}>
        <div className="container footer-content d-flex flex-column flex-md-row justify-content-around align-items-center text-light">
          
          {/* 회사 정보 */}
          <div className="footer-info text-center text-md-start">
            <div className="mb-3">
              정의서 / WBS / ERD / 프로토타입 / PPT <br/>
              Swagger / Jacoco /
            </div>
            <small>
              서울 구로구 디지털로 306 대륭포스트타워 2차 203호<br/>
              대표번호: 010-xxxx-xxxx<br />
              Copyright ⓒ 2024 - 2024 dcinside. All rights reserved.
            </small>
          </div>
          {/* 앱 다운로드 아이콘 */}
          <div className="footer-icons d-flex gap-3">
            <img 
              src="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/AppLogo.svg" 
              alt="앱 다운로드 아이콘" 
              className="footer-icon"
              loading="lazy"
            />
            <img 
              src="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/AppLogo.svg" 
              alt="앱 다운로드 아이콘" 
              className="footer-icon"
              loading="lazy"
            />
            <img 
              src="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/AppLogo.svg" 
              alt="앱 다운로드 아이콘" 
              className="footer-icon"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </PageLoader>
  );
};

export default Intro;
