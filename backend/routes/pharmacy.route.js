import express from "express";
import { getPharmacies,getPharmacyById, addPharmacy } from "../controllers/pharmacy.controller.js";

const router = express.Router();
router.get("/:id", getPharmacyById); // Răspunde cu detalii despre o farmacie pe baza ID-ului
// Rutele pentru farmacii
router.get("/", getPharmacies); // Răspunde cu lista tuturor farmaciilor
// Răspunde cu detalii despre o farmacie pe baza ID-ului
router.post("/add", addPharmacy);
export default router;