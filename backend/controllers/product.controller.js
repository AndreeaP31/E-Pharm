import Product from "../models/Product.js";
import mongoose from "mongoose";
import Pharmacy from "../models/Pharmacy.js";



// Funcția de a obține produsele dintr-o farmacie
const getProductsByPharmacyName = async (req, res) => {
  const pharmacy = decodeURIComponent(req.params.pharmacy); // Decodifică numele farmaciei

  try {
    const products = await Product.find({ pharmacy });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: `No products found for pharmacy: ${pharmacy}.` });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by pharmacy name:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const getProductsByPharmacyId = async (req, res) => {
  const { id } = req.params;

  try {
    console.log("Received pharmacy ID:", id);

    // Verifică dacă ID-ul este valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("Invalid pharmacy ID:", id);
      return res.status(400).json({ message: "Invalid pharmacy ID." });
    }

    // Găsește farmacia pe baza ID-ului
    const pharmacy = await Pharmacy.findById(id);
    if (!pharmacy) {
      console.error("Pharmacy not found with ID:", id);
      return res.status(404).json({ message: "Pharmacy not found." });
    }

    console.log("Pharmacy found:", pharmacy);

    // Găsește produsele pe baza numelui farmaciei
    const products = await Product.find({ pharmacy: pharmacy.name });
    if (!products || products.length === 0) {
      console.error(`No products found for pharmacy: ${pharmacy.name}`);
      return res.status(404).json({ message: `No products found for pharmacy: ${pharmacy.name}.` });
    }

    console.log("Products found:", products);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by pharmacy ID:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};





// Funcția de a adăuga un produs

const getProductsByUse = async (req, res) => {
  const { use } = req.query; // Extragem `use` din query

  try {
    const products = await Product.find({ use });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: `No products found for use: ${use}.` });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by use:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
// Funcția de a adăuga un produs
const addProduct = async (req, res) => {
  const { name, description, use, price, pharmacy } = req.body;

  try {
    if (!name || !price || !pharmacy) {
      return res.status(400).json({ message: "Name, price, and pharmacy are required." });
    }

    // Verificăm dacă farmacia există
    const existingPharmacy = await Pharmacy.findOne({ name: pharmacy });
    if (!existingPharmacy) {
      return res.status(404).json({ message: `Pharmacy "${pharmacy}" not found.` });
    }

    // Creăm un nou produs
    const newProduct = new Product({
      name,
      description,
      use,
      price,
      pharmacy, // Stocăm numele farmaciei
    });

    // Salvăm produsul în baza de date
    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully.",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Funcția de a obține produsele dintr-o farmacie
const getProductsByPharmacy = async (req, res) => {
  const { pharmacyId } = req.params; // Extrage pharmacyId din parametrii URL

  try {
    // Caută produsele din MongoDB unde farmacia se potrivește cu pharmacyId
    const products = await Product.find({ pharmacy: pharmacyId });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found for this pharmacy." });
    }

    res.status(200).json(products); // Returnează produsele
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export {getProductsByPharmacy,getProductsByPharmacyId, getProductsByPharmacyName, addProduct, getProductsByUse };
