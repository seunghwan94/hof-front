import React, { useState } from "react";
import SignupTerms from "./SignupTerms";
import LoginLeft from "../login/LoginLeft";
import SignupForm from "./SignupForm";
import "../../../styles/login/login.scss";

function Signup() {
  const [step, setStep] = useState(1); // 1은 약관 동의 화면, 2는 회원가입 폼 화면
  const [termsAccepted, setTermsAccepted] = useState({
    privacyConsent: false,
    marketingConsent: false,
    allowNotification: false,
  });

  const handleNext = (privacyConsent, marketingConsent, allowNotification) => {
    setTermsAccepted({ privacyConsent, marketingConsent, allowNotification });
    setStep(2);  // 약관 동의 후 회원가입 폼 화면으로 이동
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* 흐림 효과 추가 */}
      <div
        style={{
          position: "absolute",
          backgroundSize: "cover",
          zIndex: "-1",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          border: "solid 2px #fff",
          backgroundColor: "#fff",
          opacity: "30%",
        }}
      />
      {/* 배경 이미지 추가 */}
      <div
        style={{
          position: "absolute",
          backgroundImage:
            "url('https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/intro.png')",
          backgroundSize: "cover", // 화면에 맞춰 자동 크기 조정
          backgroundPosition: "center center", // 중앙 정렬
          backgroundAttachment: "fixed", // 스크롤에 배경이 고정되도록 설정
          filter: "blur(5px)",
          zIndex: "-2",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          minHeight: "100vh", // 배경이 화면 전체를 덮도록 설정
        }}
      />

      <div
        className="d-flex flex-column flex-lg-row"
        style={{
          alignItems: "center",
          justifyContent: "center",
          gap: "10vw", // 비율로 gap 설정
          minHeight: "100vh", // 최소 높이 설정
          flexDirection: "row",
          overflow: "auto", // 스크롤 허용
        }}
      >
        {/* Left Content */}
        <div
          style={{
            flexShrink: 0,
            width: "100%",
            maxWidth: "800px", // 고정 크기
            textAlign: "left",
            padding: "0rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoginLeft />
        </div>

        {/* Sign Up Form */}
        <div
          style={{
            flexShrink: 0,
            width: "100%",
            maxWidth: "656px", // 고정 크기
            minHeight: "450px", // 최소 높이
            height: "auto", // 높이 자동 조정
          }}
        >
          {step === 1 ? (
            <SignupTerms onNext={handleNext} />
          ) : (
            <SignupForm termsAccepted={termsAccepted} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;
