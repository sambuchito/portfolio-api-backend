import Comment from "../models/Comment.js";

// GET todos los comentarios / by id - publico
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comentario no encontrado" });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// POST comentario - protegido
export const createComment = async (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.message) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const comment = new Comment(req.body);
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT actualizar comentario - protegido
export const updateComment = async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    if (!updatedComment) return res.status(404).json({ message: "Comentario no encontrado" });
    res.json(updatedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE comentario - protegido
export const deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (!deletedComment) return res.status(404).json({ message: "Comentario no encontrado" });
    res.json({ message: "Comentario eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
