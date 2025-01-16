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
import PharmacyPage from "./pages/PharmacyProducts";
import CartPage from "./pages/CartPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import OrderStatusPage from "./pages/OrderStatusPage";

//]import DashBoardPage from "./pages/DashBoardPage";

function App() {
  return (
    
    <div className="min-h-screen relative overflow-hidden">
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
        <Route path="/pharmacy/:id" element={<PharmacyPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order-details" element={<OrderDetailsPage />} />
        <Route path="/orders/:userId" element={<OrderStatusPage />} />

      </Routes>
    </div>
  );
}

export default App;