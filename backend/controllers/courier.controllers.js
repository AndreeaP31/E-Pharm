import { Courier } from "../models/courier.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const courierSignup = async (req, res) => {
    const { email, password, name, phoneNumber, pharmacyName } = req.body;

    try {
        if (!email || !password || !name || !phoneNumber || !pharmacyName) {
            throw new Error("All fields are required");
        }

        const courierExists = await Courier.findOne({ email });
        if (courierExists) {
            return res.status(400).json({ success: false, message: "Courier already exists" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const courier = new Courier({
            email,
            password: hashedPassword,
            name,
            phoneNumber,
            pharmacyName,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        });

        await courier.save();

        generateTokenAndSetCookie(res, courier._id);

        res.status(201).json({
            success: true,
            message: "Courier created successfully",
            courier: {
                ...courier._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.error("Error in courierSignup:", error);
        res.status(400).json({ success: false, message: error.message });
    }
};
export const courierLogout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in courierLogout:", error);
        res.status(500).json({ success: false, message: "Server error during logout" });
    }
};


export const courierLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const courier = await Courier.findOne({ email });
        if (!courier) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const isPasswordValid = await bcryptjs.compare(password, courier.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        generateTokenAndSetCookie(res, courier._id);

        courier.lastLogin = new Date();
        await courier.save();

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            courier: {
                ...courier._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.error("Error in courierLogin:", error);
        res.status(400).json({ success: false, message: error.message });
    }
};
