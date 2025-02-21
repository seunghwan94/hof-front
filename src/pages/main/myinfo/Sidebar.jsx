import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const linkStyle = ({ isActive }) => ({
    display: "block",
    margin: "10px 0",
    color: isActive ? "red" : "black",
    textDecoration: "none",
  });

  return (
    <aside className="w-100 p-4" style={{ border: "2px solid red"}}>
      <h3>사이드바</h3>
      <nav>
        <NavLink to="profile" style={linkStyle}>내 정보</NavLink>
        <NavLink to="paylist" style={linkStyle}>구매 내역</NavLink>
        <NavLink to="cart" style={linkStyle}>장바구니</NavLink>
        <NavLink to="pick" style={linkStyle}>찜</NavLink>
        <NavLink to="integratedaccount" style={linkStyle}>통합계정</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
