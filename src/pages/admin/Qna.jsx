import React, { useEffect, useState } from "react";
import { Table, Container, Row, Col, Card } from "react-bootstrap";
import useAxios from '../../hooks/useAxios';
import QnaModal from "./QnaModal";

const Qna = () => {
  const { data, loading, error, req } = useAxios();
  const [qnaList, setQnaList] = useState([]); // 🔹 기본값 [] 설정
  const [replyCount, setReplyCount] = useState({}); // 답변 개수 저장
  const [selectedQna, setSelectedQna] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    const res = await req("get", "admin/fwl/qna");
    if (res) {
      const filteredQna = res.filter(qna => !qna.parentNo);
      const replyCounter = {};
      res.forEach(qna => {
        if (qna.parentNo) {
          replyCounter[qna.parentNo] = (replyCounter[qna.parentNo] || 0) + 1;
        }
      });
      setQnaList(filteredQna);
      setReplyCount(replyCounter);
    }
  };
  
  // ✅ useEffect에서 fetchData 호출
  useEffect(() => {
    fetchData();
  }, [req]);
  console.log(qnaList)


    // 상품 클릭 시 모달 열기
    const handleShowModal = (selectedQna) => {
      const replies = data.filter(q => q.parentNo === selectedQna.no);
    
      setSelectedQna({
        ...selectedQna,
        existingReply: replies.length > 0 ? replies.map(r => r.content).join("\n\n") : "현재 작성된 답변이 없습니다."
      });
      setShowModal(true);
    };
    
    
    // 문의 등록 API 호출
    const handleRegister = async () => {
      if (!selectedQna || !selectedQna.replyContent) {
        alert("답변 내용을 입력하세요.");
        return;
      }
    
      const replyData = {
        memberId: "hof",  // ✅ 관리자 ID (임시, 서버에서 처리 가능)
        content: selectedQna.replyContent,  // ✅ 답변 내용
        parentNo: selectedQna.no,  // ✅ 부모 문의 번호 추가
        status: "처리후"  // ✅ 상태 변경
      };
    
      try {
        const response = await req("post", "admin/fwl/qna", replyData);
        
        if (response) {
          alert("답변이 등록되었습니다.");
    
          // ✅ 상태 업데이트 (새로운 답변 추가)
          setQnaList(prevQnaList => prevQnaList.map(qna => 
            qna.no === selectedQna.no ? { ...qna, status: "처리후" } : qna
          ));
    
          setReplyCount(prevReplyCount => ({
            ...prevReplyCount,
            [selectedQna.no]: (prevReplyCount[selectedQna.no] || 0) + 1
          }));
        }
    
        handleCloseModal();

          req("get", "admin/fwl/qna");

      } catch (error) {
        console.error("등록 오류:", error);
        alert("등록 중 오류가 발생했습니다.");
      }
    };
    
    // 모달 닫기
    const handleCloseModal = () => {
      setShowModal(false);
      setSelectedQna(null);
    };
      // 입력값 변경 핸들러
      const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedQna((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    
      // 상품 정보 수정 (API 요청)
      const handleSaveChanges = async () => {
        if (!selectedQna) return;
    
        await req("put", `admin/fwl/qna/${selectedQna.no}`, selectedQna);
        alert("상품 정보가 수정되었습니다.");
        handleCloseModal();
        req("get", "admin/fwl"); // 수정 후 목록 새로고침
      };
        // 상품 삭제
        const handleDelete = async () => {
          if (!selectedQna) return;
      
          if (window.confirm("정말 삭제하시겠습니까?")) {
            await req("delete", `admin/fwl/qna/${selectedQna.no}`);
            alert("문의글 이 삭제되었습니다.");
            handleCloseModal();
            await fetchData(); // ✅ 삭제 후 목록 다시 불러오기
          }
        };

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
                  <tr key={qna.no} onClick={() => handleShowModal(qna)} style={{cursor : "pointer"}}>
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
       <QnaModal
        show={showModal}
        handleClose={handleCloseModal}
        p={selectedQna}
        handleChange={handleChange}
        handleSaveChanges={handleSaveChanges}
        handleDelete={handleDelete}
        handleRegister = {handleRegister}
      />
    </Container>
  );
};

export default Qna;
