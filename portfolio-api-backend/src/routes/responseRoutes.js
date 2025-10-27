import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import {
  getResponsesByComment,
  createResponse,
  updateResponse,
  deleteResponse
} from '../controllers/responseController.js';

const router = express.Router();

// obtener todas las respuestas de un comentario (público)
router.get('/:commentId', getResponsesByComment);

// crear respuesta (requiere token)
router.post('/:commentId', authenticate, createResponse);

// editar respuesta (requiere token)
router.put('/:id', authenticate, updateResponse);

// eliminar respuesta (requiere token)
router.delete('/:id', authenticate, deleteResponse);

export default router;
