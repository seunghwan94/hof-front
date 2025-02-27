import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import useAxios from "../../../hooks/useAxios";

const CommunityLikes = ({ targetNo, targetType, userMno }) => {
  const { req } = useAxios();
  const [liked, setLiked] = useState(false); // 좋아요 여부
  const [likeCount, setLikeCount] = useState(0); // 좋아요 수

  // 초기 좋아요 상태 가져오기
  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        // 좋아요 수 가져오기
        const newParams = { targetNo, targetType };
        const params = new URLSearchParams(newParams).toString();

        const countResponse = await req("GET", `common/likes/count?${params}`,);
        
        // ✅ 사용자가 좋아요 했는지 확인
        const userLiked = await req("GET", `common/likes/user-liked?mno=${userMno}&targetNo=${targetNo}&targetType=${targetType}`);
        setLikeCount(countResponse);
        setLiked(userLiked);
      } catch (error) {
        console.error("좋아요 상태 조회 실패:", error);
      }
    };

    if (targetNo) fetchLikeStatus();
  }, [targetNo, targetType, req]);

  // 좋아요 토글 핸들러
  const handleLikeToggle = async () => {
    try {
      if (liked) {
        // 좋아요 취소
        const newParams = {mno: userMno, targetNo, targetType,};
        const params = new URLSearchParams(newParams).toString();

        await req("DELETE", `common/likes?${params}`);
        setLikeCount((prev) => prev - 1);
      } else {
        // 좋아요 추가
        const newParams = { mno: userMno, targetNo, targetType, }
        const params = new URLSearchParams(newParams).toString();

        await req("POST", `common/likes?${params}`, {
          mno: userMno,
          targetNo,
          targetType,
        });
        setLikeCount((prev) => prev + 1);
      }
      setLiked((prev) => !prev); // 상태 반전
    } catch (err) {
      console.error("좋아요 토글 실패:", err);
    }
  };

  return (
    <span onClick={handleLikeToggle} style={{ cursor: "pointer" }}>
      <FontAwesomeIcon
        icon={liked ? solidHeart : regularHeart}
        className="me-1"
        color={liked ? "red" : "gray"}
      />{" "}
      {likeCount}
    </span>
  );
};

export default CommunityLikes;
