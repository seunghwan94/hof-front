import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../../components/layout/Logo";
import LogoutButton from "../../member/login/LogoutButton";
import "../../../styles/header.scss";

const Header = ({ fixed }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // ✅ 관리자 여부 체크

  // ✅ 로그인 상태 및 관리자 여부 확인
  useEffect(() => {
    const memberData = localStorage.getItem("member");
    if (memberData) {
      setIsLoggedIn(true);
      const member = JSON.parse(memberData);
      if (member.role === "admin") {
        setIsAdmin(true); // ✅ 관리자일 경우
      }
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, []);

  // ✅ 브라우저 크기에 따라 모바일 여부 판단
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 991);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      {/* 배경 흐림 효과 (모바일에서만) */}
      {isMobile && (
        <div
          className={`backdrop ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        ></div>
      )}

      <nav className={`navbar navbar-expand-lg mt-4 mb-4 ${fixed ? "fixed-top" : ""}`}>
        <div className="container">
          <Link className="navbar-brand" to="/">
            <Logo />
          </Link>

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
          <div className={`justify-content-between collapse navbar-collapse ${menuOpen ? "show" : ""}` } id="navbarNav">
            <ul className={`navbar-nav ms-4 ${menuOpen ? "show" : ""}`}>
              {[
                { path: "/shop", label: "쇼핑" },
                { path: "/community", label: "커뮤니티" },
                { path: "/Interior", label: "인테리어" },
              ].map((menu, index) => (
                <li className="nav-item pe-3 ps-1" key={index}>
                  <Link
                    className={`nav-link text-hof font-weight-bold ${
                      location.pathname === menu.path ? "active" : ""
                    }`}
                    to={menu.path}
                    style={{ fontWeight: "bold" }}
                    onClick={() => isMobile && setMenuOpen(false)}
                  >
                    {menu.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* ✅ 로그인 상태에 따라 버튼 표시 */}
            <ul className={`navbar-nav ms-4 ${menuOpen ? "show" : ""}`}>
              {isLoggedIn ? (
                <>
                  {/* ✅ 로그아웃 버튼 */}
                  <li className="nav-item pe-3 ps-1">
                    <LogoutButton />
                  </li>

                  {/* ✅ 내 정보 */}
                  <li className="nav-item pe-3 ps-1">
                    <Link to="/myinfo/profile" className="nav-link text-hof fw-bold" style={{ textDecoration: "none" }}>
                      내 정보
                    </Link>
                  </li>

                  {/* ✅ 관리자 페이지 (관리자만 표시) */}
                  {isAdmin && (
                    <li className="nav-item pe-3 ps-1">
                      <Link
                        className={`nav-link text-danger font-weight-bold ${
                          location.pathname === "/admin" ? "active" : ""
                        }`}
                        to="/admin/dashboard"
                        style={{ fontWeight: "bold" }}
                        onClick={() => isMobile && setMenuOpen(false)}
                      >
                        관리자 페이지
                      </Link>
                    </li>
                  )}
                </>
              ) : (
                <>
                  {/* ✅ 로그인 */}
                  <li className="nav-item pe-3 ps-1">
                    <Link to="/login" className="nav-link text-hof fw-bold" style={{ textDecoration: "none" }}>
                      로그인
                    </Link>
                  </li>

                  {/* ✅ 회원가입 */}
                  <li className="nav-item pe-3 ps-1">
                    <Link to="/signup" className="nav-link text-hof fw-bold" style={{ textDecoration: "none" }}>
                      회원가입
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {!fixed && <hr className="mb-0" style={{ width: "100%", marginTop: 0 }} />}
    </>
  );
};

export default Header;
