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
              <Form.Label>회원 아이디</Form.Label>
              <Form.Control type="text" name="memberId" value={p.memberId} readOnly />
            </Form.Group>

            {/* 문의 내용 (읽기 전용) */}
            <Form.Group className="mb-3">
              <Form.Label>문의 내용</Form.Label>
              <Form.Control as="textarea" rows={3} name="content" value={p.content} readOnly />
            </Form.Group>

            {/* 기존 답변 리스트 */}
            <Form.Group className="mb-3">
              <Form.Label>기존 답변</Form.Label>
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
              <Form.Label>답변 작성</Form.Label>
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
      <Button variant="danger" onClick={handleDelete}>문의 삭제</Button>
        <Button variant="secondary" onClick={handleClose}>닫기</Button>
        <Button variant="primary" onClick={handleRegister}>답변 저장</Button>

      </Modal.Footer>
    </Modal>
  );
};

export default QnaModal;
