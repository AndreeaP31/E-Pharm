import express from "express";
import { apply } from "../controllers/applyingCourier.controllers.js";

const router = express.Router();

// Ruta pentru adăugarea unei aplicații
router.post("/apply", apply);

export default router;
