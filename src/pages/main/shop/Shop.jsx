import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom"; // ✅ useNavigate 추가
import ProductCard from "./ProductCard";
import PaginationComponent from "../../../components/layout/Paging";
import Category from "./Category";
import Search from "./Search";
import Footer from "../layout/Footer";

function Shop() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category");

  const allProducts = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    image: "https://via.placeholder.com/230",
    name: `NEW컬러 유아KC 인증 방수매트리스 커버 ${index + 1}`,
    rating: (4 + Math.random()).toFixed(1),
    reviews: Math.floor(Math.random() * 100000),
    price: Math.floor(Math.random() * 1000000) + 5000,
    discount: Math.floor(Math.random() * 50) + 10,
    category: ["bed", "chair", "desk", "storage", "wardrobe", "other"][
      Math.floor(Math.random() * 6)
    ],
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);

  // 현재 카테고리에 맞는 상품 필터링
  const filteredProducts = selectedCategory
    ? allProducts.filter((product) => product.category === selectedCategory)
    : allProducts;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // 카테고리 변경 시 페이지를 첫 페이지로 이동
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  return (
    <>
      <Container>
        <Category />
        <div className="mb-4">
          <Search />
        </div>

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
    </>
  );
}

export default Shop;
