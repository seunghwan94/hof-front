import React, { Component } from "react";
import "../../../styles/slider.scss";

class CustomSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
    this.slideInterval = null;
  }

  componentDidMount() {
    this.startAutoSlide();
  }

  componentWillUnmount() {
    clearInterval(this.slideInterval);
  }

  startAutoSlide = () => {
    this.slideInterval = setInterval(this.nextSlide, 3000); // 3초 간격으로 슬라이드
  };

  nextSlide = () => {
    const { images } = this.props;
    this.setState((prevState) => ({
      currentIndex: (prevState.currentIndex + 1) % images.length,
    }));
  };

  prevSlide = () => {
    const { images } = this.props;
    this.setState((prevState) => ({
      currentIndex:
        (prevState.currentIndex - 1 + images.length) % images.length,
    }));
  };

  goToSlide = (index) => {
    this.setState({ currentIndex: index });
  };

  render() {
    const { images } = this.props;
    const { currentIndex } = this.state;

    return (
      <div className="slider-container">
        {/* 슬라이드 이미지 */}
        <div className="slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((img, index) => (
            <div className="slide" key={index}>
              <img src={img} alt={`Slide ${index}`} />
            </div>
          ))}
        </div>

        {/* 좌/우 네비게이션 버튼 */}
        <button className="slider-btn prev" onClick={this.prevSlide}>
          &#10094;
        </button>
        <button className="slider-btn next" onClick={this.nextSlide}>
          &#10095;
        </button>

        {/* 인디케이터(점) */}
        <div className="slider-dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentIndex === index ? "active" : ""}`}
              onClick={() => this.goToSlide(index)}
            ></span>
          ))}
        </div>
      </div>
    );
  }
}

export default CustomSlider;
