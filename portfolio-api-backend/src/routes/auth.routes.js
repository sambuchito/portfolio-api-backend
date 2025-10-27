import express from "express";
import { registerUser, login } from "../controllers/authController.js";

const router = express.Router();

// endpoint registro
router.post("/register", registerUser);

// endpoint login
router.post("/login", login);

export default router;
