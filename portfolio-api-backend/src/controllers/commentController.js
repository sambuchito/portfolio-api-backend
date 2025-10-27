// controllers/commentController.js
import Comment from "../models/Comment.js";

// Obtener todos los comentarios (público)
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear un comentario (requiere token)
export const createComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Actualizar comentario (requiere token)
export const updateComment = async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedComment) return res.status(404).json({ message: "Comentario no encontrado" });
    res.json(updatedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar comentario (requiere token)
export const deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (!deletedComment) return res.status(404).json({ message: "Comentario no encontrado" });
    res.json({ message: "Comentario eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
