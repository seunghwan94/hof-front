import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import useAxios from "../../../hooks/useAxios";

const loadIamportScript = () => {
  return new Promise((resolve, reject) => {
    if (window.IMP) {
      resolve(window.IMP);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
    script.async = true;
    script.onload = () => resolve(window.IMP);
    script.onerror = () => reject(new Error("❌ Iamport 스크립트 로딩 실패"));
    document.body.appendChild(script);
  });
};

const Pay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state?.orderData;
  const { req } = useAxios();
  const isProcessingRef = useRef(false); // ✅ 중복 요청 방지

  useEffect(() => {
    if (!orderData?.items?.length) {
      alert("❌ 주문 정보가 없습니다.");
      navigate("/payment-failed");
      return;
    }

    if (!orderData.buyer?.mno) {
      alert("❌ 회원 정보가 올바르지 않습니다.");
      navigate("/payment-failed");
      return;
    }

    const createOrder = async () => {
      if (isProcessingRef.current) return;
      isProcessingRef.current = true;

      console.log("🔹 mno:", orderData.buyer.mno);
      console.log("🔹 orderData:", orderData);

      try {
        // 1️⃣ 주문 생성 요청
        const orderResponse = await req("POST", "main/order/create", {
          mno: orderData.buyer.mno,
          items: orderData.items,
        });

        console.log("🔹 서버 응답:", orderResponse);

        if (!orderResponse || !orderResponse.no) {
          alert(`❌ 주문 생성 실패\n서버 응답: ${JSON.stringify(orderResponse)}`);
          navigate("/payment-failed");
          return;
        }

        const orderNo = orderResponse.no;
        console.log("✅ 생성된 orderNo:", orderNo);

        const IMP = await loadIamportScript();
        if (!IMP) {
          alert("❌ 결제 모듈 로딩 실패");
          return;
        }

        IMP.init("imp17043604"); // 아임포트 가맹점 코드

        // ✅ `orderData.paymentMethod` 값에 따라 `pg` 및 `pay_method` 설정
        // const paymentMethod = orderData.paymentMethod;
        // const paymentPg = paymentMethod === "신용카드" ?  : "kcp";
        // const payMethod = paymentMethod === "신용카드" ? "card" : "trans";

        // 2️⃣ 결제 요청
        const paymentData = {
          pg: "html5_inicis.INIpayTest",
          pay_method: "card",
          merchant_uid: `order_${orderNo}_${new Date().getTime()}`,
          name: orderData.product.title,
          amount: orderData.total_price,
        };

        console.log("🔹 결제 요청 데이터:", paymentData);

        IMP.request_pay(paymentData, async (response) => {
          if (response.success) {
            console.log("✅ 결제 성공, imp_uid:", response.imp_uid);
            console.log("✅ orderNo :", orderNo);
        
            try {
              // 3️⃣ 결제 요청 저장 (🔥 추가됨!)
              const payResponse = await req("POST", "main/pay/pay", {
                orderNo,
                method: "카드",
                totalPrice: orderData.total_price,
              });
        
              console.log("🔹 결제 요청 저장 응답:", payResponse);
        
              if (!payResponse || !payResponse.no) {
                alert("❌ 결제 정보 저장 실패");
                navigate("/payment-failed");
                return;
              }
        
              console.log("✅ 결제 요청, imp_uid:", response.imp_uid);
              console.log("✅ orderNo :", orderNo);

              // 4️⃣ 결제 검증 요청
              const paymentResponse = await req("POST", "main/pay/complete", {
                orderNo,
                imp_uid: response.imp_uid,
                method: "카드",
              });
        
              console.log("🔹 결제 완료 응답:", paymentResponse);
        
              // 5️⃣ 결제 성공 검증
              if (!paymentResponse || paymentResponse.status !== "완료") {
                alert("❌ 결제 완료 처리 실패. 고객센터에 문의하세요.");
                navigate("/payment-failed");
                return;
              }
        
              // 6️⃣ 최종 결제 성공 처리
              navigate("/payment-success");
            } catch (error) {
              alert(`❌ 결제 확인 요청 중 오류 발생: ${error.message}`);
              navigate("/payment-failed");
            }
          } else {
            alert(`❌ 결제 실패: ${response.error_msg}`);
            navigate("/payment-failed");
          }
        });
      } catch (error) {
        alert(`❌ 주문 생성 중 오류 발생: ${error.message}`);
        navigate("/payment-failed");
      }
    };

    createOrder();
  }, [orderData, navigate, req]); // ✅ `isProcessing` 제거하여 무한 루프 방지

  return (
    <Container className="checkout mt-5 text-center">
      <h2>결제 진행 중...</h2>
      <Button className="mt-3" onClick={() => navigate("/shop")} disabled={isProcessingRef.current}>
        돌아가기
      </Button>
    </Container>
  );
};

export default Pay;
