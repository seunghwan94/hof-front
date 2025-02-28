import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const ShopDetailDescription = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("5rem"); // 초기값을 "5rem"으로 설정
  const [isAnimating, setIsAnimating] = useState(false); // 애니메이션 중인지 확인

  useEffect(() => {
    if (!contentRef.current) return;

    if (isExpanded) {
      setIsAnimating(true);
      setTimeout(() => {
        if (contentRef.current) {
          setMaxHeight(`${contentRef.current.scrollHeight}px`); //정확한 높이 적용
        }
      }, 10); //setTimeout을 사용해 렌더링 이후 실행
    } else {
      setIsAnimating(true);
      setMaxHeight("5rem"); //기본값으로 축소
    }

    // 애니메이션이 끝나면 상태 업데이트
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [isExpanded]);

  return (
    <div className="shop-detail-description">
      <h4 className="fw-bold">제품 설명</h4>
      <div
        ref={contentRef}
        className="content-wrapper"
        style={{
          maxHeight,
          overflow: "hidden",
          transition: "max-height 0.3s ease-in-out", 
        }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-hof toggle-btn w-75"
          onClick={() => !isAnimating && setIsExpanded(!isExpanded)} // 애니메이션 중에는 클릭 방지
          disabled={isAnimating} // 애니메이션 중 버튼 클릭 방지
        >
          {isExpanded ? "접기" : "더보기"}
        </button>
      </div>
    </div>
  );
};

// PropTypes 설정
ShopDetailDescription.propTypes = {
  content: PropTypes.string.isRequired,
};

export default ShopDetailDescription;
