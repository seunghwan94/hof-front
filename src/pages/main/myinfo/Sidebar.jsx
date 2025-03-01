import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../../../styles/myinfo/sidebar.scss";
import useAxios from "../../../hooks/useAxios";

function Sidebar() {
  const { req } = useAxios();
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // ✅ 모바일 메뉴 열림 상태 관리

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
    <>
      {/* ✅ 모바일에서만 보이는 메뉴 버튼 */}
      <button className="menu-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        ☰ 
      </button>

      {/* ✅ 웹에서는 항상 보이고, 모바일에서는 버튼을 눌러야 보임 */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* 🔹 프로필 영역 */}
        {user && (
          <div className="profile">
            <img
              src="https://hof-bucket.s3.ap-northeast-2.amazonaws.com/assets/AppLogo2.png"
              alt="hof-logo"
              className="profile-img"
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
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
