import express from "express";
import { createOrder, updateOrderStatus , getUserOrders, getAllOrders} from "../controllers/order.controller.js";
import { getCourierOrders } from "../controllers/order.controller.js";

const router = express.Router();

// Rută pentru creare comandă

router.post("/create", createOrder);

// Rută pentru actualizarea stării unei comenzi
router.get("/all", getAllOrders);

// Ruta pentru a actualiza statusul unei comenzi
router.put("/update-status", updateOrderStatus);
router.get("/courier/:pharmacyName", getCourierOrders);
router.get("/user/:userId", getUserOrders);

export default router;