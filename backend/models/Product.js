import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  pharmacy: { type: String, required: true }, // Unique identifier for the pharmacy (e.g., "teifarmacia")
});

export default mongoose.model("Product", ProductSchema);
