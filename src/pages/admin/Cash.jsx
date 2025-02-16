import React, { useState } from 'react';
import { Table, Nav, Container, Badge, Row, Col, Card } from "react-bootstrap";
const Cash = () => {
  const [activeTab, setActiveTab] = useState("payment");

    return (
        <Container className="mt-4">
            {/* 탭 버튼 */}
            <Nav variant="tabs" className="custom-nav mb-3 justify-content-end" activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)}>
                <Nav.Item>
                    <Nav.Link eventKey="payment" className={`custom-tab ${activeTab === "payment" ? "active-tab" : ""}`}>
                        결제
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="refund" className={`custom-tab ${activeTab === "refund" ? "active-tab" : ""}`}>
                        환불
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            {/*  탭 콘텐츠 */}
            {activeTab === "payment" && <Payment />}
            {activeTab === "refund" && <Refund />}
        </Container>
    );
};

const Payment = () => {
    const payments = [
        { id: 1, name: "김용태", amount: 50000, status: "결제완료" },
        { id: 2, name: "새똥이", amount: 32000, status: "배송준비중" },
        { id: 3, name: "개똥이", amount: 65000, status: "배송중" },
        { id: 4, name: "소똥이", amount: 42000, status: "배송준비중" },
        { id: 5, name: "개소똥이", amount: 87000, status: "결제완료" },
    ];

    // 상태별 색상 지정
    const getStatusBadge = (status) => {
        switch (status) {
            case "결제완료":
                return "success";  // 녹색
            case "배송준비중":
                return "warning";  // 주황색
            case "배송중":
                return "primary";  // 파란색
            default:
                return "secondary"; // 기본 회색
        }
    };

    return (
        <Container>
            <h3 className="mb-3">결제 관리</h3>

            {/* PC 화면에서는 테이블 형식 */}
            <div className="d-none d-md-block">
                <div className="table-responsive">
                    <Table hover bordered className="align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>#</th>
                                <th>이름</th>
                                <th>결제 금액</th>
                                <th>결제 상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => (
                                <tr key={payment.id}>
                                    <td>{payment.id}</td>
                                    <td>{payment.name}</td>
                                    <td>{payment.amount.toLocaleString()}원</td>
                                    <td>
                                        <Badge bg={getStatusBadge(payment.status)}>
                                            {payment.status}
                                        </Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>

            {/* 모바일 화면에서는 카드 형식 */}
            <div className="d-md-none">
                <Row className="g-3">
                    {payments.map((payment) => (
                        <Col xs={12} key={payment.id}>
                            <Card className="p-3 shadow-sm">
                                <Card.Body>
                                    <h5>{payment.name}</h5>
                                    <p className="text-muted">결제 금액: {payment.amount.toLocaleString()}원</p>
                                    <Badge bg={getStatusBadge(payment.status)}>
                                        {payment.status}
                                    </Badge>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </Container>
    );
};

const Refund = () => (
    <Container>
        <h3 className="mb-3">환불 관리</h3>
        <p>환불 내역이 없습니다.</p>
    </Container>
);

export default Cash;


