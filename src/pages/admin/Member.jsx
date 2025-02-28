import React, { useEffect, useState } from "react";
import { Card, Nav, Button, Container, Row, Col, Table } from "react-bootstrap";
import RestoredMember from "./RestoredMember";
import CompanyList from "./CompanyList";
import CompanyRequests from "./CompanyRequests";
import useAxios from "../../hooks/useAxios";
import MemberDetailModal from "./MemberModal";
import MemberSearch from "./MemberSearch";
import PaginationComponent from "../../components/layout/Paging"
const Member = () => {
  const [activeTab, setActiveTab] = useState("members");

  return (
    <Container className="mt-4">
      <Nav
        variant="tabs"
        className="custom-nav mb-3 justify-content-end"
        activeKey={activeTab}
        onSelect={(tab) => setActiveTab(tab)}
      >
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
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filteredMember, setfilteredMember] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const handleSearchResults = (searchResults) => {
    setfilteredMember(searchResults); //  검색된 상품 목록으로 상태 변경
    setCurrentPage(1);
  };
  const handleShowModal = (member) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMember(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await req("get", "admin/fwl/list");

      if(response){
        setfilteredMember(response);
      }
    };
    fetchData();
  }, [req]);

  useEffect(() => {
    if (!loading && data) {
      console.log("서버에서 받은 데이터:", data);
      setMembers(Array.isArray(data) ? data : data.dtoList || []);
    }
  }, [data, loading]);

  if (error) {
    console.log(error);
    return <div><h1>에러발생</h1></div>;
  }
  if (loading) {
    return <div><h1>로딩중</h1></div>;
  }
  console.log()
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFilteredMember = filteredMember.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <Container>
      <h3 className="mb-3">회원 관리</h3>
      <div className="mb-4">
          <MemberSearch onSearchResults={handleSearchResults} />
        </div>
      {/* PC 화면에서는 테이블 형식 */}
      <div className="d-none d-md-block">
        <div className="table-responsive">
          <Table hover bordered className="align-middle">
            <thead className="table-light">
              <tr>
                <th>회원 번호</th>
                <th>회원 ID</th>
                <th>이름</th>
                <th>권한</th>
                <th>가입일자</th>
              </tr>
            </thead>
            <tbody>
              {filteredMember && filteredMember.length > 0 ? (
                currentFilteredMember.map((m) => (
                  <tr key={m.mno} onClick={() => handleShowModal(m)} style={{ cursor: "pointer" }}>
                    <td>{m.mno}</td>
                    <td>{m.id}</td>
                    <td>{m.name}</td>
                    <td>{m.role}</td>
                    <td>{m.regDate ? m.regDate : "가입일자가없습니다"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    회원 데이터가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>

      {/* 모바일 화면에서는 카드 형식 */}
      <div className="d-md-none">
        <Row className="g-3">
          {filteredMember && filteredMember.length > 0 ? (
            currentFilteredMember.map((m) => (
              <Col xs={12} key={m.mno}>
                <Card className="p-3 shadow-sm">
                  <Card.Body>
                    <h5>회원번호: {m.mno}</h5>
                    <p className="text-muted">회원 ID: {m.id}</p>
                    <p>이름: {m.name}</p>
                    <p>권한: {m.role}</p>
                    <p>가입 일자: {m.regDate ? m.regDate : "가입일자가 없습니다"}</p>
                    <Button variant="primary" onClick={() => handleShowModal(m)}>
                      상세보기
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col xs={12} className="text-center">
              <p>회원 데이터가 없습니다.</p>
            </Col>
          )}
        </Row>
      </div>

      <MemberDetailModal show={showModal} handleClose={handleCloseModal} member={selectedMember} />
      <PaginationComponent
          currentPage={currentPage}
          totalPages={Math.ceil((filteredMember?.length || 0) / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
    </Container>
  );
};

export default Member;
