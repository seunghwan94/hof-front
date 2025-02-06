import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home  from "./pages/admin/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Intro from "./pages/main/Intro.jsx";
import './App.css';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">MyApp</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/intro">intro</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/intro" element={<Intro />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
