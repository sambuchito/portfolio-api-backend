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
        // 💡 1. Asegúrate de que el Frontend envíe 'content'
        const { content, funFactId } = req.body; 
        
        // 💡 2. Asegúrate de que el ID del usuario venga del token
        const userId = req.user.id; // o req.user._id, dependiendo de cómo firmaste el JWT

        if (!content || !funFactId) {
            return res.status(400).json({ message: 'Faltan campos requeridos (content, funFactId).' });
        }
        
        const newComment = new Comment({
            content,
            user: userId, // 💡 Debe coincidir con el campo de usuario en tu modelo
            funFact: funFactId
        });
        
        await newComment.save();
        
        // ...
    } catch (error) {
        // 💡 3. ¡IMPORTANTE! Agrega un console.log aquí para ver la causa real.
        console.error("Error al crear comentario:", error.message);
        return res.status(500).json({ message: 'Error interno del servidor al guardar comentario.' });
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
