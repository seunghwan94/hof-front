import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
import "../../../../styles/myinfo/cart.scss";
import { Card } from "react-bootstrap";

const CartItem = forwardRef(({ item, onDelete }, ref) => {
  const { title, price, imageUrls, options = [], quantity: initialQuantity, selectedOptions: initialOptions, pno } = item;

  const [quantity, setQuantity] = useState(initialQuantity || 1);
  const [selectedOptions, setSelectedOptions] = useState(initialOptions || []);

  // ✅ 부모가 참조할 수 있는 메서드 제공
  useImperativeHandle(ref, () => ({
    getItemData: () => ({
      pno,
      title,
      price,
      quantity,
      selectedOptions,
      options
    })
  }));

  // ✅ 수량 변경 시 옵션 필드 갱신
  useEffect(() => {
    setSelectedOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      if (quantity > prevOptions.length) {
        for (let i = prevOptions.length; i < quantity; i++) {
          newOptions.push(options[0]?.optionNo || "");
        }
      } else if (quantity < prevOptions.length) {
        newOptions.length = quantity;
      }
      return newOptions;
    });
  }, [quantity, options]);

  // ✅ 옵션 변경 핸들러
  const handleOptionChange = useCallback((index, value) => {
    setSelectedOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = value;
      return updatedOptions;
    });
  }, []);

  // ✅ 총 가격 계산
  const calculateTotalPrice = () => {
    const optionsTotal = selectedOptions.reduce((sum, optNo) => {
      const opt = options.find((o) => o.optionNo.toString() === optNo?.toString());
      return sum + (opt ? opt.addPrice : 0);
    }, 0);
    return (price + optionsTotal) * quantity;
  };

  return (
    <div className="cart-card">
      {/* ✅ 상품 이미지 */}
      <Card className="w-25 m-4" style={{ width: "400px", height: "300px", overflow: "hidden" }}>
        <img
          src={imageUrls?.[0] || "/placeholder.jpg"}
          alt={title}
          className="product-image"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Card>

      {/* ✅ 상품 상세 정보 */}
      <div className="product-details py-4 pe-5">
        <div className="d-flex justify-content-between">
          <h3 className="product-title w-75">{title}</h3>

          <div className="quantity-select">
            {/* ✅ 삭제 버튼 */}
            <div className="text-end mt-3">
              <button className="btn btn-danger" onClick={() => onDelete(item.cartNo)}>X</button>
            </div>
          </div>
        </div>

        <hr />

        {/* ✅ 기본 가격 */}
        <div className="d-flex justify-content-between mb-3">
          <p className="base-price fw-bold">기본 가격</p>
          <p>₩ {price.toLocaleString()}</p>
        </div>

        {/* ✅ 옵션 선택 필드 */}
        {selectedOptions.map((selectedOpt, idx) => {
          const selectedOptionObj = options.find((opt) => opt.optionNo.toString() === selectedOpt?.toString()) || options[0];

          return (
            <div key={`opt-${idx}`} className="option-select mb-5">
              <label className="fw-bold">옵션 선택 {idx + 1}</label>
              <div className="d-flex justify-content-between align-items-center">
                <select
                  className="w-75"
                  value={selectedOpt}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                >
                  {options.map((opt) => (
                    <option key={opt.optionNo} value={opt.optionNo}>
                      {opt.value} (+₩{opt.addPrice.toLocaleString()})
                    </option>
                  ))}
                </select>
                <p className="m-0">
                  +₩ {selectedOptionObj ? selectedOptionObj.addPrice.toLocaleString() : "0"}
                </p>
              </div>
            </div>
          );
        })}

        <hr />

        {/* ✅ 총 가격 */}
        <div className="total-price d-flex justify-content-between mt-4">
          <p>총 가격</p>
          <p>₩ {calculateTotalPrice().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
});

export default CartItem;
