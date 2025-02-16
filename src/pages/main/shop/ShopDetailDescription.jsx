import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const ShopDetailDescription = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("5rem"); // 기본 높이

  useEffect(() => {
    if (isExpanded) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`); // 실제 높이로 설정
    } else {
      setMaxHeight("100rem"); // 기본값
    }
  }, [isExpanded]);

  return (
    <div className="shop-detail-description">
      <h4 className="fw-bold">제품 설명</h4>
      <div
        ref={contentRef}
        className="content-wrapper"
        style={{ maxHeight }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className="d-flex justify-content-center"> 
        <button
          className="btn btn-hof toggle-btn w-75"
          onClick={() => setIsExpanded(!isExpanded)}
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
