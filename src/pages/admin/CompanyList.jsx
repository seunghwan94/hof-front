import React, { useEffect, useState } from "react";
import { Card, Table, Container, Row, Col, Button } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import PaginationComponent from "../../components/layout/Paging";

const CompanyList = () => {
  const { req } = useAxios();
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchData = async () => {
      const response = await req("get", "common/company");
      console.log(response)
      if (Array.isArray(response)) {
        setFilteredCompanies(response);
      } else {
        setFilteredCompanies([]);
      }
    };
    fetchData();
  }, [req]);

  const handleShowModal = (company) => {
    setSelectedCompany(company);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCompany(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Container>
      <h3 className="mb-3">업체 관리</h3>

      {/* PC 화면 - 테이블 형식 */}
      <div className="d-none d-md-block">
        <div className="table-responsive">
          <Table hover bordered className="align-middle">
            <thead className="table-light">
              <tr>
                <th>업체 번호</th>
                <th>업체명</th>
                <th>대표ID</th>
                <th>업체 정보</th>
                <th>전화번호</th>
                <th>등록일</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.length > 0 ? (
                currentCompanies.map((company) => (
                  <tr key={company.no} onClick={() => handleShowModal(company)} style={{ cursor: "pointer" }}>
                    <td>{company.no}</td>
                    <td>{company.name}</td>
                    <td>{company.userId}</td>
                    <td>{company.info}</td>
                    <td>{company.tel}</td>
                    <td>{company.regDate ? company.regDate.substring(0, 10) : "등록일 없음"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    업체 데이터가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>

      {/* 모바일 화면 - 카드 형식 */}
      <div className="d-md-none">
        <Row className="g-3">
          {filteredCompanies.length > 0 ? (
            currentCompanies.map((company) => (
              <Col xs={12} key={company.no}>
                <Card className="p-3 shadow-sm">
                  <Card.Body>
                    <h5>업체번호: {company.no}</h5>
                    <p className="text-muted">업체명: {company.name}</p>
                    <p>대표자: {company.userId}</p>
                    <p>업체 정보: {company.info}</p>
                    <p>전화번호: {company.tel}</p>
                    <p>등록일: {company.regDate ? company.regDate.substring(0, 10) : "등록일 없음"}</p>
                    <Button variant="primary" onClick={() => handleShowModal(company)}>
                      상세보기
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col xs={12} className="text-center">
              <p>업체 데이터가 없습니다.</p>
            </Col>
          )}
        </Row>
      </div>

      {/* 업체 상세 모달 - 추후 구현 필요 */}
      {/* <CompanyDetailModal show={showModal} handleClose={handleCloseModal} company={selectedCompany} /> */}

      <PaginationComponent
        currentPage={currentPage}
        totalPages={Math.ceil(filteredCompanies.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />
    </Container>
  );
};

export default CompanyList;
