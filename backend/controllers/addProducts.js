import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "./connectDB.js";
import Product from "./models/Product.js"; // Import the Product model

dotenv.config(); // Load environment variables
cd
// Sample products to add to the database
const products = [
  {
    name: "Paracetamol",
    description: "Pain reliever and fever reducer.",
    price: 10,
    pharmacy: "teifarmacia",
  },
  {
    name: "Ibuprofen",
    description: "Anti-inflammatory drug.",
    price: 15,
    pharmacy: "drmax",
  },
  {
    name: "Vitamin C",
    description: "Immune system booster.",
    price: 5,
    pharmacy: "sensiblu",
  },
  {
    name: "Theraflu",
    description: "Cold and flu treatment.",
    price: 12,
    pharmacy: "helpnet",
  },
];

// Function to insert products into the database
const addProducts = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Insert products into the Product collection
    await Product.insertMany(products);

    console.log("Products added successfully!");
    process.exit(0); // Exit with success
  } catch (error) {
    console.error("Error adding products:", error);
    process.exit(1); // Exit with failure
  }
};

// Run the function
addProducts();
