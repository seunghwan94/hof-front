import React from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function ProductCard({ image, name, rating, reviews, price, discount }) {
  return (
    <Card className="product-card">
      {/* 상품 이미지 */}
      <Card.Img variant="top" src={image} className="product-image" />

      {/* 상품 정보 */}
      <Card.Body>
        <Card.Title className="product-name">{name}</Card.Title>

        

        {/* 가격 및 할인 */}
        <div className="price-section">
          {discount && <span className="discount">{discount}%</span>}
          <span className="price">{price.toLocaleString()}원</span>
        </div>

        {/* 별점 및 리뷰 수 */}
        <div className="d-flex align-items-center">
          <FontAwesomeIcon icon={faStar} className="star-icon" />
          <span className="rating">{rating}</span>
          <span className="reviews">({reviews.toLocaleString()})</span>
        </div>

      </Card.Body>
    </Card>
  );
}

export default ProductCard;
