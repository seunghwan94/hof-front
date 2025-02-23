import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import ProductCard from "./ProductCard";
import PaginationComponent from "../../../components/layout/Paging";
import Category from "./Category";
import Search from "./Search";
import NoticePopup from "../../admin/NoticePopup";

function Shop() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category");

  const { data: apiProducts, loading, error, req } = useAxios();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const categoryMap = {
    bed: 1,
    chair: 2,
    desk: 3,
    storage: 4,
    wardrobe: 5,
    other: 6,
  };

  // API 요청 (카테고리에 따라 `cno` 값을 포함하여 요청)
  useEffect(() => {
    const cno = categoryMap[selectedCategory] || ""; // 해당하는 `cno` 값 설정
    const endpoint = cno ? `main/prod?cno=${cno}` : "main/prod"; // 전체 or 카테고리별 조회
    req("GET", endpoint); 
  }, [selectedCategory]); 

  // 페이징 처리
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = apiProducts ? apiProducts.slice(indexOfFirstItem, indexOfLastItem) : [];

  // 카테고리 변경 시 첫 페이지로 이동
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

        {loading && <p>Loading products...</p>}
        {error && <p>Error loading products.</p>}

        {!loading && !error && (
          <div className="product-grid">
            {currentItems.map((product) => (
              <ProductCard
                key={product.pno}
                id={product.pno}
                image={product.imageUrl}
                name={product.title || "상품명 없음"}
                rating={(product.avgStar ?? 4.5).toFixed(1)}
                reviews={product.reviewCount ?? 0}
                price={product.price ?? 0}
                discount={Math.floor(Math.random() * 50) + 10} // 랜덤 할인율
                category={product.cno}
              />
            ))}
          </div>
        )}

        <PaginationComponent
          currentPage={currentPage}
          totalPages={Math.ceil((apiProducts?.length || 0) / itemsPerPage)}
          onPageChange={setCurrentPage}
        />

      </Container>
      <NoticePopup />
    </>
  );
}

export default Shop;
