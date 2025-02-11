import React, { useRef, useEffect, useState } from "react";
import ReactFullpage from '@fullpage/react-fullpage';

const Intro = () => {
  const videoRef = useRef(null);
  const [isFooterVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    videoRef.current?.play();
  }, []);

  // 섹션 변경 시 Footer 표시 여부 제어
  const handleSectionChange = (origin, destination, direction) => {
    if (destination.index === 2) { // 세 번째 섹션에 도달했을 때
      setFooterVisible(true);  // Footer 보여주기
    } else {
      setFooterVisible(false);  // 다른 섹션에서는 Footer 숨기기
    }
  };

  return (
    <div>
      <ReactFullpage
        scrollOverflow
        navigation
        afterLoad={() => videoRef.current?.play()}
        onLeave={handleSectionChange}
        render={() => (
          <div>
            <div className="section">
              <div className="video-container">
                <video
                  ref={videoRef}
                  src="/test.mp4"
                  className="video"
                  controls={false}
                  muted
                  onEnded={() => videoRef.current?.play()}
                />
                <div className="text-overlay">
                  <h1>House of Furniture</h1>
                </div>
              </div>
            </div>

            {/* 두 번째 섹션 */}
            <div className="section">
              <div className="container mt-4 pt-5 d-flex">
                <div>쇼핑</div>
                <div>사진</div>
              </div>
            </div>

            {/* 세 번째 섹션 */}
            <div className="section">
              <h2>Section 3</h2>
            </div>
          </div>
        )}
      />
      <div className={`footer ${isFooterVisible ? 'show' : ''}`}>
        <p>Footer Content</p>
      </div>
    </div>
  );
};

export default Intro;
