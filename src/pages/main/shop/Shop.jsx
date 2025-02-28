import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom"; // 🔹 useNavigate 추가
import useAxios from "../../../hooks/useAxios";
import ProductCard from "./ProductCard";
import PaginationComponent from "../../../components/layout/Paging";
import Category from "./Category";
import NoticePopup from "../../admin/NoticePopup";
import Search2 from "./Search2";

function Shop() {
  const location = useLocation();
  const navigate = useNavigate(); // 🔹 페이지 이동을 위한 useNavigate 추가
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category");

  const { data: apiProducts, loading, error, req } = useAxios();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // 🔹 검색어 상태 추가
  const [filteredProducts, setFilteredProducts] = useState([]); // 🔹 검색된 상품 상태

  const itemsPerPage = 15;

  const categoryMap = {
    bed: 1,
    chair: 2,
    desk: 3,
    storage: 4,
    wardrobe: 5,
    other: 6,
  };

  // ✅ API 요청 (카테고리에 따라 `cno` 값을 포함하여 요청)
  useEffect(() => {
    const cno = categoryMap[selectedCategory] || "";
    const endpoint = cno ? `main/prod?cno=${cno}` : "main/prod";

    req("GET", endpoint).then((data) => {
      if (data) {
        setFilteredProducts(data); // 🔹 초기 데이터 설정
      }
    });
  }, [selectedCategory]);

  // ✅ 검색 기능 (검색어가 변경될 때 실행)
  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);

    // 🔹 카테고리 초기화 (전체 상품 검색)
    navigate("/shop"); // URL에서 category 쿼리 제거 (전체보기로 변경)
    
    if (!apiProducts) return;

    // 🔹 전체 상품에서 검색어 필터링
    const results = apiProducts.filter((product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilteredProducts(results);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  // ✅ 페이징 처리
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // ✅ 카테고리 변경 시 검색어 초기화
  useEffect(() => {
    setSearchTerm(""); // 🔹 검색어 초기화
    setCurrentPage(1);
  }, [selectedCategory]);

  return (
    <>
      <Container>
        <Category />
        
        {/* 🔹 검색 기능 추가 */}
        <div className="mb-4 mb-5">
          <Search2 searchTerm={searchTerm} onSearch={handleSearch} />
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

        {/* 🔹 페이징 컴포넌트 */}
        <PaginationComponent
          currentPage={currentPage}
          totalPages={Math.ceil((filteredProducts.length || 0) / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
      </Container>

      <NoticePopup />
    </>
  );
}

export default Shop;
