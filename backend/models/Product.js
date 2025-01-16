import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  use: {
    type: String,
    required: true,
    enum: ["dureri cap", "febra", "raceala", "dureri musculare"], // Valori predefinite
  },
  price: { type: Number, required: true },
  pharmacy: { type: String, required: true }, // Numele farmaciei
});

const Product = mongoose.model("Product", productSchema);

export default Product;
