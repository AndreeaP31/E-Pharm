import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importăm useNavigate
import { useAuthStore } from "../store/authStore"; // Importăm store-ul de autentificare
import "./LoginPage.css";

// Input Component
const Input = ({ icon: Icon, type, placeholder, value, onChange }) => {
  return (
    <div className="input-wrapper">
      {/* Icon */}
      <Icon className="input-icon" />

      {/* Input Field */}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input-field"
      />
    </div>
  );
};

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook-ul pentru navigare
  const { login, isLoading, error } = useAuthStore(); // Extragem funcția login și stările din store

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); // Apelăm funcția de login din store
      navigate("/"); // Navigăm către HomePage
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="login-page-container"
    >
      <div className="login-card">
        <div className="login-content">
          <h2 className="login-title">Welcome back!</h2>

          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password Input */}
            <Input
              icon={Lock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Error Message */}
            {error && <p className="error-message">{error}</p>}

            {/* Login Button */}
            <div>
              <motion.button
                className="login-button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Login"}
              </motion.button>
            </div>
          </form>
        </div>

        <div className="login-footer">
          <p className="login-footer-text">Don't have an account?</p>
          <a href="/signup" className="login-footer-link">
            Sign Up
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
