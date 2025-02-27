import React, { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";

const PickButton = ({ mno, targetNo }) => {
  const { req } = useAxios();
  const [isPicked, setIsPicked] = useState(false);

  // ✅ 찜 상태 확인 및 개수 조회
  useEffect(() => {
    if (!mno || !targetNo) return;

    const checkPickStatus = async () => {
      try {
        const res = await req("GET", `common/likes/user-liked?mno=${mno}&targetNo=${targetNo}&targetType=FAV`);
        setIsPicked(res);
      } catch (err) {
        console.error("찜 여부 확인 실패:", err);
      }
    };

    checkPickStatus();
  }, [mno, targetNo, req]);

  // 찜 추가
  const addPick = async () => {
    if (!mno) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      await req("POST", `common/likes?mno=${mno}&targetNo=${targetNo}&targetType=FAV`);
      setIsPicked(true);
    } catch (err) {
      alert("찜 추가 실패");
    }
  };

  // 찜 취소
  const removePick = async () => {
    if (!mno) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      await req("DELETE", `common/likes?mno=${mno}&targetNo=${targetNo}&targetType=FAV`);
      setIsPicked(false);
    } catch (err) {
      alert("찜 취소 실패");
    }
  };

  return (
    <div className="pick-container">
      <button
        className={`btn ${isPicked ? "btn-hof" : "btn-outline-hof"}`}
        onClick={isPicked ? removePick : addPick}
      >
        {isPicked ? "찜 취소 💔" : "찜하기 ❤️"}
      </button>
    </div>
  );
};

export default PickButton;
