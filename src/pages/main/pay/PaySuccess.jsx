import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { CheckCircle } from "lucide-react";

const PaySuccess = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center text-center" style={{ height: "50vh" }}>
      <CheckCircle size={80} color="green" className="mb-3" />
      <h2 className="text-success">결제 성공</h2>
      <p className="text-muted">결제가 정상적으로 처리되었습니다. 감사합니다!</p>
      <Button variant="success" className="mt-3" onClick={() => navigate("/shop")}>쇼핑 계속하기</Button>
    </Container>
  );
};

export default PaySuccess;
