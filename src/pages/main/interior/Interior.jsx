import React, { useEffect, useState, Component } from "react";
import { useNavigate } from "react-router-dom"; // 추가
import useAxios from "../../../hooks/useAxios";
import "../../../styles/interior.scss";
import { Container } from "react-bootstrap";
import SliderPage from "./SliderPage";

/* 슬라이더 컴포넌트 (레거시 방식) */
class ImageSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
  }

  nextSlide() {
    const { images } = this.props;
    this.setState((prevState) => ({
      currentIndex: (prevState.currentIndex + 1) % images.length,
    }));
  }

  prevSlide() {
    const { images } = this.props;
    this.setState((prevState) => ({
      currentIndex:
        (prevState.currentIndex - 1 + images.length) % images.length,
    }));
  }

  render() {
    const { images } = this.props;
    const { currentIndex } = this.state;

    return (
      <div className="slider-container">
        <button className="slider-btn prev" onClick={this.prevSlide}>
          &#10094;
        </button>
        <div className="slider-image">
          <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
        </div>
        <button className="slider-btn next" onClick={this.nextSlide}>
          &#10095;
        </button>
      </div>
    );
  }
}

const Interior = () => {
  const { data, loading, error, req } = useAxios();
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate(); // 네비게이션 추가

  // API 호출
  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await req("GET", "common/company");
      if (response) {
        console.log(response);
        setCompanies(response); // API에서 받은 데이터로 상태 업데이트
      }
    };

    fetchCompanies();
  }, [req]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? "filled" : ""}`}>
        &#9733;
      </span>
    ));
  };

  const handleCompanyClick = (companyId) => {
    navigate(`/Interior/${companyId}`);
  };

  if (loading) return <p className="loading-text">로딩 중...</p>;
  if (error) return <p className="error-text">오류가 발생했습니다: {error.message}</p>;

  return (
    <Container>
      <SliderPage />
      <div className="company-list-container">
        {/* 상단 주요 업체 (첫 번째 업체를 메인으로 표시) */}
        {companies.length > 0 && (
          <div
            className="main-company"
            onClick={() => handleCompanyClick(companies[0].no)}
            style={{ cursor: "pointer" }}
          >
            <div className="main-company-image">
              {companies[0].imageUrls && companies[0].imageUrls.length > 0 ? (
                <img src={companies[0].imageUrls[0]} alt={companies[0].name} />
              ) : (
                <div className="placeholder-image">업체사진 없음</div>
              )}
            </div>
            <div className="main-company-info">
              <h2 className="company-name">{companies[0].name}</h2>
              <p className="company-info">{companies[0].info}</p>
              <p className="company-tel">📞 {companies[0].tel}</p>
              <div className="rating">
                {renderStars(companies[0].rating || 0)}{" "}
                <span className="rating-count">(13)</span>
              </div>
            </div>
          </div>
        )}

        {/* 하단 업체 리스트 */}
        <div className="company-grid">
          {companies.slice(1).map((company) => (
            <div
              className="company-card"
              key={company.no}
              onClick={() => handleCompanyClick(company.no)}
              style={{ cursor: "pointer" }}
            >
              <div className="company-image">
                {company.imageUrls && company.imageUrls.length > 0 ? (
                  <img
                    src={company.imageUrls[0]}
                    alt={company.name}
                    className="company-img"
                  />
                ) : (
                  <div className="placeholder-image">업체사진 없음</div>
                )}
              </div>
              <div className="company-details">
                <h3 className="company-name">{company.name}</h3>
                <p className="company-info">{company.info}</p>
                <p className="company-tel">📞 {company.tel}</p>
                <div className="rating">
                  {renderStars(company.rating || 0)}{" "}
                  <span className="rating-count">(13)</span>
                </div>
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
