import React from "react";

const Search2 = ({ searchTerm, onSearch }) => {
  return (
    <input
      type="text"
      className="form-control my-4"
      placeholder="검색어를 입력하세요..."
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)} // 🔹 검색 기능 실행
    />
  );
};

export default Search2;
