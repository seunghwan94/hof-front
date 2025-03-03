import React, { useEffect, useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxios from "../../hooks/useAxios"; //  커스텀 훅 추가

const NotificationComponent = () => {
  const { req } = useAxios(); //  useAxios 사용
  const [message, setMessage] = useState(""); // 전송할 메시지
  const [socket, setSocket] = useState(null);


const sendNotification = async () => {
  if (!message.trim()) {
    alert("알림 메시지를 입력하세요.");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/api/v1/admin/notify/send", {
      method: "POST",
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `message=${encodeURIComponent(message)}`,
      credentials: "include",  // 🔥 CORS 문제 해결 시도
    });

    const result = await response.text();
    console.log("서버 응답:", result);

    if (response.ok) {
      setMessage(""); // 입력 필드 초기화
    } else {
      toast.error("알림 전송 실패");
    }
  } catch (error) {
    console.error("알림 전송 오류:", error);
    toast.error("서버 오류 발생");
  }
};


  return (
    <Container className="mt-4">
      <h3>관리자 알림 전송</h3>
      <Form>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="보낼 메시지를 입력하세요"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>
        <Button className="mt-2" variant="btn btn-hof" onClick={sendNotification}>
          알림 보내기
        </Button>
      </Form>
    </Container>
  );
};

export default NotificationComponent;
