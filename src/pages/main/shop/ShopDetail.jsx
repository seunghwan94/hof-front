import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const [selectedOptions, setSelectedOptions] = useState([]);

  const navigate = useNavigate();

  const handlePay = () => {
    const orderData = {
      product: product,
      quantity: quantity,
      options: selectedOptions,
      total_price: totalPrice,
      buyer: {
        mno : 24,
        name: "우아한삼형제1", // 로그인 유저 데이터로 대체 가능
        email: "hof1",
        phone: "010-1234-5678",
        address: "서울시 강남구",
        zipcode: "12345",
      },
      items: selectedOptions.map((option, idx) => ({
        pno: product.pno,
        count: quantity,
        basePrice: product.price,
        subtotalPrice: product.price + option.addPrice,
        optionNo : option.optionNo  
      })),
    };
  
    console.log("생성된 주문 데이터:", orderData); // ✅ 콘솔에서 확인
    navigate("/PayInfo", { state: { orderData } });
  };
  


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await req("GET", `main/prod/${id}`);
        setProduct(data);
        if (data.imageUrls.length > 0) {
          setSelectedImage(data.imageUrls[0]);
        }
        if (data.options.length > 0) {
          setSelectedOptions(new Array(quantity).fill(data.options[0]));
        }
      } catch (err) {
        console.error("상품 불러오기 실패:", err);
      }
    };

    fetchProduct();
  }, [id, req]);

  /** 수량이 변경될 때 옵션 선택 필드도 동적으로 변경 */
  useEffect(() => {
    if (product && product.options.length > 0) {
      setSelectedOptions((prevOptions) => {
        let newOptions = [...prevOptions];
        if (quantity > prevOptions.length) {
          // 수량이 증가할 경우 기본 옵션 추가
          newOptions = [...newOptions, ...new Array(quantity - prevOptions.length).fill(product.options[0])];
        } else {
          // 수량이 줄어들 경우 초과된 옵션 삭제
          newOptions = newOptions.slice(0, quantity);
        }
        return newOptions;
      });
    }
  }, [quantity, product]);

  /** 옵션 변경 핸들러 */
  const handleOptionChange = (index, optionNo) => {
    setSelectedOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index] = product.options.find((opt) => opt.optionNo === parseInt(optionNo));
      return newOptions;
    });
  };

  /** 최종 가격 계산 */
  const totalPrice =
    selectedOptions.reduce((acc, option) => acc + (product.price + option.addPrice), 0) ;

  if (loading) return <h2 className="text-center mt-5">로딩 중...</h2>;
  if (error) return <h2 className="text-center mt-5 text-danger">상품을 불러오는 중 오류 발생</h2>;
  if (!product) return <h2 className="text-center mt-5">상품을 찾을 수 없습니다.</h2>;

  return (
    <Container className="mt-4">
      {/* flex-wrap 적용하여 너비가 부족하면 자동 줄바꿈 */}
      <Row className="shop-detail d-flex flex-wrap align-items-start">
        {/* 이미지 영역 */}
        <Col md={6} sm={12} className="d-flex flex-column flex-md-row align-items-center">
          {/* 썸네일 리스트 */}
          <div className="d-flex flex-row flex-md-column gap-2 justify-content-center">
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
          {/* 메인 이미지 */}
          <img src={selectedImage} alt="상품" className="main-image mx-3 my-3" />
        </Col>

        {/* 상품 정보 */}
        <Col md={6} sm={12} className="d-flex flex-column p-3 shop-info">
          <h3 className="fw-bold">{product.title}</h3>
          <p className="text-muted product-content">{product.content.replace(/<\/?[^>]+(>|$)/g, "")}</p>

          <hr />
          <Row className="mb-3">
            <Col xs={6}>
              <label className="fw-bold">수량</label>
              <Form.Control
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              />
            </Col>
          </Row>

          {/* 수량에 따라 동적으로 옵션 선택 추가 */}
          {selectedOptions.map((option, index) => (
            <Row key={index} className="mb-3">
              <Col xs={12}>
                <label className="fw-bold">옵션 선택 {index + 1}</label>
                <Form.Select
                  value={option.optionNo}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                >
                  {product.options.map((opt) => (
                    <option key={opt.optionNo} value={opt.optionNo}>
                      {opt.value} (+₩{opt.addPrice.toLocaleString()})
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          ))}

          

          <hr />
          <div className="d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fw-bold">기본 가격</span>
              <span className="fw-bold">수량 : {quantity}</span>
              <span className="fw-bold">₩ {product.price}</span>
            </div>
            {selectedOptions.map((option, index) => (
              <div key={index} className="option-summary text-muted d-flex justify-content-between align-items-center">
                <span>선택 옵션 : {option.value}</span>
                <span className="fw-bold text-secondary">+ ₩ {option.addPrice.toLocaleString()}</span> 
              </div>
            ))}

            <div className="d-flex justify-content-between align-items-center mt-3">
              <span className="fw-bold">총 가격</span>
              <span className="fw-bold text-primary">₩ {totalPrice.toLocaleString()}</span>
            </div>
          </div>
          <hr />

          <Button className="w-100 fw-bold btn-hof" onClick={handlePay}>결제</Button>
        </Col>
      </Row>

      <hr />
      {/* 제품 설명 컴포넌트 */}
      <ShopDetailDescription content={product.content} />
      <hr />

      {/* 반응형 탭 UI */}
      <Tab.Container defaultActiveKey="reviews">
        <Nav variant="tabs" className="d-flex flex-column flex-md-row">
          <Nav.Item className="flex-grow-1 text-center">
            <Nav.Link eventKey="reviews">고객 리뷰</Nav.Link>
          </Nav.Item>
          <Nav.Item className="flex-grow-1 text-center">
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
