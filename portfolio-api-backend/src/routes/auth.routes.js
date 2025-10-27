import express from "express";
import { registerUser } from "../controllers/auth.controller.js";

const router = express.Router();

// Ruta de registro
router.post("/register", registerUser);

export default router;
