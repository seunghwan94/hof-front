import React, { useEffect, useState } from "react";
import { Table, Container, Row, Col, Card, Button } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import ProductModal from "./ProductModal"; // 모달 컴포넌트 import
import ProductCreateModal from "./ProductCreateModal";
import Search from "../main/shop/Search";
import PaginationComponent from "../../components/layout/Paging"
const categoryMap = {
  1: "침대",
  2: "의자",
  3: "책상",
  4: "수납장",
  5: "옷장"
}

const Prod = () => {
  
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;
  const {req } = useAxios();
  const [products, setProducts] = useState([]); //상품목록
  const [] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false); // 🔹 등록 모달 상태 추가
  const [selectedProduct, setSelectedProduct] = useState(null); //상품 상세정보
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const axios = async () => {
    const response = await req("get", "main/prod");
    if(response){
      setProducts(response);
      setFilteredProducts(response);
    }

    };
    
  // 상품 목록 가져오기
  useEffect(() => {
    axios();
    
}, [req]);

useEffect(() => {
  setFilteredProducts(products); 
}, [products]);

const handleSearchResults = (searchResults) => {
  setFilteredProducts(searchResults); //  검색된 상품 목록으로 상태 변경
  setCurrentPage(1);
};

// useEffect(() => {
//     if (!loading && data?.dtoList) {
//         console.log("서버에서 받은 데이터:", data);
//         setProducts(data.dtoList);
//     }
// }, [data, loading]);
// console.log(products);


	  // 상품 클릭 시 모달 열기
    const handleShowModal = async (product) => {
    try {
      setSelectedProduct(null); // 🔹 기존 데이터 초기화 (잠깐 로딩 UI 표시용)


      const productDetail = await req("get", `main/prod/${product.pno}`);


      if (!productDetail) {
        alert("상품 상세 정보를 불러오지 못했습니다.");
        return;
      }

      //  상품 상세 정보 상태 업데이트
      setSelectedProduct({...productDetail, cno: product.cno});

      // 모달 열기
      setShowModal(true);
    } catch (error) {
      console.error("상품 상세 정보를 가져오는 중 오류 발생:", error);
      alert("상품 정보를 불러오는데 실패했습니다.");
    }
  };
    

  // 모달 닫기
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };
	  // 입력값 변경 핸들러
		const handleChange = (e) => {
			const { name, value } = e.target;
      let updatedValue = value;
      if (name === "price") {
        updatedValue = Number(value.replace(/,/g, "")); // 쉼표 제거 후 숫자로 변환
      }
			setSelectedProduct((prev) => ({
				...prev,
				[name]: updatedValue,
			}));
		};
	
/** 상품 정보 수정 (API 요청) */
const handleSaveChanges = async (updatedProduct) => {
  if (!updatedProduct) return;

  console.log("최종 저장할 content:", updatedProduct.content);

  await req("put", `main/prod/${updatedProduct.pno}`, updatedProduct);
  alert("상품 정보가 수정되었습니다.");

  // 최신 데이터 다시 불러오기
  const updatedProducts = await req("get", "main/prod"); 

  if (Array.isArray(updatedProducts)) {
    setProducts(updatedProducts);  // 목록 업데이트
  } 

  handleCloseModal();
};
		  // 상품 삭제
			const handleDelete = async () => {
				if (!selectedProduct) return;
		
				if (window.confirm("정말 삭제하시겠습니까?")) {
					const aaa = await req("delete", `main/prod/prod/${selectedProduct.pno}`);
          console.log(aaa)
					alert("상품이 삭제되었습니다.");
					handleCloseModal();
					// const updatedProducts = req("get", "main/prod"); // 삭제 후 목록 새로고침

          // if (Array.isArray(updatedProducts)) {
          //   setProducts(updatedProducts);  // 🔹 올바른 방식으로 업데이트
          // } 
          axios();
          handleCloseModal();
				}
			};

      const handleOptionChange = (updatedOptions) => {
        setSelectedProduct((prev) => ({
          ...prev,
          options: updatedOptions,
        }));
        console.log(selectedProduct)
      };
      const handleShowCreateModal = () => {
        setShowCreateModal(true);
      };


      const handleCloseCreateModal = () => {
        setShowCreateModal(false);
      };
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentFilteredProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
      const member = localStorage.getItem("member");
  const userMno = JSON.parse(member).mno;
if (!member) {
    alert("로그인 후 이용해주세요.");
    return;
  }
  return products && (
    <Container className="mt-4">
<h2 className="text-center mb-4 fw-bold">상품관리</h2>

      <div className="mb-4">
          <Search onSearchResults={handleSearchResults} />
        </div>

      {/* PC 화면에서는 테이블 형식 */}
      <div className="d-none d-md-block">
        <div className="table-responsive">
          <Table hover bordered className="align-middle">
            <thead className="table-light">
              <tr>
                <th>카테고리</th>
                <th>상품명</th>
                <th>가격</th>

              </tr>
            </thead>
            <tbody>
              {
                currentFilteredProducts.map((p) => (
                  <tr key={p.pno} onClick={() => handleShowModal(p)} style={{ cursor: "pointer" }}>
                    <td>{categoryMap[p.cno] || "기타"}</td>
                    <td>{p.title.length > 30 ? p.title.slice(0, 30) + "..." : p.title}</td>
                    <td>{p.price.toLocaleString()}원</td>

                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>
      </div>

      {/* 모바일 화면에서는 카드 형식 */}
      <div className="d-md-none">
        <Row className="g-3">
          {products.length > 0 ? (
            currentFilteredProducts.map((p) => (
              <Col xs={12} key={p.pno}>
                <Card className="p-3 shadow-sm" onClick={() => handleShowModal(p)} style={{ cursor: "pointer" }}>
                  <Card.Body>
                    <h5>{p.title}</h5>
                    <p>카테고리 :{categoryMap[p.cno] || "기타"} </p>
                    <p className="text-muted">가격: {p.price.toLocaleString()}원</p>

                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col xs={12} className="text-center">
              <p>상품 데이터가 없습니다.</p>
            </Col>
          )}
        </Row>
        
      </div>
    {/* 🔹 상품 등록 버튼 추가 */}
    <Button variant="btn btn-hof" className="mb-3" onClick={handleShowCreateModal}>
      상품 등록
    </Button>
      {/* 상품 상세 모달 */}
      <ProductModal
        show={showModal}
        handleClose={handleCloseModal}
        p={selectedProduct}
        handleChange={handleChange}
        handleSaveChanges={handleSaveChanges}
        handleDelete={handleDelete}
        handleOptionChange={handleOptionChange}
        setSelectedProduct={setSelectedProduct}
      />
      
          {/* 🔹 상품 등록 모달 추가 */}
    <ProductCreateModal show={showCreateModal} handleClose={handleCloseCreateModal} />
    <PaginationComponent
          currentPage={currentPage}
          totalPages={Math.ceil((filteredProducts?.length || 0) / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
  </Container>

  );
};

export default Prod;
