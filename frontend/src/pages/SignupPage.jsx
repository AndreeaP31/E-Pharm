import { motion } from "framer-motion";
import Input from "../components/Input.jsx"; // Importăm componentul Input
import {  Lock, Mail, User , Loader} from "lucide-react";
import { useState } from "react"; // Importăm useState pentru a manipula valorile input-urilor
import { Link, useNavigate} from "react-router-dom";
import {useAuthStore} from "../store/authStore.js"
const SignupPage = () => {
  // Definim variabilele de stare pentru fiecare câmp

  const navigate = useNavigate();
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const {signup, error, isLoading}=useAuthStore()
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
        await signup(email, password, name);
        console.log("Navigating...");
        navigate("/");
    } catch (error) {
        console.log("Signup failed:", error);
    }
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
          {/* Titlu */}
          <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-gradient-to-r from-green-400 to-green-600 bg-clip-text">
            Create Account
          </h2>

          {/* Formular */}
          <form onSubmit={handleSignUp}>
            {/* Input pentru nume */}
            <Input
              icon={User} // Icon-ul User
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)} // Actualizează valoarea stării pentru name
            />

            {/* Input pentru email */}
            <Input
              icon={Mail} // Icon-ul Mail
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Actualizează valoarea stării pentru email
            />

            {/* Input pentru parolă */}
            <Input
              icon={Lock} // Icon-ul Lock
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Actualizează valoarea stării pentru password
            />
            {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
					
          <div>
					<motion.button
						className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-green-600
						hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200'
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						type='submit'
						disabled={isLoading}
					>
						{isLoading ? <Loader className=' animate-spin mx-auto' size={24} /> : "Sign Up"}
					</motion.button>
          </div>
          </form>
        </div>

        <div className="px-8 py-4 bg-black-900 bg-opacity-60 flex justify-center rounded-b-2xl">
          <p className="text-sm text-gray-300">
            Already have an account?
          </p>
          <Link
            to="/login"
            className="ml-2 text-green-400 font-semibold hover:text-green-600 transition duration-300 ease-in-out"
          >
            Login
          </Link>
        </div>
      </div>

     
    </motion.div>
  );
};

export default SignupPage;
