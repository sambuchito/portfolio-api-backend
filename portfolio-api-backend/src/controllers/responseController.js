import Response from "../models/Response.js";

// get todas las respuestas de un comentario - publico
export const getResponses = async (req, res) => {
  try {
    const responses = await Response.find({ commentId: req.params.commentId }).sort({ createdAt: -1 });
    res.json(responses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET respuesta por ID - publico
export const getResponseById = async (req, res) => {
  try {
    const response = await Response.findById(req.params.id);
    if (!response) return res.status(404).json({ message: "Respuesta no encontrada" });
    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST una respuesta - protegida
export const createResponse = async (req, res) => {
  try {
    const { commentId, name, email, message } = req.body;

    if (!commentId || !name || !email || !message) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const response = new Response({ commentId, name, email, message });
    const newResponse = await response.save();
    res.status(201).json(newResponse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT respuesta - protegida
export const updateResponse = async (req, res) => {
  try {
    const updatedResponse = await Response.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    if (!updatedResponse) return res.status(404).json({ message: "Respuesta no encontrada" });
    res.json(updatedResponse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE respuesta - protegida
export const deleteResponse = async (req, res) => {
  try {
    const deletedResponse = await Response.findByIdAndDelete(req.params.id);
    if (!deletedResponse) return res.status(404).json({ message: "Respuesta no encontrada" });
    res.json({ message: "Respuesta eliminada correctamente" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
