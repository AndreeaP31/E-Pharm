import express from "express";
import Product from "../models/Product.js"; // Import the Product model

const router = express.Router();

// Route to fetch products for a specific pharmacy
router.get("/", async (req, res) => {
  const { pharmacyId } = req.query; // Extract pharmacyId from query params

  try {
    // Fetch products from MongoDB where pharmacy matches the query parameter
    const products = await Product.find({ pharmacy: pharmacyId });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found for this pharmacy." });
    }

    res.status(200).json(products); // Return the products to the frontend
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

export default router;
