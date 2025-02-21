import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../../components/layout/Logo";
import LogoutButton from "../../member/login/LogoutButton";

const Header = ({ fixed }) => {
  const location = useLocation(); // 현재 경로 가져오기
  console.log(localStorage.getItem("jwt"));
  return (
    <>
      <nav className={`navbar navbar-expand-lg mt-4 mb-4 ${fixed ? "fixed-top" : ""}`}>
        <div className="container">
          <Link className="navbar-brand" to="/"><Logo /></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-4">
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
                  >
                    {menu.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* ✅ 로그인/회원가입 버튼 추가 */}
            <div className="ms-auto d-flex gap-3">
              <LogoutButton />
              <Link to="/login" className="text-hof fw-bold pe-3 ps-1" style={{textDecoration:"none"}}>로그인</Link>
              <Link to="/signup"className="text-hof fw-bold pe-3 ps-1" style={{textDecoration:"none"}}>회원가입</Link>
              <Link to="/myinfo"className="text-hof fw-bold pe-3 ps-1" style={{textDecoration:"none"}}>내 정보</Link>
            </div>
          </div>
        </div>
      </nav>
      {!fixed && <hr className="mb-5" style={{width:'100%', marginTop:0}}/>}
    </>
  );
};

export default Header;
