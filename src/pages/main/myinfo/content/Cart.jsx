import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../../../hooks/useAxios";
import CartItem from "./CartItem";
import "../../../../styles/myinfo/cart.scss";

const Cart = () => {
  const { data, loading, error, req } = useAxios();
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const cartItemRefs = useRef([]);

  useEffect(() => {
    const fetchCart = async () => {
      const userId = 23; // 🔄 실제 회원 ID로 교체
      const res = await req("get", `main/cart/${userId}`);
      if (res) {
        setCartItems(res);
      }
    };
    fetchCart();
  }, [req]);
 // ✅ 임시저장
 const handleSave = async () => {
    try {
      await req("put", "main/cart/save", cartItems);
      alert("임시저장 완료!");
    } catch (err) {
      alert("임시저장 실패");
    }
  };
  // ✅ 결제 - PayInfo로 데이터 전달
  const handleCheckout = () => {
    // 모든 CartItem의 최신 상태 가져오기
    const updatedCartItems = cartItemRefs.current.map(ref => ref.getItemData());

    // 전체 결제 금액 계산
    const total_price = updatedCartItems.reduce((acc, item) => {
      // 옵션 추가 금액 계산
      const optionsTotal = item.selectedOptions.reduce((sum, optionNo) => {
        const option = item.options?.find(opt => opt.optionNo === optionNo);
        return sum + (option ? option.addPrice : 0);
      }, 0);

      // 아이템 총 가격 (기본 가격 + 옵션) * 수량
      const itemTotal = (item.price + optionsTotal) * item.quantity;

      return acc + itemTotal; // 누적합
    }, 0);

    req("delete", `main/cart/all/${23}`);


    const orderData = {
      
      buyer: {
        mno : 24,
        name: "홍길동", // 🔄 실제 데이터로 교체 필요
        email: "hong@example.com",
        phone: "010-1234-5678",
        address: "서울특별시 강남구",
        zipcode: "12345",
      },
      products: updatedCartItems.map(item => ({
        pno: item.pno,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        options: item.selectedOptions,
        availableOptions: item.options, // 전체 옵션 목록 추가
      })),
      total_price,
    };

    console.log("최종 결제 데이터:", orderData); // ✅ 디버깅
    navigate("/PayInfo", { state: { orderData } });
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error.message}</p>;

  return (
    <div className="cart-container">
      <h2>장바구니</h2>

      {cartItems.length === 0 ? (
        <p>장바구니가 비어 있습니다.</p>
      ) : (
        <div className="cart-list">
          {cartItems.map((item, index) => (
            <CartItem
              key={item.pno}
              item={item}
              onDelete={(cartNo) => setCartItems(prev => prev.filter(ci => ci.cartNo !== cartNo))}
              ref={(el) => (cartItemRefs.current[index] = el)} // ✅ ref 연결
            />
          ))}

          <div className="cart-actions text-end">
            <button className="btn btn-hof mx-3" onClick={handleSave}>임시저장</button>
            <button className="btn btn-hof mx-3" onClick={handleCheckout}>결제하기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
