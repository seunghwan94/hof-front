import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Form, Nav, Tab } from "react-bootstrap";
import useAxios from "../../../hooks/useAxios";
import "../../../styles/shop.scss";
import ShopDetailDescription from "./ShopDetailDescription";
import ShopDetailReviews from "./ShopDetailReviews";
import ShopDetailInquiries from "./ShopDetailInquiries";

const ShopDetail = () => {
  const { id } = useParams();
  const { req, loading, error } = useAxios();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await req("GET", `prod/${id}`);
        setProduct(data);
        if (data.imageUrls.length > 0) {
          setSelectedImage(data.imageUrls[0]);
        }
        if (data.options.length > 0) {
          setSelectedOption(data.options[0]);
        }
      } catch (err) {
        console.error("상품 불러오기 실패:", err);
      }
    };

    fetchProduct();
  }, [id, req]);

  if (loading) return <h2 className="text-center mt-5">로딩 중...</h2>;
  if (error) return <h2 className="text-center mt-5 text-danger">상품을 불러오는 중 오류 발생</h2>;
  if (!product) return <h2 className="text-center mt-5">상품을 찾을 수 없습니다.</h2>;

  return (
    <Container className="mt-5">
      <Row className="shop-detail">
        <Col md={6} className="d-flex flex-column align-items-center">
          <img src={selectedImage} alt="상품" className="main-image mb-3" />
          <div className="d-flex gap-2">
            {product.imageUrls.map((img, index) => (
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

        <Col md={6}>
          <h3 className="fw-bold">{product.title}</h3>
          <p className="text-muted">{product.content.replace(/<\/?[^>]+(>|$)/g, "")}</p>

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
              <label className="fw-bold">옵션 선택</label>
              <Form.Select
                value={selectedOption ? selectedOption.optionNo : ""}
                onChange={(e) =>
                  setSelectedOption(product.options.find((opt) => opt.optionNo === parseInt(e.target.value)))
                }
              >
                {product.options.map((option) => (
                  <option key={option.optionNo} value={option.optionNo}>
                    {option.value} (+₩{option.addPrice.toLocaleString()})
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          <hr />
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-bold">가격</span>
            <span className="fw-bold text-primary">
              ₩{((product.price + (selectedOption?.addPrice || 0)) * quantity).toLocaleString()}
            </span>
          </div>
          <hr />

          <Button variant="dark" className="w-100 fw-bold">결제</Button>
        </Col>
      </Row>

      <hr />
      {/* 제품 설명 컴포넌트 */}
      <ShopDetailDescription content={product.content} />
      <hr/>
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
          <Tab.Pane eventKey="reviews">
            <ShopDetailReviews pno={product.pno} />
          </Tab.Pane>
          <Tab.Pane eventKey="inquiries">
            <ShopDetailInquiries pno={product.pno} />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default ShopDetail;
