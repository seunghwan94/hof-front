import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

const NoticePopup = () => {
  const { req } = useAxios();
  const [notice, setNotice] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRandomNotice = async () => {
      try {
        const response = await req("get", "admin/notice/random"); 
        if (response) {
          console.log(response);
          setNotice(response);
          setIsVisible(true);
        }
      } catch (error) {
        console.error("공지 데이터를 불러오는 중 오류 발생", error);
      }
    };

    fetchRandomNotice();
  }, [req]);

  if (!notice || !isVisible) return null;
  
  
  const handlePopupClick = () => {
    if (notice.clickUrl) {
      const currentOrigin = window.location.origin; // 현재 도메인 (예: http://hof.shop)
      const url = new URL(notice.clickUrl, currentOrigin); // 절대 경로를 URL 객체로 변환
      const path = url.pathname + url.search; // 도메인 부분 제거하고 경로만 가져오기
  
      if (url.origin === currentOrigin) {

        navigate(path);
      }
    }
  };
  

  return (
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="text-white rounded-lg shadow-lg"


      style={{ backgroundColor: notice.backgroundColor, position: "fixed", bottom: 0, left: 0, width: "75%", zIndex: 1000, borderRadius: "12px", marginLeft: "12%",cursor: "pointer" }}
    >
      {/* 닫기 버튼 */}
      <button
        className="text-xl text-white position-absolute"
        onClick={() => setIsVisible(false)}
        style={{ 
          top: "10px", 
          right: "10px", 
          zIndex: "10", 
          background: "rgba(0, 0, 0, 0.5)", 
          borderRadius: "50%", 
          width: "30px", 
          height: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        ✖
      </button>

      {/* PC: row-reverse (기존 그대로) / 모바일: column-reverse 적용 */}
      <div className="d-flex flex-column-reverse flex-md-row-reverse align-items-center justify-content-between gap-3" onClick={handlePopupClick}>
        
        {/* 이미지 (PC: 오른쪽, 모바일: 아래) */}
        <div className="w-75 w-md-25 text-end">
          <img
            src={notice.fileUrl} // 백엔드에서 이미지 URL 받아옴
            alt="Popup Image"
            className="img-fluid rounded-bottom rounded-md-0 rounded-md-end rounded-end"
            style={{ width: "100%", maxWidth: "250px" }}
          />
        </div>

        {/* 텍스트 영역 */}
        <div className="text-left p-4 w-100 w-md-75">
          <h3 className="fw-bold">{notice.title}</h3>
          <p className="small">{notice.content}</p>
          <span className="badge bg-secondary">AD</span>
        </div>

      </div>
    </motion.div>
  );
};

export default NoticePopup;
