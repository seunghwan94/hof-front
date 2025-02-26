import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../../../styles/myinfo/sidebar.scss";
import useAxios from "../../../hooks/useAxios";
import Logo from "../../../components/layout/Logo";

function Sidebar() {

  const { req } = useAxios();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedMember = JSON.parse(localStorage.getItem("member"));
        if (!storedMember) return;

        const memberData = await req("GET", `common/member/${storedMember.mno}`);
        setUser(memberData);
      } catch (err) {
        console.error("회원 정보 불러오기 실패:", err);
      }
    };

    fetchUserData();
  }, [req]);

  return (
    <aside className="sidebar">
      {/* 🔹 프로필 영역 */}
      {user && (
        <div className="profile">
          <img
            src="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/AppLogo2.png" // ✅ 프로필 이미지 (추후 교체 가능)
            alt="hof-logo"
            className="footer-icon"
          />
          <h4 className="username">{user.name}</h4>
          <p className="user-email">{user.email}</p>
        </div>
      )}

      {/* 네비게이션 메뉴 */}
      <nav className="nav-menu">
        <NavLink to="profile" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          내 정보
        </NavLink>
        <NavLink to="paylist" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          구매 내역
        </NavLink>
        <NavLink to="cart" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          장바구니
        </NavLink>
        <NavLink to="pick" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          찜
        </NavLink>
        <NavLink to="integratedaccount" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
          통합계정
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
