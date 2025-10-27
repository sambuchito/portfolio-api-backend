import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getComments,
  createComment,
  updateComment,
  deleteComment
} from "../controllers/commentController.js";

const router = express.Router();

// rutas públicas y protegidas
router.get("/", getComments);
router.post("/", authMiddleware, createComment);
router.put("/:id", authMiddleware, updateComment);
router.delete("/:id", authMiddleware, deleteComment);

export default router;
