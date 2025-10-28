import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import {
  getResponses,
  getResponseById,
  createResponse,
  updateResponse,
  deleteResponse
} from '../controllers/responseController.js';

const router = express.Router();

// READ - all / id
router.get('/', getResponses);
router.get('/:id', getResponseById);

// CREATE
router.post('/', authenticate, createResponse);

// UPDATE
router.put('/:id', authenticate, updateResponse);

// DELETE
router.delete('/:id', authenticate, deleteResponse);

export default router;
