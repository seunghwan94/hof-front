import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import useAxios from "../../hooks/useAxios";

const CustomEditor = ({ initialValue = "", onContentChange, uploadUrl }) => {
  const { req } = useAxios();
  const [loading, setLoading] = useState(false);

  const isUploadingRef = useRef(false); //  업로드 상태를 useRef로 관리 (re-render 방지)
  const lastContentRef = useRef(""); //  마지막 content 저장
  const prevImageCountRef = useRef(0); //  이전 이미지 개수 저장

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
    console.log("✏️ TinyMCE 입력 감지됨:", newContent);

    //  텍스트 변경은 즉시 반영 (딜레이 없음)
    if (!newContent.includes("<img")) {
      console.log("📝 텍스트 입력 감지 → 즉시 반영");
      lastContentRef.current = newContent;
      onContentChange(newContent);
      return;
    }

    //  이미지 개수 확인
    let content = newContent;
    const imgRegex = /<img[^>]+src=["'](.*?)["']/g;
    let match;
    const imgUrls = [];

    while ((match = imgRegex.exec(content)) !== null) {
      imgUrls.push(match[1]);
    }

    const currentImageCount = imgUrls.length;

    //  이미지 개수 변동 없음 → 변환 로직 실행 안 함
    if (currentImageCount === prevImageCountRef.current) {
      console.log("이미지 개수 변동 없음 → 변환 스킵");
      lastContentRef.current = newContent;
      onContentChange(newContent);
      return;
    }

    //  업로드 중이면 변환 실행 X, 텍스트 변경만 즉시 반영
    if (isUploadingRef.current) {
      console.log(" 현재 업로드 진행 중 → 텍스트 변경만 적용");
      lastContentRef.current = newContent;
      onContentChange(newContent);
      return;
    }

    console.log(" Base64 이미지 감지됨 → 변환 시작...");
    isUploadingRef.current = true; //  업로드 진행 중 표시

    try {
      //  Base64 → S3 업로드
      const uploadedUrls = await Promise.all(
        imgUrls.map(async (url) => {
          if (!url.startsWith("data:image")) {
            console.log("✔️ 이미 업로드된 이미지 → 변환 생략:", url);
            return url;
          }

          console.log(" Base64 이미지 변환 중:", url);
          const blob = await fetch(url).then((res) => res.blob());
          const formData = new FormData();
          formData.append("file", blob, "image.jpg");

          if (!uploadUrl) {
            console.error(" 업로드 URL이 없음!");
            return url;
          }

          const response = await req("post", uploadUrl, formData, {
            "Content-Type": "multipart/form-data",
          });

          return response?.location || response?.data?.url || response[0];
        })
      );

      console.log(" S3 업로드 완료:", uploadedUrls);

      // Base64 → S3 URL로 content 변경
      imgUrls.forEach((oldUrl, index) => {
        content = content.replace(oldUrl, uploadedUrls[index]);
      });

      console.log(" 최종 변환된 content:", content);
      lastContentRef.current = content;
      prevImageCountRef.current = currentImageCount; //  이미지 개수 업데이트
      onContentChange(content);
    } catch (error) {
      console.error(" 이미지 변환 오류:", error);
    } finally {
      setTimeout(() => {
        isUploadingRef.current = false; //  업로드 완료 후 일정 시간 후 다시 업로드 가능
      }, 1000); // 1초 후 업로드 가능하도록 설정
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
            // automatic_uploads: true, // 자동 업로드 활성화 (드래그 앤 드롭 가능)
          images_upload_handler: handleImageUpload, //  이미지 업로드 핸들러 연결

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
