import express from "express";
import { courierSignup, courierLogin,courierLogout } from "../controllers/courier.controllers.js";

const router = express.Router();

router.post("/signup", courierSignup);
router.post("/login", courierLogin);
router.post("/logout", courierLogout);

export default router;
