import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Form, Nav, Tab } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart, faStar } from "@fortawesome/free-solid-svg-icons";
import "../../../styles/shop.scss";

// 더미 상품 데이터
const allProducts = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  images: [
    "https://via.placeholder.com/400",
    "https://via.placeholder.com/100",
    "https://via.placeholder.com/100",
    "https://via.placeholder.com/100"
  ],
  name: `NEW컬러 유아KC 인증 방수매트리스 커버 ${index + 1}`,
  category: "침대 커버",
  price: Math.floor(Math.random() * 1000000) + 5000,
  options: {
    size: ["S", "M", "L"],
    color: ["화이트", "그레이", "블루"],
  },
  rating: (Math.random() * 5).toFixed(1),
  reviews: [
    { user: "개똥이", text: "상품이 좋네요", rating: 5 },
    { user: "홍길동", text: "만족합니다", rating: 4 },
    { user: "이몽룡", text: "배송이 빨랐어요", rating: 5 }
  ],
  inquiries: [
    { user: "김철수", text: "배송은 얼마나 걸리나요?" },
    { user: "박영희", text: "색상이 정확한가요?" }
  ]
}));

const ShopDetail = () => {
  const { id } = useParams();
  const product = allProducts.find((p) => p.id === parseInt(id));

  // 🛠 Hook을 조건문 바깥에서 항상 실행하도록 수정
  const [selectedImage, setSelectedImage] = useState(product ? product.images[0] : ""); 
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product ? product.options.size[0] : "");
  const [selectedColor, setSelectedColor] = useState(product ? product.options.color[0] : "");

  const [reviewText, setReviewText] = useState(""); // 리뷰 작성 상태
  const [inquiryText, setInquiryText] = useState(""); // 문의 작성 상태

  if (!product) {
    return <h2 className="text-center mt-5">상품을 찾을 수 없습니다.</h2>;
  }

  return (
    <Container className="mt-5">
      <Row className="shop-detail">
        {/* 상품 이미지 */}
        <Col md={6} className="d-flex flex-column align-items-center">
          <img src={selectedImage} alt="상품" className="main-image mb-3" />
          <div className="d-flex gap-2">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="썸네일"
                className="thumbnail"
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </Col>

        {/* 상품 정보 */}
        <Col md={6}>
          <h3 className="fw-bold">{product.name}</h3>
          <p className="text-muted">{product.category}</p>

          {/* 옵션 선택 */}
          <hr />
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-bold">옵션</span>
            <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
          </div>
          <hr />

          <Row className="mb-3">
            <Col xs={6}>
              <label className="fw-bold">수량</label>
              <Form.Control
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
              />
            </Col>
            <Col xs={6}>
              <label className="fw-bold">사이즈</label>
              <Form.Select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                {product.options.size.map((size, index) => (
                  <option key={index} value={size}>{size}</option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={6}>
              <label className="fw-bold">색상</label>
              <Form.Select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                {product.options.color.map((color, index) => (
                  <option key={index} value={color}>{color}</option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          {/* 가격 */}
          <hr />
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-bold">가격</span>
            <span className="fw-bold text-primary">₩{(product.price * quantity).toLocaleString()}</span>
          </div>
          <hr />

          {/* 결제 버튼 */}
          <Button variant="dark" className="w-100 fw-bold">결제</Button>
        </Col>
      </Row>

      <hr />
      <h4 className="fw-bold">제품 설명</h4>
      <p>이 제품은 고객들에게 최고의 편안함을 제공합니다.</p>

      {/* 탭 UI */}
      <Tab.Container defaultActiveKey="reviews">
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="reviews">고객 리뷰</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="inquiries">상품 문의</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content className="mt-3">
          {/* 고객 리뷰 섹션 */}
          <Tab.Pane eventKey="reviews">
            <Row>
              <Col md={4} className="text-center">
                <FontAwesomeIcon icon={faStar} className="text-warning" size="3x" />
                <h2 className="fw-bold">{product.rating}</h2>
              </Col>
              <Col md={8}>
                {product.reviews.map((review, index) => (
                  <div key={index} className="border-bottom py-3">
                    <strong>{review.user}</strong>
                    <p>{review.text}</p>
                  </div>
                ))}
              </Col>
            </Row>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="리뷰를 작성하세요"
              className="mt-3"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <Button variant="primary" className="mt-2">리뷰 등록</Button>
          </Tab.Pane>

          {/* 상품 문의 섹션 */}
          <Tab.Pane eventKey="inquiries">
            {product.inquiries.map((inquiry, index) => (
              <div key={index} className="border-bottom py-3">
                <strong>{inquiry.user}</strong>
                <p>{inquiry.text}</p>
              </div>
            ))}
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="문의 내용을 작성하세요"
              className="mt-3"
              value={inquiryText}
              onChange={(e) => setInquiryText(e.target.value)}
            />
            <Button variant="secondary" className="mt-2">문의 등록</Button>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default ShopDetail;
