import React, { useEffect, useState } from "react";
import { Nav, Container, Table, Badge, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import useAxios from "../../hooks/useAxios"; // ✅ Axios 커스텀 훅 사용
import PopupInsert from "./PopupInsert";

const Popup = () => {
  const [activeTab, setActiveTab] = useState("popuplist");

  return (
    <Container className="mt-4">
      <Nav
        variant="tabs"
        className="custom-nav mb-3 justify-content-end"
        activeKey={activeTab}
        onSelect={(tab) => setActiveTab(tab)}
      >
        <Nav.Item>
          <Nav.Link eventKey="popuplist">목록</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="PopupInsert">등록</Nav.Link>
        </Nav.Item>
      </Nav>

      {activeTab === "popuplist" && <PopUplist />}
      {activeTab === "PopupInsert" && <PopupInsert setActiveTab = {setActiveTab}/>}
    </Container>
  );
};

const PopUplist = () => {
  const { data, loading, error, req } = useAxios();
  const [popupList, setPopupList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const fetchPopups = async () => {
    try {
      const response = await req("get", "admin/notice"); 
      console.log(response);
      if (Array.isArray(response)) {
        setPopupList(response);
      } else {
        console.error("잘못된 데이터 형식", response);
      }
    } catch (error) {
      console.error("팝업 데이터를 가져오는 중 오류 발생", error);
    }
  };
  useEffect(() => {

    fetchPopups();
  }, [req]);

  // 상태별 배지 색상 설정
  const getStatusBadge = (status) => {
    switch (status) {
      default:
        return "secondary";
    }
  };

  if (loading) return <Spinner animation="border" variant="primary" />; 
  if (error) return <p className="text-danger">데이터를 불러오는 중 오류 발생!</p>;
  const handleCheckboxChange = (fno) => {
    setSelectedIds(prev =>
      prev.includes(fno) ? prev.filter(id => id !== fno) : [...prev, fno]
    );
  };
  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return alert('삭제할 항목을 선택하세요.');

    const idString = selectedIds.join(','); // ID 리스트를 ','로 연결

    try {
        await req('delete', `admin/notice/${idString}`);
        setPopupList(prev => prev.filter(f => !selectedIds.includes(f.fno)));
        fetchPopups();
        setSelectedIds([]);

    } catch (error) {
        console.error("삭제 실패", error);
    }
  };
  return (
    <Container>
      <h3 className="mb-3">팝업 관리</h3>

      <div className="d-none d-md-block">
        <Table hover bordered className="align-middle">
          <thead className="table-light">
            <tr>
            <th style={{width : "40px"}}>
                <input type="checkbox" className="checkbox-hof" 
                    
                    
                    onChange={() => setSelectedIds(
                      selectedIds.length ? [] : popupList.map(f => f.no)
                    )}
                  />
                </th>
              <th>번호</th>
              <th>작성자</th>
              <th>제목</th>
              <th>내용</th>
              <th>ClickURL</th>
              <th>이미지URL</th>
              <th>배경색</th>
            </tr>
          </thead>
          <tbody>
            {popupList.map((popup, index) => (
              <tr key={popup.id}>
                <td><input type="checkbox" className="checkbox-hof" 
                checked={selectedIds.includes(popup.no)}
                onChange={() => handleCheckboxChange(popup.no)}
                /></td>
                <td>{index + 1}</td>
                <td>{popup.memberId || "N/A"}</td>
                <td>{popup.title}</td>
                <td>
                  <Badge bg={getStatusBadge(popup.content)}>{popup.content}</Badge>
                </td>
                <td>
                  <a href={popup.clickUrl} target="_blank" rel="noopener noreferrer">
                    {popup.clickUrl ? "링크 보기" : "없음"}
                  </a>
                </td>
                <td>
                  <a href={popup.fileUrl} target="_blank" rel="noopener noreferrer">
                    {popup.fileUrl ? "링크 보기" : "없음"}
                  </a>
                </td>
                <td>
                  <span
                    style={{
                      display: "inline-block",
                      width: "20px",
                      height: "20px",
                      backgroundColor: popup.backgroundColor || "#ccc",
                      borderRadius: "4px",
                    }}
                  ></span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* 모바일 화면: 카드 형식 */}
      <div className="d-md-none">
        <Row className="g-3">
          {popupList.map((popup) => (
            <Col xs={12} key={popup.id}>
              <Card className="p-3 shadow-sm">
                <Card.Body>
                <input type="checkbox" className="checkbox-hof" 
                checked={selectedIds.includes(popup.no)}
                onChange={() => handleCheckboxChange(popup.no)}
                />
                  <h5>{popup.title}</h5>
                  <p className="text-muted">작성자: {popup.name || "N/A"}</p>
                  <p>내용: {popup.content}</p>
                  <p>
                    ClickURL:{" "}
                    {popup.clickUrl ? (
                      <a href={popup.clickUrl} target="_blank" rel="noopener noreferrer">
                        {popup.clickUrl}
                      </a>
                    ) : (
                      "없음"
                    )}
                  </p>
                  <p>
                    이미지URL:{" "}
                    {popup.clickUrl ? (
                      <a href={popup.clickUrl} target="_blank" rel="noopener noreferrer">
                        {popup.clickUrl}
                      </a>
                    ) : (
                        "없음"
                    )
                        
                    }
                  </p>
                  <p>
                    배경색:{" "}
                    <span
                      style={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        backgroundColor: popup.backgroundColor || "#ccc",
                        borderRadius: "4px",
                      }}
                    ></span>
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <Button variant="danger" className="flex-shrink-0" onClick={handleDeleteSelected}>삭제</Button>
    </Container>
  );
};

export default Popup;
