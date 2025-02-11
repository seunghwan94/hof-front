import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">MyApp</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/shop">쇼핑</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/community">커뮤니티</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Interior">인테리어</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/CssExample">CssExample</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
