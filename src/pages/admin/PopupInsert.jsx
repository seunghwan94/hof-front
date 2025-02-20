import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { ChromePicker } from "react-color"; 
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

const PopupInsert = ({ setActiveTab }) => {
  const { req } = useAxios();
  const navigate = useNavigate(); 
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [popupData, setPopupData] = useState({
    title: "",
    content: "",
    clickUrl: "",
    backgroundColor: "#ffffff",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPopupData((prev) => ({ ...prev, [name]: value }));
  };


  const handleColorChange = (color) => {
    setPopupData((prev) => ({ ...prev, backgroundColor: color.hex }));
  };



  const handleFileChange = async (e) => {
    const file = e.target.files[0]; 
    if (!file) return;
  
    const formData = new FormData();
    formData.append("file", file);

  
    try {
      const response = await req("post", "file/popup/upload", formData,{"Content-Type": "multipart/form-data"});
      console.log(response);
      setPopupData((prev) => ({
        ...prev,
        fileUrl: response,
      }));
    } catch (error) {
      console.error("파일 업로드 실패", error);
    }
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const noticeDto = {
      title: popupData.title,
      content: popupData.content,
      clickUrl: popupData.clickUrl,
      backgroundColor: popupData.backgroundColor,
      fileUrl: popupData.fileUrl,
      memberId: "hof5",
    };
    console.log(":::::::::::::::::::::"+noticeDto.fileUrl);

    console.log(noticeDto)
  
    try {
      await req("post", "admin/notice", noticeDto);
  
      alert("팝업이 등록되었습니다.");
      setIsSubmitted(true);
    } catch (error) {
      console.error("등록 실패", error);
    }
  };
  
  useEffect(() => {
    if (isSubmitted) {
      setActiveTab("popuplist")
    }
  }, [isSubmitted, navigate]);
  return (
    <Container>
      <h3 className="mb-3">팝업 등록</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>제목</Form.Label>
          <Form.Control type="text" name="title" value={popupData.title} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>내용</Form.Label>
          <Form.Control as="textarea" name="content" rows={3} value={popupData.content} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>URL</Form.Label>
          <Form.Control type="url" name="clickUrl" value={popupData.clickUrl} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>배경색</Form.Label>
          <ChromePicker color={popupData.backgroundColor} onChangeComplete={handleColorChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>이미지 업로드</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          등록하기
        </Button>
        <Button variant="secondary" className="ms-2" onClick={() => navigate("/admin/popup")}>
          취소
        </Button>
      </Form>
    </Container>
  );
};

export default PopupInsert;
