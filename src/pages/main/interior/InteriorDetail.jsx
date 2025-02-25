import React, { useState } from 'react';
import '../../../styles/interiorDetail.scss';

const InteriorDetail = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const images = [
    'https://via.placeholder.com/600x400?text=시공사진1',
    'https://via.placeholder.com/600x400?text=시공사진2',
    'https://via.placeholder.com/600x400?text=시공사진3',
  ];

  const handlePrev = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <>
      <div className="main-image">
        <img src="https://via.placeholder.com/800x300?text=메인사진" alt="메인사진" />
      </div>

      <div className="company-detail-container">
        {/* 업체 정보 */}
        <h2 className="specialization">소형 아파트 인테리어 전문</h2>
        <div className="company-info">
          <span className="company-name">업체명</span>
          <span className="company-phone">010-1234-1234</span>
        </div>

        {/* 시공 사진 슬라이더 */}
        <div className="slider">
          <button className="nav-button" onClick={handlePrev}>
            &#10094;
          </button>
          <div className="slider-image">
            <img src={images[currentImage]} alt={`시공사진 ${currentImage + 1}`} />
          </div>
          <button className="nav-button" onClick={handleNext}>
            &#10095;
          </button>
        </div>

        {/* 업체 정보 상세 */}
        <div className="detailed-info">
          <p>업체 정보: 고품질 인테리어 서비스 제공</p>
        </div>

        {/* 댓글 섹션 */}
        <div className="comments-section">
          <h3>댓글</h3>
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력하세요..."
            ></textarea>
            <button type="submit">등록</button>
          </form>

          <ul className="comments-list">
            {comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default InteriorDetail;
