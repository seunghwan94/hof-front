import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import useAxios from "../../../hooks/useAxios";
import CustomEditor from "../../../components/layout/CustomEditor";

const CommunityAdd = () => {
  const navigate = useNavigate();
  const { req } = useAxios();
  const member = localStorage.getItem("member");
  const userMno = JSON.parse(member).mno;
  const [fwlResponse, setFwlResponse] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]); // 선택한 이미지 저장
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
          if(!isForbiddenWordUsed(content)){
            let imageUrls = [];

            // 🔹 이미지 파일이 있으면 백엔드로 업로드 후 URL 받아오기
            if (images.length > 0) {
              const formData = new FormData();
              images.forEach((file) => formData.append("file", file));

              const response = await req("POST", "file/upload", formData, {
                  "Content-Type": "multipart/form-data",
              });

              imageUrls = response; // ✅ 업로드된 이미지 URL 리스트 저장
            

              // 🔹 이미지 업로드가 완료된 후 게시글 데이터 전송
              const newParams = { mno: userMno, title: "제목", content };
              const params = new URLSearchParams(newParams).toString();

              const postData = new FormData();
              imageUrls.forEach((url) => postData.append("imageUrls", url)); // ✅ 업로드된 이미지 URL 추가

              await req("POST", `main/notes?${params}`, postData, {
                  "Content-Type": "multipart/form-data",
              });
              navigate("/community", { state: { refresh: true } }); // 게시글 작성 후 커뮤니티 페이지로 이동
            }else{
              alert("이미지 없음");
            }
          }else{
            alert("일단 금지어 타는지");
          }
        } catch (err) {
            setError("게시글 작성에 실패했습니다.");
        } finally {
            setLoading(false);
        }
      
  };

  const fetchFwlList = useCallback(async () => {
    setLoading(true); // 🔹 데이터 가져오기 전 로딩 상태 설정
    try {
      const response = await req("get", "admin/fwl");
      setFwlResponse(response || []); // 🔹 데이터가 없을 경우 빈 배열로 설정
    } catch (error) {
      console.error("금지어 리스트 불러오기 실패:", error);
    } finally {
      setLoading(false); // 🔹 데이터 가져온 후 로딩 해제
    }
  }, [req]);
  
  useEffect(() => {
    fetchFwlList();
  }, [fetchFwlList]);
  
  const isForbiddenWordUsed = (text) => {
    if (!text || fwlResponse.length === 0) return false; // 🔹 데이터가 로드되기 전엔 금지어 필터링 X
    return fwlResponse.some(fwl => text.includes(fwl.content));
  };
  
  if (!member) {
    alert("로그인 후 이용해주세요.");
    return;
  }
  
  return (
    <Container className="mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">게시글 작성</h2>
      {error && <p className="text-danger">{error}</p>}
      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3">
          <Form.Label>이미지 업로드</Form.Label>
          <Form.Control type="file" accept="image/*" multiple onChange={handleImageChange} />
        </Form.Group>

        <Form.Group className="mt-4">
          <Form.Label>내용</Form.Label>
          <CustomEditor onContentChange={handleEditorChange} uploadUrl={`file/upload`} initialValue={content}  domain="community"/>
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
