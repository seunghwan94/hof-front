import React, { useState } from "react";
import { Card, Nav, Button, Container, Row, Col } from "react-bootstrap";
import RestoredMember from "./RestoredMember";
import CompanyList from "./CompanyList";
import CompanyRequests from "./CompanyRequests";

const Member = () => {
  const [activeTab, setActiveTab] = useState("members");

  return (
    <Container className="mt-4">
      {/* ✅ 탭 버튼 */}
      <Nav variant="tabs" className="custom-nav mb-3 justify-content-end" activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)}>
        <Nav.Item>
          <Nav.Link eventKey="members" className={`custom-tab ${activeTab === "members" ? "active-tab" : ""}`}>
            회원목록
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="restored" className={`custom-tab ${activeTab === "restored" ? "active-tab" : ""}`}>
            복구회원
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="companies" className={`custom-tab ${activeTab === "companies" ? "active-tab" : ""}`}>
            업체목록
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="companyRequests" className={`custom-tab ${activeTab === "companyRequests" ? "active-tab" : ""}`}>
            업체신청
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* ✅ 탭 콘텐츠 */}
      {activeTab === "members" && <MemberList />}
      {activeTab === "restored" && <RestoredMember />}
      {activeTab === "companies" && <CompanyList />}
      {activeTab === "companyRequests" && <CompanyRequests />}
    </Container>
  );
};

const MemberList = () => {
  const members = [
    { id: 1, name: "김용태", email: "kyt@example.com", status: "Active" },
    { id: 2, name: "새똥이", email: "sadddong@example.com", status: "Inactive" },
    { id: 3, name: "개똥이", email: "gadddong@example.com", status: "Active" },
    { id: 4, name: "소똥이", email: "soddong@example.com", status: "Active" },
    { id: 5, name: "개소똥이", email: "nick@example.com", status: "Inactive" },
  ];

  return (
    <Container>
      <h3 className="mb-3">회원관리</h3>
      <Row className="g-3 row-cols-1 row-cols-md-2 row-cols-lg-3">
        {members.map((member) => (
          <Col key={member.id}>
            <Card className="p-3 shadow-sm h-100 d-flex flex-column justify-content-between">
              <div>
                <h5>{member.name}</h5>
                <p className="text-muted">{member.email}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span className={`badge ${member.status === "Active" ? "bg-success" : "bg-secondary"}`}>
                  {member.status}
                </span>
                <Button variant="primary" size="sm">
                  관리
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Member;
