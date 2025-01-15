import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, User, Phone, Building, Loader } from "lucide-react";
import Input from "../components/Input";
import axios from "axios";

const ApplyingCourierPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [pharmacyDesired, setPharmacyDesired] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleApply = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.post("http://localhost:5000/api/applying-courier/apply", {
                name,
                email,
                phoneNumber,
                pharmacyDesired,
            });
            setMessage("Cererea a fost trimisa!");
        } catch (error) {
            setMessage("Eroare. Incearca din nou.");
        } finally {
            setIsLoading(false);
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
                    <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-gradient-to-r from-green-400 to-green-600 bg-clip-text">
                        Aplica acum!
                    </h2>
                    <form onSubmit={handleApply}>
                        <Input
                            icon={User}
                            type="text"
                            placeholder="Nume"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            icon={Mail}
                            type="email"
                            placeholder="Adresa mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            icon={Phone}
                            type="text"
                            placeholder="Numar telefon"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <Input
                            icon={Building}
                            type="text"
                            placeholder="Farmacia dorita"
                            value={pharmacyDesired}
                            onChange={(e) => setPharmacyDesired(e.target.value)}
                        />
                        {message && <p className="text-green-400 font-semibold mt-2">{message}</p>}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition duration-200"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : "Apply"}
                        </motion.button>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};

export default ApplyingCourierPage;
