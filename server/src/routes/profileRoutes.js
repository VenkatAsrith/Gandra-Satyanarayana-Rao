const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');

// Public
router.get('/', getProfile);

// Admin
router.put('/', requireAuth, requireAdmin, updateProfile);

module.exports = router;
