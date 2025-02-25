import React from 'react';
import '../../../styles/interior.scss';
import { Container } from 'react-bootstrap';

const Interior = () => {
  const companies = [
    { id: 1, name: "업체명1", info: "업체 정보1", phone: "010-1234-5678", rating: 4 },
    { id: 2, name: "업체명2", info: "업체 정보2", phone: "010-2345-6789", rating: 5 },
    { id: 3, name: "업체명3", info: "업체 정보3", phone: "010-3456-7890", rating: 3 },
    { id: 4, name: "업체명4", info: "업체 정보4", phone: "010-4567-8901", rating: 2 },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>&#9733;</span>
    ));
  };

  return (
    <Container>
      <div className="company-list-container">
        {/* 상단 주요 업체 */}
        <div className="main-company">
          <div className="main-company-image">업체사진</div>
          <div className="main-company-info">
            <h2>업체명</h2>
            <p>업체 정보</p>
            <p>업체 전화번호</p>
            <div className="rating">
              {renderStars(4)} <span>(13)</span>
            </div>
          </div>
        </div>

        {/* 하단 업체 리스트 */}
        <div className="company-grid">
          {companies.map((company) => (
            <div className="company-card" key={company.id}>
              <div className="company-image">업체사진</div>
              <h3>{company.name}</h3>
              <div className="rating">
                {renderStars(company.rating)} <span>(13)</span>
              </div>
            </div>
          ))}
        </div>

        {/* 더보기 버튼 */}
        <button className="load-more">더보기</button>
      </div>
    </Container>
  );
};

export default Interior;
