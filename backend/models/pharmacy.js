import mongoose from "mongoose";

// Define schema for a pharmacy
const PharmacySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String }, // Optional
  email: { type: String }, // Optional
});

export default mongoose.model("Pharmacy", PharmacySchema);