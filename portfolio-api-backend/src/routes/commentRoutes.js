import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  getComments,
  createComment,
  updateComment,
  deleteComment
} from "../controllers/commentController.js";

const router = express.Router();

// rutas públicas y protegidas
router.get("/", getComments);
router.post("/", authenticate, createComment);
router.put("/:id", authenticate, updateComment);
router.delete("/:id", authenticate, deleteComment);

export default router;
