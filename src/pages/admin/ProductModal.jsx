import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ProductModal = ({ show, handleClose, product, handleChange, handleSaveChanges, handleDelete }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>상품 상세 정보</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {product && (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>카테고리</Form.Label>
              <Form.Control type="text" name="category" value={product.category} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>상품명</Form.Label>
              <Form.Control type="text" name="title" value={product.title} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>가격</Form.Label>
              <Form.Control type="number" name="price" value={product.price} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>재고</Form.Label>
              <Form.Control type="number" name="stock" value={product.stock} onChange={handleChange} />
            </Form.Group>
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
