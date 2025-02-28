import React, { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import useAxios from "../../../hooks/useAxios";

const ShopDetailInquiries = ({ pno }) => {
  const { req, loading, error } = useAxios();
  const [inquiries, setInquiries] = useState([]);
  const [inquiryText, setInquiryText] = useState("");
  const [replyTarget, setReplyTarget] = useState(null); // 대댓글 대상
  const userId = JSON.parse(localStorage.getItem("member"))?.id;

  // ✅ 문의 불러오기
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const data = await req("GET", `common/qna/qna/${pno}`);
        if (data) {
          setInquiries(data);
        }
      } catch (error) {
        console.error("문의 목록 불러오기 실패:", error);
      }
    };
    fetchInquiries();
  }, [pno, req]);

 // ✅ 문의 등록 / 대댓글 작성 후 최신 데이터로 갱신
const handleSubmitInquiry = async () => {
  if (!inquiryText.trim()) return;
  
  const newInquiry = { 
    pno, 
    content: inquiryText, 
    memberId: userId, 
    parentNo: replyTarget?.no || null 
  };

  try {
    const data = await req("POST", "common/qna", newInquiry);
    if (data) {
      setInquiryText("");
      setReplyTarget(null); // 대댓글 작성 후 초기화

      // ✅ 문의 등록 후 전체 리스트 다시 불러오기 (재렌더링)
      fetchInquiries();
    }
  } catch (error) {
    console.error("문의 등록 실패:", error);
  }
};

// ✅ 문의 목록을 다시 불러오는 함수 (재사용 가능)
const fetchInquiries = async () => {
  try {
    const data = await req("GET", `common/qna/qna/${pno}`);
    if (data) {
      setInquiries(data);
    }
  } catch (error) {
    console.error("문의 목록 불러오기 실패:", error);
  }
};

// ✅ 문의 목록을 처음 불러올 때 실행
useEffect(() => {
  fetchInquiries();
}, [pno, req]);


  // ✅ 문의 삭제 (본인만 가능)
  const handleDeleteInquiry = async (qno, writerId) => {
    if (userId !== writerId) {
      alert("본인의 문의만 삭제할 수 있습니다.");
      return;
    }

    const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (!isConfirmed) return;

    try {
      await req("DELETE", `common/qna/${qno}`);
      setInquiries((prev) => prev.filter((inq) => inq.no !== qno));
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };
  console.log(inquiries);
  return (
    <div>
      <h4 className="fw-bold">상품 문의</h4>

      {loading && <Spinner animation="border" />}
      {error && <p className="text-danger">문의 내용을 불러오는 중 오류 발생</p>}

      {/* ✅ 문의 리스트 */}
      {inquiries.length > 0 ? (
  inquiries
    .filter(inquiry => inquiry.parentNo === null) // ✅ 부모 댓글만 먼저 필터링
    .map((parentInquiry) => (
      <div key={parentInquiry.no}>
        {/* ✅ 부모 댓글 */}
        <div
          className="border-bottom py-3"
          style={{
            backgroundColor: "transparent",
            borderRadius: "5px",
            marginBottom: "8px",
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <strong>{parentInquiry.memberId}</strong>
            <small className={`ms-3 badge ${parentInquiry.status === "처리후" ? "bg-success" : "bg-warning"}`}>
              {parentInquiry.status}
            </small>
          </div>

          <p>{parentInquiry.content}</p>
          {userId === parentInquiry.memberId && (
            <div className="text-end">
              <Button
                className="btn btn-outline-hof"
                size="sm"
                onClick={() => handleDeleteInquiry(parentInquiry.no, parentInquiry.memberId)}
              >
                삭제
              </Button>
            </div>
          )}
        </div>

        {/* 해당 부모 댓글의 대댓글들 */}
        {inquiries
              .filter(childInquiry => childInquiry.parentNo === parentInquiry.no) // 부모 댓글과 연결된 대댓글만 표시
              .map((childInquiry) => (
                <div
                  key={childInquiry.no}
                  className="border-bottom py-3 ms-4"
                  style={{
                    paddingLeft: "20px",
                    backgroundColor: "#f8f9fa",
                    borderLeft: "3px solid #ddd",
                    borderRadius: "5px",
                    marginBottom: "8px",
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <strong>{childInquiry.memberId}</strong>
                  </div>
                  <p>{childInquiry.content}</p>
                </div>
              ))}
          </div>
        ))
    ) : (
      <p>등록된 문의가 없습니다.</p>
    )}


      {/* ✅ 문의 작성 폼 */}
      {replyTarget && (
        <div className="ms-4 mt-3 p-3 border rounded bg-light">
          <p>
            <strong>{replyTarget.memberId}</strong> 님의 문의에 답변 작성 중...
          </p>
        </div>
      )}

      <Form.Control
        as="textarea"
        rows={3}
        placeholder={replyTarget ? "답변 내용을 입력하세요" : "문의 내용을 입력하세요"}
        className="mt-3"
        value={inquiryText}
        onChange={(e) => setInquiryText(e.target.value)}
      />
      <div className="text-end">
        <Button className="mt-2 btn-hof" onClick={handleSubmitInquiry}>
          {replyTarget ? "답변 등록" : "문의 등록"}
        </Button>
      </div>
    </div>
  );
};

export default ShopDetailInquiries;
