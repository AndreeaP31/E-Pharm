import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import { connectDB } from "./db/connectDB.js";

import pharmacyRoutes from "./routes/pharmacy.route.js";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import courierRoutes from "./routes/courier.route.js"; // Importă rutele pentru curieri
import applyingCourierRoutes from "./routes/applyingCourier.route.js";
import orderRoutes from "./routes/order.routes.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json()); // allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies

// Rute pentru autentificarea utilizatorilor
app.use("/api/auth", authRoutes);

// Rute pentru autentificarea curierilor
app.use("/api/courier", courierRoutes);
app.use("/api/products", productRoutes);
app.use("/api/pharmacy", pharmacyRoutes);
app.use("/api/applying-courier", applyingCourierRoutes);
app.use("/api/orders", orderRoutes);
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}
mongoose.connection.on("connected", () => {
	console.log("Connected to MongoDB");
  });
  
  mongoose.connection.on("error", (err) => {
	console.error("MongoDB connection error:", err);
  });
  
app.listen(PORT, () => {
	connectDB();
	console.log("Server is running on port: ", PORT);
});
