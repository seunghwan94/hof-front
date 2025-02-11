import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";


function App() {
  return (
    <Router>
      <AppRoutes /> {/* 분리된 라우트 */}
    </Router>
  );
}

export default App;
