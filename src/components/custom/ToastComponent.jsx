import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastComponent = () => {
  const [socket, setSocket] = useState(null);


  useEffect(() => {
    // 현재 호스트 이름 가져오기
    const hostname = window.location.hostname;
    
    // 환경에 따라 WebSocket URL 설정
    const wsUrl =
      hostname === "localhost"
        ? "ws://localhost:8080/api/v1/ws/notify"
        : "wss://hof.lshwan.com/api/v1/ws/notify";

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => console.log("웹소켓 연결됨:", wsUrl);
    ws.onmessage = (event) => {
      console.log("웹소켓 메시지 수신:", event.data);
      toast.info(event.data);
    };
    ws.onerror = (error) => console.error("웹소켓 오류 발생:", error);
    ws.onclose = () => console.log("웹소켓 연결 종료");

    setSocket(ws);

    return () => ws.close();
  }, []);

  const showToast = (message, type) => {
    // const backgroundColors = {
    //     success: "#007bff",
    //     error: "#dc3545",
    //     warning: "#ffc107",
    //     info: "#17a2b8"
    //   };
    toast(message, {
      type,
      className: "custom-toast",
      progressClassName: "custom-toast-progress",
      style: {  color: "#fff" }
      // backgroundColor: backgroundColors[type],
    });
  };

  return (
   <>
    {/* <div className="btn-group">
      <Button variant="primary" onClick={() => showToast("토아스트 성공!", "success")}>
        Success
      </Button>
      <Button variant="danger" onClick={() => showToast("토아스트 에러!", "error")}>
        Error
      </Button>
      <Button variant="warning" onClick={() => showToast("토아스트 경고!", "warning")}>
        Warning
      </Button>
      <Button variant="info" onClick={() => showToast("토아스트 정보!", "info")}>
        Info
      </Button>
    </div> */}
   </>
  );
};

export default ToastComponent;