import React from "react";
import { Button } from "react-bootstrap";
import useAxios from "../../../hooks/useAxios";

const CartButton = ({ product, quantity, selectedOptions }) => {
  const { req } = useAxios();

  // ✅ 장바구니 추가 함수
  const handleAddToCart = async () => {
    const storedMember = localStorage.getItem("member");
    if (!storedMember) {
      alert("로그인 후 이용해주세요.");
      return;
    }

    const member = JSON.parse(storedMember);
    console.log("로그인된 회원 정보:", member);

    if (!member.mno) {
      alert("회원 정보를 가져올 수 없습니다.");
      return;
    }

    const cartData = {
      mno: member.mno, // ✅ 회원 번호
      pno: product.pno, // ✅ 상품 번호
      title: product.title,
      price: product.price,
      count: quantity,
      imageUrls: product.imageUrls, // ✅ 이미지 정보
      options: selectedOptions.map(option => ({
        optionNo: option.optionNo,
        type: option.type,
        value: option.value,
        addPrice: option.addPrice,
        stock: option.stock
      }))
    };

    console.log("장바구니 추가 요청 데이터:", cartData); // ✅ 디버깅

    try {
      await req("POST", "main/cart", cartData);
      alert("장바구니에 상품이 추가되었습니다!");
    } catch (err) {
      console.error("장바구니 추가 실패:", err);
      alert("장바구니 추가에 실패했습니다.");
    }
  };

  return (
    <Button className="w-50 fw-bold btn-outline-hof me-4" onClick={handleAddToCart}>
      장바구니
    </Button>
  );
};

export default CartButton;
