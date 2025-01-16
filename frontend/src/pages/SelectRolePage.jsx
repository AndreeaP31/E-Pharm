import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./SelectRolePage.css"; // Importăm fișierul CSS

const SelectRolePage = () => {
	const navigate = useNavigate();

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="select-role-page-container" // Aplicăm stilurile din fișierul CSS
		>
			<div className="select-role-card">
				<div className="p-8">
					<h2 className="select-role-title">
						Choose Your Role
					</h2>
					<div className="select-role-button-wrapper">
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className="select-role-button"
							onClick={() => navigate("/login")}
						>
							Client
						</motion.button>
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className="select-role-button"
							onClick={() => navigate("/login-courier")}
						>
							Curier
						</motion.button>
					</div>
				</div>
				<div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center rounded-b-2xl">
					<p className="text-sm text-gray-300">Select your role to proceed.</p>
				</div>
			</div>
		</motion.div>
	);
};

export default SelectRolePage;
