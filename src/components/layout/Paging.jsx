import React from "react";
import { Pagination } from "react-bootstrap";


function Paging({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];
  
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination className="custom-pagination my-5">
      {/* 첫 페이지로 이동
      <Pagination.First onClick={() => onPageChange(1)} disabled={currentPage === 1} /> */}

      {/* 이전 페이지 */}
      <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />

      {/* 페이지 번호 */}
      {pageNumbers.map((number) => (
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => onPageChange(number)}
          className={number === currentPage ? "active-page" : ""}
        >
          {number}
        </Pagination.Item>
      ))}

      {/* 다음 페이지 */}
      <Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} />

      {/* 마지막 페이지로 이동
      <Pagination.Last onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} /> */}
    </Pagination>
  );
}

export default Paging;
