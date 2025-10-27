import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import {
  getResponsesByComment,
  createResponse,
  updateResponse,
  deleteResponse
} from '../controllers/responseController.js';

const router = express.Router();


router.get('/:commentId', getResponsesByComment);
router.post('/:commentId', authenticate, createResponse);
router.put('/:id', authenticate, updateResponse);
router.delete('/:id', authenticate, deleteResponse);

export default router;
