import React, { useRef, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { faStar, faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageLoader from "../../components/layout/PageLoader";
import "../../styles/intro.scss"; // SCSS 파일 import

const Intro = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const sections = [0, 1, 2, 3]; // 총 4개 섹션
  // 모바일 터치 이벤트를 위한 상태
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  useEffect(() => {
    videoRef.current?.play();
    const handleWheel = (e) => {
      if (isScrolling) return;

      setIsScrolling(true);

      if (e.deltaY > 0) {
        setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
      } else if (e.deltaY < 0) {
        setCurrentSection((prev) => Math.max(prev - 1, 0));
      }

      setTimeout(() => {
        setIsScrolling(false);
      }, 800); // 스크롤 딜레이
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isScrolling, sections.length]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transform = `translateY(-${currentSection * 100}vh)`;
    }
  }, [currentSection]);


  /** 모바일 터치 이벤트 핸들러 */
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (isScrolling) return;
    setIsScrolling(true);

    const touchDiff = touchStartY.current - touchEndY.current;

    if (touchDiff > 50) {
      // 아래로 스크롤
      setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
    } else if (touchDiff < -50) {
      // 위로 스크롤
      setCurrentSection((prev) => Math.max(prev - 1, 0));
    }

    setTimeout(() => setIsScrolling(false), 800);
  };

  return (
    <PageLoader>
      <div
        className="intro"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* 비디오 백그라운드 */}
        <div className="video-background">
          <video
            ref={videoRef}
            src="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/intro.mp4"
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            className="background-video"
          />
          <div className="video-overlay" />
        </div>

        {/* 섹션 컨테이너 */}
        <div className="intro-container" ref={containerRef}>
          {/* 섹션 1: 비디오와 텍스트 */}
          <div className="section">
            <div className="text-overlay">House of Furniture</div>
          </div>

          {/* 섹션 2: 쇼핑 */}
          <div className="section shopping-section">
            <h2 className="shopping-title">쇼핑</h2>
            <Card className="product-card">
              <Card.Img
                variant="top"
                src="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/intro.png"
                className="product-image"
                loading="lazy"
              />
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title className="product-name text-center">
                  House of Furniture <br />
                  <span className="product-subtitle">(우아한 3형제)</span>
                </Card.Title>

                <div className="price-section d-flex justify-content-center align-items-center">
                  <span className="discount">20%</span>
                  <span className="price">10,000 원</span>
                </div>

                <div className="d-flex justify-content-center align-items-center rating-section mt-2">
                  <FontAwesomeIcon icon={faStar} className="star-icon" />
                  <span className="rating">5.0</span>
                  <span className="reviews">(30)</span>
                </div>
              </Card.Body>
            </Card>
          </div>

          {/* 섹션 3: 커뮤니티 */}
          <div className="section community-section">
            <h2 className="community-title">커뮤니티 / 인테리어</h2>
            <Card className="community-card">
              <Card.Img
                variant="top"
                src="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/intro.png"
                className="community-image"
                loading="lazy"
              />
              <div className="d-flex justify-content-between align-items-start mt-3">
                <div className="d-flex align-items-center mb-2">
                  <img
                    src="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/intro.png"
                    alt="Profile"
                    className="profile-icon"
                    loading="lazy"
                  />
                  <span className="ms-2 fw-bold text-dark">Home Design</span>
                </div>
                <div className="d-flex align-items-center text-muted">
                  <FontAwesomeIcon icon={faHeart} className="me-1" />
                  <span className="me-3">389</span>
                  <FontAwesomeIcon icon={faComment} className="me-1" />
                  <span>178</span>
                </div>
              </div>
            </Card>
          </div>

          {/* 섹션 4: 앱 다운로드 */}
          <div className="section app-download-section">
            
            <h2 className="app-download-title"> 
              <a href="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/app-release.apk" className="text-black" style={{textDecorationLine:"blink"}}>
                앱 다운로드
              </a>
            </h2>
            <a href="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/app-release.apk">
            <img
              src="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/AppLogo2.png"
              alt="앱 다운로드 아이콘"
              className="app-download-icon"
              loading="lazy"
            />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className={`footer-intro ${currentSection === sections.length - 1 ? "show" : ""}`}>
  <div className="container footer-content d-flex flex-column flex-md-row justify-content-around align-items-center text-light">
    
    {/* 회사 정보 */}
    <div className="footer-info text-center text-md-start">
      <div className="mb-3">
        {/* 파일 다운로드 링크 */}
        <a href="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/%EC%A0%95%EC%9D%98%EC%84%9C.xlsx" download="정의서.xlsx" target="_blank" rel="noopener noreferrer">정의서</a> /{" "}
        <a href="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/WBS.xlsx" download="WBS.xlsx" target="_blank" rel="noopener noreferrer">WBS</a> /{" "}
        <a href="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/ERD.xlsx" download="ERD.xlsx" target="_blank" rel="noopener noreferrer">ERD</a> / 프로토타입 / PPT <br />
        <a href="http://hof.lshwan.com/api/v1/swagger-ui/index.html" target="_blank" rel="noopener noreferrer">Swagger</a> /{" "}
        <a href="https://hof.lshwan.com/jacoco/index.html" target="_blank" rel="noopener noreferrer"> Jacoco</a> / 
        <a href="https://github.com/seunghwan94" target="_blank" rel="noopener noreferrer"> GitHub </a>[ 
        <a href="https://github.com/seunghwan94/hof-front" target="_blank" rel="noopener noreferrer"> Front </a>| 
        <a href="https://github.com/seunghwan94/hof-back" target="_blank" rel="noopener noreferrer"> Back </a>]<br />
      </div>
      <small>
        서울 구로구 디지털로 306 대륭포스트타워 2차 203호<br />
        대표번호: 010-xxxx-xxxx<br />
        Copyright ⓒ 2024 - 2024 dcinside. All rights reserved.
      </small>
    </div>

    {/* 앱 다운로드 아이콘 */}
    <div className="footer-icons d-flex gap-3">
      {/* GitHub 링크 */}
      <a href="https://github.com/seunghwan94" target="_blank" rel="noopener noreferrer">
        <img 
          src="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/github-icon.svg" 
          alt="GitHub 아이콘" 
          className="footer-icon github-icon"
        />
      </a>

      {/* Gmail 링크 */}
      <a href="mailto:seunghwan94.dev@gmail.com">
        <img 
          src="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/Gmail_icon.svg" 
          alt="Gmail 아이콘" 
          className="footer-icon"
        />
      </a>

      {/* App Logo */}
      <a href="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/app-release.apk">
        <img 
          src="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/AppLogo2.png" 
          alt="Hof 아이콘" 
          className="footer-icon"
        />
      </a>
    </div>

  </div>
</div>

      </div>
    </PageLoader>
  );
};

export default Intro;
