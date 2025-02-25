import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import useAxios from "../../hooks/useAxios";

const CustomEditor = ({ initialValue = "", onContentChange, pno }) => {
  const { req } = useAxios();
  const [loading, setLoading] = useState(false);

  /**  Vision API로 유해성 검사 후 S3 업로드 */
  const handleImageUpload = async (blobInfo, success, failure) => {
    try {
      setLoading(true);
      const file = blobInfo.blob();
      const formData = new FormData();
      formData.append("file", file);

      // Vision API 호출 (유해 이미지 검사)
      const visionResponse = await req("POST", "file/vision/detect", formData, {
        "Content-Type": "multipart/form-data",
      });

      console.log("Vision API 응답:", visionResponse);

      if (visionResponse?.adult === "LIKELY" || visionResponse?.violence === "VERY_LIKELY") {
        failure(" 유해 이미지로 판별되었습니다!");
        alert("유해 이미지로 판별되어 업로드할 수 없습니다.");
        setLoading(false);
        return;
      }

      // S3 업로드 (Vision API 통과한 이미지만)
      if (pno) formData.append("pno", pno);
      const s3Response = await req("POST", `file/upload/${pno}`, formData, {
        "Content-Type": "multipart/form-data",
      });

      console.log("S3 업로드 응답:", s3Response);

      // S3 URL 반환하여 TinyMCE에 이미지 삽입
      const imageUrl = s3Response?.location || s3Response?.data?.url || s3Response[0];
      success(imageUrl);
    } catch (error) {
      console.error("이미지 업로드 오류:", error);
      failure("이미지 업로드 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <p style={{ color: "red" }}>🔄 이미지 업로드 중...</p>}
      <Editor
        apiKey="trgnbu8snkmw5p1ktqkfz87cxleiphn5div5xeo0n1tnrhxm"
        value={initialValue}
        init={{
          height: 300,
          menubar: false,
          plugins: ["image", "link", "media", "codesample", "lists", "visualblocks"],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image",
          images_upload_handler: handleImageUpload,
          automatic_uploads: false,
          image_uploadtab: true,
          image_advtab: true,
          file_picker_types: "image",
          image_dimensions: false,
        }}
        onEditorChange={(content) => onContentChange(content)}
      />
    </div>
  );
};

export default CustomEditor;
