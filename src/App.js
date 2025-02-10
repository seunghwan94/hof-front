import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/layout/Header";
import AppRoutes from "./routes/AppRoutes";


function App() {
  return (
    <Router>
      <Header /> {/* 분리된 네비게이션 */}
      <div className="container mt-4">
        <AppRoutes /> {/* 분리된 라우트 */}
      </div>
    </Router>
  );
}

export default App;
