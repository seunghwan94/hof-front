import React, { useState } from 'react';
import { Tab, Tabs, Card, Table, Image, Nav } from "react-bootstrap";
const Member = () => {
  const [activeTab, setActiveTab] = useState("members");
  return (
    
<div className=" mt-4">
      {/* <Card className="shadow-sm rounded-3"> */}
          {/* 탭 버튼 */}
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

        {/* 탭 콘텐츠 */}
        {activeTab === "members" && <MemberList />}
        {activeTab === "restored" && <RestoredMembers />}
        {activeTab === "companies" && <CompanyList />}
        {activeTab === "companyRequests" && <CompanyRequests />}

      {/* </Card> */}
    </div>
  );
}
const MemberList = () => {
  const members = [
    { id: 1, name: "김용태", email: "kyt@example.com" },
    { id: 2, name: "새똥이", email: "sadddong@example.com" },
    { id: 3, name: "개똥이", email: "gadddong@example.com" },
    { id: 4, name: "소똥이", email: "soddong@example.com"},
    { id: 5, name: "개소똥이", email: "nick@example.com"} ,
    { id: 1, name: "김용태", email: "kyt@example.com" },
    { id: 2, name: "새똥이", email: "sadddong@example.com" },
    { id: 3, name: "개똥이", email: "gadddong@example.com" },
    { id: 4, name: "소똥이", email: "soddong@example.com"},
    { id: 5, name: "개소똥이", email: "nick@example.com"} ,
    { id: 1, name: "김용태", email: "kyt@example.com" },
    { id: 2, name: "새똥이", email: "sadddong@example.com" },
    { id: 3, name: "개똥이", email: "gadddong@example.com" },
    { id: 4, name: "소똥이", email: "soddong@example.com"},
    { id: 5, name: "개소똥이", email: "nick@example.com"} ,
    { id: 1, name: "김용태", email: "kyt@example.com" },
    { id: 2, name: "새똥이", email: "sadddong@example.com" },
    { id: 3, name: "개똥이", email: "gadddong@example.com" },
    { id: 4, name: "소똥이", email: "soddong@example.com"},
    { id: 5, name: "개소똥이", email: "nick@example.com"} ,
    { id: 1, name: "김용태", email: "kyt@example.com" },
    { id: 2, name: "새똥이", email: "sadddong@example.com" },
    { id: 3, name: "개똥이", email: "gadddong@example.com" },
    { id: 4, name: "소똥이", email: "soddong@example.com"},
    { id: 5, name: "개소똥이", email: "nick@example.com"} ,
    { id: 1, name: "김용태", email: "kyt@example.com" },
    { id: 2, name: "새똥이", email: "sadddong@example.com" },
    { id: 3, name: "개똥이", email: "gadddong@example.com" },
    { id: 4, name: "소똥이", email: "soddong@example.com"},
    { id: 5, name: "개소똥이", email: "nick@example.com"} ,
    { id: 1, name: "김용태", email: "kyt@example.com" },
    { id: 2, name: "새똥이", email: "sadddong@example.com" },
    { id: 3, name: "개똥이", email: "gadddong@example.com" },
    { id: 4, name: "소똥이", email: "soddong@example.com"},
    { id: 5, name: "개소똥이", email: "nick@example.com"} ,
  ];

  return (
    <>
    <h1 className='p-1'>회원목록</h1>
    <Table hover responsive className="align-middle">
      
      <thead className="table-light">
        <tr>
          <th>번호</th>
          <th>이름</th>
          <th>이메일</th>
          <th>상태</th>
          <th>액션</th>
        </tr>
      </thead>
      <tbody>
        {members.map((member) => (
          <tr key={member.id}>
            <td>
            {member.id}
            </td>
            <td>{member.name}</td>
            <td>{member.email}</td>
            <td>
              <span className="badge bg-success">Active</span>
            </td>
            <td>
              <button className="btn btn-sm btn-primary">관리</button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </>
  );
};

// 복구회원 컴포넌트
const RestoredMembers = () => (
  <div className="text-center p-4">
    <h5>복구된 회원 리스트</h5>
    <p>아직 복구된 회원이 없습니다.</p>
  </div>
);

// 업체목록 컴포넌트
const CompanyList = () => (
  <div className="text-center p-4">
    <h5>업체 목록</h5>
    <p>등록된 업체가 없습니다.</p>
  </div>
);

// 업체 신청 컴포넌트
const CompanyRequests = () => (
  <div className="text-center p-4">
    <h5>업체 신청 목록</h5>
    <p>현재 진행 중인 업체 신청이 없습니다.</p>
  </div>
);

export default Member;
