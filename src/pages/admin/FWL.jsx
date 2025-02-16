import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap';
import useAxios from '../../hooks/useAxios';

const FWL = () => {
  const { data = [], loading, error, req } = useAxios();
  const [fwlData, setFwlData] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [newContent, setNewContent] = useState('');
  useEffect(() => {
    req('get', 'index/fwl');
  }, [req]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setFwlData(data);
    }
  }, [data]);

  if (error) {
    console.log(error);
    return <div><h1>에러 발생</h1></div>;
  }
  if (loading) {
    return <div><h1>로딩 중...</h1></div>;
  }

  //  토글글
  const handleToggle = async (fno, isActive) => {
    setFwlData(prev =>
      prev.map(f => (f.fno === fno ? { ...f, isActive: !isActive } : f))
    );
    await req('put', `index/fwl/update/${fno}`, { isActive: !isActive });
  };

  // 체크박스
  const handleCheckboxChange = (fno) => {
    setSelectedIds(prev =>
      prev.includes(fno) ? prev.filter(id => id !== fno) : [...prev, fno]
    );
  };
  // 삭제
  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return alert('삭제할 항목을 선택하세요.');

    const updatedData = fwlData.filter(f => !selectedIds.includes(f.fno));
    setFwlData(updatedData);
    setSelectedIds([]);
    await req('delete', 'index/fwl/delete', { ids: selectedIds });
  };

  //등록
  const handleAdd = async () => {
    if (!newContent.trim()) return alert('내용을 입력하세요.');
  
    try {
      await req('post', 'index/fwl/add', { content: newContent, isActive: true });
  
      setNewContent(''); // ✅ 입력 필드 초기화
  

      req('get', 'index/fwl'); 
    } catch (error) {
      console.error("등록 실패", error);
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
                <th>
                  <Form.Check
                    type="checkbox"
                    onChange={() => setSelectedIds(
                      selectedIds.length ? [] : fwlData.map(f => f.fno)
                    )}
                  />
                </th>
                <th>no</th>
                <th>내용</th>
                <th>활성화상태</th>
                <th>등록일자</th>
              </tr>
            </thead>
            <tbody>
              {fwlData.map((f) => (
                <tr key={f.fno}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={selectedIds.includes(f.fno)}
                      onChange={() => handleCheckboxChange(f.fno)}
                    />
                  </td>
                  <td>{f.fno}</td>
                  <td>{f.content}</td>
                  <td>
                    <Form.Check
                      type="switch"
                      checked={f.isActive}
                      onChange={() => handleToggle(f.fno, f.isActive)}
                    />
                  </td>
                  <td>{f.regDate}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* 모바일 화면에서는 카드 형식 */}
      <div className="d-md-none">
        <Row className="g-3">
          {fwlData.map((f) => (
            <Col xs={12} key={f.fno}>
              <Card className="p-3 shadow-sm">
                <Card.Body>
                  <Form.Check
                    type="checkbox"
                    checked={selectedIds.includes(f.fno)}
                    onChange={() => handleCheckboxChange(f.fno)}
                    className="mb-2"
                  />
                  <p className="text-muted">no: {f.fno}</p>
                  <h5>{f.content}</h5>
                  <Form.Check
                    type="switch"
                    label="활성화"
                    checked={f.isActive}
                    onChange={() => handleToggle(f.fno, f.isActive)}
                    className="mt-2"
                  />
                  <p className="text-muted">{f.regDate}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <Button variant="danger" className="flex-shrink-0" onClick={handleDeleteSelected}>삭제</Button>
      {/* ✅ 추가 영역 */}
      <div className="d-flex gap-2 mb-3 align-items-center flex-nowrap">
        <Form.Control 
          type="text"
          placeholder="내용 입력..."
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          style={{ width: '350px' }}
        />
        <Button variant="primary" className="flex-shrink-0" onClick={handleAdd}>등록</Button>

      </div>
    </Container>
  );
}

export default FWL;
