import React, { useEffect, useState } from "react";
import { Table, Nav, Container, Badge, Row, Col, Card } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import Refund from "./Refund";

const Cash = () => {
  const [activeTab, setActiveTab] = useState("payment");

  return (
    <Container className="mt-4">
      {/* 탭 버튼 */}
      <Nav
        variant="tabs"
        className="custom-nav mb-3 justify-content-end"
        activeKey={activeTab}
        onSelect={(tab) => setActiveTab(tab)}
      >
        <Nav.Item>
          <Nav.Link
            eventKey="payment"
            className={`custom-tab ${activeTab === "payment" ? "active-tab" : ""}`}
          >
            결제
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="refund"
            className={`custom-tab ${activeTab === "refund" ? "active-tab" : ""}`}
          >
            환불
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* 탭 콘텐츠 */}
      {activeTab === "payment" && <Payment />}
      {activeTab === "refund" && <Refund />}
    </Container>
  );
};

const Payment = () => {
  const { data, loading, error, req } = useAxios();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // 결제 데이터를 불러오는 API 엔드포인트 (예: "main/pay")
      await req("get", "main/pay");
    };
    fetchData();
  }, [req]);

  useEffect(() => {
    if (!loading && data) {
      console.log("서버에서 받은 결제 데이터:", data);
      // data가 배열이 아니라면 data.dtoList 또는 빈 배열로 처리
      setPayments(Array.isArray(data) ? data : data.dtoList || []);
    }
  }, [data, loading]);

  if (error) {
    console.log(error);
    return <div><h1>에러발생</h1></div>;
  }
  if (loading) {
    return <div><h1>로딩중</h1></div>;
  }

  // 결제 상태별 Badge 색상 함수 (상태에 따라 색상을 조정)
  const getStatusBadge = (status) => {
    switch (status) {
      case "완료":
        return "success";
      case "실패":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <Container>
      <h3 className="mb-3">결제 관리</h3>

      {/* PC 화면: 테이블 형식 */}
      <div className="d-none d-md-block">
        <div className="table-responsive">
          <Table hover bordered className="align-middle">
            <thead className="table-light">
              <tr>
                <th>No</th>
                <th>이름</th>
                <th>아이디</th>
                <th>결제 금액</th>
                <th>결제 수단</th>
                <th>결제 상태</th>
                
              </tr>
            </thead>
            <tbody>
              {payments && payments.length > 0 ? (
                payments.map((payment) => (
                  <tr key={payment.no}>
                    <td>{payment.no}</td>
                    <td>{payment.memberName}</td>
                    <td>{payment.memberId}</td>
                    <td>{payment.totalPrice.toLocaleString()}원</td>
                    <td>{payment.method}</td>
                    <td>
                      <Badge bg={getStatusBadge(payment.status)}>
                        {payment.status}
                      </Badge>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    결제 데이터가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>

      {/* 모바일 화면: 카드 형식 */}
      <div className="d-md-none">
        <Row className="g-3">
          {payments && payments.length > 0 ? (
            payments.map((payment) => (
              <Col xs={12} key={payment.no}>
                <Card className="p-3 shadow-sm">
                  <Card.Body>
                    <h5>이름 : {payment.memberName}</h5>
                    <h4>아이디 : {payment.memberId}</h4>
                    <p className="text-muted">
                      결제 금액: {payment.totalPrice.toLocaleString()}원
                    </p>
                    <p>{payment.method}</p>
                    <Badge bg={getStatusBadge(payment.status)}>
                      {payment.status}
                    </Badge>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col xs={12} className="text-center">
              <p>결제 데이터가 없습니다.</p>
            </Col>
          )}
        </Row>
      </div>
    </Container>
  );
};

export default Cash;
