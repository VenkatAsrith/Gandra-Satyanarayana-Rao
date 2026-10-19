const express = require('express');
const router = express.Router();
const { getConstituency, updateConstituency } = require('../controllers/constituencyController');
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');

// Public
router.get('/', getConstituency);

// Admin
router.put('/', requireAuth, requireAdmin, updateConstituency);

module.exports = router;
