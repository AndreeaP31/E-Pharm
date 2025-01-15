import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SelectRolePage = () => {
	const navigate = useNavigate();

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
						Choose Your Role
					</h2>
					<div className="flex flex-col gap-4">
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
							onClick={() => navigate("/login")}
						>
							Client
						</motion.button>
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
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
