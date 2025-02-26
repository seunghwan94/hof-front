import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../../../hooks/useAxios";
import CartItem from "./CartItem";
import "../../../../styles/myinfo/cart.scss";

const Cart = () => {
  const {  loading, error, req } = useAxios();
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const cartItemRefs = useRef([]);
  const [buyer, setBuyer] = useState(null);
  const userId = JSON.parse(localStorage.getItem("member"))?.mno;

  useEffect(() => {
    if (userId) {
      fetchBuyerData(userId);
    }
  }, [userId]);

  const fetchBuyerData = async (mno) => {
    try {
      const memberData = await req("GET", `common/member/${mno}`);

      if (memberData) {
        // 기본 주소 찾기 (isDefault가 true인 주소)
        const defaultAddress = memberData.addresses.find((addr) => addr.default);
        if (!defaultAddress) {
          alert("내 정보에서 기본 주소를 등록하셔야 합니다.");
          return;
        }

        setBuyer({
          mno: memberData.mno,
          name: memberData.name,
          email: memberData.email,
          address: `${defaultAddress.roadAddr} ${defaultAddress.detailAddr}`,
          zipcode: defaultAddress.zipcode,
        });
      }
    } catch (err) {
      console.error("구매자 정보 불러오기 실패:", err);
    }
  };
  // ✅ 장바구니 아이템 삭제
  const handleDeleteItem = async (cartId) => {
    const isConfirmed = window.confirm("장바구니에서 삭제하시겠습니까?");
    if (!isConfirmed) return;

    try {
      await req("DELETE", `main/cart/${cartId}`);
      setCartItems((prev) => prev.filter((item) => item.cartNo !== cartId)); // 삭제된 항목 제거
    } catch (error) {
      alert("삭제 실패: " + error.message);
    }
  };
  useEffect(() => {
    const fetchCart = async () => {
      const res = await req("get", `main/cart/${userId}`);
      if (res) {
        setCartItems(res);
      }
    };
    fetchCart();
  }, [req]);
 // 임시저장
 const handleSave = async () => {
    try {
      await req("put", "main/cart/save", cartItems);
      alert("임시저장 완료!");
    } catch (err) {
      alert("임시저장 실패");
    }
  };
  // 결제 - PayInfo로 데이터 전달
  const handleCheckout = () => {
    // 모든 CartItem의 최신 상태 가져오기
    const updatedCartItems = cartItemRefs.current.map(ref => ref.getItemData());

    // 기본 주소가 등록되지 않은 경우 결제 진행 불가
    if (!buyer) {
      alert("내 정보에서 기본 주소를 등록하셔야 결제 가능합니다.");
      return;
    }

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

    req("delete", `main/cart/all/${userId}`);

    const orderData = {
      buyer,
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
              onDelete={handleDeleteItem}
              ref={(el) => (cartItemRefs.current[index] = el)}
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
