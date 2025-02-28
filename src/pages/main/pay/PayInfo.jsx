import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";

const PaymentInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;
  const member = localStorage.getItem("member");
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true; // 첫 실행 이후에는 false로 유지
      if (!member) {
        alert("로그인이 필요한 페이지 입니다.");
        navigate("/login");
      }
    }
  }, [member, navigate]);


  // ✅ 선택된 결제 방법 상태 관리
  const [paymentMethod, setPaymentMethod] = useState("카드");
  console.log(orderData);
  if (!orderData) {
    return <h2 className="text-center mt-5">결제 정보를 불러올 수 없습니다.</h2>;
  }

  // ✅ 결제 버튼 클릭 시 실행 (결제 방법 포함)
  const handlePayment = () => {
    // ✅ items 배열 생성
    const items = orderData.products.flatMap(product => 
      product.options.map(optionNo => {
        const option = product.availableOptions?.find(opt => opt.optionNo === optionNo);
        return {
          pno: product.pno || 0,
          count: product.quantity,
          basePrice: product.price,
          subtotalPrice: (product.price + (option?.addPrice || 0)),
          optionNo: optionNo,
        };
      })
    );
  
    // ✅ orderData에 items 추가 후 Pay로 전달
    const updatedOrderData = {
      ...orderData,
      items, // ✅ 추가
      paymentMethod,
    };
  
    console.log("결제 진행 - orderData:", updatedOrderData); // ✅ 디버깅
    navigate("/Pay", { state: { orderData: updatedOrderData } });
  };
  

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">결제 정보</h2>
      <Card className="p-4 shadow-sm">
        <Row>
          <Col md={6}>
            <h4 className="fw-bold">구매자 정보</h4>
            <p><strong>이름:</strong> {orderData.buyer?.name}</p>
            <p><strong>이메일:</strong> {orderData.buyer?.email}</p>
          </Col>
          <Col md={6}>
            <h4 className="fw-bold">배송지 정보</h4>
            <p><strong>주소:</strong> {orderData.buyer?.address}</p>
            <p><strong>우편번호:</strong> {orderData.buyer?.zipcode}</p>
          </Col>
        </Row>

        <hr />
        <h4 className="fw-bold">결제 상품 정보</h4>

        {Array.isArray(orderData.products) && orderData.products.length > 0 ? (
          orderData.products.map((product, idx) => (
            <div key={idx} className="mb-4">
              <p><strong>상품명:</strong> {product.title}</p>
              <p className="text-end mt-2 mb-0">
                <strong>수량 :</strong> {product.quantity}개&nbsp;&nbsp;&nbsp;&nbsp;
                <strong>가격 :</strong> ₩{product.price.toLocaleString()}
              </p>

              <h5 className="fw-bold mt-3">선택한 옵션</h5>
              {Array.isArray(product.options) && product.options.length > 0 ? (
                product.options.map((optionNo, index) => {
                  const option = product.availableOptions?.find(
                    (opt) => opt.optionNo === optionNo
                  );
                  return (
                    <div key={index}>
                      <p><strong>{option?.value || "옵션 정보 없음"}</strong></p>
                      <p className="text-end mb-0 text-secondary">
                        +₩{(option?.addPrice || 0).toLocaleString()}
                      </p>
                    </div>
                  );
                })
              ) : (
                <p>옵션 없음</p>
              )}
            </div>
          ))
        ) : (
          <p>결제할 상품이 없습니다.</p>
        )}

        <strong className="mt-2">총 가격</strong>
        <p className="text-end text-primary fw-bold">
          ₩{orderData.total_price?.toLocaleString() || 0}
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
            checked={paymentMethod === "카드"}
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
