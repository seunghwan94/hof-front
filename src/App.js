import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/admin/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Intro from "./pages/main/Intro.jsx";
import NotFound from "./pages/not-found/NotFound.jsx";  // 폴더명 변경
import './App.css';

function App() {
  return (
    <Router>
      {/* 네비게이션 바 */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">MyApp</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link> {/* ✅ 소문자로 통일 */}
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/intro">Intro</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* 페이지 라우팅 */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />  {/* ✅ 소문자로 변경 */}
          <Route path="/intro" element={<Intro />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
