import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, Phone, Building, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";

const SignupCourierPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [pharmacyName, setPharmacyName] = useState("");
    const navigate = useNavigate();
    const { signupCourier, isLoading, error } = useAuthStore();

    const handleSignup = async (e) => {
        e.preventDefault();
        await signupCourier(email, password, name, phoneNumber, pharmacyName);
        navigate("/");
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
                        Courier Signup
                    </h2>
                    <form onSubmit={handleSignup}>
                        <Input
                            icon={User}
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
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
                        <Input
                            icon={Phone}
                            type="text"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <Input
                            icon={Building}
                            type="text"
                            placeholder="Pharmacy Name"
                            value={pharmacyName}
                            onChange={(e) => setPharmacyName(e.target.value)}
                        />
                        {error && <p className="text-red-500 font-semibold mb-2">{error}</p>}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition duration-200"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : "Sign Up"}
                        </motion.button>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};

export default SignupCourierPage;
