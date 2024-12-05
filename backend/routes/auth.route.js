import express from "express";
import {signup , login,  checkAuth,logout} from "../controllers/auth.controllers.js";
import {verifyToken} from "../middle/verifyToken.js";
const router= express.Router();

router.get("/check-auth", verifyToken,checkAuth)
router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

export default router;