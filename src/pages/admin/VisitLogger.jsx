import { useEffect } from "react";
import useAxios from "../../hooks/useAxios";

const VisitLogger = () => {
  const { req } = useAxios(); // 커스텀 훅 사용
  const memberInfo = localStorage.getItem("member");

  useEffect(() => {
    let memberId = null;
    let memberCookieKey = null;

    //  로그인한 사용자 정보 가져오기
    if (memberInfo) {
      try {
        const parsedMember = JSON.parse(memberInfo);
        memberId = parsedMember.mno; // 회원 ID (숫자)
        memberCookieKey = `visited_${memberId}`; 
      } catch (error) {
        console.error("memberId 파싱 오류:", error);
      }
    }

    const guestCookieKey = "visited";

    //  회원 & 비회원 방문 여부 체크
    const hasVisitedMember = memberId && document.cookie.includes(`${memberCookieKey}=true`);
    const hasVisitedGuest = !memberId && document.cookie.includes(`${guestCookieKey}=true`);

    //  중복 호출 방지 (회원이든 비회원이든 방문 기록이 있으면 실행 X)
    if (hasVisitedMember || hasVisitedGuest) {
      return;
    }

    //  API 요청
    const endpoint = memberId ? `admin/visit?member=${memberId}` : "admin/visit";

    req("GET", endpoint)
      .then(response => {
        console.log(response);

        // 방문 쿠키 설정 (회원 & 비회원 각각)
        const cookieKey = memberId ? memberCookieKey : guestCookieKey;
        document.cookie = `${cookieKey}=true; path=/; max-age=${24 * 60 * 60}`;
      })
      .catch(error => console.error("방문 기록 저장 실패:", error));

  //  useEffect 의존성 배열에 빈 배열 [] 추가 → **리렌더링 시 중복 실행 방지**
  }, []);

  return null;
};

export default VisitLogger;
