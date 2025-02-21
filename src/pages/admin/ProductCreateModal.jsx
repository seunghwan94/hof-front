import React, { useState } from "react";
import { Modal, Button, Form, Image } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import { Editor } from "@tinymce/tinymce-react";

const categoryMap = {
  1: "침대",
  2: "의자",
  3: "책상",
  4: "수납장",
  5: "옷장"
};

const ProductCreateModal = ({ show, handleClose }) => {
  const { req } = useAxios();
  const [previewImages, setPreviewImages] = useState([]);
  const [contentUpdated, setContentUpdated] = useState(false);
  const [newOptionForm, setNewOptionForm] = useState(false); // 옵션 입력 필드 표시 여부
  const [previewThumbnail, setPreviewThumbnail] = useState([]); //  썸네일 미리보기
  const [thumbnailUrl, setThumbnailUrl] = useState([]); // 썸네일 URL 저장
  // 🔹 상품 등록을 위한 상태
  const [newProduct, setNewProduct] = useState({
    title: "",
    content: "",
    price: 0,
    stock: 0,
    cno: 1, // 카테고리 번호
    options: [] // 옵션 리스트
  });
  const handleThumbnailUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const uploadedUrls = [...thumbnailUrl]; // 기존 업로드된 URL 유지
    const previewUrls = [...previewThumbnail]; // 기존 미리보기 유지

    for (let file of files) {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await req("post", "file/upload/thumnail", formData, {
                "Content-Type": "multipart/form-data",
            });

            if (response) {
                uploadedUrls.push(response); // 업로드된 URL 추가
                previewUrls.push(URL.createObjectURL(file)); // 미리보기 추가
            }
        } catch (error) {
            console.error("썸네일 업로드 실패", error);
        }
    }

    // 상태 업데이트 (기존 미리보기 & 업로드된 파일 유지)
    setThumbnailUrl(uploadedUrls);
    setPreviewThumbnail(previewUrls);
};

  const [newOption, setNewOption] = useState({
    type: "",
    value: "",
    addPrice: 0,
    stock: 0
  });
  
  // 🔹 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value.replace(/,/g, "")) : value
    }));
  };


  const handleNewOptionChange = (e) => {
    const { name, value } = e.target;
    setNewOption((prev) => ({
      ...prev,
      [name]: name === "addPrice" || name === "stock" ? Number(value) : value
    }));
  };

  const handleSaveOption = () => {
    if (!newOption.type || !newOption.value) {
      alert("옵션 타입과 값을 입력해주세요.");
      return;
    }
    setNewProduct((prev) => ({
      ...prev,
      options: [...prev.options, newOption]
    }));

    setNewOption({ type: "", value: "", addPrice: 0, stock: 0 }); // 옵션 입력 필드 초기화
  };

  const handleDeleteOption = (index) => {
    setNewProduct((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index)
    }));
  };

  /** 🔹 이미지 업로드 핸들러 (TinyMCE 미리보기) */
  const handleImageUpload = async (blobInfo, success, failure) => {
    try {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result;
        setPreviewImages((prev) => [...prev, imageUrl]);
        success(imageUrl);
      };
      
      reader.readAsDataURL(blobInfo.blob());
    } catch (error) {
      console.error("이미지 미리보기 오류:", error);
      failure("이미지 미리보기에 실패했습니다.");
    }
  };
  

  const handleFinalSave = async () => {
    if (newProduct.options.length === 0 ) {
      alert("최소 한 개의 옵션을 추가해야 합니다.");
      return;
    }else if(newProduct.title == ""){
      alert("상품명은 반드시 입력해야합니다.")
      return;
    }
    try {
      let content = newProduct.content;
      const imgRegex = /<img[^>]+src=["'](.*?)["']/g;
      let match;
      const imgUrls = [];
      //tinymce 이미지찾기
    
      while ((match = imgRegex.exec(content)) !== null) {
        imgUrls.push(match[1]);
      }

      const uploadedUrls = await Promise.all(
        imgUrls.map(async (url) => {
          if (!url.startsWith("data:image")) return url;
  
          const blob = await fetch(url).then((res) => res.blob());
          const formData = new FormData();
          formData.append("file", blob, "image.jpg");
          
          const response = await req("post", "file/upload", formData, {
            "Content-Type": "multipart/form-data",
          });

          console.log(response);
  
          return response?.location || response?.data?.url || response[0];
        })
      );
      //tinymce content내 이미지 url로 변경
      imgUrls.forEach((oldUrl, index) => {
        content = content.replace(oldUrl, uploadedUrls[index]);
      });

      const updatedProduct = {
        ...newProduct,
        content: `${content}`,
        imageUrls: uploadedUrls, // 본문 내 업로드된 이미지들
        thumbnailUrl: thumbnailUrl, // 썸네일 URL 포함
      };
  
      console.log("::::::::::::::::" + updatedProduct)

      await req("post", "main/prod", updatedProduct);
      alert("상품이 등록되었습니다!");
      handleClose();
      window.location.reload(); 
    } catch (error) {
      console.error("상품 등록 오류:", error);
      alert("상품 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>상품 등록</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* 🔹 카테고리 선택 */}
          <Form.Group className="mb-3">
            <Form.Label>카테고리</Form.Label>
            <Form.Select name="cno" value={newProduct.cno} onChange={handleChange}>
              {Object.entries(categoryMap).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>썸네일 업로드</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleThumbnailUpload} />
             {/* 썸네일 미리보기 (여러 개 표시) */}
          <div className="d-flex flex-wrap mt-2">
            {previewThumbnail.length > 0 ? (
              previewThumbnail.map((thumb, index) => (
                <Image key={index} src={thumb} alt={`썸네일 ${index + 1}`} fluid className="me-2"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }} />
              ))
            ) : (
              <p className="text-muted">썸네일을 업로드해주세요.</p> 
            )}
          </div>
          </Form.Group>
          {/* 🔹 상품명 입력 */}
          <Form.Group className="mb-3">
            <Form.Label>상품명</Form.Label>
            <Form.Control type="text" name="title" value={newProduct.title} onChange={handleChange} />
          </Form.Group>


          {/* 🔹 가격 입력 */}
          <Form.Group className="mb-3">
            <Form.Label>가격</Form.Label>
            <Form.Control type="text" name="price" value={newProduct.price.toLocaleString()} onChange={handleChange} />
          </Form.Group>

          {/* 🔹 상품 설명 입력 (TinyMCE Editor) */}
          <Form.Group className="mb-3">
            <Form.Label>상품 설명</Form.Label>
            <Editor
              apiKey="trgnbu8snkmw5p1ktqkfz87cxleiphn5div5xeo0n1tnrhxm"
              value={newProduct.content}
              init={{
                height: 300,
                menubar: false,
                plugins: ["image", "link", "media", "codesample", "lists", "visualblocks"],
                toolbar: "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | image",
                images_upload_handler: handleImageUpload,
                automatic_uploads: false,
                image_uploadtab: true,
              }}
              onEditorChange={(content) => handleChange({ target: { name: "content", value: content } })}
            />
          </Form.Group>

          {/* 옵션 추가 폼 */}
          <h5>옵션 추가</h5>
          {newProduct.options.map((option, index) => (
            <div key={index} className="border p-2 mb-2 rounded">
              <p>{option.type} - {option.value} ({option.addPrice}원) 재고: {option.stock}</p>
              <Button variant="danger" size="sm" onClick={() => handleDeleteOption(index)}>옵션 삭제</Button>
            </div>
          ))}
          {newOptionForm && (
            <div className="border p-3 mb-2 rounded">
              {/* 옵션 입력 폼 */}
                            <div className="border p-3 mt-3 rounded bg-white">
                              <h6>새 옵션 추가</h6>
                              <Form.Group className="mb-2">
                                <Form.Label>옵션 타입</Form.Label>
                                <Form.Control type="text" name="type" value={newOption.type} onChange={handleNewOptionChange} />
                              </Form.Group>
                              <Form.Group className="mb-2">
                                <Form.Label>옵션명</Form.Label>
                                <Form.Control type="text" name="value" value={newOption.value} onChange={handleNewOptionChange} />
                              </Form.Group>
                              <Form.Group className="mb-2">
                                <Form.Label>추가 가격</Form.Label>
                                <Form.Control type="number" name="addPrice" value={newOption.addPrice} onChange={handleNewOptionChange} />
                              </Form.Group>
                              <Form.Group className="mb-2">
                                <Form.Label>재고</Form.Label>
                                <Form.Control type="number" name="stock" value={newOption.stock} onChange={handleNewOptionChange} />
                              </Form.Group>
                              <Button variant="primary" size="sm" onClick={handleSaveOption}>
                                옵션 저장
                              </Button>
                            </div>
            </div>
          )}
          <Button variant="success" onClick={() => setNewOptionForm(true)}>옵션 추가</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleFinalSave}>등록</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductCreateModal;
