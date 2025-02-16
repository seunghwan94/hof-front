import React, { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import useAxios from "../../../hooks/useAxios";

const ShopDetailReviews = ({ pno }) => {
  const { req, loading, error } = useAxios();
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");

  // 리뷰 불러오기
  useEffect(() => {
    const fetchReviews = async () => {
      const data = await req("GET", `reviews/${pno}`);
      if (data) setReviews(data);
    };
    fetchReviews();
  }, [pno, req]);

  // 리뷰 등록
  const handleSubmitReview = async () => {
    if (!reviewText.trim()) return;
    const newReview = { pno, content: reviewText };
    const data = await req("POST", "reviews", newReview);

    if (data) {
      setReviews((prev) => [...prev, data]);
      setReviewText("");
    }
  };

  return (
    <div>
      <h4 className="fw-bold">고객 리뷰</h4>

      {loading && <Spinner animation="border" />}
      {error && <p className="text-danger">리뷰를 불러오는 중 오류 발생</p>}

      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="border-bottom py-3">
            <strong>{review.user}</strong>
            <p>{review.content}</p>
          </div>
        ))
      ) : (
        <p>등록된 리뷰가 없습니다.</p>
      )}

      {/* 리뷰 작성 폼 */}
      <Form.Control
        as="textarea"
        rows={3}
        placeholder="리뷰를 작성하세요"
        className="mt-3"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />
      <Button className="mt-2 btn-hof" onClick={handleSubmitReview}>
        리뷰 등록
      </Button>
    </div>
  );
};

export default ShopDetailReviews;
