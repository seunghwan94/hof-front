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
  }, [isScrolling]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transform = `translateY(-${currentSection * 100}vh)`;
    }
  }, [currentSection]);

  return (
    <PageLoader>
      <div className="intro">
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
            <h2 className="app-download-title">앱 다운로드</h2>
            <img
              src="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/AppLogo.svg"
              alt="앱 다운로드 아이콘"
              className="app-download-icon"
              loading="lazy"
            />
          </div>
        </div>

        {/* Footer */}
        <div className={`footer-intro ${currentSection === sections.length - 1 ? "show" : ""}`}>
          <div className="container footer-content d-flex flex-column flex-md-row justify-content-around align-items-center text-light">
            <div className="footer-info text-center text-md-start">
              <div className="mb-3">
                정의서 / WBS / ERD / 프로토타입 / PPT <br />
                Swagger / Jacoco /
              </div>
              <small>
                서울 구로구 디지털로 306 대륭포스트타워 2차 203호
                <br />
                대표번호: 010-xxxx-xxxx
                <br />
                Copyright ⓒ 2024 - 2024 dcinside. All rights reserved.
              </small>
            </div>
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
      </div>
    </PageLoader>
  );
};

export default Intro;
