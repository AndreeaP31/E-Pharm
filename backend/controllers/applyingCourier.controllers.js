import { ApplyingCourier } from "../models/applyingCourier.model.js";

export const apply = async (req, res) => {
    const { name, phoneNumber, email, pharmacyDesired } = req.body;

    try {
        if (!name || !phoneNumber || !email || !pharmacyDesired) {
            throw new Error("All fields are required");
        }

        const applicationExists = await ApplyingCourier.findOne({ email });
        if (applicationExists) {
            return res.status(400).json({ success: false, message: "Application already exists for this email" });
        }

        const newApplication = new ApplyingCourier({
            name,
            phoneNumber,
            email,
            pharmacyDesired,
        });

        await newApplication.save();

        res.status(201).json({
            success: true,
            message: "Application submitted successfully",
            application: newApplication,
        });
    } catch (error) {
        console.error("Error in applyCourier:", error);
        res.status(400).json({ success: false, message: error.message });
    }
};
