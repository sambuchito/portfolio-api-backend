/* const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getComments, createComment } = require('../controllers/commentController');

// Solo usuarios autenticados pueden acceder
router.get('/', authMiddleware, getComments);
router.post('/', authMiddleware, createComment);

module.exports = router;
 */