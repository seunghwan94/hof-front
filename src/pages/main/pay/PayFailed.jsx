import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { XCircle } from "lucide-react";

const PayFailed = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center text-center" style={{ height: "50vh" }}>
      <XCircle size={80} color="red" className="mb-3" />
      <h2 className="text-danger">결제 실패</h2>
      <p className="text-muted">결제가 정상적으로 처리되지 않았습니다. 다시 시도해 주세요.</p>
      <Button variant="danger" className="mt-3" onClick={() => navigate("/shop")}>쇼핑 계속하기</Button>
    </Container>
  );
};

export default PayFailed;
