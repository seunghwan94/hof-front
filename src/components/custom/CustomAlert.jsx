import React, { useState, useEffect } from "react";
import "../../styles/custom_alert.scss";

const CustomAlert = ({ isVisible, type, message, onConfirm, onCancel, onClose }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setIsFadingOut(false);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsFadingOut(true); // 페이드 아웃 상태 활성화
    setTimeout(() => {
      onClose(); // 부모 컴포넌트에서 상태 제어
    }, 300); // 애니메이션 지속 시간
  };

  return (
    isVisible && (
      <>
        {/* 배경 오버레이 */}
        <div className="custom-overlay" onClick={handleClose}></div>

        {/* 알림 창 */}
        <div
          className={`custom-alert custom-alert-${type} ${
            isFadingOut ? "fade-out" : "fade-in"
          }`}
        >
          <div className={`custom-alert-header custom-alert-header-${type}`}>
            <span>알림</span>
          </div>
          <div className="custom-alert-content">
            <p>{message}</p>
            <div className="custom-alert-buttons">
              <button className="btn btn-outline-hof" onClick={onConfirm}>
                확인
              </button>
              <button className="btn btn-cancel" onClick={onCancel}>
                취소
              </button>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default CustomAlert;
