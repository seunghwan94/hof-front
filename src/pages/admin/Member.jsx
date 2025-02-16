import React, { useEffect, useState } from "react";
import { Card, Nav, Button, Container, Row, Col } from "react-bootstrap";
import RestoredMember from "./RestoredMember";
import CompanyList from "./CompanyList";
import CompanyRequests from "./CompanyRequests";
import useAxios from "../../hooks/useAxios";

const Member = () => {
  const [activeTab, setActiveTab] = useState("members");

  return (
    <Container className="mt-4">

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


      {activeTab === "members" && <MemberList />}
      {activeTab === "restored" && <RestoredMember />}
      {activeTab === "companies" && <CompanyList />}
      {activeTab === "companyRequests" && <CompanyRequests />}
    </Container>
  );
};

const MemberList = () => {
  const { data, loading, error, req } = useAxios();
  // const [members, setMembers] = useState([]); 


  // useEffect(async() => {
  //   const val = await req('get','index/list');
  //   console.log(val);
    
  //   // console.log(data);
  //  },[req]);

  //  API 호출 (정리 함수 제거)
  useEffect(() => {
    req('get', 'index/list');
    console.log(data);
  }, [req]);



  if(error){
    console.log(error);
    return <div><h1>에러발생</h1></div>
  }
  if(loading){
    return <div><h1>로딩중</h1></div>
  }
  return (
    <Container>
      <h3 className="mb-3">회원관리</h3>
      <Row className="g-3 row-cols-1 row-cols-md-2 row-cols-lg-3">
        {data && data.map(b => (
          <Col key={b.mno}>
            <Card className="p-3 shadow-sm h-100 d-flex flex-column justify-content-between">
              <div>
                <h5>{b.name}</h5>
                <p className="text-muted">{b.email}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span>
                  {b.pw}
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
