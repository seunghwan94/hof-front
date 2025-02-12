import React, { useState } from 'react';
import { Nav,  Container,   Table, Badge } from "react-bootstrap";
const Popup = () => {

      const [activeTab, setActiveTab] = useState("popuplist");
  
  return (
    <Container className="mt-4">
    {/* ✅ 탭 버튼 */}
    <Nav variant="tabs" className="custom-nav mb-3 justify-content-end" activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)}>
        <Nav.Item>
            <Nav.Link eventKey="popuplist" className={`custom-tab ${activeTab === "popuplist" ? "active-tab" : ""}`}>
                목록
            </Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="insert" className={`custom-tab ${activeTab === "insert" ? "active-tab" : ""}`}>
                등록
            </Nav.Link>
        </Nav.Item>
    </Nav>

    {/* ✅ 탭 콘텐츠 */}
    {activeTab === "popuplist" && <PopUplist />}
    {activeTab === "insert" && <Insert />}
</Container>

  );
}
const PopUplist = () => {
  const PopupList = [
    { id: 1, name: "김용태", title: 50000, content: "결제완료" },
    { id: 2, name: "새똥이", title: 32000, content: "배송준비중" },
    { id: 3, name: "개똥이", title: 65000, content: "배송중" },
    { id: 4, name: "소똥이", title: 42000, content: "배송준비중" },
    { id: 5, name: "개소똥이", title: 87000, content: "결제완료" },
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
  <h3 className="mb-3">팝업 관리</h3>
  <div className="table-responsive">
      <Table hover bordered className="align-middle">
          <thead className="table-light">
              <tr>
                  <th>#</th>
                  <th>이름</th>
                  <th>제목</th>
                  <th>내용</th>
              </tr>
          </thead>
          <tbody>
              {PopupList.map((PopupList) => (
                  <tr key={PopupList.id}>
                      <td>{PopupList.id}</td>
                      <td>{PopupList.name}</td>
                      <td>{PopupList.title.toLocaleString()}원</td>
                      <td>
                          <Badge bg={getStatusBadge(PopupList.content)}>
                              {PopupList.content}
                          </Badge>
                      </td>
                  </tr>
              ))}
          </tbody>
      </Table>
  </div>
</Container>
    );
}

const Insert = () => (
  <div className="text-center p-4">
    <h5>업체 목록</h5>
    <p>등록된 업체가 없습니다.</p>
  </div>
);
export default Popup;
