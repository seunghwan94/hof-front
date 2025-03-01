import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/NotFound.scss";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <p>페이지를 찾을 수 없습니다.</p>
        <p>원하는 페이지가 존재하지 않거나, 이동되었을 수 있습니다.</p>
        <button onClick={() => navigate("/")} className="home-button">
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default NotFound;
