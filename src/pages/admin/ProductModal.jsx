
import React, { useCallback, useEffect, useState } from "react";
import { Modal, Button, Form, Image } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import CustomEditor from "../../components/layout/CustomEditor";
const categoryMap = {
  1: "침대",
  2: "의자",
  3: "책상",
  4: "수납장",
  5: "옷장"
};

const ProductModal = ({ show, handleClose, p = {}, handleChange, handleSaveChanges, handleDelete, handleOptionChange }) => {
  const [prevContent, setPrevContent] = useState("");
  // 상품 데이터 상태 관리 (p의 변경 감지)
  const [product, setProduct] = useState(p);
    const [fwlResponse, setFwlResponse] = useState([]); // 금지어 리스트 상태
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
  useEffect(() => {
    setProduct(p);
  }, [p]);
  
  // for(let k  in p){
  //   console.log(`${k}`,p[k]);
  // }
  const {  req } = useAxios();

  const [previewImages, setPreviewImages] = useState([]);
  const [contentUpdated, setContentUpdated] = useState(false);
  //  새로운 옵션 입력 상태
  const [newOption, setNewOption] = useState({
    type: "",
    value: "",
    addPrice: 0,
    stock: 0
  });

  //  옵션 입력 폼 보이기 여부
  const [showOptionForm, setShowOptionForm] = useState(false);

  //  옵션 추가 버튼 클릭 시 입력 폼 보이기
  const handleAddOptionClick = () => setShowOptionForm(true);

  //  옵션 입력값 변경 핸들러
  const handleNewOptionChange = (e) => {
    const { name, value } = e.target;
    setNewOption((prev) => ({
      ...prev,
      [name]: name === "addPrice" || name === "stock" ? Number(value) : value
    }));
  };

  //  옵션 저장 버튼 클릭 시 추가
  const handleSaveOption = () => {
    if (!newOption.type || !newOption.value) {
      alert("옵션 타입과 값을 입력해주세요.");
      return;
    }

    const updatedOptions = [...(p.options || []), newOption];

    handleOptionChange(updatedOptions); // 부모 컴포넌트로 전달

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
    // console.log(index);
    // console.log(optionNo);
    const response = await req('delete',`main/prod/${optionNo}`);
    console.log(response)


    const updatedOptions = p.options.filter((_, i) => i !== index);
    handleOptionChange(updatedOptions);
    
    alert("옵션이 삭제되었습니다.");
  } catch (error) {
    console.error("옵션 삭제 오류:", error);
    alert("옵션 삭제 중 오류가 발생했습니다.");
  }
};
  const handleExistingOptionChange = (e, index) => {
    const { name, value } = e.target;

    const updatedOptions = p.options.map((option, i) =>
      i === index ? { ...option, [name]: name === "addPrice" || name === "stock" ? Number(value) : value } : option
    );

    handleOptionChange(updatedOptions);
  };


  /** TinyMCE에서 받아온 content 업데이트 */
  // const handleEditorChange = (newContent) => {
  //   if (p.content !== newContent) {
  //     handleChange({ target: { name: "content", value: newContent } });
  //     setContentUpdated(true); // 상태 변경 감지
  //   }
  // };
  const handleEditorChange = (newContent) => {
    // if (newContent.trim() === prevContent.trim()) {
    //   console.log("✅ 동일한 content, 변경 없음 → 리렌더링 방지");
    //   return;
    // }
    // console.log("📥 변환된 content 받음:", newContent);
    // setPrevContent(newContent);
    // setProduct((prev) => ({ ...prev, content: newContent }));
    // handleChange({ target: { name: "content", value: newContent } });
    if (newContent === prevContent){
      return;
    }  //  기존과 동일하면 업데이트 안함
    // setProduct((prev) => ({ ...prev, content: newContent }));
        handleChange({ target: { name: "content", value: newContent } });
    setPrevContent(newContent);
  };
    const fetchFwlList = useCallback(async () => {
      try {
        const response = await req("get", "admin/fwl");
        setFwlResponse(response); // 금지어 리스트 업데이트
      } catch (error) {
        console.error("금지어 리스트 불러오기 실패:", error);
      } finally {
        setLoading(false); // 로딩 완료
      }
    }, [req]); // `req`가 변경되지 않도록 유지
  
    useEffect(()=> {
      fetchFwlList();
    },[fetchFwlList]);
    const isForbiddenWordUsed = (text) => {
    
      return fwlResponse.some(fwl => text.includes(fwl.content));
    };
  
  /** Base64 → S3 URL 변환 후 content 업데이트 */
  const handleFinalSave = async () => {
    try {
      let content = product.content;
    //   // console.log("현재 content:", content);

    //   const imgRegex = /<img[^>]+src=["'](.*?)["']/g;
    //   let match;
    //   const imgUrls = [];

    //   while ((match = imgRegex.exec(content)) !== null) {
    //     imgUrls.push(match[1]);
    //   }

    //   if (imgUrls.length === 0) {
    //     // console.log("변환할 이미지 없음");
    //     return content;
    //   }

    //   // console.log("Base64 이미지 S3 업로드 시작...");

    //   //  Base64 → S3 URL 변환
    //   const uploadedUrls = await Promise.all(
    //     imgUrls.map(async (url) => {
    //       if (!url.startsWith("data:image")) return url;

    //       const blob = await fetch(url).then((res) => res.blob());
    //       const formData = new FormData();
    //       formData.append("file", blob, "image.jpg");

    //       if (product.pno) formData.append("pno", product.pno);

    //       const response = await req("post", `file/upload/${product.pno}`, formData, {
    //         "Content-Type": "multipart/form-data",
    //       });

    //       // console.log("S3 업로드 응답:", response);

    //       return response?.location || response?.data?.url || response[0];
    //     })
    //   );

    //   // console.log("S3 업로드 완료:", uploadedUrls);


    //   imgUrls.forEach((oldUrl, index) => {
    //     content = content.replace(oldUrl, uploadedUrls[index]);
    //   });
    try {
      let content = product.content;
      if (content.includes("hof-bucket.s3.ap-northeast-2.amazonaws.com")) {
        console.log("이미 S3 URL 변환된 content, 재업로드 스킵");
        return content;
      }
      if (isForbiddenWordUsed(product.title) || isForbiddenWordUsed(product.content)) {
        alert(`상품명 또는 상품 설명에 금지어가 포함되어 있습니다.\n 내용 : ${product.title}${product.content}`);
        return;
      }
      console.log("🔍 fwlResponse (JSON 변환):", JSON.stringify(fwlResponse, null, 2));
      // Base64 → S3 업로드 로직 실행
      const updatedContent = `<div class='product-images'>${content}</div>`;
      console.log("최종 변환된 content:", updatedContent);
      setProduct((prev) => ({ ...prev, content: updatedContent }));
  
      return updatedContent;
    } catch (error) {
      console.error("이미지 변환 오류:", error);
      return null;
    }
      // const updatedContent = `<div class='product-images'>${content}</div>`;
      // console.log("최종 변환된 content:", updatedContent);


      // setProduct((prev) => ({ ...prev, content: updatedContent }));

      // return updatedContent;
    } catch (error) {
      console.error("이미지 변환 오류:", error);
      return null;
    }
  };

  /** 최종 저장 버튼 클릭 */
const handleSaveButtonClick = async () => {
  console.log("저장 버튼 클릭됨, API 요청 실행!");

  const updatedContent = await handleFinalSave();

  if (updatedContent) {
    console.log("최종 저장할 content:", updatedContent);

    //  변환된 content를 포함한 새로운 product 객체 생성
    const updatedProduct = { ...product, content: updatedContent };

    //  부모 handleSaveChanges 호출 (DB 반영)
    await handleSaveChanges(updatedProduct);

    //  여기서 alert 제거 (handleSaveChanges 내부에서 이미 호출될 가능성 있음)
    handleClose();
  }
};

  
  
  


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>상품 상세 정보</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#eee" }}>
        {p && (
          <Form>
            <div className="border p-2 rounded" style={{ backgroundColor: "#fff" }}>
              <Form.Group className="mb-3">
                <Form.Label>카테고리</Form.Label>
                <Form.Control type="text" name="category" value={categoryMap[p.cno] || "기타"} onChange={handleChange} readOnly/>
              </Form.Group>
              <Form.Group className="mb-3">
              <Form.Label>썸네일</Form.Label>
              <div className="d-flex flex-wrap">
                {p.imageUrls && p.imageUrls.length > 0 ? (
                  p.imageUrls.map((thumb, index) => (
                    <Image
                      key={index}
                      src={thumb}
                      alt={`썸네일 ${index + 1}`}
                      fluid
                      className="me-2 rounded border"
                      style={{ width: "80px", height: "80px", objectFit: "cover" }}
                    />
                  ))
                ) : (
                  <p className="text-muted">썸네일 이미지가 없습니다.</p>
                )}
              </div>
            </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>상품명</Form.Label>
                <Form.Control type="text" name="title" value={p.title} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>가격</Form.Label>
                <Form.Control type="text" name="price" value={p.price} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>재고</Form.Label>
                <Form.Control type="number" name="stock" value={p.stock} onChange={handleChange} readOnly/>
              </Form.Group>

            {/* TinyMCE 컴포넌트 적용 */}
            <Form.Group className="mt-4">
                <Form.Label>상품 설명</Form.Label>
                <CustomEditor initialValue={p.content || ""} onContentChange={handleEditorChange}  uploadUrl={`file/upload/${p.pno}`} />
              </Form.Group>


            </div>

            {/* 옵션 목록 렌더링 */}
            <h5 className="mt-4">상품 옵션</h5>
            {p.options && p.options.length > 0 ? (
              p.options.map((option, index) => (
                
                <div key={index} className="border p-2 mb-4 rounded" style={{ backgroundColor: "#fff" }}>
                  <Form.Group className="mb-3">
                    <Form.Label>옵션명&#40; {option.type} :::::{option.optionNo} &#41;</Form.Label>
                    <Form.Control
                      type="text"
                      name="value"
                      value={option.value}
                      onChange={(e) => handleExistingOptionChange(e, index)}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>옵션 가격</Form.Label>
                    <Form.Control
                      type="text"
                      name="addPrice"
                      value={Number(option.addPrice).toLocaleString()}
                      onChange={(e) => handleExistingOptionChange(e, index)}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>옵션 재고</Form.Label>
                    <Form.Control
                      type="number"
                      name="stock"
                      value={option.stock}
                      onChange={(e) => handleExistingOptionChange(e, index)}
                      readOnly
                    />
                  </Form.Group>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteOption(index,option.optionNo)}>
                    옵션 삭제
                  </Button>
                </div>
              ))
            ) : (
              <p>옵션 데이터가 없습니다.</p>
            )}

            {/* 옵션 입력 폼 */}
            {showOptionForm && (
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
            )}

            {/* 옵션 추가 버튼 */}
            <Button variant="success" className="mt-3" onClick={handleAddOptionClick}>
              옵션 추가
            </Button>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDelete}>
          삭제
        </Button>
        <Button variant="primary" onClick={handleSaveButtonClick}>
          저장
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
