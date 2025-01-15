import Product from "../models/Product.js";

// Function to fetch products by pharmacy
const getProductsByPharmacy = async (req, res) => {
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
};

// Function to add a new product
const addProduct = async (req, res) => {
  const { name, description, price, pharmacy } = req.body;

  try {
    // Create a new product instance
    const newProduct = new Product({
      name,
      description,
      price,
      pharmacy,
    });

    // Save the product to MongoDB
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Function to update a product by its ID
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, pharmacy } = req.body;

  try {
    // Find the product by ID and update it
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, pharmacy },
      { new: true } // Return the updated product
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Function to delete a product by its ID
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // Delete the product by ID
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export { getProductsByPharmacy, addProduct, updateProduct, deleteProduct };

