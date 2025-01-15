import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";

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
            className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-200 via-green-600 to-emerald-900"
        >
            <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8">
                    <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-gradient-to-r from-green-400 to-green-600 bg-clip-text">
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
                            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition duration-200"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : "Login"}
                        </motion.button>
                    </form>
                </div>
                <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center rounded-b-2xl">
                    <p className="text-sm text-gray-300">
                        Vrei să te înscrii?{" "}
                        <Link to="/apply-courier" className="ml-2 text-green-400 font-semibold hover:text-green-600 transition duration-300 ease-in-out">
                            Click aici
                        </Link>
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default LoginCourierPage;
