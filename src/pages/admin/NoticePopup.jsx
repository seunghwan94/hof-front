import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useAxios from "../../hooks/useAxios";

const NoticePopup = () => {
  const { req } = useAxios();
  const [notice, setNotice] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchRandomNotice = async () => {
      try {
        const response = await req("get", "admin/notice/random"); // 랜덤 공지 가져오기
        if (response) {
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

  return (
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-0 left-0 w-full md:w-[500px] bg-gray-200 text-white p-4 rounded-lg shadow-lg z-50"
      style={{ backgroundColor: notice.backgroundColor, position: "fixed", bottom: 0, left: 0, width: "75%", zIndex: 1000, borderRadius: "12px",marginLeft : "12%" }}
    >
      <div className="flex justify-between items-center">
      <button
        className="absolute top-2 right-2 text-xl text-white"
        onClick={() => setIsVisible(false)}
      >
        ✖
      </button>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold">{notice.title}</h3>
          <p className="text-sm">{notice.content}</p>
          <span className="text-xs bg-gray-700 px-2 py-1 rounded-lg">AD</span>
        </div>
        <div className="w-20 h-20 rounded-lg overflow-hidden">
          <img
            src={notice.imageUrl} // 백엔드에서 이미지 URL 받아옴
            alt="Popup Image"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default NoticePopup;
