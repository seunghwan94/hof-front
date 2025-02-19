import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";

const PaymentInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;

  // ✅ 선택된 결제 방법 상태 관리
  const [paymentMethod, setPaymentMethod] = useState("신용카드");

  if (!orderData) {
    return <h2 className="text-center mt-5">결제 정보를 불러올 수 없습니다.</h2>;
  }

  // ✅ 결제 버튼 클릭 시 실행 (결제 방법 포함)
  const handlePayment = () => {
    console.log("결제 진행", orderData.buyer);
    navigate("/Pay", { state: { orderData: { ...orderData, paymentMethod } } });
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">결제 정보</h2>
      <Card className="p-4 shadow-sm">
        <Row>
          <Col md={6}>
            <h4 className="fw-bold">구매자 정보</h4>
            <p><strong>이름:</strong> {orderData.buyer.name}</p>
            <p><strong>이메일:</strong> {orderData.buyer.email}</p>
            <p><strong>연락처:</strong> {orderData.buyer.phone}</p>
          </Col>
          <Col md={6}>
            <h4 className="fw-bold">배송지 정보</h4>
            <p><strong>주소:</strong> {orderData.buyer.address}</p>
            <p><strong>우편번호:</strong> {orderData.buyer.zipcode}</p>
          </Col>
        </Row>

        <hr />
        <h4 className="fw-bold">결제 상품 정보</h4>

        <p><strong>상품명:</strong> {orderData.product.title}</p>
        <p className="text-end"></p>
        <p className="text-end mt-2 mb-0 ">
          <strong>수량 : </strong> {orderData.quantity}개&nbsp;&nbsp;&nbsp;&nbsp;
          <strong>가격 : </strong> ₩{orderData.product.price.toLocaleString()}
        </p>

        <h5 className="fw-bold mt-3">선택한 옵션</h5>
        {orderData.options.map((option, index) => (
          <div key={index}>  {/* ✅ key 속성을 div로 이동 */}
            <p><strong>{option.value}</strong></p>
            <p className="text-end mb-0 text-secondary">+₩{option.addPrice.toLocaleString()}</p>
          </div>
        ))}

        <strong className="mt-2">총 가격</strong>
        <p className="text-end text-primary fw-bold">
          ₩{orderData.total_price.toLocaleString()}
        </p>

        <hr />
        <h4 className="fw-bold">결제 방법</h4>
        {/* ✅ 선택한 결제 방법을 상태로 관리 */}
        <Form>
          <Form.Check
            type="radio"
            label="신용카드"
            name="paymentMethod"
            value="카드"
            checked={paymentMethod === "신용카드"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          {/* <Form.Check
            type="radio"
            label="계좌이체"
            name="paymentMethod"
            value="계좌이체"
            checked={paymentMethod === "계좌이체"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          /> */}
        </Form>

        <Button className="w-100 mt-4 fw-bold btn-hof" onClick={handlePayment}>
          결제하기
        </Button>
      </Card>
    </Container>
  );
};

export default PaymentInfo;
