import React from 'react';
import { Modal, Button, Form } from "react-bootstrap";

const QnaModal = ({ show, handleClose, p, handleChange, handleRegister,handleDelete }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>문의 상세 정보</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {p && (
          <Form>
            {/* 회원 아이디 (읽기 전용) */}
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "bold" }} >회원 아이디</Form.Label>
              <Form.Control type="text" name="memberId" value={p.memberId} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: "bold" }}>상품명</Form.Label>
              <Form.Control type="text" name="prodTitle" value={p.prodTitle} readOnly />
            </Form.Group>

            {/* 문의 내용 (읽기 전용) */}
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "bold" }}>문의 내용</Form.Label>
              <Form.Control as="textarea" rows={3} name="content" value={p.content} readOnly />
            </Form.Group>

            {/* 기존 답변 리스트 */}
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "bold" }}>기존 답변</Form.Label>
              {p.existingReply && p.existingReply !== "현재 작성된 답변이 없습니다." ? (
                <ul className="list-group">

                  {p.existingReply.split("\n\n").map((reply, index) => (
                    <li key={index} className="list-group-item">{p.memberId} :{reply}</li>
                  ))}
                </ul>
              ) : (
                <p>현재 작성된 답변이 없습니다.</p>
              )}
            </Form.Group>

            {/* 관리자 답변 입력란 */}
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: "bold" }}>답변 작성</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="replyContent"
                value={p.replyContent || ""}
                onChange={handleChange}
                placeholder="답변 내용을 입력하세요..."
              />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
      <Button variant="btn btn-outline-hof " onClick={handleDelete}>문의 삭제</Button>

        <Button variant="btn btn-hof" onClick={handleRegister}>답변 저장</Button>

      </Modal.Footer>
    </Modal>
  );
};

export default QnaModal;
