import { Route, Routes , Navigate} from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
//import DashBoardPage from "./pages/DashBoardPage";

function App() {
  return (
    
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-green-600 to-emerald-900 relative overflow-hidden">
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
