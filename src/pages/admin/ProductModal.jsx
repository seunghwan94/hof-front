import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
const categoryMap = {
  1: "침대",
  2: "의자",
  3: "책상",
  4: "수납장",
  5: "옷장"
}
const ProductModal = ({ show, handleClose, p, handleChange, handleSaveChanges, handleDelete, handleOptionChange }) => {
  p = p && {...p, price:p.price.toLocaleString()}

  // 🔹 새로운 옵션 입력 상태
  const [newOption, setNewOption] = useState({
    type: "",
    value: "",
    addPrice: 0,
    stock: 0
  });

  // 🔹 옵션 입력 폼 보이기 여부
  const [showOptionForm, setShowOptionForm] = useState(false);

  // 🔹 옵션 추가 버튼 클릭 시 입력 폼 보이기
  const handleAddOptionClick = () => setShowOptionForm(true);

  // 🔹 옵션 입력값 변경 핸들러
  const handleNewOptionChange = (e) => {
    const { name, value } = e.target;
    setNewOption((prev) => ({
      ...prev,
      [name]: name === "addPrice" || name === "stock" ? Number(value) : value
    }));
  };

  // 🔹 옵션 저장 버튼 클릭 시 추가
  const handleSaveOption = () => {
    if (!newOption.type || !newOption.value) {
      alert("옵션 타입과 값을 입력해주세요.");
      return;
    }

    const updatedOptions = [...(p.options || []), newOption];

    handleOptionChange(updatedOptions); // 부모 컴포넌트로 전달

    // 입력 필드 초기화
    setNewOption({
      type: "",
      value: "",
      addPrice: 0,
      stock: 0
    });

    setShowOptionForm(false); // 입력 폼 닫기
  };

  // 🔹 옵션 삭제
  const handleDeleteOption = (index) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const updatedOptions = p.options.filter((_, i) => i !== index);
      handleOptionChange(updatedOptions); // 부모 컴포넌트로 전달
    }
  };


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>상품 상세 정보</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{backgroundColor:"#eee"}}>
        {p && (
          <Form>
            <div className="border p-2 rounded" style={{backgroundColor: "#fff"}}>
            <Form.Group className="mb-3">
              <Form.Label>카테고리</Form.Label>
              <Form.Control type="text" name="category" value={categoryMap[p.cno] || "기타"} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>상품명</Form.Label>
              <Form.Control type="text" name="title" value={p.title} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>가격</Form.Label>
              <Form.Control type="text" name="price" value={p.price} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>재고</Form.Label>
              <Form.Control type="number" name="stock" value={p.stock} onChange={handleChange} />
            </Form.Group>
            </div>

            {/* 옵션 목록 렌더링 */}
            <h5 className="mt-4">상품 옵션</h5>
            {p.options && p.options.length > 0 ? (
              p.options.map((option, index) => (
                <div key={index} className="border p-2 mb-4 rounded" style={{backgroundColor: "#fff"}}>
                  <Form.Group className="mb-3">
                    <Form.Label>옵션명&#40; {option.type} &#41;</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={option.value}
                      onChange={(e) => handleOptionChange(e, index)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>옵션 가격</Form.Label>
                    <Form.Control
                      type="text"
                      name="price"
                      value={Number(option.addPrice).toLocaleString()}
                      onChange={(e) => handleOptionChange(e, index)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>옵션 재고</Form.Label>
                    <Form.Control
                      type="number"
                      name="stock"
                      value={option.stock}
                      onChange={(e) => handleOptionChange(e, index)}
                    />
                  </Form.Group>
                </div>
              ))
            ) : (
              <p>옵션 데이터가 없습니다.</p>
            )}



            {/* 옵션 입력 폼 */}
            {showOptionForm && (
              <div className="border p-3 mt-3 rounded bg-white">
                <h6>새 옵션 추가</h6>
                <Form.Group className="mb-2">
                  <Form.Label>옵션 타입</Form.Label>
                  <Form.Control type="text" name="type" value={newOption.type} onChange={handleNewOptionChange} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>옵션명</Form.Label>
                  <Form.Control type="text" name="value" value={newOption.value} onChange={handleNewOptionChange} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>추가 가격</Form.Label>
                  <Form.Control type="number" name="addPrice" value={newOption.addPrice} onChange={handleNewOptionChange} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>재고</Form.Label>
                  <Form.Control type="number" name="stock" value={newOption.stock} onChange={handleNewOptionChange} />
                </Form.Group>
                <Button variant="primary" size="sm" onClick={handleSaveOption}>
                  옵션 저장
                </Button>
              </div>
            )}

             {/* 옵션 추가 버튼 */}
             <Button variant="success" className="mt-3" onClick={handleAddOptionClick}>
              옵션 추가
            </Button>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDelete}>삭제</Button>
        <Button variant="primary" onClick={handleSaveChanges}>저장</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
