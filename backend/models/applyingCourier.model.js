import mongoose from "mongoose";

const applyingCourierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    pharmacyDesired: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const ApplyingCourier = mongoose.model('ApplyingCourier', applyingCourierSchema);
