// controllers/responseController.js
import Response from "../models/Response.js";

// Obtener todas las respuestas de un comentario (público)
export const getResponsesByComment = async (req, res) => {
  try {
    const responses = await Response.find({ commentId: req.params.commentId }).sort({ createdAt: -1 });
    res.json(responses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear una respuesta (requiere token)
export const createResponse = async (req, res) => {
  try {
    const response = new Response({ ...req.body, commentId: req.params.commentId });
    const newResponse = await response.save();
    res.status(201).json(newResponse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Actualizar respuesta (requiere token)
export const updateResponse = async (req, res) => {
  try {
    const updatedResponse = await Response.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedResponse) return res.status(404).json({ message: "Respuesta no encontrada" });
    res.json(updatedResponse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar respuesta (requiere token)
export const deleteResponse = async (req, res) => {
  try {
    const deletedResponse = await Response.findByIdAndDelete(req.params.id);
    if (!deletedResponse) return res.status(404).json({ message: "Respuesta no encontrada" });
    res.json({ message: "Respuesta eliminada correctamente" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
