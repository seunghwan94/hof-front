import React from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, image, name, rating, reviews, price, discount }) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="product-card-shop" 
      onClick={() => navigate(`/shop/detail/${id}`)}
    >
      {/* 상품 이미지 */}
      <Card.Img 
        variant="top" 
        src={image} 
        className="product-image-shop"
      />

      <Card.Body className="product-body-shop" style={{ display:'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        {/* 상품명 (상단 고정) */}
        <Card.Title className="product-name-shop">{name}</Card.Title>

        {/* 가격, 할인, 별점 (하단 정렬) */}
        <div className="product-footer-shop">
          <div className="price-section-shop">
            <span className="discount-shop">{discount}%</span>
            <span className="price-shop">{price.toLocaleString()} 원</span>
          </div>
          <div className="d-flex align-items-center rating-section">
            <FontAwesomeIcon icon={faStar} className="star-icon-shop" />
            <span className="rating-shop">{rating}</span>
            <span className="reviews-shop">({reviews})</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
