import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
const categoryMap = {
  1: "침대",
  2: "의자",
  3: "책상",
  4: "수납장",
  5: "옷장"
}
const ProductModal = ({ show, handleClose, p, handleChange, handleSaveChanges, handleDelete, handleOptionChange }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>상품 상세 정보</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {p && (
          <Form>
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
              <Form.Control type="number" name="price" value={p.price} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>재고</Form.Label>
              <Form.Control type="number" name="stock" value={p.stock} onChange={handleChange} />
            </Form.Group>

            {/* 옵션 목록 렌더링 */}
            <h5 className="mt-4">상품 옵션</h5>
            {p.options && p.options.length > 0 ? (
              p.options.map((option, index) => (
                <div key={index} className="border p-2 mb-2 rounded">
                  <Form.Group className="mb-2">
                    <Form.Label>옵션명</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={option.name}
                      onChange={(e) => handleOptionChange(e, index)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>옵션 가격</Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      value={option.price}
                      onChange={(e) => handleOptionChange(e, index)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
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
