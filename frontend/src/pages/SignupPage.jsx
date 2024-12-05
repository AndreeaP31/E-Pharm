import { motion } from "framer-motion";
import Input from "../components/Input.jsx"; // Importăm componentul Input
import {  Lock, Mail } from "lucide-react";
import { useState } from "react"; // Importăm useState pentru a manipula valorile input-urilor


const LoginPage = () => {
  // Definim variabilele de stare pentru fiecare câmp
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const handleLogin=(e)=>{
    e.preventDefault();
  }
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
            Welcome back!
          </h2>

          {/* Formular */}
          <form onSubmit={handleLogin}>
            

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

            {/* Buton */}
            <div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-green-500 hover:to-green-700 transition"
              >
                Login
              </button>
            </div>
          </form>
        </div>

       
      </div>

     
    </motion.div>
  );
};

export default LoginPage;
