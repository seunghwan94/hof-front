import React from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastComponent = () => {
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
    <div className="btn-group">
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
    </div>
  );
};

export default ToastComponent;