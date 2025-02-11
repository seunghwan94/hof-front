import React, { useState } from "react";
import { Container } from "react-bootstrap";
import ProductCard from "./ProductCard";
import PaginationComponent from "../../../components/layout/Paging";
import Category from "./Category";
import Search from "./Search";

function Shop() {
  const products = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    image: "https://via.placeholder.com/230",
    name: `NEW컬러 유아KC 인증 방수매트리스 커버 ${index + 1}`,
    rating: (4 + Math.random()).toFixed(1),
    reviews: Math.floor(Math.random() * 100000),
    price: Math.floor(Math.random() * 1000000) + 5000,
    discount: Math.floor(Math.random() * 50) + 10,
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Container className="mt-1">
      <Category />
      <Search />

      {/* 상품 리스트 */}
      <div className="product-grid">
        {currentItems.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {/* 페이지네이션 */}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </Container>
  );
}

export default Shop;
