import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import useAxios from "../../../hooks/useAxios"; // useAxios를 가져옴

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderData } = location.state;
  const { req } = useAxios(); // useAxios 훅 사용

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.IMP) {
        const IMP = window.IMP;
        IMP.init("imp17043604"); // 가맹점 식별 코드 입력

        const paymentData = {
          pg: "html5_inicis.INIpayTest", // PG사 선택
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
              const result = await req("POST", "main/pay/validate", {
                imp_uid: response.imp_uid,
                merchant_uid: response.merchant_uid,
              });

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
  }, [orderData, navigate, req]);

  return (
    <div className="checkout">
      <h2>결제 진행 중...</h2>
      <Button onClick={() => navigate("/shop")}>돌아가기</Button>
    </div>
  );
};

export default Checkout;
