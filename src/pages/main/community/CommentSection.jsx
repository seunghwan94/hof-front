import React, { useEffect, useState } from "react";
import { Spinner, Button, Form } from "react-bootstrap";
import useAxios from "../../../hooks/useAxios";

const CommentSection = ({ nno }) => {
  const { data: comments = [], loading, error, req } = useAxios();
  const [comment, setComment] = useState("");
  const [replyTo, setReplyTo] = useState(null); // 대댓글 대상
  const [expandedReplies, setExpandedReplies] = useState({}); // 대댓글 펼침 상태
  const [visibleComments, setVisibleComments] = useState(5);
  const [showScroll, setShowScroll] = useState(false);

  // 댓글 목록 가져오기
  const fetchComments = async () => {
    await req("GET", `main/reply/note/${nno}`);
  };

  useEffect(() => {
    if (nno) fetchComments();
  }, [nno]);

  // 댓글/대댓글 등록 핸들러
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      await req("POST", `main/reply`, {
        nno,
        mno: 24, // 임시 사용자 ID
        content: comment,
        parentReplyId: replyTo, // 대댓글일 경우 parentReplyId 설정
      });
      setComment("");
      setReplyTo(null); // 대댓글 입력 상태 초기화
      fetchComments(); // 댓글 목록 새로고침
    }
  };

  // 더보기 클릭
  const handleShowMore = () => {
    setVisibleComments((prev) => prev + 5);
    setShowScroll(true);
  };

  // 댓글 계층 구조 생성
  const buildCommentTree = (flatComments) => {
    if (!Array.isArray(flatComments)) return [];
    const commentMap = {};
    const roots = [];

    flatComments.forEach((comment) => {
      comment.children = [];
      commentMap[comment.replyId] = comment;

      if (comment.parentReplyId === null) {
        roots.push(comment);
      } else if (commentMap[comment.parentReplyId]) {
        commentMap[comment.parentReplyId].children.push(comment);
      }
    });

    return roots;
  };

  // 대댓글 펼침/숨김 토글
  const toggleReplies = (replyId) => {
    setExpandedReplies((prev) => ({
      ...prev,
      [replyId]: !prev[replyId],
    }));
  };

  // 댓글 렌더링
  const renderComments = (comments, depth = 0) => {
    return comments.map((reply) => (
      <div
        key={reply.replyId}
        className="border-bottom py-2"
        style={{ marginLeft: `${depth * 20}px` }}
      >
        <strong>{reply.memberName || "익명"}</strong>
        <div className="text-muted small">{reply.createdAt || "방금"}</div>
        <p>{reply.content}</p>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => setReplyTo(reply.replyId)}
        >
          답글
        </Button>

        {/* 대댓글 토글 버튼 */}
        {reply.children && reply.children.length > 0 && (
          <Button
            size="sm"
            className="ms-2 btn btn-outline-hof"
            onClick={() => toggleReplies(reply.replyId)}
          >
            {expandedReplies[reply.replyId] ? "대댓글 숨기기" : `대댓글 보기 (${reply.children.length})`}
          </Button>
        )}

        {/* 대댓글 입력창 */}
        {replyTo === reply.replyId && (
          <Form className="d-flex mt-2" onSubmit={handleCommentSubmit}>
            <Form.Control
              type="text"
              placeholder="대댓글을 입력하세요..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button className="ms-2 w-25 btn-hof" type="submit">
              등록
            </Button>
          </Form>
        )}

        {/* 대댓글 렌더링 (펼침 상태일 때만) */}
        {expandedReplies[reply.replyId] &&
          reply.children &&
          reply.children.length > 0 &&
          renderComments(reply.children, depth + 1)}
      </div>
    ));
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <p>댓글 불러오기 실패: {error.message}</p>;

  const commentTree = buildCommentTree(comments);

  return (
    <div>
      {/* 댓글 목록 */}
      <div
        className="comments-list"
        style={{
          maxHeight: showScroll ? "auto" : "auto",
          overflowY: showScroll ? "auto" : "hidden",
          border: "1px solid #ddd",
          borderRadius: "5px",
          padding: "10px",
        }}
      >
        {Array.isArray(commentTree) && commentTree.length > 0 ? (
          <>
            {renderComments(commentTree)}
            {visibleComments < comments.length && (
              <div className="text-center mt-3">
                <Button variant="outline-primary" onClick={handleShowMore}>
                  더보기
                </Button>
              </div>
            )}
          </>
        ) : (
          <p className="text-muted">댓글이 없습니다.</p>
        )}
      </div>

      {/* 댓글 입력 폼 */}
      {!replyTo && (
        <Form className="d-flex mt-3" onSubmit={handleCommentSubmit}>
          <Form.Control
            type="text"
            placeholder="댓글을 입력하세요..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button className="ms-2 btn btn-hof w-25" type="submit">
            등록
          </Button>
        </Form>
      )}
    </div>
  );
};

export default CommentSection;
