const Comment = require('../models/Comment');

// obtener todos los comentarios
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los comentarios' });
  }
};

// crear nuevo comentario
const createComment = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newComment = new Comment({ name, email, message });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el comentario' });
  }
};

// editar comentario
const updateComment = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;

  try {
    const updated = await Comment.findByIdAndUpdate(id, { message }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Comentario no encontrado' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el comentario' });
  }
};

// eliminar comentario
const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Comment.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Comentario no encontrado' });
    res.json({ message: 'Comentario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el comentario' });
  }
};

module.exports = {
  getComments,
  createComment,
  updateComment,
  deleteComment
};
