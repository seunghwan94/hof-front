import React from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // ✅ 네비게이션 추가

const ProductCard = ({ id, image, name, rating, reviews, price, discount }) => {
  const navigate = useNavigate(); // ✅ 네비게이션 Hook 사용

  return (
    <Card 
      className="product-card-shop" 
      onClick={() => navigate(`/shop/detail/${id}`)} // ✅ 상품 클릭 시 상세 페이지로 이동
      style={{ cursor: "pointer" }}
    >
      <Card.Img variant="top" src={image} className="product-image-shop" />
      <Card.Body>
        <Card.Title className="product-name-shop">{name}</Card.Title>
        
        {/* 가격 및 할인 */}
        <div className="price-section-shop">
          <span className="discount-shop">{discount}%</span>
          <span className="price-shop">{price.toLocaleString()} 원</span>
        </div>

        {/* 별점 및 리뷰 수 */}
        <div className="d-flex align-items-center rating-section">
          <FontAwesomeIcon icon={faStar} className="star-icon-shop" />
          <span className="rating-shop">{rating}</span>
          <span className="reviews-shop">({reviews})</span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
