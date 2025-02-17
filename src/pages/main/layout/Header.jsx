import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../../components/layout/Logo";
import LogoutButton from "../../login/LogoutButton";

const Header = ({ fixed }) => {
  const location = useLocation(); // 현재 경로 가져오기

  return (
    <>
      <nav className={`navbar navbar-expand-lg mt-3 mb-2 ${fixed ? "fixed-top" : ""}`}>
        <div className="container">
          <Link className="navbar-brand" to="/"><Logo /></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {[
                { path: "/shop", label: "쇼핑" },
                { path: "/community", label: "커뮤니티" },
                { path: "/Interior", label: "인테리어" },
                { path: "/CssExample", label: "CssExample" },
              ].map((menu, index) => (
                <li className="nav-item" key={index}>
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
              <Link to="/login" className="text-hof fw-bold" style={{textDecoration:"none"}}>로그인</Link>
              <Link to="/signup"className="text-hof fw-bold" style={{textDecoration:"none"}}>회원가입</Link>
            </div>
          </div>
        </div>
      </nav>
      {!fixed && <hr style={{width:'100%', marginTop:0}}/>}
    </>
  );
};

export default Header;
