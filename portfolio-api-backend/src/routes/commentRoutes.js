const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getComments,
  createComment,
  updateComment,
  deleteComment
} = require('../controllers/commentController');

// rutas publicas y protegidas
router.get('/', getComments);
router.post('/', authMiddleware, createComment);
router.put('/:id', authMiddleware, updateComment);
router.delete('/:id', authMiddleware, deleteComment);

module.exports = router;
