import React, { useEffect, useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import useAxios from "../../../hooks/useAxios";

const CommentSection = ({ nno }) => {
  const { data: comments = [], loading, error, req } = useAxios();
  const [comment, setComment] = useState("");

  // 댓글 목록 가져오기
  useEffect(() => {
    const fetchComments = async () => {
      await req("GET", `main/reply/note/${nno}`); // ✅ 수정된 경로
    };
    if (nno) fetchComments();
  }, [nno, req]);

  // 댓글 등록 핸들러
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      await req("POST", `main/reply`, {
        nno,
        mno: 24, // 임시 사용자 ID
        content: comment,
        parentReplyId: null, // 대댓글의 경우 부모 ID 설정
      });

      // 댓글 추가 후 목록 새로고침
      await req("GET", `main/reply/note/${nno}`);
      setComment("");
    }
  };

  // 댓글 삭제 핸들러
  const handleDeleteComment = async (replyId) => {
    await req("DELETE", `main/reply/${replyId}`);
    await req("GET", `main/reply/note/${nno}`); // 삭제 후 목록 새로고침
  };

  // 로딩/에러 처리
  if (loading) return <Spinner animation="border" />;
  if (error) return <p>댓글 불러오기 실패: {error.message}</p>;

  return (
    <div className="comments-section mt-3">
      {/* 댓글 목록 */}
      {Array.isArray(comments) && comments.length > 0 ? (
        comments.map((reply) => (
          <div key={reply.replyId} className="border-bottom py-2" style={{ marginLeft: `${reply.depth * 20}px` }}>
            <strong>{reply.memberName || "익명"}</strong>
            <div className="text-muted small">{reply.createdAt || "방금"}</div>
            <p>{reply.content}</p>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => handleDeleteComment(reply.replyId)}
            >
              삭제
            </Button>
          </div>
        ))
      ) : (
        <p className="text-muted">첫 번째 댓글을 남겨보세요!</p>
      )}

      {/* 댓글 입력 */}
      <Form className="d-flex mt-3" onSubmit={handleCommentSubmit}>
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
    </div>
  );
};

export default CommentSection;
