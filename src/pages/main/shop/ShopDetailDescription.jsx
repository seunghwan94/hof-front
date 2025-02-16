import React from "react";

const ShopDetailDescription = ({ content }) => {
  return (
    <div>
      <h4 className="fw-bold">제품 설명</h4>
      <div dangerouslySetInnerHTML={{ __html: content }}/>
    </div>
  );
};

export default ShopDetailDescription;
