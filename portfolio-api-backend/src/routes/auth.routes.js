import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// endpoint registro
router.post("/register", registerUser);

// endpoint login
router.post("/login", loginUser);

export default router;
