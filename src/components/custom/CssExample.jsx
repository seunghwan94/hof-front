import React, { useState } from "react";
import CustomAlert from "./CustomAlert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/custom_alert.scss";

function CssExample() {
  const [activeCategory, setActiveCategory] = useState(null);

  // CustomAlert 상태 관리
  const [alertConfig, setAlertConfig] = useState({
    isVisible: false,
    type: "",
    message: "",
  });

  // 버튼 데이터 배열
  const buttons_toast = [
    { type: "success", label: "성공 toast", message: "작업이 성공적으로 완료되었습니다!" },
    { type: "error", label: "오류 toast", message: "오류가 발생했습니다!" },
    { type: "info", label: "정보 toast", message: "이것은 정보 메시지입니다!" },
    { type: "warning", label: "경고 toast", message: "주의가 필요합니다!" },
  ];

  const buttons_alert = [
    { type: "red", label: "성공 alert", message: "작업이 성공적으로 완료되었습니다!" },
    { type: "green", label: "오류 alert", message: "오류가 발생했습니다!" },
    { type: "blue", label: "정보 alert", message: "이것은 정보 메시지입니다!" },
    { type: "yellow", label: "경고 alert", message: "주의가 필요합니다!" },
  ];
  // Toast 알림 표시 함수
  const showToast = (type, message) => {
    // Toast 알림 표시
    toast[type](message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  // CustomAlert 표시 함수
  const showAlert = (type, message) => {
    // CustomAlert 표시
    setAlertConfig({ isVisible: true, type, message });
  };

  // CustomAlert 닫기
  const closeAlert = () => {
    setAlertConfig((prev) => ({ ...prev, isVisible: false }));
  };

  return (
    <div>
      <h1>CssExample index</h1>

      <div className="button-container">
        <button className="btn btn-hof">hof</button>
        <span className="text-hof">쇼핑</span>
        <span
          className={`text-hof ${activeCategory === "interior" ? "active" : ""}`}
          onClick={() => setActiveCategory("interior")}
        >
          인테리어/생활
        </span>
        <input type="checkbox" className="checkbox-hof" />
        <input type="radio" name="category" className="radio-hof" />
        <input type="radio" name="category" className="radio-hof" />
        <br></br>
        <hr></hr>

        {buttons_toast.map((btn) => (
          <button
            key={btn.type}
            className={`btn btn-${btn.type}`}
            onClick={() => showToast(btn.type, btn.message)}
          >
            {btn.label}
          </button>
        ))}
      </div>
      <hr></hr>
      <div className="button-container">
        {buttons_alert.map((btn) => (
          <button
            key={btn.type}
            className={`btn btn-${btn.type}`}
            onClick={() => showAlert(btn.type, btn.message)}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* CustomAlert */}
      {alertConfig.isVisible && (
        <CustomAlert
          isVisible={alertConfig.isVisible}
          type={alertConfig.type}
          message={alertConfig.message}
          onConfirm={() => {
            console.log(`${alertConfig.type} 알림 확인 클릭`);
            closeAlert();
          }}
          onCancel={() => {
            console.log(`${alertConfig.type} 알림 취소 클릭`);
            closeAlert();
          }}
          onClose={closeAlert}
        />
      )}

      {/* ToastContainer (Toast 알림을 한 번만 관리) */}
      <ToastContainer />
    </div>
  );
}

export default CssExample;
