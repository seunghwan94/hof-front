import React from "react";
import "../../../../styles/myinfo/profile.scss";

function Profile() {
  return (
    <div className="profile-container">
      {/* 상단 기본 정보 */}
      <div className="profile-header">
        <div className="profile-img">
          <img
            src="https://via.placeholder.com/80" // TODO: 사용자 프로필 이미지 적용
            alt="프로필 이미지"
          />
        </div>
        <div className="profile-info">
          <h3 className="profile-name">이승환</h3>
          <p className="profile-email">wjsgkhrl67@naver.com</p>
        </div>
      </div>

      {/* 기본 정보 섹션 */}
      <div className="profile-section">
        <h4>기본 정보</h4>
        <div className="profile-item">
          <span>이메일</span>
          <span className="profile-value">wjsgkhrl67@naver.com</span>
        </div>
        <div className="profile-item">
          <span>휴대전화</span>
          <span className="profile-value">+82 10-9***-0***</span>
        </div>
        <div className="profile-item">
          <span>로그인 인증</span>
          <span className="profile-toggle">ON</span>
        </div>
      </div>

      {/* 알림 설정 섹션 */}
      <div className="profile-section">
        <h4>알림 설정</h4>
        <div className="profile-item">
          <span>프로모션 정보 수신</span>
          <span className="profile-toggle">OFF</span>
        </div>
        <div className="profile-item">
          <span>게시물 알림</span>
          <span className="profile-toggle">OFF</span>
        </div>
      </div>

      {/* 계정 관리 */}
      <div className="profile-section">
        <h4>계정 관리</h4>
        <div className="profile-item">
          <span>배송지 관리</span>
          <button className="profile-btn">확인</button>
        </div>
        <div className="profile-item">
          <span>개인정보 이용내역</span>
          <button className="profile-btn">확인</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
