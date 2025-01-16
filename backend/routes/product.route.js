import express from "express";
import { getProductsByPharmacyId, addProduct ,getProductsByUse} from "../controllers/product.controller.js";
import Product from "../models/Product.js";
const router = express.Router();

// Ruta pentru a obține produsele dintr-o farmacie specifică
// Ruta pentru a adăuga un produs
router.post("/add", addProduct);
// Ruta pentru a obține produsele dintr-o farmacie specifică
router.get("/:pharmacyId", async (req, res) => {
  const { pharmacyId } = req.params; // Extrage pharmacyId din parametrii URL

  try {
    // Caută produsele din MongoDB unde farmacia se potrivește cu pharmacyId
    const products = await Product.find({ pharmacy: pharmacyId });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found for this pharmacy." });
    }

    res.status(200).json(products); // Returnează produsele găsite
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});
router.get("/pharmacy/:id", getProductsByPharmacyId);
router.get("/filter", getProductsByUse);
export default router;
