import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";
import "./LoginCourierPage.css"; // Importăm fișierul CSS

const LoginCourierPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { loginCourier, isLoading, error } = useAuthStore();

    const handleLogin = async (e) => {
        e.preventDefault();
        await loginCourier(email, password);
        navigate("/courier-dashboard");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="login-courier-page-container" /* Folosim clasa CSS */
        >
            <div className="login-courier-card"> {/* Folosim clasa CSS */}
                <div className="p-8">
                    <h2 className="login-courier-title">
                        Courier Login
                    </h2>
                    <form onSubmit={handleLogin}>
                        <Input
                            icon={Mail}
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            icon={Lock}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <p className="text-red-500 font-semibold mb-2">{error}</p>}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="login-courier-button" /* Folosim clasa CSS */
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : "Login"}
                        </motion.button>
                    </form>
                </div>
                <div className="login-courier-footer">
                    <p className="text-sm text-gray-300">
                        Vrei să te înscrii?{" "}
                        <Link to="/apply-courier" className="login-courier-footer-link">
                            Click aici
                        </Link>
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default LoginCourierPage;
