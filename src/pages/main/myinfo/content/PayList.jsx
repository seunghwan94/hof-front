import React, { useEffect, useState, useCallback } from "react";
import useAxios from "../../../../hooks/useAxios";
import "../../../../styles/myinfo/paylist.scss"; // ✅ SCSS 전역 import

function PayList() {
  const { req, loading, error } = useAxios();
  const [orders, setOrders] = useState([]);
  const memberNo = JSON.parse(localStorage.getItem("member"))?.mno;

  // ✅ 주문 내역 가져오는 함수 (useCallback 적용)
  const fetchOrders = useCallback(async () => {
    try {
      const response = await req("GET", `main/order/history/${memberNo}`);
      setOrders(response);
    } catch (err) {
      console.error("❌ 주문 내역 불러오기 실패:", err);
    }
  }, [req, memberNo]);

  // ✅ 페이지 로드 시 & 환불 요청 후 데이터 새로고침
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // ✅ 환불 요청 함수
  const handleRefund = async (payNo) => {
    const reason = prompt("환불 사유를 입력하세요:");
    if (!reason) {
      alert("❌ 환불 사유를 입력해야 합니다.");
      return;
    }
  
    const confirmRefund = window.confirm(`환불 요청하시겠습니까?\n사유: ${reason}`);
    if (!confirmRefund) return;
  
    try {
      // ✅ JSON Body로 데이터 전송하도록 수정
      await req("POST", `main/refund/request?payNo=${payNo}&reason=${reason}`);
      alert("✅ 환불 요청이 완료되었습니다.");
      
      // ✅ 환불 후 최신 데이터 다시 불러오기 (자동 재렌더링 유도)
      await fetchOrders();
    } catch (err) {
      console.error("❌ 환불 요청 실패:", err);
      alert("❌ 환불 요청 중 오류가 발생했습니다.");
    }
  };

  if (loading) return <p>⏳ 로딩 중...</p>;
  if (error) return <p>❌ 오류 발생: {error.message}</p>;
  
  return (
    <div className="paylist-container">
      <h2>📦 구매 내역</h2>
      {orders.length === 0 ? (
        <p>📭 구매 내역이 없습니다.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.orderNo} className="paylist-item">
              <span className="date">{order.orderDate}</span>
              <span className="product-name">{order.productName}</span>
              <span className="price">{order.totalPrice.toLocaleString()} 원</span>
              <span className="status">{order.deliveryStatus}</span>

              <button
                className={`refund-button ${order.refunded ? "disabled" : "enabled"}`}
                onClick={() => handleRefund(order.payNo)}
                disabled={order.refunded}
              >
                {order.refunded ? "환불 완료" : "환불"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PayList;
