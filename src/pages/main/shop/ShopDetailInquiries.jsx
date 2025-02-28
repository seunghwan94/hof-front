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

  // ✅ 문의 등록 / 대댓글 작성
  const handleSubmitInquiry = async () => {
    if (!inquiryText.trim()) return;
    const newInquiry = { pno, content: inquiryText, memberId: userId, parentNo: replyTarget?.no || null };

    try {
      const data = await req("POST", "common/qna", newInquiry);
      if (data) {
        setInquiries((prev) => [...prev, data]); // 새 문의 추가
        setInquiryText("");
        setReplyTarget(null); // 대댓글 작성 후 초기화
      }
    } catch (error) {
      console.error("문의 등록 실패:", error);
    }
  };

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

  return (
    <div>
      <h4 className="fw-bold">상품 문의</h4>

      {loading && <Spinner animation="border" />}
      {error && <p className="text-danger">문의 내용을 불러오는 중 오류 발생</p>}

      {/* ✅ 문의 리스트 */}
      {inquiries.length > 0 ? (
        inquiries.map((inquiry) => (
          <div
            key={inquiry.no}
            className={`border-bottom py-3`}
            style={{
              paddingLeft: inquiry.parentNo ? `20px` : "0",
              backgroundColor: inquiry.parentNo ? "#f8f9fa" : "transparent",
              borderLeft: inquiry.parentNo ? "3px solid #ddd" : "none",
              borderRadius: "5px",
              marginBottom: "8px",
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <strong>{inquiry.memberId}</strong>
              <small className={`ms-3 badge ${inquiry.status === "처리후" ? "bg-success" : "bg-warning"}`}>
                {inquiry.status}
              </small>
            </div>
            

            {/* ✅ 답변 버튼 (대댓글 작성) */}
            <div className="d-flex justify-content-between">
              <p>{inquiry.content}</p>
              {userId === inquiry.memberId && (
                <Button
                  className="btn btn-outline-hof"
                  size="sm"
                  onClick={() => handleDeleteInquiry(inquiry.no, inquiry.memberId)}
                >
                  삭제
                </Button>
              )}
            </div>
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
      <Button className="mt-2 btn-hof" onClick={handleSubmitInquiry}>
        {replyTarget ? "답변 등록" : "문의 등록"}
      </Button>
    </div>
  );
};

export default ShopDetailInquiries;
