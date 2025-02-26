import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import useAxios from "../../hooks/useAxios";

const CustomEditor = ({ initialValue = "", onContentChange, uploadUrl }) => {
  const { req } = useAxios();
  const [loading, setLoading] = useState(false);

  const isUploadingRef = useRef(false); //  업로드 상태를 useRef로 관리 (re-render 방지)
  const lastContentRef = useRef(""); //  마지막 content 저장
  const prevImageCountRef = useRef(0); //  이전 이미지 개수 저장
  const prevImageUrlsRef = useRef([]); // 이전 이미지 리스트 저장

  /** TinyMCE 이미지 업로드 핸들러 */
  const handleImageUpload = async (blobInfo, success, failure) => {
    console.log("::::::::::::::::::::::::::::::::::::::::::::::::::::")
    console.log("TinyMCE 이미지 업로드 감지됨...");
    try {
      setLoading(true);
      const file = blobInfo.blob();
      const formData = new FormData();
      formData.append("file", file);
    } catch (error) {
      console.error("이미지 업로드 오류:", error);
      failure("이미지 업로드 실패");
    } finally {
      setLoading(false);
    }
  };

 /** TinyMCE에서 내용이 변경될 때 호출됨 */
 const handleEditorChange = async (newContent) => {
  console.log("TinyMCE 입력 감지됨:", newContent);

  // 텍스트 변경은 즉시 반영
  if (!newContent.includes("<img")) {
    console.log("텍스트 입력 감지 → 즉시 반영");
    lastContentRef.current = newContent;
    onContentChange(newContent);
    return;
  }

  // 이미지 URL 추출
  let content = newContent;
  const imgRegex = /<img[^>]+src=["'](.*?)["']/g;
  let match;
  const imgUrls = [];

  while ((match = imgRegex.exec(content)) !== null) {
    imgUrls.push(match[1]);
  }

  const currentImageCount = imgUrls.length;

  // ✅ 이미지 개수가 같아도, 이미지 URL이 변경되었는지 확인
  const isSameImages =
    currentImageCount === prevImageCountRef.current &&
    JSON.stringify(imgUrls) === JSON.stringify(prevImageUrlsRef.current);

  if (isSameImages) {
    console.log("이미지 개수와 URL이 동일 → Vision API 호출 생략");
    lastContentRef.current = newContent;
    onContentChange(newContent);
    return;
  }

  // 업로드 중이면 Vision API 실행 X
  if (isUploadingRef.current) {
    console.log("현재 업로드 진행 중 → Vision API 호출 생략");
    lastContentRef.current = newContent;
    onContentChange(newContent);
    return;
  }

  console.log("이미지 포함됨 → Vision API 검사 시작...");
  isUploadingRef.current = true;

  try {
    let isHarmful = false;

    // Vision API 검사 (JSON 형식)
    await Promise.all(
      imgUrls.map(async (url) => {
        let imageUrlToCheck = url;

        // Base64 이미지이면 먼저 S3에 업로드 후 URL을 Vision API에 전달
        if (url.startsWith("data:image")) {
          console.log("Base64 이미지 감지 → S3 업로드 시작");
          const blob = await fetch(url).then((res) => res.blob());
          const formData = new FormData();
          formData.append("file", blob, "image.jpg");

          if (!uploadUrl) {
            console.error("업로드 URL이 없음!");
            return;
          }

          const uploadResponse = await req("post", uploadUrl, formData, {
            "Content-Type": "multipart/form-data",
          });

          imageUrlToCheck = uploadResponse?.location || uploadResponse?.data?.url || uploadResponse[0];

          if (!imageUrlToCheck) {
            console.error("S3 업로드 실패!");
            return;
          }
        }

        console.log("Vision API 검사 대상 이미지:", imageUrlToCheck);

        // Vision API 요청 (JSON 형식)
        const visionResponse = await req("post", "file/vision/detect", { imageUrl: imageUrlToCheck }, {
          "Content-Type": "application/json",
        });

        console.log("Vision API 응답:", visionResponse);
        //adult ==성인
        //violence == 폭력성
        // Medical == 약물
        // Racy == 자극적
        // Spoof == 사행성
        // visionResponse
        const VALID_LEVEL = ["POSSIBLE", "LIKELY", "VERY_LIKELY"];
        if (Object.values(visionResponse).some(value => VALID_LEVEL.includes(value))) {
          isHarmful = true;
        }
        
      })
    );

    if (isHarmful) {
      alert("유해 이미지로 판별되어 업로드할 수 없습니다.");
      setLoading(false);
      isUploadingRef.current = false;
      return;
    }

    console.log("Vision API 통과 → 이미지 변환 시작...");

    // Base64 → S3 업로드 (이미 검사한 Base64는 다시 업로드하지 않음)
    const uploadedUrls = await Promise.all(
      imgUrls.map(async (url) => {
        if (!url.startsWith("data:image")) {
          console.log("이미 업로드된 이미지 → 변환 생략:", url);
          return url;
        }

        console.log("Base64 이미지 변환 중:", url);
        const blob = await fetch(url).then((res) => res.blob());
        const formData = new FormData();
        formData.append("file", blob, "image.jpg");

        if (!uploadUrl) {
          console.error("업로드 URL이 없음!");
          return url;
        }

        // S3 업로드
        const response = await req("post", uploadUrl, formData, {
          "Content-Type": "multipart/form-data",
        });

        return response?.location || response?.data?.url || response[0];
      })
    );

    console.log("S3 업로드 완료:", uploadedUrls);

    // Base64 → S3 URL로 content 변경
    imgUrls.forEach((oldUrl, index) => {
      content = content.replace(oldUrl, uploadedUrls[index]);
    });

    console.log("최종 변환된 content:", content);

    // 변경된 이미지 리스트 저장
    prevImageUrlsRef.current = imgUrls;
    prevImageCountRef.current = currentImageCount;

    lastContentRef.current = content;
    onContentChange(content);
  } catch (error) {
    console.error("이미지 변환 오류:", error);
  } finally {
    setTimeout(() => {
      isUploadingRef.current = false;
    }, 1000);
  }
};


  return (
    <div>
      {loading && <p style={{ color: "red" }}> 이미지 업로드 중...</p>}
      <Editor
        apiKey="trgnbu8snkmw5p1ktqkfz87cxleiphn5div5xeo0n1tnrhxm"
        value={initialValue}
        init={{
          height: 300,
          menubar: false,
          plugins: ["image", "link", "media", "codesample", "lists", "visualblocks"],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image",
          images_upload_handler: handleImageUpload, // 이미지 업로드 핸들러
          automatic_uploads: false,
          image_uploadtab: true,
          image_advtab: true,
          file_picker_types: "image",
          image_dimensions: false,
        }}
        onEditorChange={handleEditorChange} // 내용 변경 시 변환 처리
      />
    </div>
  );
};

export default CustomEditor;
