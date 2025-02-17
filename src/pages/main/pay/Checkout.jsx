import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderData } = location.state;

  useEffect(() => {
    // IAMPORT 스크립트 추가
    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.IMP) {
        const IMP = window.IMP;
        IMP.init("imp17043604"); // 가맹점 식별 코드 입력

        const paymentData = {
          pg: "html5_inicis", // PG사 선택
          pay_method: "card", // 결제 수단
          merchant_uid: `order_${new Date().getTime()}`, // 주문 고유번호
          name: orderData.product.title, // 상품명
          amount: orderData.total_price, // 가격
          buyer_email: orderData.buyer.email,
          buyer_name: orderData.buyer.name,
          buyer_tel: orderData.buyer.phone,
          buyer_addr: orderData.buyer.address,
          buyer_postcode: orderData.buyer.zipcode,
        };

        IMP.request_pay(paymentData, async (response) => {
          if (response.success) {
            try {
              const res = await fetch("/pay/validate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  imp_uid: response.imp_uid,
                  merchant_uid: response.merchant_uid,
                }),
              });

              const result = await res.json();
              if (result.success) {
                navigate("/payment-success");
              } else {
                alert("결제 검증 실패");
                navigate("/payment-failed");
              }
            } catch (err) {
              console.error(err);
              alert("결제 검증 중 오류 발생");
            }
          } else {
            alert(`결제 실패: ${response.error_msg}`);
            navigate("/payment-failed");
          }
        });
      } else {
        alert("결제 모듈 로딩 실패. 페이지를 새로고침 해주세요.");
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [orderData, navigate]);

  return (
    <div className="checkout">
      <h2>결제 진행 중...</h2>
      <Button onClick={() => navigate("/shop")}>돌아가기</Button>
    </div>
  );
};

export default Checkout;
