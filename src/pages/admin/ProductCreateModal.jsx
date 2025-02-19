import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import { Editor } from "@tinymce/tinymce-react";
const categoryMap = {
  1: "침대",
  2: "의자",
  3: "책상",
  4: "수납장",
  5: "옷장"
};

const ProductCreateModal = ({ show, handleClose,handleChange }) => {
  const {  req } = useAxios();

  const [previewImages, setPreviewImages] = useState([]);
  const [contentUpdated, setContentUpdated] = useState(false);

  // 🔹 새로운 옵션 입력 상태
  const [newOption, setNewOption] = useState({
    type: "",
    value: "",
    addPrice: 0,
    stock: 0
  });

  // 🔹 옵션 입력 폼 보이기 여부
  const [showOptionForm, setShowOptionForm] = useState(false);

  // 🔹 옵션 추가 버튼 클릭 시 입력 폼 보이기
  const handleAddOptionClick = () => setShowOptionForm(true);

  // 🔹 옵션 입력값 변경 핸들러
  const handleNewOptionChange = (e) => {
    const { name, value } = e.target;
    setNewOption((prev) => ({
      ...prev,
      [name]: name === "addPrice" || name === "stock" ? Number(value) : value
    }));
  };

  // 🔹 옵션 저장 버튼 클릭 시 추가
  const handleSaveOption = () => {
    if (!newOption.type || !newOption.value) {
      alert("옵션 타입과 값을 입력해주세요.");
      return;
    }

    // 입력 필드 초기화
    setNewOption({
      type: "",
      value: "",
      addPrice: 0,
      stock: 0
    });

    setShowOptionForm(false); // 입력 폼 닫기
  };

  // 옵션 삭제

const handleDeleteOption = async (index, optionNo) => {
  if (!window.confirm("정말 삭제하시겠습니까?")) return;

  try {
    console.log(index);
    console.log(optionNo);
    const response = await req('delete',`main/prod/${optionNo}`);
    console.log(response)
    
    alert("옵션이 삭제되었습니다.");
  } catch (error) {
    console.error("옵션 삭제 오류:", error);
    alert("옵션 삭제 중 오류가 발생했습니다.");
  }
};
  const handleExistingOptionChange = (e, index) => {

  };



  /** (미리보기) */
  const handleImageUpload = async (blobInfo, success, failure) => {
    try {

      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result;
        setPreviewImages((prev) => [...prev, imageUrl]); // 미리보기 상태 업데이트
        success(imageUrl);
      };
      reader.readAsDataURL(blobInfo.blob());
    } catch (error) {
      console.error("이미지 미리보기 오류:", error);
      failure("이미지 미리보기에 실패했습니다.");
    }
  };
  

  /**  최종 저장 함수 */
const handleFinalSave = async () => {
  try {
    const imgRegex = /<img[^>]+src=["'](.*?)["']/g;
    let match;
    const imgUrls = [];

    // Base64 이미지 URL 추출
    while ((match = imgRegex.exec()) !== null) {
      imgUrls.push(match[1]);
    }



    //  이미지 업로드 후 S3 URL 반환
    const uploadedUrls = await Promise.all(
      imgUrls.map(async (url) => {
        if (!url.startsWith("data:image")) {
          return url; //  기존 URL이면 업로드 안 함
        }

        //  Base64 → Blob 변환
        const blob = await fetch(url).then((res) => res.blob());
        const formData = new FormData();
        formData.append("file", blob, "image.jpg");

        const response = await req("post", "file/upload", formData, {
          "Content-Type": "multipart/form-data",
        });

        console.log(" S3 업로드 응답:", response);

        return response?.location || response?.data?.url || response[0]; // 🔹 API 응답 확인
      })
    );

    console.log(" S3 업로드 완료:", uploadedUrls);


  } catch (error) {
    console.error("❌ 이미지 최종 업로드 오류:", error);
  }
};

// ✅ 상태 업데이트 후 `handleSaveChanges` 실행
useEffect(() => {
  if (contentUpdated) {
    console.log("🟢 상태 변경 후 API 요청 실행!");
    setContentUpdated(false);
  }
}, [contentUpdated]);

  

  return (
 <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>상품 상세 정보</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#eee" }}>
        
          <Form>
            <div className="border p-2 rounded" style={{ backgroundColor: "#fff" }}>
              <Form.Group className="mb-3">
                <Form.Label>카테고리</Form.Label>
                <Form.Control type="text" name="category"  onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>상품명</Form.Label>
                <Form.Control type="text" name="title"onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>가격</Form.Label>
                <Form.Control type="text" name="price" onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>재고</Form.Label>
                <Form.Control type="number" name="stock"  onChange={handleChange} />
              </Form.Group>

              {/*  TinyMCE (상품 설명 입력) */}
            <Form.Group className="mt-4">
              <Form.Label>상품 설명</Form.Label>
              <Editor
                apiKey="trgnbu8snkmw5p1ktqkfz87cxleiphn5div5xeo0n1tnrhxm"
                init={{
                  height: 300,
                  menubar: false,
                  plugins: ["image", "link", "media", "codesample", "lists", "visualblocks"],
                  toolbar:
                    "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image",
                  images_upload_handler: handleImageUpload, //  로컬 미리보기 기능 적용
                  automatic_uploads: false, //  즉시 업로드 방지 (로컬 미리보기 후 업로드)
                  image_uploadtab: true, //  이미지 업로드 탭 활성화
                  image_advtab: true, //  이미지 편집 활성화
                  file_picker_types: "image",
                  image_dimensions: false, //  이미지 크기 자동 적용 방지
                }}
                onEditorChange={(content) =>
                  handleChange({ target: { name: "content", value: content } })
                }
              />


              
            </Form.Group>


            </div>

            {/* 옵션 목록 렌더링 */}
            <h5 className="mt-4">상품 옵션</h5>  
                <div className="border p-2 mb-4 rounded" style={{ backgroundColor: "#fff" }}>
                  <Form.Group className="mb-3">
                    <Form.Label>옵션명&#40;  &#41;</Form.Label>
                    <Form.Control
                      type="text"
                      name="value"
                      onChange={(e) => handleExistingOptionChange(e)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>옵션 가격</Form.Label>
                    <Form.Control
                      type="text"
                      name="addPrice"
                      onChange={(e) => handleExistingOptionChange(e)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>옵션 재고</Form.Label>
                    <Form.Control
                      type="number"
                      name="stock"

                      onChange={(e) => handleExistingOptionChange(e)}
                    />
                  </Form.Group>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteOption()}>
                    옵션 삭제
                  </Button>
                </div>

            {/* 옵션 입력 폼 */}
              <div className="border p-3 mt-3 rounded bg-white">
                <h6>새 옵션 추가</h6>
                <Form.Group className="mb-2">
                  <Form.Label>옵션 타입</Form.Label>
                  <Form.Control type="text" name="type"  onChange={handleNewOptionChange} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>옵션명</Form.Label>
                  <Form.Control type="text" name="value"  onChange={handleNewOptionChange} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>추가 가격</Form.Label>
                  <Form.Control type="number" name="addPrice"  onChange={handleNewOptionChange} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>재고</Form.Label>
                  <Form.Control type="number" name="stock" onChange={handleNewOptionChange} />
                </Form.Group>
                <Button variant="primary" size="sm" onClick={handleSaveOption}>
                  옵션 저장
                </Button>
              </div>

            {/* 옵션 추가 버튼 */}
            <Button variant="success" className="mt-3" onClick={handleAddOptionClick}>
              옵션 추가
            </Button>
          </Form>
        </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleFinalSave}>
          저장
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductCreateModal;
