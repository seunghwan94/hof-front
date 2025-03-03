import React, { useEffect, useState } from "react";
import { Table, Container, Row, Col, Card, Badge } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";

const Refund = () => {
  const { data, loading, error, req } = useAxios();
  const [refunds, setRefunds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("📢 환불 데이터 요청 시작...");
      const response = await req("get", "main/refund/adminlist"); // API 호출
      console.log("✅ API 응답 데이터:", response);

    };
    fetchData();
  }, [req]);

  useEffect(() => {
    if (!loading && data) {
      console.log("서버에서 받은 환불 데이터:", data);
      setRefunds(Array.isArray(data) ? data : data.dtoList || []);
    }
  }, [data, loading]);

  if (error) {
    console.log(error);
    return <div><h1>에러 발생</h1></div>;
  }
  if (loading) {
    return <div><h1>로딩 중...</h1></div>;
  }

  // 환불 상태별 Badge 색상 함수
  const getStatusBadge = (status) => {
    switch (status) {
      case true: // 환불 완료
        return "success";
      case false: // 환불 실패
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <Container>
      <h3 className="mb-3">환불 관리</h3>

      {/* PC 화면: 테이블 형식 */}
      <div className="d-none d-md-block">
        <div className="table-responsive">
          <Table hover bordered className="align-middle">
            <thead className="table-light">
              <tr>
                <th>No</th>
                <th>회원 ID</th>
                <th>환불 금액</th>
                <th>환불 사유</th>
                <th>환불 상태</th>
                <th>환불 날짜</th>
              </tr>
            </thead>
            <tbody>
              {refunds && refunds.length > 0 ? (
                refunds.map((refund) => (
                  <tr key={refund.no}>
                    <td>{refund.no}</td>
                    <td>{refund.memberId}</td>
                    <td>{refund.refundPrice.toLocaleString()}원</td>
                    <td>{refund.reason}</td>
                    <td>
                      <Badge bg={getStatusBadge(refund.status)}>
                        {refund.status ? "환불 완료" : "환불 실패"}
                      </Badge>
                    </td>
                    <td>{refund.refundDate ? refund.refundDate.substring(0, 10) : "날짜 없음"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    환불 데이터가 없습니다.
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
          {refunds && refunds.length > 0 ? (
            refunds.map((refund) => (
              <Col xs={12} key={refund.no}>
                <Card className="p-3 shadow-sm">
                  <Card.Body>
                    <h5>{refund.memberName}</h5>
                    <p className="text-muted">
                      회원 ID: {refund.memberId}
                    </p>
                    <p>환불 금액: {refund.refundPrice.toLocaleString()}원</p>
                    <p>사유: {refund.reason}</p>
                    <p>날짜: {refund.refundDate ? refund.refundDate.substring(0, 10) : "날짜 없음"}</p>
                    <Badge bg={getStatusBadge(refund.status)}>
                      {refund.status ? "환불 완료" : "환불 실패"}
                    </Badge>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col xs={12} className="text-center">
              <p>환불 데이터가 없습니다.</p>
            </Col>
          )}
        </Row>
      </div>
    </Container>
  );
};

export default Refund;
