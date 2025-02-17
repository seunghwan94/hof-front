import React, { useEffect, useState } from "react";
import { Table, Container, Row, Col, Card } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import ProductModal from "./ProductModal"; // 모달 컴포넌트 import

const categoryMap = {
  1: "침대",
  2: "의자",
  3: "책상",
  4: "수납장",
  5: "옷장"
}

const Prod = () => {
  const { data, loading, error, req } = useAxios();
  const [products, setProducts] = useState([]); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // 상품 목록 가져오기
  useEffect(() => {
    const axios = async () => {
      await req("get", "main/prod");

    };
    axios();
    
}, [req]);


console.log(data);
// useEffect(() => {
//     if (!loading && data?.dtoList) {
//         console.log("서버에서 받은 데이터:", data);
//         setProducts(data.dtoList);
//     }
// }, [data, loading]);
// console.log(products);


	  // 상품 클릭 시 모달 열기
  const handleShowModal = (product) => {
    setSelectedProduct({ ...product });
    setShowModal(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };
	  // 입력값 변경 핸들러
		const handleChange = (e) => {
			const { name, value } = e.target;
			setSelectedProduct((prev) => ({
				...prev,
				[name]: value,
			}));
		};
	
		// 상품 정보 수정 (API 요청)
		const handleSaveChanges = async () => {
			if (!selectedProduct) return;
	
			await req("put", `index/prod/${selectedProduct.pno}`, selectedProduct);
			alert("상품 정보가 수정되었습니다.");
			handleCloseModal();
			req("get", "index/prod"); // 수정 후 목록 새로고침
		};
		  // 상품 삭제
			const handleDelete = async () => {
				if (!selectedProduct) return;
		
				if (window.confirm("정말 삭제하시겠습니까?")) {
					await req("delete", `index/prod/${selectedProduct.pno}`);
					alert("상품이 삭제되었습니다.");
					handleCloseModal();
					req("get", "index/prod"); // 삭제 후 목록 새로고침
				}
			};
  return data && (
    <Container>
      <h3 className="mb-3">상품 관리</h3>

      {/* PC 화면에서는 테이블 형식 */}
      <div className="d-none d-md-block">
        <div className="table-responsive">
          <Table hover bordered className="align-middle">
            <thead className="table-light">
              <tr>
                <th>카테고리</th>
                <th>상품명</th>
                <th>가격</th>
                <th>재고</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((p) => (
                  <tr key={p.pno} onClick={() => handleShowModal(p)} style={{ cursor: "pointer" }}>
                    <td>{categoryMap[p.cno] || "기타"}</td>
                    <td>{p.title.length > 30 ? p.title.slice(0, 30) + "..." : p.title}</td>
                    <td>{p.price}원</td>
                    <td>{p.stock}</td>
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
          {data.length > 0 ? (
            data.map((p) => (
              <Col xs={12} key={p.pno}>
                <Card className="p-3 shadow-sm" onClick={() => handleShowModal(p)} style={{ cursor: "pointer" }}>
                  <Card.Body>
                    <h5>{p.title}</h5>
                    <p className="text-muted">가격: {p.price}원</p>
                    <p>재고: {p.stock}</p>
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

      {/* 상품 상세 모달 */}
      <ProductModal
        show={showModal}
        handleClose={handleCloseModal}
        p={selectedProduct}
        handleChange={handleChange}
        handleSaveChanges={handleSaveChanges}
        handleDelete={handleDelete}
      />
    </Container>

  );
};

export default Prod;
