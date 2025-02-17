import React, { useEffect, useState } from "react";
import { Table, Container, Row, Col, Card } from "react-bootstrap";
import useAxios from '../../hooks/useAxios';
import QnaModal from "./QnaModal";

const Qna = () => {
  const { data, loading, error, req } = useAxios();
  const [qnaList, setQnaList] = useState([]); // 🔹 기본값 [] 설정
  const [replyCount, setReplyCount] = useState({}); // 답변 개수 저장

  useEffect(() => {
    const fetchData = async () => {
      const res = await req("get", "admin/fwl/qna");
      if (res) {
          // 1️⃣ 답변(`parent_no`가 존재하는 항목) 제외하고 문의만 필터링
          const filteredQna = res.filter(qna => !qna.parentNo);
          // 2️⃣ 답변 개수 카운트
        const replyCounter = {};
        res.forEach(qna => {
          if (qna.parentNo) {
            replyCounter[qna.parentNo] = (replyCounter[qna.parentNo] || 0) + 1;
          }});
        setQnaList(filteredQna); // 🔹 undefined 방지
        setReplyCount(replyCounter);
      }
    };
    fetchData();
  }, [req]);
  console.log(qnaList)


    // // 상품 클릭 시 모달 열기
    // const handleShowModal = (product) => {
    //   setSelectedProduct({ ...product });
    //   setShowModal(true);
    // };
  
    // // 모달 닫기
    // const handleCloseModal = () => {
    //   setShowModal(false);
    //   setSelectedProduct(null);
    // };
    //   // 입력값 변경 핸들러
    //   const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setSelectedProduct((prev) => ({
    //       ...prev,
    //       [name]: value,
    //     }));
    //   };
    
    //   // 상품 정보 수정 (API 요청)
    //   const handleSaveChanges = async () => {
    //     if (!selectedProduct) return;
    
    //     await req("put", `index/prod/${selectedProduct.pno}`, selectedProduct);
    //     alert("상품 정보가 수정되었습니다.");
    //     handleCloseModal();
    //     req("get", "index/prod"); // 수정 후 목록 새로고침
    //   };
    //     // 상품 삭제
    //     const handleDelete = async () => {
    //       if (!selectedProduct) return;
      
    //       if (window.confirm("정말 삭제하시겠습니까?")) {
    //         await req("delete", `index/prod/${selectedProduct.pno}`);
    //         alert("상품이 삭제되었습니다.");
    //         handleCloseModal();
    //         req("get", "index/prod"); // 삭제 후 목록 새로고침
    //       }
    //     };

  return (
    <Container>
      <h3 className="mb-3">문의 관리</h3>

      {/* PC 화면에서는 테이블 형식 */}
      <div className="d-none d-md-block">
        <div className="table-responsive">
          <Table hover bordered className="align-middle">
            <thead className="table-light">
              <tr>
                <th>문의 번호</th>
                <th>회원 ID</th>
                <th>내용</th>
                <th>상태</th>
                <th>답변갯수</th>
              </tr>
            </thead>
            <tbody>
              {qnaList?.length > 0 ? ( // 🔹 length 확인
                qnaList.map((qna) => (
                  <tr key={qna.no}>
                    <td>{qna.no}</td>
                    <td>{qna.memberId}</td>
                    <td>{qna.content.length > 30 ? qna.content.slice(0, 30) + "..." : qna.content}</td>
                    <td>{qna.status}</td>
                    <td>{replyCount[qna.no] || 0}개</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">문의 데이터가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>

      {/* 모바일 화면에서는 카드 형식 */}
      <div className="d-md-none">
        <Row className="g-3">
          {qnaList?.length > 0 ? (
            qnaList.map((qna) => (
              <Col xs={12} key={qna.no}>
                <Card className="p-3 shadow-sm">
                  <Card.Body>
                    <h5>문의번호: {qna.no}</h5>
                    <p className="text-muted">회원 ID: {qna.memberId}</p>
                    <p>내용: {qna.content}</p>
                    <p>상태: {qna.status}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col xs={12} className="text-center">
              <p>문의 데이터가 없습니다.</p>
            </Col>
          )}
        </Row>
      </div>
       {/* 상품 상세 모달 */}
       {/* <QnaModal
        show={showModal}
        handleClose={handleCloseModal}
        p={selectedProduct}
        handleChange={handleChange}
        handleSaveChanges={handleSaveChanges}
        handleDelete={handleDelete}
      /> */}
    </Container>
  );
};

export default Qna;
