import { Route, Routes , Navigate} from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LoginCourierPage from "./pages/LoginCourierPage";
import SignupCourierPage from "./pages/SignupCourierPage";
import SelectRolePage from "./pages/SelectRolePage";
import ApplyingCourierPage from "./pages/ApplyingCourierPage";
import CourierPage from "./pages/CourierPage";
//]import DashBoardPage from "./pages/DashBoardPage";

function App() {
  return (
    
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-green-600 to-emerald-900 relative overflow-hidden">
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login-courier" element={<LoginCourierPage />} />
        <Route path="/signup-courier" element={<SignupCourierPage />} />
        <Route path="/apply-courier" element={<ApplyingCourierPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/selectrole" element={<SelectRolePage />} />
        <Route path="/courier-dashboard" element={<CourierPage />} />
      </Routes>
    </div>
  );
}

export default App;
