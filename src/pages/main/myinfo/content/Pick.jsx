import React, { useEffect, useState } from "react";
import useAxios from "../../../../hooks/useAxios";
import PickItem from "./PickItem";
import "../../../../styles/myinfo/pick.scss";

const Pick = () => {
  const { loading, error, req } = useAxios();
  const [pickItems, setPickItems] = useState([]);
  const userId = JSON.parse(localStorage.getItem("member"))?.mno;

  useEffect(() => {
    if (userId) {
      fetchPickList(userId);
    }
  }, [userId]);

  // ✅ 찜한 상품 목록 가져오기
  const fetchPickList = async (mno) => {
    try {
      const res = await req("GET", `common/likes/list?mno=${mno}&targetType=FAV`);
    if (res) {
        setPickItems(res);
      }
    } catch (err) {
      console.error("찜 목록 불러오기 실패:", err);
    }
  };

  // ✅ 찜 삭제
  const handleDeletePick = async (pno) => {
    const isConfirmed = window.confirm("찜 목록에서 삭제하시겠습니까?");
    if (!isConfirmed) return;

    try {
      await req("DELETE", `common/likes?mno=${userId}&targetNo=${pno}&targetType=FAV`);
      setPickItems((prev) => prev.filter((item) => item.pno !== pno)); // 삭제된 항목 제거
    } catch (error) {
      alert("삭제 실패: " + error.message);
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error.message}</p>;

  return (
    <div className="pick-container">
      <h2>찜 목록</h2>

      {pickItems.length === 0 ? (
        <p>찜한 상품이 없습니다.</p>
      ) : (
        <div className="pick-list">
          {pickItems.map((item) => (
            <PickItem key={item.pno} item={item} onDelete={handleDeletePick} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Pick;
