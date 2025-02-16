import React, { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import useAxios from "../../../hooks/useAxios";

const ShopDetailInquiries = ({ pno }) => {
  const { req, loading, error } = useAxios();
  const [inquiries, setInquiries] = useState([]);
  const [inquiryText, setInquiryText] = useState("");

  // 문의 불러오기
  useEffect(() => {
    const fetchInquiries = async () => {
      const data = await req("GET", `inquiries/${pno}`);
      if (data) setInquiries(data);
    };
    fetchInquiries();
  }, [pno, req]);

  // 문의 등록
  const handleSubmitInquiry = async () => {
    if (!inquiryText.trim()) return;
    const newInquiry = { pno, content: inquiryText };
    const data = await req("POST", "inquiries", newInquiry);

    if (data) {
      setInquiries((prev) => [...prev, data]);
      setInquiryText("");
    }
  };

  return (
    <div>
      <h4 className="fw-bold">상품 문의</h4>

      {loading && <Spinner animation="border" />}
      {error && <p className="text-danger">문의 내용을 불러오는 중 오류 발생</p>}

      {inquiries.length > 0 ? (
        inquiries.map((inquiry, index) => (
          <div key={index} className="border-bottom py-3">
            <strong>{inquiry.user}</strong>
            <p>{inquiry.content}</p>
          </div>
        ))
      ) : (
        <p>등록된 문의가 없습니다.</p>
      )}

      {/* 문의 작성 폼 */}
      <Form.Control
        as="textarea"
        rows={3}
        placeholder="문의 내용을 작성하세요"
        className="mt-3"
        value={inquiryText}
        onChange={(e) => setInquiryText(e.target.value)}
      />
      <Button variant="secondary" className="mt-2" onClick={handleSubmitInquiry}>
        문의 등록
      </Button>
    </div>
  );
};

export default ShopDetailInquiries;
