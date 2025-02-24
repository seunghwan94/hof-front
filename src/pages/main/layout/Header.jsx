import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../../components/layout/Logo";
import LogoutButton from "../../member/login/LogoutButton";
import "../../../styles/header.scss"; // SCSS 추가

const Header = ({ fixed }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false); // 메뉴 상태 관리
  const [isMobile, setIsMobile] = useState(false); // 모바일 여부 판단

  // 브라우저 크기에 따라 모바일 여부 판단
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 991); // Bootstrap lg 기준

    handleResize(); // 초기 실행
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen); // 메뉴 토글

  return (
    <>
      {/* 배경 흐림 효과 (모바일에서만) */}
      {isMobile && <div className={`backdrop ${menuOpen ? "active" : ""}`} onClick={toggleMenu}></div>}

      <nav className={`navbar navbar-expand-lg mt-4 mb-4 ${fixed ? "fixed-top" : ""}`}>
        <div className="container">
          <Link className="navbar-brand" to="/"><Logo /></Link>

          {/* 햄버거 메뉴 (모바일용) */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* 네비게이션 메뉴 */}
          <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`} id="navbarNav">
            <ul className={`navbar-nav ms-4 ${menuOpen ? "show" : ""}`}>
              {[
                { path: "/shop", label: "쇼핑" },
                { path: "/community", label: "커뮤니티" },
                { path: "/Interior", label: "인테리어" },
                { path: "/CssExample", label: "CssExample" },
              ].map((menu, index) => (
                <li className="nav-item pe-3 ps-1" key={index}>
                  <Link
                    className={`nav-link text-hof font-weight-bold ${location.pathname === menu.path ? "active" : ""}`}
                    to={menu.path}
                    style={{ fontWeight: "bold" }}
                    onClick={() => isMobile && setMenuOpen(false)} // 모바일에서만 클릭 시 닫힘
                  >
                    {menu.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* ✅ 로그인/회원가입 버튼 */}
            <div className={`ms-auto d-flex gap-3 ${menuOpen ? "show" : ""}`}>
              <LogoutButton />
              <Link to="/login" className="text-hof fw-bold pe-3 ps-1" style={{ textDecoration: "none" }}>로그인</Link>
              <Link to="/signup" className="text-hof fw-bold pe-3 ps-1" style={{ textDecoration: "none" }}>회원가입</Link>
              <Link to="/myinfo" className="text-hof fw-bold pe-3 ps-1" style={{ textDecoration: "none" }}>내 정보</Link>
            </div>
          </div>
        </div>
      </nav>

      {!fixed && <hr className="mb-5" style={{ width: '100%', marginTop: 0 }} />}
    </>
  );
};

export default Header;
