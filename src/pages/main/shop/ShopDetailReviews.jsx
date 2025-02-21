import React, { useState, useEffect } from "react";
import { Form, Button, Spinner, Modal, Badge } from "react-bootstrap";
import useAxios from "../../../hooks/useAxios";

const ShopDetailReviews = ({ pno }) => {
  const { req, loading, error } = useAxios();
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [reviewStar, setReviewStar] = useState("five"); // 리뷰 작성 시 선택할 별점
  const [editingReview, setEditingReview] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [editedStar, setEditedStar] = useState("five");
  const [showModal, setShowModal] = useState(false);
  const [averageStar, setAverageStar] = useState(0);

  // 리뷰 불러오기
  useEffect(() => {
    const fetchReviews = async () => {
      const data = await req("GET", `main/reviews/list/${pno}`);
      if (data) {
        setReviews(data);
        calculateAverageStar(data);
      }
    };
    fetchReviews();
  }, [pno, req]);

  // 평균 별점 계산
  const calculateAverageStar = (reviews) => {
    if (reviews.length === 0) {
      setAverageStar(0);
      return;
    }

    const totalStars = reviews.reduce((sum, review) => {
      return sum + starRatingToNumber(review.star);
    }, 0);

    const avg = totalStars / reviews.length;
    setAverageStar(avg.toFixed(1)); // 소수점 첫째 자리까지 표시
  };

  // 별점 문자열을 숫자로 변환
  const starRatingToNumber = (star) => {
    switch (star) {
      case "ONE":
        return 1;
      case "TWO":
        return 2;
      case "THREE":
        return 3;
      case "FOUR":
        return 4;
      case "FIVE":
        return 5;
      default:
        return 0;
    }
  };

  // 숫자를 별표로 변환
  const renderStars = (starCount) => {
    const filledStars = "★".repeat(starCount);
    const emptyStars = "☆".repeat(5 - starCount);
    return filledStars + emptyStars;
  };

  // 리뷰 등록
  const handleSubmitReview = async () => {
    if (!reviewText.trim()) return;

    const newReview = { mno: 24, pno, content: reviewText, star: reviewStar };
    console.log("리뷰 등록 요청:", newReview);

    try {
      // 서버에서 저장된 리뷰 객체를 응답받음
      const params = new URLSearchParams(newReview).toString();
      const url = `main/reviews/add?${params}`;
      const savedReview = await req("POST",url);
      
      if (savedReview) {
        // 응답받은 리뷰를 리스트에 추가
        const updatedReviews = [...reviews, savedReview];
        setReviews(updatedReviews);
        calculateAverageStar(updatedReviews);

        // 입력 필드 초기화
        setReviewText("");
        setReviewStar("FOUR");
        alert("리뷰가 성공적으로 등록되었습니다!");
      }
    } catch (err) {
      console.error("리뷰 등록 에러:", err);
      const errorMessage = err.response?.data || "리뷰 등록 중 오류가 발생했습니다.";
      alert(errorMessage);
    }
  };


  // 리뷰 삭제
  const handleDeleteReview = async (reviewId) => {
    const confirmDelete = window.confirm("정말 이 리뷰를 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      // DELETE 요청
      const response = await req("DELETE", `main/reviews/remove/${ reviewId }` );

      if (response) {
        alert("리뷰가 성공적으로 삭제되었습니다.");

        // 새로운 리뷰 목록 생성 (삭제된 리뷰 제외)
        const updatedReviews = reviews.filter(
          (review) => String(review.reviewId) !== String(reviewId)
        );

        // 상태 업데이트 (새로운 배열 생성으로 re-render 보장)
        setReviews([...updatedReviews]);

        // 평균 별점 다시 계산
        calculateAverageStar(updatedReviews);
      }
    } catch (err) {
      console.error("리뷰 삭제 에러:", err);
      alert("리뷰 삭제 중 오류가 발생했습니다.");
    }
  };



  // 리뷰 수정 모드 시작
  const handleEditReview = (review) => {
    setEditingReview(review);
    setEditedText(review.content);
    setEditedStar(review.star);
    setShowModal(true);
  };

  // 리뷰 수정 제출
  const handleUpdateReview = async () => {
    if (!editedText.trim()) return;

    const params = new URLSearchParams({
                      content: editedText,
                      star: editedStar,
                    }).toString();

    const url = `main/reviews/modify/${editingReview.reviewId}?${params}`;
    
    const response = await req("PUT", url );

    if (response) {
      const updatedReviews = reviews.map((review) =>
        review.reviewId === editingReview.reviewId
          ? { ...review, content: editedText, star: editedStar }
          : review
      );
      setReviews(updatedReviews);
      calculateAverageStar(updatedReviews);
      setShowModal(false);
      setEditingReview(null);
      setEditedText("");
    }
  };

  return (
    <div>
      <h4 className="fw-bold">고객 리뷰</h4>

      {/* 평균 별점 표시 */}
      <div className="mb-3">
        <h5>
          평균 별점: {averageStar} / 5.0{" "}
          <Badge bg="warning" text="dark">
            {renderStars(Math.round(averageStar))}
          </Badge>
        </h5>
      </div>

      {loading && <Spinner animation="border" />}
      {error && <p className="text-danger">리뷰를 불러오는 중 오류 발생</p>}

      {/* 리뷰 리스트 */}
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.reviewId} className="border-bottom py-3 position-relative">
            <div className="d-flex justify-content-between">
              <strong>{review.member?.name || "익명 사용자"}</strong>
              <span>{renderStars(starRatingToNumber(review.star))}</span>
            </div>
            <p>{review.content}</p>

            <div>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => handleEditReview(review)}
              >
                수정
              </Button>{" "}
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleDeleteReview(review.reviewId)}
              >
                삭제
              </Button>
            </div>
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
      <Form.Select
        className="mt-2"
        value={reviewStar}
        onChange={(e) => setReviewStar(e.target.value)}
      >
        <option value="ONE">★☆☆☆☆ (1)</option>
        <option value="TWO">★★☆☆☆ (2)</option>
        <option value="THREE">★★★☆☆ (3)</option>
        <option value="FOUR">★★★★☆ (4)</option>
        <option value="FIVE">★★★★★ (5)</option>
      </Form.Select>
      <Button className="mt-2 btn-hof" onClick={handleSubmitReview}>
        리뷰 등록
      </Button>

      {/* 리뷰 수정 모달 */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>리뷰 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>리뷰 내용</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>별점</Form.Label>
            <Form.Select
              value={editedStar}
              onChange={(e) => setEditedStar(e.target.value)}
            >
              <option value="ONE">★☆☆☆☆ (1)</option>
              <option value="TWO">★★☆☆☆ (2)</option>
              <option value="THREE">★★★☆☆ (3)</option>
              <option value="FOUR">★★★★☆ (4)</option>
              <option value="FIVE">★★★★★ (5)</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            취소
          </Button>
          <Button variant="primary" onClick={handleUpdateReview}>
            수정 완료
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShopDetailReviews;
