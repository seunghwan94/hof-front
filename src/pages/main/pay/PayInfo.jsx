import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";

const PaymentInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;

  if (!orderData) {
    return <h2 className="text-center mt-5">결제 정보를 불러올 수 없습니다.</h2>;
  }
  console.log(orderData.product.price);
  const handlePayment = () => {
    // IAMPORT 결제 연동 로직 추가 예정
    console.log("결제 진행", orderData);
    alert("결제가 완료되었습니다!");
    navigate("/");
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
        <p className="text-end mt-2 mb-0 "><strong>수량 : </strong> {orderData.quantity}개&nbsp;&nbsp;&nbsp;&nbsp;<strong>가격 : </strong> ₩{orderData.product.price.toLocaleString()}</p>
        <h5 className="fw-bold mt-3">선택한 옵션</h5>
        {orderData.options.map((option, index) => (
          <div>
            <p key={index}><strong>{option.value}</strong></p>
            <p className="text-end mb-0 text-secondary">+₩{option.addPrice.toLocaleString()}</p>
          </div>
        ))}
        
        <strong className="mt-2">총 가격</strong>
        <p className="text-end text-primary fw-bold"> ₩{orderData.total_price.toLocaleString()}</p>
        
        <hr/>
        <h4 className="fw-bold">결제 방법</h4>
        <Form>
          <Form.Check
            type="radio"
            label="신용카드"
            name="paymentMethod"
            defaultChecked
          />
          <Form.Check type="radio" label="계좌이체" name="paymentMethod" />
        </Form>

        <Button className="w-100 mt-4 fw-bold btn-hof" onClick={handlePayment}>
          결제하기
        </Button>
      </Card>
    </Container>
  );
};

export default PaymentInfo;
