import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import "../../../styles/interiorDetail.scss";

const InteriorDetail = () => {
  const { companyId } = useParams();
  const { req } = useAxios();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      const response = await req("GET", `common/company/${companyId}`);
      if (response) {
        setCompany(response);
      }
      setLoading(false);
    };

    fetchCompany();
  }, [companyId, req]);

  if (loading) return <p>로딩 중...</p>;
  if (!company) return <p>업체 정보를 불러오지 못했습니다.</p>;

  // 태그와 포인트 텍스트를 배열로 변환
  const tags = company.tag ? company.tag.split(",").map(tag => tag.trim()) : [];
  const highlightPoints = company.pointText ? company.pointText.split(",").map(point => point.trim()) : [];

  return (
    <>
      <div className="main-intro-image">
        {company.imageUrls && company.imageUrls.length > 0 ? (
          <img src={company.imageUrls[0]} alt={company.name} />
        ) : (
          <div className="placeholder-image">이미지가 없습니다.</div>
        )}
      </div>

      <div className="interior-detail-container">
        {/* 제목 및 서브타이틀 */}
        <div className="content-container">
          <h1 className="title">{company.title || "인테리어 프로젝트 제목"}</h1>
          <h3 className="subtitle">{company.info || "서브 타이틀 설명"}</h3>

          {/* 업체 정보 */}
          <div className="company-info">
            <p><strong>{company.name}</strong> | {company.tel || "연락처 정보 없음"}</p>
          </div>

          {/* 태그 정보 */}
          <div className="tags">
            {tags.length > 0 ? (
              tags.map((tag, index) => <span key={index} className="tag">{tag}</span>)
            ) : (
              <span className="tag">태그 정보 없음</span>
            )}
          </div>

          {/* 본문 설명 */}
          <div className="description">
            <p>{company.content || "인테리어 상세 설명이 여기에 표시됩니다."}</p>
          </div>

          {/* 포인트 리스트 */}
          <div className="highlight-points">
            <h4>이 집의 핵심 포인트</h4>
            <ul>
              {highlightPoints.length > 0 ? (
                highlightPoints.map((point, index) => (
                  <li key={index}>✅ {point}</li>
                ))
              ) : (
                <li>포인트 정보가 없습니다.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default InteriorDetail;
