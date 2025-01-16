import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, User, Phone, Building, Loader } from "lucide-react";
import Input from "../components/Input";
import axios from "axios";
import "./ApplyingCourierPage.css"; // Importăm fișierul CSS

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
            className="applying-courier-page-container" /* Folosim clasa din fișierul CSS */
        >
            <div className="applying-courier-card"> {/* Folosim clasa din fișierul CSS */}
                <div className="p-8">
                    <h2 className="applying-courier-title">
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
                        {message && <p className="apply-message">{message}</p>} {/* Aplicăm stiluri din CSS */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="apply-button" /* Folosim clasa din fișierul CSS */
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
