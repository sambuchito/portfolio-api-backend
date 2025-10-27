const Response = require('../models/Response');

// obtener todas las respuestas de un comentario
const getResponsesByComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const responses = await Response.find({ commentId }).sort({ createdAt: -1 });
    res.json(responses);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las respuestas' });
  }
};

// crear nueva respuesta
const createResponse = async (req, res) => {
  const { commentId } = req.params;
  const { name, email, message } = req.body;

  try {
    const newResponse = new Response({ commentId, name, email, message });
    await newResponse.save();
    res.status(201).json(newResponse);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la respuesta' });
  }
};

// editar una respuesta
const updateResponse = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;

  try {
    const updated = await Response.findByIdAndUpdate(id, { message }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Respuesta no encontrada' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la respuesta' });
  }
};

// eliminar una respuesta
const deleteResponse = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Response.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Respuesta no encontrada' });
    res.json({ message: 'Respuesta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la respuesta' });
  }
};

module.exports = {
  getResponsesByComment,
  createResponse,
  updateResponse,
  deleteResponse
};
