import React from "react";
import "../../../../styles/myinfo/pick.scss";
import { useNavigate } from "react-router-dom";

const PickItem = ({ item, onDelete }) => {
  const { title, price, imageUrl, pno } = item;
  const navigate = useNavigate();

  return (
    <div className="pick-item">
      {/* ✅ 썸네일 이미지 */}
      <img
        src={imageUrl || "/placeholder.jpg"}
        alt={title}
        className="pick-thumbnail"
      />

      {/* ✅ 상품 정보 */}
      <div className="pick-details">
        <span 
          className="product-title"
          title={title} // ✅ 마우스 올리면 전체 이름 표시
          onClick={() => navigate(`/shop/detail/${pno}`)}
        >
          {title}
        </span>
        <span className="base-price">₩ {price.toLocaleString()}</span>
      </div>

      {/* ✅ 찜 취소 버튼 */}
      <button className="delete-btn" onClick={() => onDelete(pno)}>찜 취소</button>
    </div>
  );
};

export default PickItem;
