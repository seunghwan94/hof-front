import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import useAxios from "../../../hooks/useAxios";
import CustomEditor from "../../../components/layout/CustomEditor";

const CommunityAdd = () => {
  const navigate = useNavigate();
  const { req } = useAxios();
  const member = localStorage.getItem("member");
  const userMno = JSON.parse(member).mno;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]); // 선택한 이미지 저장
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]); // S3 업로드 후 반환된 URL 저장
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!member) {
    alert("로그인 후 이용해주세요.");
    return;
  }


  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  // 🔹 이미지 선택 시 상태에 저장
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  // 🔹 게시글 작성 버튼 클릭 시 실행
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
        let imageUrls = [];

        // 🔹 이미지 파일이 있으면 백엔드로 업로드 후 URL 받아오기
        if (images.length > 0) {
            const formData = new FormData();
            images.forEach((file) => formData.append("file", file));

            const response = await req("POST", "file/upload", formData, {
                "Content-Type": "multipart/form-data",
            });

            imageUrls = response; // ✅ 업로드된 이미지 URL 리스트 저장
            setUploadedImageUrls(imageUrls);
        }

        // 🔹 이미지 업로드가 완료된 후 게시글 데이터 전송
        const newParams = { mno: userMno, title, content };
        const params = new URLSearchParams(newParams).toString();

        const postData = new FormData();
        imageUrls.forEach((url) => postData.append("imageUrls", url)); // ✅ 업로드된 이미지 URL 추가

        const postResponse = await req("POST", `main/notes?${params}`, postData, {
            "Content-Type": "multipart/form-data",
        });
        // navigate("/community"); // 게시글 작성 후 커뮤니티 페이지로 이동
    } catch (err) {
        setError("게시글 작성에 실패했습니다.");
    } finally {
        setLoading(false);
    }
};


  return (
    <Container className="mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">게시글 작성</h2>
      {error && <p className="text-danger">{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>이미지 업로드</Form.Label>
          <Form.Control type="file" accept="image/*" multiple onChange={handleImageChange} />
        </Form.Group>

        <Form.Group className="mt-4">
          <Form.Label>내용</Form.Label>
          <CustomEditor onContentChange={handleEditorChange} uploadUrl={`file/upload`} initialValue={content} />
        </Form.Group>

        <div className="text-end mt-3">
          <Button className="btn btn-hof" type="submit" disabled={loading}>
            {loading ? "작성 중..." : "게시글 작성"}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default CommunityAdd;
