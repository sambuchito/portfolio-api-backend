import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment
} from "../controllers/commentController.js";

const router = express.Router();

// rutas públicas y protegidas

// READ
router.get("/", getComments);
router.get("/:id", getCommentById);


// CREATE
router.post("/", authenticate, createComment);

//UPDATE
router.put("/:id", authenticate, updateComment);

//DELETE
router.delete("/:id", authenticate, deleteComment);

export default router;
