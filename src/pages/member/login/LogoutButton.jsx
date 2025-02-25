import React from "react";
import { Link, useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("member");
    console.log("로그아웃 후 로컬스토리지:", localStorage.getItem("jwt"));
    navigate("/login");
  };

  return <Link to="/login" className="nav-link text-hof fw-bold" style={{textDecoration:"none"}} onClick={handleLogout}>로그아웃</Link>
  

}

export default LogoutButton;