import React from "react";
import { Form, Button } from "react-bootstrap";

const CommentForm = ({ comment, setComment, onSubmit }) => (
  <Form className="d-flex mt-3" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
    <Form.Control
      type="text"
      placeholder="댓글을 입력하세요..."
      value={comment}
      onChange={(e) => setComment(e.target.value)}
    />
    <Button variant="primary" className="ms-2" type="submit">
      등록
    </Button>
  </Form>
);

export default CommentForm;
