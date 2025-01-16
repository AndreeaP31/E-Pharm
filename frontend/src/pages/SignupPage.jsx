import { motion } from "framer-motion";
import { Lock, Mail, User, Loader } from "lucide-react";
import { useState } from "react"; // Import useState for state management
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";
import "./SignupPage.css"; // Import CSS file

// Updated Input Component
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

const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, name); // Apelarea funcției signup din store
      console.log("Navigating...");
      navigate("/"); // Navigăm către HomePage după succes
    } catch (error) {
      console.log("Signup failed:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="signup-page-container"
    >
      <div className="signup-card">
        <div className="signup-content">
          <h2 className="signup-title">Create Account</h2>

          <form onSubmit={handleSignUp}>
            {/* Full Name Input */}
            <Input
              icon={User}
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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
            {error && <p className="error-text">{error}</p>}

            {/* Sign Up Button */}
            <div>
              <motion.button
                className="signup-button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <Loader className="loader-icon" size={24} /> : "Sign Up"}
              </motion.button>
            </div>
          </form>
        </div>

        <div className="signup-footer">
          <p className="signup-footer-text">Already have an account?</p>
          <Link to="/login" className="signup-footer-link">
            Login
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default SignupPage;
